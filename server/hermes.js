import { spawn } from 'node:child_process';

export const HERMES_FLEET_ROUTING = {
  // Laptop X1 (Local)
  abdul: { host: 'localhost', profile: 'biz-agent', name: 'Abdul Hamid III', nodeName: 'Laptop X1 (Master)' },
  arief: { host: 'localhost', profile: 'dev-agent', name: 'Arief Setiawan', nodeName: 'Laptop X1 (Core Dev)' },
  citra: { host: 'localhost', profile: 'dev-agent', name: 'Citra Lestari', nodeName: 'Laptop X1 (CAUI Dev)' },
  bayu: { host: 'localhost', profile: 'dev-agent', name: 'Bayu Firmansyah', nodeName: 'Laptop X1 (CAShell Dev)' },
  tari: { host: 'localhost', profile: 'dev-agent', name: 'Tari Susanti', nodeName: 'Laptop X1 (Go Fullstack)' },
  hendra: { host: 'localhost', profile: 'qa-agent', name: 'Hendra Gunawan', nodeName: 'Laptop X1 (QA Lead)' },
  laras: { host: 'localhost', profile: 'qa-agent', name: 'Laras Ayuningtyas', nodeName: 'Laptop X1 (Visual QA)' },
  andi: { host: 'localhost', profile: 'qa-agent', name: 'Andi Kurniawan', nodeName: 'Laptop X1 (Security QA)' },
  maya: { host: 'localhost', profile: 'qa-agent', name: 'Maya Anggraini', nodeName: 'Laptop X1 (SEO/Vitals)' },
  rizky: { host: 'localhost', profile: 'content-agent', name: 'Rizky Ramadhan', nodeName: 'Laptop X1 (Docs)' },

  // Hostinger VPS (100.76.150.46)
  latifah: { host: '100.76.150.46', profile: 'latifah-care', name: 'Latifah Care AI', nodeName: 'Hostinger VPS (Care)' },
  mrboy: { host: '100.76.150.46', profile: 'english-coach', name: 'Mr. Boy', nodeName: 'Hostinger VPS (Coach)' },
  melati: { host: '100.76.150.46', profile: 'default', name: 'Melati Handayani', nodeName: 'Hostinger VPS (Finance)' },

  // Tencent Cloud (100.96.8.82)
  kirana: { host: 'tencent', profile: 'biz-agent', name: 'Kirana Dewanti', nodeName: 'Tencent Cloud (Fleet Ops)' },
};

export function wantsHermesExecution(text = '', forcedMode = '') {
  if (forcedMode === 'hermes') return true;
  const t = text.trim();
  if (t.startsWith('!') || t.startsWith('/exec') || t.startsWith('/hermes') || t.startsWith('>')) {
    return true;
  }
  const ACTION_PATTERNS = /(eksekusi|jalankan|run|audit|cek direktori|git status|cek status|cek docker|cek server|deploy|build|compile|test|periksa sistem|mesh status)/i;
  return ACTION_PATTERNS.test(t);
}

export function cleanHermesPrompt(text = '') {
  return text.replace(/^(!|\/exec|\/hermes|>)\s*/i, '').trim();
}

export async function executeHermesFleet({ agentId, prompt, onStatus, onText, signal }) {
  const route = HERMES_FLEET_ROUTING[agentId] || { host: 'localhost', profile: 'biz-agent', name: agentId, nodeName: 'Laptop X1' };
  
  if (onStatus) {
    onStatus(`⚡ **[Hermes Fleet Action]** Mengirim tugas ke profil \`${route.profile}\` di **${route.nodeName}**...\n\n`);
  }

  return new Promise((resolve, reject) => {
    let cmd = 'hermes';
    let args = ['-p', route.profile, '-z', prompt];

    if (route.host === '100.76.150.46') {
      cmd = 'ssh';
      const remoteCmd = `hermes -p ${route.profile} -z ${JSON.stringify(prompt)}`;
      args = ['-o', 'BatchMode=yes', 'root@100.76.150.46', remoteCmd];
    } else if (route.host === 'tencent') {
      cmd = 'hermes';
      const enrichedPrompt = `Sebagai ${route.name} (Fleet & DevOps Specialist), periksa dan kelola infrastruktur server Tencent 100.96.8.82 / fleet mesh untuk tugas ini: ${prompt}`;
      args = ['-p', 'biz-agent', '-z', enrichedPrompt];
    }

    const child = spawn(cmd, args, { signal, cwd: '/home/cecepazhar/Product/cahq' });
    let stdoutData = '';
    let stderrData = '';

    child.stdout.on('data', (d) => {
      const chunk = d.toString('utf8');
      stdoutData += chunk;
      if (onText) onText(chunk);
    });

    child.stderr.on('data', (d) => {
      stderrData += d.toString('utf8');
    });

    child.on('error', (err) => {
      reject(new Error(`Gagal memicu Hermes (${cmd}): ${err.message}`));
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout: stdoutData, stderr: stderrData });
      } else {
        const out = stdoutData.trim() || `[Hermes exit code: ${code}]\n${stderrData.trim()}`;
        resolve({ stdout: out });
      }
    });
  });
}
