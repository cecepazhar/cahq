# CAHQ — Fathforce Sovereign Squad

Kantor isometrik 3D interaktif berisi 23 agen otonom untuk ekosistem sovereign Fathforce & CA (Cecep Azhar).

Tampilan kantor 3D berbasis WebGL (Three.js) prosedural murni tanpa dependensi file 3D biner (`.gltf`/`.obj`), terhubung langsung ke model AI lokal via 9Router / OmniRoute atau cloud API.

## Struktur Divisi & Skuad

| Divisi | Ruangan | Tim & Peran |
|---|---|---|
| **Executive & Strategy** | Ruang Biru | **Abdul Hamid III** (CEO / Leader), Mr. Boy (English & Comms), Rina Wulandari (B2B Analyst), Dimas Aryanto (Pricing & Scope) |
| **Growth & Marketing** | Ruang Oranye | **Putri Maharani** (Head of Growth / Leader), Fajar Nugroho (Meta Ads), Anisa Rahmawati (Search Ads), Yoga Pratama (CRO) |
| **Sovereign Support & Care** | Ruang Pink | **Latifah Care AI** (Head of Care / Leader), Dewi Kartika (Community), Nadia Safitri (Changelog), Eko Saputra (Demo Specialist) |
| **Web & QA Audit** | Ruang Hijau | **Hendra Gunawan** (QA & Audit Lead / Leader), Laras Ayuningtyas (CAUI Visual), Andi Kurniawan (E2E & Security), Maya Anggraini (Web Vitals) |
| **CA Core Engineering** | Ruang Ungu | **Arief Setiawan** (CA Tech Lead / Leader), Citra Lestari (CAUI & Svelte 5), Bayu Firmansyah (CAShell & Systems), Tari Susanti (Go & Templ) |
| **Fleet & DevOps Ops** | Ruang Toska | **Kirana Dewanti** (Fleet & Mesh Specialist) |
| **Content Hub & Docs** | Ruang Kuning | **Rizky Ramadhan** (Docs & Knowledge Specialist) |
| **Finance & Licensing** | Ruang Abu-abu | **Melati Handayani** (Finance & Licensing Specialist) |

## Fitur Utama

- **100% Prosedural Three.js:** Visual 3D balok isometrik ringan (~570KB transfer bundle).
- **Dual-Model / Multi-Model Support:** Leader menggunakan model reasoning tinggi (`ZA126_PRO` / Sonnet), tim menggunakan model hemat (`ZA126_FLASH` / Haiku).
- **Delegasi Otomatis:** Leader divisi dapat memecah tugas kompleks ke anggota timnya secara deterministik via prompt `"delegasikan"`.
- **Koneksi AI Lokal:** Kompatibel dengan 9Router, OmniRoute, llama.cpp, LM Studio, dan Ollama via OpenAI-compatible SSE streaming.

## Instalasi & Menjalankan Lokal

```bash
# 1. Masuk ke direktori
cd ~/Product/cahq

# 2. Install dependensi
pnpm install

# 3. Buat file konfigurasi
cp env.example .env

# 4. Jalankan mode pengembangan
pnpm dev
```

Buka di browser: `http://localhost:5173` (dev) atau `http://localhost:3001` (server).

## Standar Desain

- **Framework:** Vanilla JavaScript, Three.js, Express, Vite.
- **Design Tokens:** CAUI Ark UI Tokens (`#0A0A0C` background, `#121217` card surface, `#272732` borders, `#2563EB` Royal Blue).
- **Lisensi & Hak Cipta:** Hak cipta © 2026 Cecep Saeful Azhar Hidayat, ST / Fathforce.
