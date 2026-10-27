import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

const KNOWN_FLEET_NODES = [
  { id: 'x1', name: 'Laptop X1 (ThinkPad)', hostName: 'x1', ip: '100.78.73.124', role: 'Master Workspace', defaultStatus: true },
  { id: 'hostinger', name: 'Hostinger VPS', hostName: 'vps-hostinger', ip: '100.76.150.46', role: 'Public Gateway & 9Router', defaultStatus: true },
  { id: 'tencent', name: 'Tencent Cloud', hostName: 'cacloud', ip: '100.96.8.82', role: 'Production Ingress & Ingress Stack', defaultStatus: true },
  { id: 'ypc', name: 'YPC Node', hostName: 'ypc', ip: '100.127.232.32', role: 'Compute Worker', defaultStatus: true },
  { id: 'xpc', name: 'XPC Node', hostName: 'xpc', ip: '100.125.125.28', role: 'Compute Worker', defaultStatus: true },
  { id: 'zpc', name: 'ZPC Node', hostName: 'cecep', ip: '100.111.241.124', role: 'Auxiliary Node', defaultStatus: false },
  { id: 'gerlink', name: 'Gerlink Node', hostName: 'gerlink', ip: '100.102.147.90', role: 'Edge Device', defaultStatus: false },
];

let cachedStatus = null;
let lastCheckTime = 0;

export async function getFleetStatus() {
  const now = Date.now();
  if (cachedStatus && (now - lastCheckTime) < 15000) {
    return cachedStatus;
  }

  const nodes = KNOWN_FLEET_NODES.map(n => ({ ...n, online: n.defaultStatus }));

  try {
    const { stdout } = await execAsync('tailscale status --json', { timeout: 3000 });
    const data = JSON.parse(stdout);
    
    // Check self
    if (data.Self) {
      const selfName = data.Self.HostName?.toLowerCase();
      const match = nodes.find(n => n.hostName.toLowerCase() === selfName || n.id === selfName);
      if (match) match.online = Boolean(data.Self.Online);
    }

    // Check peers
    if (data.Peer) {
      for (const peer of Object.values(data.Peer)) {
        const peerHost = peer.HostName?.toLowerCase();
        const peerDns = (peer.DNSName || '').toLowerCase();
        const match = nodes.find(n => 
          n.hostName.toLowerCase() === peerHost || 
          peerDns.startsWith(n.id + '.') || 
          (peer.TailscaleIPs && peer.TailscaleIPs.includes(n.ip))
        );
        if (match) {
          match.online = Boolean(peer.Online);
          match.lastSeen = peer.LastSeen;
          match.active = Boolean(peer.Active);
        }
      }
    }
  } catch (err) {
    // If tailscale CLI is not accessible (e.g. inside docker container without socket), fallback to quick HTTP checks
    await Promise.all(nodes.map(async (n) => {
      if (n.id === 'hostinger') {
        try {
          const res = await fetch(`http://${n.ip}:3007/api/health`, { signal: AbortSignal.timeout(1500) });
          n.online = res.ok;
        } catch {
          n.online = false;
        }
      } else if (n.id === 'x1') {
        try {
          const res = await fetch(`http://${n.ip}:20128/`, { signal: AbortSignal.timeout(1500) });
          n.online = res.status < 500;
        } catch {
          // Keep default
        }
      }
    }));
  }

  cachedStatus = {
    timestamp: new Date().toISOString(),
    totalNodes: nodes.length,
    onlineNodes: nodes.filter(n => n.online).length,
    nodes,
  };
  lastCheckTime = now;
  return cachedStatus;
}
