# PersonaPage - Professional Portfolio

Aplikasi portfolio modern yang dibangun dengan Next.js, Tailwind CSS, dan Firebase Studio.

## Panduan Push ke GitHub (Solusi Error Autentikasi)

Jika Anda mendapatkan error `Invalid username or token`, itu karena GitHub memerlukan **Personal Access Token (PAT)**, bukan password akun.

### Cara Mengatasi:
1.  Buka GitHub -> **Settings** -> **Developer Settings** -> **Personal Access Tokens** -> **Tokens (classic)**.
2.  Klik **Generate new token (classic)**, beri nama (misal: "Studio Push"), centang `repo`, dan simpan token tersebut.
3.  Di terminal, jalankan perintah berikut:

```bash
# Hapus remote lama jika ada typo
git remote remove origin

# Tambahkan remote yang benar
git remote add origin https://github.com/ImatAbuKamal/Personal-Page.git

# Saat diminta password, masukkan TOKEN yang baru saja Anda buat
git add .
git commit -m "Initial commit - PersonaPage Portfolio"
git branch -M main
git push -u origin main
```

## Cara Hosting (Deployment)

### 1. Firebase App Hosting (Rekomendasi)
*   **Hubungkan ke GitHub**: Setelah push berhasil, buka [Firebase Console](https://console.firebase.google.com/).
*   **Setup**: Pilih **App Hosting** dan hubungkan repositori `ImatAbuKamal/Personal-Page`.

### 2. Hostinger (Node.js / VPS)
*   **Node.js Hosting**: Gunakan fitur **Node.js** di hPanel, unggah file, jalankan `npm install`, lalu `npm run build` dan `npm start`.
*   **VPS**: Clone repo, install Node.js/PM2, lalu jalankan `pm2 start npm --name "portfolio" -- start`.

## Fitur & Standar UI
- **Responsive Layout**: Menggunakan Container Queries (@3xl, @5xl, @7xl) sesuai standar Tailwind CSS v4.
- **Marquee Title**: Judul dinamis pada bagian Hero.
- **Animasi**: Transisi halus pada section About, Gallery, dan Contact.
- **Modern UI**: Menggunakan palet warna profesional (Primary: #575785, Accent: #59C0E8).
