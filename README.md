# PersonaPage - Professional Portfolio

Aplikasi portfolio modern yang dibangun dengan Next.js, Tailwind CSS, dan Firebase Studio.

## Cara Hosting (Deployment)

Aplikasi ini dapat dihosting di berbagai platform. Berikut adalah panduan untuk dua pilihan utama:

### 1. Firebase App Hosting (Rekomendasi)
Sangat cocok untuk integrasi otomatis dengan GitHub.
*   **Hubungkan ke GitHub**: Simpan kode Anda ke dalam repositori GitHub.
*   **Firebase Console**: Buka [Firebase Console](https://console.firebase.google.com/), buat proyek, dan pilih **App Hosting**.
*   **Setup**: Hubungkan repositori GitHub Anda. Firebase akan mendeteksi pengaturan Next.js secara otomatis dan mendeploy setiap kali ada perubahan di GitHub.

### 2. Hostinger (Node.js Hosting / VPS)
Jika Anda menggunakan layanan Hostinger, ikuti langkah-langkah ini:

#### Persiapan File:
1.  Jalankan perintah build secara lokal: `npm run build`.
2.  Pastikan folder `.next`, `public`, `package.json`, dan `next.config.ts` siap diunggah.

#### Melalui Panel Hostinger (Node.js):
1.  Buka **hPanel** Hostinger Anda.
2.  Cari menu **Node.js** dan buat aplikasi baru.
3.  Unggah semua file proyek Anda ke direktori yang ditentukan (bisa menggunakan File Manager atau Git di hPanel).
4.  Atur **Environment Variables**: Tambahkan `APP_SCRIPT_URL` yang ada di `src/lib/portfolio-service.ts` ke pengaturan environment di hPanel.
5.  Jalankan **npm install** dan tentukan **Start Command**: `npm start`.

#### Melalui VPS Hostinger:
1.  Hubungkan ke VPS via SSH.
2.  Install Node.js dan PM2: `sudo apt install nodejs` & `npm install pm2 -g`.
3.  Clone repositori atau unggah file Anda.
4.  Jalankan `npm install` dan `npm run build`.
5.  Gunakan PM2 untuk menjalankan aplikasi: `pm2 start npm --name "portfolio" -- start`.
6.  Gunakan Nginx sebagai reverse proxy untuk mengarahkan traffic ke port aplikasi (default 3000).

## Fitur Unggulan
- **AI Enhancement**: Gunakan fitur "AI Enhance" di bagian About untuk menyempurnakan profil Anda menggunakan Genkit.
- **Responsive Layout**: Menggunakan Container Queries untuk tampilan sempurna di semua perangkat.
- **Interactive UI**: Dilengkapi dengan teks berjalan (marquee) di home, galeri proyek, dan animasi halus pada setiap section.
- **Back to Top**: Navigasi mudah kembali ke atas halaman.

## Struktur Proyek
- `src/components`: Berisi komponen UI (Hero, About, Gallery, Contact, dll).
- `src/lib`: Berisi layanan data dan utilitas.
- `src/ai`: Integrasi GenAI menggunakan Genkit.
