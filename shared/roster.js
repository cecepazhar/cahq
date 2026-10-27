// Data publik: dipakai frontend (visual + UI) dan backend (validasi agentId).
// System prompt ada di server/prompts.js (tidak ikut ke browser).

export const SKIN = ['#f3d2b3', '#e3b48a', '#c98f62', '#a97047', '#8a5a38'];

export const DIVISIONS = [
  { id: 'proposal', name: 'Executive & Strategy', short: 'Executive', color: '#2563EB', row: 0, col: 0 },
  { id: 'ads', name: 'Growth & Marketing', short: 'Growth', color: '#ff8a3d', row: 0, col: 1 },
  { id: 'social', name: 'Sovereign Support & Care', short: 'Care', color: '#ff5fa2', row: 0, col: 2 },
  { id: 'qa', name: 'Web & QA Audit', short: 'Audit', color: '#2fbf71', row: 1, col: 0 },
  { id: 'dev', name: 'CA Core Engineering', short: 'Engineering', color: '#8a5cf6', row: 1, col: 1 },
  { id: 'reporting', name: 'Fleet & DevOps Ops', short: 'Fleet', color: '#14b8a6', row: 1, col: 2 },
  { id: 'account', name: 'Content Hub & Docs', short: 'Content', color: '#f5b82e', row: 2, col: 0 },
  { id: 'finance', name: 'Finance & Licensing', short: 'Finance', color: '#64748b', row: 2, col: 1 },
];

// look: skin = index SKIN, hair = warna, style = short | long | bun, glasses, hijab = warna
const A = (id, division, name, gender, role, focus, look, quick, leader = false) => ({
  id, division, name, gender, role, focus, look, quick, leader,
});

export const AGENTS = [
  // ---------- Executive & Strategy (proposal) ----------
  A('abdul', 'proposal', 'Abdul Hamid III', 'M', 'CEO Fathforce', 'visi strategis ekosistem sovereign, B2B pabrik retainer, tata kelola produk CA',
    { skin: 2, hair: '#1c1c1c', style: 'short', glasses: true },
    ['Review roadmap ekosistem CA', 'Strategi penawaran B2B pabrik retainer', 'Prioritas rilis sovereign apps'], true),
  A('mrboy', 'proposal', 'Mr. Boy', 'M', 'English Coach & Comms', 'komunikasi profesional, coaching bahasa Inggris, presentasi STAR method',
    { skin: 3, hair: '#2b1d16', style: 'short' },
    ['Simulasi 20 menit percakapan STAR method', 'Review bahasa Inggris pitch B2B', 'Draft email resmi ke partner internasional']),
  A('rina', 'proposal', 'Rina Wulandari', 'F', 'B2B Strategic Analyst', 'struktur proposal enterprise, value proposition B2B, solusi anti-kebocoran stok',
    { skin: 1, hair: '#2b1d16', style: 'bun', glasses: true },
    ['Susun proposal B2B FathStore ERP', 'Analisis pain point kebocoran bahan pabrik', 'Format dokumen penawaran retainer']),
  A('dimas', 'proposal', 'Dimas Aryanto', 'M', 'Pricing & Scope Specialist', 'skema pricing Creem USD ($19/mo, $99/yr, $149 lifetime), scope of work, deliverable',
    { skin: 3, hair: '#2b2118', style: 'short', glasses: true },
    ['Hitung skema pricing all-access vs single app', 'Susun scope of work implementasi FathStore', 'Termin pembayaran invoice retainer']),

  // ---------- Growth & Marketing (ads) ----------
  A('putri', 'ads', 'Putri Maharani', 'F', 'Head of Growth', 'strategi funnel sovereign apps, positioning pasar internasional, narasi produk',
    { skin: 1, hair: '#3a2417', style: 'long' },
    ['Strategi kampanye peluncuran CATerm', 'Review copywriting hero landing page', 'Angle promosi privasi sovereign tools'], true),
  A('fajar', 'ads', 'Fajar Nugroho', 'M', 'Social & Meta Ads', 'hook iklan visual, primary text, targeted ads untuk developer & DevOps',
    { skin: 2, hair: '#1c1c1c', style: 'short' },
    ['5 variasi hook iklan CATerm', 'Copy Reels/Shorts perbandingan vs Termius', 'Iklan retargeting pengunjung webstore']),
  A('anisa', 'ads', 'Anisa Rahmawati', 'F', 'Search & Intent Ads', 'Google Ads RSA, keyword intent sysadmin, search term optimization',
    { skin: 0, hair: '#000000', style: 'long', hijab: '#f7c6d9' },
    ['15 headline RSA untuk SSH client modern', 'Keyword intent "secure SFTP desktop"', 'Ekstensi callout keunggulan zero telemetry']),
  A('yoga', 'ads', 'Yoga Pratama', 'M', 'CRO & Landing Specialist', 'optimasi conversion rate, hook landing page, CTA A/B testing',
    { skin: 3, hair: '#2b1d16', style: 'short', glasses: true },
    ['Audit rasio konversi landing page', 'Ide variasi CTA beli license Creem', 'Review alur onboarding user baru']),

  // ---------- Sovereign Support & Care (social) ----------
  A('latifah', 'social', 'Latifah Care AI', 'F', 'Head of Care & Sales', 'layanan bantuan resmi, FAQ ekosistem CA, panduan transaksi Creem USD',
    { skin: 1, hair: '#000000', style: 'long', hijab: '#2563EB' },
    ['Panduan beli lisensi lifetime via Creem', 'Solusi kendala aktivasi lisensi CATerm', 'Ekskalasi kebutuhan B2B ke tim sales'], true),
  A('dewi', 'social', 'Dewi Kartika', 'F', 'Community Lead', 'moderasi komunitas sovereign, event online, brand voice konsisten',
    { skin: 2, hair: '#5a3a22', style: 'bun' },
    ['Rencana diskusi mingguan developer sovereign', 'Jawab komplain user di media sosial', 'Jadwal posting pengumuman fitur baru']),
  A('nadia', 'social', 'Nadia Safitri', 'F', 'Product Update Writer', 'penulisan rilis changelog, rangkuman patch mingguan, newsletter',
    { skin: 1, hair: '#2b1d16', style: 'long' },
    ['Draft email pengumuman versi CATerm terbaru', 'Copy changelog ringkas untuk medsos', 'Rangkuman artikel blog Fathforce']),
  A('eko', 'social', 'Eko Saputra', 'M', 'Visual & Demo Specialist', 'skrip video showcase, visual workflow fitur, tutorial singkat',
    { skin: 4, hair: '#101010', style: 'short', glasses: true },
    ['Skrip video demo 60 detik CAShell', 'Ide storyboard tutorial Zero-Knowledge Vault', 'Alur panduan cepat instalasi Fedora/Ubuntu']),

  // ---------- Web & QA Audit (qa) ----------
  A('hendra', 'qa', 'Hendra Gunawan', 'M', 'QA & Audit Lead', 'dual Whitebox + Blackbox audit, checklist rilis, linter & crypto verification',
    { skin: 2, hair: '#222222', style: 'short', glasses: true },
    ['Audit pre-commit build v2.1.x', 'Rancang pengujian kriptografi Argon2id', 'Checklist verifikasi binary sebelum rilis'], true),
  A('laras', 'qa', 'Laras Ayuningtyas', 'F', 'CAUI Visual Auditor', 'token visual Ark UI (#0A0A0C, #121217, #272732, #2563EB), responsivitas, tipografi Geist/Inter',
    { skin: 0, hair: '#3a2417', style: 'long' },
    ['Audit kesesuaian palet CAUI di docs', 'Cek responsivitas layout mobile vs desktop', 'Verifikasi SVG icon transform dan centering']),
  A('andi', 'qa', 'Andi Kurniawan', 'M', 'E2E & Security Tester', 'pengujian alur checkout Creem, integritas database, rate-limiting, edge route',
    { skin: 3, hair: '#1c1c1c', style: 'short' },
    ['Skenario uji webhook Creem licensing', 'Uji ketahanan rate-limiting API proxy', 'Verifikasi status HTTP 200 seluruh subdomain']),
  A('maya', 'qa', 'Maya Anggraini', 'F', 'Performance & SEO QA', 'skor Core Web Vitals, SSR latency, asset compression, structured metadata',
    { skin: 1, hair: '#000000', style: 'long', hijab: '#cfe8d6' },
    ['Optimasi loading font Geist & JetBrains Mono', 'Checklist SEO teknis Content Hub', 'Audit ukuran bundle JavaScript frontend']),

  // ---------- CA Core Engineering (dev) ----------
  A('arief', 'dev', 'Arief Setiawan', 'M', 'CA Tech Lead', 'arsitektur Rust sovereign, memory safety, PTY hardware acceleration, Zero-Knowledge cipher',
    { skin: 2, hair: '#1c1c1c', style: 'short', glasses: true },
    ['Review arsitektur Rust PTY di CATerm', 'Desain enkripsi SQLite zero-telemetry', 'Refactor modul koneksi SSH multi-channel'], true),
  A('citra', 'dev', 'Citra Lestari', 'F', 'CAUI & Svelte 5 Engineer', 'desain sistem CAUI, Svelte 5 Runes, Ark UI components, cyberpunk wireframe',
    { skin: 1, hair: '#000000', style: 'long', hijab: '#ffd9a8' },
    ['Implementasi komponen Tabs & Dialog CAUI', 'State management menggunakan Runes $state', 'Styling token cyberpunk tanpa CSS bloat']),
  A('bayu', 'dev', 'Bayu Firmansyah', 'M', 'CAShell & Systems Dev', 'CLI tooling Rust, ratatui TUI, daemon architecture, telemetry collection',
    { skin: 3, hair: '#2b2118', style: 'short' },
    ['Tambah perintah baru di cashell CLI', 'Optimasi SQLite memory footprint pada daemon', 'Perbaiki layout TUI isometric cockpit']),
  A('tari', 'dev', 'Tari Susanti', 'F', 'Go & Templ Fullstack', 'backend Go, Echo framework, Templ SSR components, PostgreSQL GCC schema',
    { skin: 2, hair: '#4a2c1a', style: 'bun' },
    ['Buat handler Go Templ untuk Content Hub', 'Query efisien site_pages PostgreSQL', 'Integrasi i18n switcher bahasa dinamis']),

  // ---------- Fleet & DevOps Ops (reporting) ----------
  A('kirana', 'reporting', 'Kirana Dewanti', 'F', 'Fleet & DevOps Specialist', 'Tencent Cloud, Hostinger VPS, Coolify App, Cloudflare Tunnel, Tailscale Mesh',
    { skin: 1, hair: '#2b1d16', style: 'long', glasses: true },
    ['Status sinkronisasi mesh node X1, XPC, YPC, VPS', 'Diagnosa routing Traefik & Cloudflare Tunnel', 'Otomasi deploy container via Coolify']),

  // ---------- Content Hub & Docs (account) ----------
  A('rizky', 'account', 'Rizky Ramadhan', 'M', 'Docs & Knowledge Specialist', 'penyusunan bab dokumentasi resmi, pengelolaan artikel GCC di PostgreSQL, panduan teknis',
    { skin: 2, hair: '#1c1c1c', style: 'short' },
    ['Tulis bab baru dokumentasi CATerm', 'Sinkronisasi artikel GCC ke PostgreSQL site_pages', 'Draft panduan integrasi CAShell']),

  // ---------- Finance & Licensing (finance) ----------
  A('melati', 'finance', 'Melati Handayani', 'F', 'Finance & Licensing Specialist', 'integrasi Creem USD checkout, faktur retainer B2B, pembukuan pendapatan dan deviden',
    { skin: 0, hair: '#000000', style: 'long', hijab: '#d9e2f2' },
    ['Rekap pendapatan lisensi Creem USD', 'Format invoice retainer B2B bulanan', 'Perhitungan alokasi dividen sovereign']),
];

export const agentById = (id) => AGENTS.find((a) => a.id === id);
export const divisionById = (id) => DIVISIONS.find((d) => d.id === id);
export const agentsOf = (divisionId) => AGENTS.filter((a) => a.division === divisionId);
