# PersonaPage - Professional Portfolio

Aplikasi portfolio modern yang dibangun dengan Next.js, Tailwind CSS, dan Firebase Studio.

## Panduan Push ke GitHub
Gunakan perintah berikut di terminal Anda untuk mengirim kode ini ke repositori Anda:

```bash
git init
git remote add origin https://github.com/ImatAbuKamal/Personal-Page.git
git add .
git commit -m "Initial commit - PersonaPage Portfolio"
git branch -M main
git push -u origin main
```

## Cara Hosting (Deployment)

Aplikasi ini dapat dihosting di berbagai platform. Berikut adalah panduan untuk dua pilihan utama:

### 1. Firebase App Hosting (Rekomendasi)
Sangat cocok untuk integrasi otomatis dengan GitHub.
*   **Hubungkan ke GitHub**: Setelah melakukan push ke GitHub, buka [Firebase Console](https://console.firebase.google.com/).
*   **Setup**: Pilih **App Hosting** dan hubungkan repositori `ImatAbuKamal/Personal-Page`. Firebase akan mendeteksi pengaturan Next.js secara otomatis.

### 2. Hostinger (Node.js Hosting / VPS)
Jika Anda menggunakan layanan Hostinger, ikuti langkah-langkah ini:

#### Persiapan File:
1.  Jalankan perintah build secara lokal: `npm run build`.
2.  Pastikan folder `.next`, `public`, `package.json`, dan `next.config.ts` siap diunggah.

#### Melalui Panel Hostinger (Node.js):
1.  Buka **hPanel** Hostinger Anda.
2.  Cari menu **Node.js** dan buat aplikasi baru.
3.  Unggah semua file proyek Anda.
4.  Atur **Environment Variables**: Tambahkan `APP_SCRIPT_URL` jika menggunakan backend eksternal.
5.  Jalankan **npm install** dan tentukan **Start Command**: `npm start`.

#### Melalui VPS Hostinger:
1.  Hubungkan ke VPS via SSH.
2.  Install Node.js dan PM2.
3.  Clone repositori: `git clone https://github.com/ImatAbuKamal/Personal-Page.git`.
4.  Jalankan `npm install` dan `npm run build`.
5.  Gunakan PM2: `pm2 start npm --name "portfolio" -- start`.

## Fitur Unggulan
- **Responsive Layout**: Menggunakan Container Queries (@3xl, @5xl, @7xl) sesuai standar Tailwind CSS terbaru.
- **Marquee Title**: Teks berjalan pada bagian Home untuk kesan dinamis.
- **Smooth Animations**: Animasi halus pada setiap section (About, Gallery, Contact).
- **Modern UI**: Menggunakan komponen ShadCN dengan palet warna profesional.
