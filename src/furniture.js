import * as THREE from 'three';
import { box, mat } from './character.js';

const glowMats = new Map();
export function glow(color) {
  if (!glowMats.has(color)) glowMats.set(color, new THREE.MeshBasicMaterial({ color }));
  return glowMats.get(color);
}

const group = (...kids) => {
  const g = new THREE.Group();
  kids.forEach((k) => k && g.add(k));
  return g;
};

// Meja: atas di y=0.9. Orang duduk di sisi -z, layar laptop menghadap -z.
export function desk(w = 2.2, d = 1.2, top = '#181b24', accent = '#272732') {
  const g = new THREE.Group();
  g.add(box(w, 0.08, d, top, 0, 0.86, 0));
  g.add(box(0.08, 0.82, d - 0.1, accent, -w / 2 + 0.06, 0.41, 0));
  g.add(box(0.08, 0.82, d - 0.1, accent, w / 2 - 0.06, 0.41, 0));
  g.add(box(w - 0.2, 0.5, 0.05, accent, 0, 0.55, d / 2 - 0.08));
  // Cyber desk pad
  g.add(box(w * 0.75, 0.01, d * 0.65, '#0e1017', 0, 0.905, 0));
  return g;
}

export function laptop(screenColor = '#3b82f6') {
  const g = new THREE.Group();
  g.add(box(0.62, 0.03, 0.42, '#222634', 0, 0.915, -0.08));
  const screen = new THREE.Group();
  screen.position.set(0, 0.93, 0.12);
  screen.rotation.x = 0.22;
  screen.add(box(0.62, 0.4, 0.03, '#1a1d28', 0, 0.2, 0));
  const face = new THREE.Mesh(new THREE.PlaneGeometry(0.54, 0.33), glow(screenColor));
  face.position.set(0, 0.2, -0.017);
  face.rotation.y = Math.PI;
  screen.add(face);
  g.add(screen);
  return g;
}

export function mug(color = '#2563EB') {
  return group(box(0.1, 0.12, 0.1, color, 0, 0.96, 0));
}

export function chair(color = '#1c202c') {
  const g = new THREE.Group();
  g.add(box(0.56, 0.1, 0.56, color, 0, 0.42, 0));
  g.add(box(0.56, 0.62, 0.08, color, 0, 0.78, -0.27));
  g.add(box(0.08, 0.3, 0.08, '#101218', 0, 0.22, 0));
  g.add(box(0.7, 0.05, 0.12, '#101218', 0, 0.05, 0));
  g.add(box(0.12, 0.05, 0.7, '#101218', 0, 0.05, 0));
  return g;
}

export function plant(h = 1) {
  const g = new THREE.Group();
  g.add(box(0.4, 0.35, 0.4, '#1e2430', 0, 0.175, 0));
  g.add(box(0.46, 0.06, 0.46, '#272732', 0, 0.37, 0));
  g.add(box(0.1, 0.4 * h, 0.1, '#15803d', 0, 0.6, 0));
  g.add(box(0.5, 0.3 * h, 0.5, '#16a34a', 0, 0.85 * h, 0));
  g.add(box(0.34, 0.26 * h, 0.34, '#22c55e', 0.08, 1.12 * h, -0.05));
  return g;
}

const BOOK_COLORS = ['#2563EB', '#3B82F6', '#10B981', '#8B5CF6', '#EC4899', '#06B6D4', '#F59E0B'];
export function bookshelf(w = 2.4, h = 2.2) {
  const g = new THREE.Group();
  const depth = 0.45;
  g.add(box(w, h, 0.05, '#181b26', 0, h / 2, -depth / 2 + 0.03));
  g.add(box(0.06, h, depth, '#181b26', -w / 2, h / 2, 0));
  g.add(box(0.06, h, depth, '#181b26', w / 2, h / 2, 0));
  const shelves = 4;
  for (let s = 0; s <= shelves; s += 1) {
    const y = (s * h) / shelves;
    g.add(box(w, 0.05, depth, '#272732', 0, y + 0.03, 0));
    if (s === shelves) continue;
    let x = -w / 2 + 0.15;
    let i = s * 3;
    while (x < w / 2 - 0.2) {
      const bw = 0.08 + ((i * 7) % 4) * 0.025;
      const bh = 0.3 + ((i * 5) % 4) * 0.06;
      g.add(box(bw, bh, 0.3, BOOK_COLORS[i % BOOK_COLORS.length], x + bw / 2, y + 0.06 + bh / 2, 0));
      x += bw + 0.02;
      i += 1;
    }
  }
  return g;
}

// Menempel di dinding belakang (menghadap +z)
export function whiteboard(w = 3, h = 1.6) {
  const g = new THREE.Group();
  g.add(box(w + 0.12, h + 0.12, 0.06, '#272732', 0, 0, 0));
  g.add(box(w, h, 0.04, '#0e1017', 0, 0, 0.03));
  const cols = ['#2563EB', '#38BDF8', '#10B981', '#F43F5E'];
  for (let i = 0; i < 4; i += 1) {
    g.add(box(w * 0.26, 0.05, 0.02, cols[i], -w * 0.3 + (i % 2) * w * 0.3, h * 0.25 - Math.floor(i / 2) * 0.35, 0.06));
  }
  g.add(box(w * 0.7, 0.04, 0.02, '#3b4354', 0, -h * 0.28, 0.06));
  g.add(box(w, 0.05, 0.12, '#272732', 0, -h / 2 - 0.08, 0.08));
  return g;
}

export function windowPane(w = 1.6, h = 1.3) {
  const g = new THREE.Group();
  g.add(box(w + 0.16, h + 0.16, 0.05, '#272732', 0, 0, 0));
  const pane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), glow('#1e293b'));
  pane.position.z = 0.03;
  g.add(pane);
  g.add(box(0.05, h, 0.03, '#272732', 0, 0, 0.04));
  g.add(box(w, 0.05, 0.03, '#272732', 0, 0, 0.04));
  // Cyber edge glow
  g.add(box(w - 0.1, 0.02, 0.04, '#38bdf8', 0, 0.2, 0.04));
  return g;
}

export function clock() {
  const g = new THREE.Group();
  g.add(box(0.6, 0.6, 0.06, '#181b24'));
  g.add(box(0.5, 0.5, 0.03, '#0b0d13', 0, 0, 0.03));
  g.add(box(0.04, 0.2, 0.02, '#38bdf8', 0, 0.08, 0.05));
  g.add(box(0.14, 0.04, 0.02, '#2563EB', 0.05, 0, 0.05));
  return g;
}

export function rug(w, d, color = '#12141f') {
  const g = new THREE.Group();
  g.add(box(w, 0.02, d, color, 0, 0.01, 0));
  g.add(box(w + 0.08, 0.01, d + 0.08, '#272732', 0, 0.005, 0));
  return g;
}

export function sofa(w = 2.6, color = '#181c26') {
  const g = new THREE.Group();
  g.add(box(w, 0.4, 0.9, color, 0, 0.3, 0));
  g.add(box(w, 0.6, 0.25, color, 0, 0.6, -0.33));
  g.add(box(0.25, 0.55, 0.9, color, -w / 2 + 0.12, 0.45, 0));
  g.add(box(0.25, 0.55, 0.9, color, w / 2 - 0.12, 0.45, 0));
  g.add(box(0.5, 0.45, 0.14, '#2563EB', 0.5, 0.65, -0.12));
  return g;
}

export function table(w = 1.6, d = 1.0, color = '#1c202c') {
  const g = new THREE.Group();
  g.add(box(w, 0.08, d, color, 0, 0.62, 0));
  g.add(box(0.1, 0.58, 0.1, '#272732', -w / 2 + 0.12, 0.29, -d / 2 + 0.12));
  g.add(box(0.1, 0.58, 0.1, '#272732', w / 2 - 0.12, 0.29, -d / 2 + 0.12));
  g.add(box(0.1, 0.58, 0.1, '#272732', -w / 2 + 0.12, 0.29, d / 2 - 0.12));
  g.add(box(0.1, 0.58, 0.1, '#272732', w / 2 - 0.12, 0.29, d / 2 - 0.12));
  return g;
}

export function coffeeMachine() {
  const g = new THREE.Group();
  g.add(box(0.9, 1.0, 0.6, '#181b24', 0, 0.5, 0));
  g.add(box(0.6, 0.3, 0.05, '#2563EB', 0, 0.8, 0.31));
  g.add(box(0.5, 0.05, 0.4, '#272732', 0, 0.35, 0.2));
  g.add(box(0.12, 0.16, 0.12, '#ffffff', 0, 0.45, 0.22));
  return g;
}

export function waterCooler() {
  const g = new THREE.Group();
  g.add(box(0.5, 0.9, 0.5, '#181c26', 0, 0.45, 0));
  g.add(box(0.4, 0.55, 0.4, '#38bdf8', 0, 1.15, 0, { transparent: true, opacity: 0.7 }));
  return g;
}

export function filingCabinet() {
  const g = new THREE.Group();
  g.add(box(0.7, 1.3, 0.6, '#1c202a', 0, 0.65, 0));
  for (let i = 0; i < 3; i += 1) {
    g.add(box(0.5, 0.08, 0.04, '#272732', 0, 0.3 + i * 0.4, 0.31));
  }
  return g;
}

export function ringLight() {
  const g = new THREE.Group();
  g.add(box(0.06, 1.4, 0.06, '#12141a', 0, 0.7, 0));
  g.add(box(0.5, 0.05, 0.05, '#12141a', 0, 0.04, 0));
  g.add(box(0.05, 0.05, 0.5, '#12141a', 0, 0.04, 0));
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.05, 8, 24), glow('#60a5fa'));
  ring.position.set(0, 1.55, 0);
  g.add(ring);
  g.add(box(0.14, 0.14, 0.1, '#0b0d13', 0, 1.55, 0.02));
  return g;
}

export function deviceShelf() {
  const g = new THREE.Group();
  g.add(box(2.4, 0.08, 0.5, '#1c202a', 0, 1.0, 0));
  g.add(box(0.08, 1.0, 0.5, '#272732', -1.15, 0.5, 0));
  g.add(box(0.08, 1.0, 0.5, '#272732', 1.15, 0.5, 0));
  const cols = ['#38bdf8', '#34d399', '#a78bfa', '#f472b6', '#fbbf24'];
  for (let i = 0; i < 5; i += 1) {
    const w = i % 2 ? 0.34 : 0.22;
    const h = i % 2 ? 0.5 : 0.4;
    const dev = group(box(w, h, 0.04, '#0a0c10', 0, 0, 0), new THREE.Mesh(new THREE.PlaneGeometry(w - 0.04, h - 0.04), glow(cols[i])));
    dev.children[1].position.z = 0.025;
    dev.position.set(-0.9 + i * 0.45, 1.3, 0);
    dev.rotation.x = -0.1;
    g.add(dev);
  }
  g.add(box(2.4, 0.08, 0.5, '#1c202a', 0, 0.45, 0));
  return g;
}

export function serverRack() {
  const g = new THREE.Group();
  g.add(box(0.9, 1.9, 0.7, '#12141a', 0, 0.95, 0));
  for (let i = 0; i < 6; i += 1) {
    g.add(box(0.74, 0.18, 0.04, '#1c202c', 0, 0.3 + i * 0.28, 0.36));
    g.add(box(0.06, 0.06, 0.02, i % 2 ? '#10b981' : '#3b82f6', 0.28, 0.3 + i * 0.28, 0.39));
  }
  return g;
}

export function chartWall(w = 3.4, h = 1.9) {
  const g = new THREE.Group();
  g.add(box(w + 0.12, h + 0.12, 0.06, '#181b24'));
  g.add(box(w, h, 0.04, '#0b0d13', 0, 0, 0.03));
  const bars = [0.35, 0.55, 0.45, 0.8, 0.65, 1.0];
  bars.forEach((v, i) => {
    const bh = v * (h * 0.7);
    g.add(box(0.28, bh, 0.03, i % 2 ? '#06b6d4' : '#2563EB', -w / 2 + 0.45 + i * 0.5, -h / 2 + 0.2 + bh / 2, 0.06));
  });
  g.add(box(w - 0.4, 0.04, 0.02, '#272732', 0, -h / 2 + 0.17, 0.06));
  return g;
}

export function paperStack() {
  const g = new THREE.Group();
  g.add(box(0.36, 0.1, 0.28, '#272732', 0, 0.95, 0));
  g.add(box(0.34, 0.06, 0.26, '#1c202c', 0.02, 1.03, 0.01));
  return g;
}

export function megaphone() {
  const g = new THREE.Group();
  g.add(box(0.2, 0.2, 0.2, '#f97316', 0, 0, 0));
  g.add(box(0.36, 0.36, 0.3, '#fb923c', 0, 0, 0.22));
  g.add(box(0.5, 0.5, 0.06, '#f97316', 0, 0, 0.4));
  return g;
}

export function safe() {
  const g = new THREE.Group();
  g.add(box(0.9, 1.0, 0.8, '#1e2430', 0, 0.5, 0));
  g.add(box(0.7, 0.8, 0.04, '#272732', 0, 0.5, 0.42));
  g.add(box(0.14, 0.14, 0.06, '#f5b82e', 0.1, 0.5, 0.46));
  return g;
}

export function calculator() {
  const g = new THREE.Group();
  g.add(box(0.2, 0.03, 0.28, '#12141a', 0, 0.93, 0));
  g.add(box(0.16, 0.01, 0.06, '#10b981', 0, 0.955, -0.09));
  return g;
}

// ---------- Fleet NOC Specific 3D Furniture ----------

export function fleetServerRack(node) {
  const g = new THREE.Group();
  const w = 1.15, h = 2.4, d = 0.85;

  // Dark steel chassis
  g.add(box(w, h, d, '#0b0d13', 0, h / 2, 0));
  g.add(box(w + 0.04, 0.06, d + 0.04, '#2563EB', 0, h, 0)); // top royal blue neon
  g.add(box(w + 0.04, 0.06, d + 0.04, '#1b202e', 0, 0.03, 0)); // base

  // Side pillars
  g.add(box(0.06, h, 0.06, '#272732', -w / 2 + 0.03, h / 2, d / 2 + 0.01));
  g.add(box(0.06, h, 0.06, '#272732', w / 2 - 0.03, h / 2, d / 2 + 0.01));

  const isOnline = node.online !== false;
  const ledColor = isOnline ? '#10B981' : '#EF4444';
  const pulseColor = isOnline ? '#3B82F6' : '#F59E0B';

  // Server Blades
  for (let i = 0; i < 7; i += 1) {
    const y = 0.35 + i * 0.28;
    g.add(box(w - 0.16, 0.22, 0.06, '#141824', 0, y, d / 2 - 0.01));

    // LED status light
    const ledMesh = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.02), glow(i === 0 ? ledColor : (i % 2 === 0 ? pulseColor : '#2563EB')));
    ledMesh.position.set(w / 2 - 0.16, y, d / 2 + 0.03);
    g.add(ledMesh);

    // Vent grill
    g.add(box(w - 0.42, 0.03, 0.02, '#080a0f', -0.06, y, d / 2 + 0.02));
  }

  // Label plaque on top
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 140;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#06080e';
  ctx.fillRect(0, 0, 512, 140);
  ctx.strokeStyle = isOnline ? '#2563EB' : '#EF4444';
  ctx.lineWidth = 6;
  ctx.strokeRect(4, 4, 504, 132);

  // Status dot
  ctx.fillStyle = isOnline ? '#10B981' : '#EF4444';
  ctx.beginPath();
  ctx.arc(42, 70, 16, 0, Math.PI * 2);
  ctx.fill();

  // Name & IP
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 40px sans-serif';
  ctx.fillText(node.hostName.toUpperCase(), 80, 58);

  ctx.fillStyle = isOnline ? '#60A5FA' : '#94A3B8';
  ctx.font = '26px monospace';
  ctx.fillText(node.ip, 80, 105);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const labelMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.25), new THREE.MeshBasicMaterial({ map: tex }));
  labelMesh.position.set(0, h - 0.2, d / 2 + 0.03);
  g.add(labelMesh);

  return g;
}

export function nocHoloTable() {
  const g = new THREE.Group();
  // Pedestal base
  g.add(box(1.8, 0.8, 1.8, '#0f121a', 0, 0.4, 0));
  g.add(box(2.0, 0.08, 2.0, '#1c2230', 0, 0.84, 0));

  // Cyber blue glow projector disk
  const disk = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.04, 32), glow('#2563EB'));
  disk.position.set(0, 0.89, 0);
  g.add(disk);

  // Hologram ring
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.4, 0.7, 32), new THREE.MeshBasicMaterial({ color: '#60A5FA', side: THREE.DoubleSide, transparent: true, opacity: 0.85 }));
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(0, 1.25, 0);
  g.add(ring);

  return g;
}

export function nocBigScreen(title = "FATHFORCE SOVEREIGN FLEET", subtitle = "Tailscale Mesh · 7 Nodes Monitored") {
  const g = new THREE.Group();
  const w = 4.8, h = 2.1;
  g.add(box(w + 0.16, h + 0.16, 0.06, '#0f121a', 0, 0, 0));
  g.add(box(w + 0.06, 0.05, 0.08, '#2563EB', 0, h / 2 + 0.08, 0)); // top neon

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 460;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#06080e';
  ctx.fillRect(0, 0, 1024, 460);

  // Grid background
  ctx.strokeStyle = 'rgba(37,99,235,0.18)';
  ctx.lineWidth = 1;
  for (let x = 0; x < 1024; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 460); ctx.stroke(); }
  for (let y = 0; y < 460; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1024, y); ctx.stroke(); }

  // Header
  ctx.fillStyle = '#2563EB';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText(title, 40, 56);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '22px monospace';
  ctx.fillText(subtitle, 40, 95);

  const nodes = [
    { name: "X1 (ThinkPad Master)", ip: "100.78.73.124", up: true },
    { name: "HOSTINGER (VPS Gateway)", ip: "100.76.150.46", up: true },
    { name: "TENCENT (Production Ingress)", ip: "100.96.8.82", up: true },
    { name: "YPC (Compute Worker)", ip: "100.127.232.32", up: true },
    { name: "XPC (Compute Worker)", ip: "100.125.125.28", up: true },
    { name: "ZPC (Auxiliary Node)", ip: "100.111.241.124", up: false },
    { name: "GERLINK (Edge Node)", ip: "100.102.147.90", up: false },
  ];

  nodes.forEach((n, idx) => {
    const col = idx < 4 ? 0 : 1;
    const row = idx < 4 ? idx : idx - 4;
    const x = 40 + col * 480;
    const y = 145 + row * 70;

    // Dot indicator
    ctx.fillStyle = n.up ? '#10B981' : '#EF4444';
    ctx.beginPath();
    ctx.arc(x + 12, y + 16, 8, 0, Math.PI * 2);
    ctx.fill();

    // Node name
    ctx.fillStyle = '#EDEDED';
    ctx.font = 'bold 22px monospace';
    ctx.fillText(n.name, x + 32, y + 18);

    // Node IP & badge
    ctx.fillStyle = n.up ? '#60A5FA' : '#64748B';
    ctx.font = '18px monospace';
    ctx.fillText(`${n.ip}  [${n.up ? 'ONLINE' : 'OFFLINE'}]`, x + 32, y + 44);
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex }));
  screenMesh.position.set(0, 0, 0.04);
  g.add(screenMesh);
  return g;
}

export function ceilingLamp(accentColor = '#2563EB', w = 3.6) {
  const g = new THREE.Group();

  // 1. Ceiling mount canopies
  g.add(box(0.35, 0.05, 0.35, '#334155', -w / 2 + 0.5, 0.85, 0));
  g.add(box(0.35, 0.05, 0.35, '#334155', w / 2 - 0.5, 0.85, 0));

  // 2. Black suspension cables
  const cableMat = mat('#64748b');
  const cableGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.85);
  const c1 = new THREE.Mesh(cableGeom, cableMat);
  c1.position.set(-w / 2 + 0.5, 0.42, 0);
  const c2 = new THREE.Mesh(cableGeom, cableMat);
  c2.position.set(w / 2 - 0.5, 0.42, 0);
  g.add(c1, c2);

  // 3. Main floating pendant hood / fixture body (sleek modern architectural bar)
  g.add(box(w, 0.22, 0.52, '#1e293b', 0, 0, 0));
  g.add(box(w + 0.06, 0.06, 0.56, accentColor, 0, 0.08, 0)); // Division neon trim

  // 4. Ultra-bright glowing LED diffuser panel underneath (MeshBasicMaterial)
  const lightMat = new THREE.MeshBasicMaterial({ color: '#ffffff' });
  const panel = new THREE.Mesh(new THREE.BoxGeometry(w - 0.2, 0.06, 0.44), lightMat);
  panel.position.set(0, -0.1, 0);
  g.add(panel);

  // 5. Stylized soft light cone / beam hitting the floor
  const coneGeom = new THREE.CylinderGeometry(w / 2 - 0.1, w / 2 + 1.2, 2.3, 16, 1, true);
  const coneMat = new THREE.MeshBasicMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.07,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const cone = new THREE.Mesh(coneGeom, coneMat);
  cone.position.set(0, -1.2, 0);
  g.add(cone);

  // 6. Warm pool of light on the floor underneath the lamp
  const poolMat = new THREE.MeshBasicMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.10,
    depthWrite: false,
  });
  const pool = new THREE.Mesh(new THREE.PlaneGeometry(w + 1.8, 3.8), poolMat);
  pool.rotation.x = -Math.PI / 2;
  pool.position.set(0, -2.44, 0);
  g.add(pool);

  return g;
}
