# PersonaPage - Professional Portfolio

Aplikasi portfolio modern yang dibangun dengan Next.js, Tailwind CSS, dan Firebase Studio.

## Cara Hosting (Deployment)

Aplikasi ini sangat cocok dihosting menggunakan **Firebase App Hosting**. Ikuti langkah-langkah berikut:

1.  **Hubungkan ke GitHub**:
    *   Simpan kode Anda ke dalam repositori GitHub.
2.  **Firebase Console**:
    *   Buka [Firebase Console](https://console.firebase.google.com/).
    *   Pilih atau buat proyek Firebase baru.
    *   Navigasi ke menu **App Hosting** di sidebar.
3.  **Setup Deployment**:
    *   Klik "Get Started" dan hubungkan akun GitHub Anda.
    *   Pilih repositori portfolio Anda.
    *   Firebase akan mendeteksi pengaturan Next.js secara otomatis.
4.  **Konfigurasi Tambahan**:
    *   Aplikasi ini menggunakan Google Sheets sebagai backend via `APP_SCRIPT_URL` yang sudah dikonfigurasi di `src/lib/portfolio-service.ts`. Pastikan URL tersebut tetap aktif.
5.  **Build & Deploy**:
    *   Setiap kali Anda melakukan `push` ke branch utama di GitHub, Firebase App Hosting akan membangun dan mendeploy perubahan Anda secara otomatis.

## Fitur Unggulan
- **AI Enhancement**: Gunakan fitur "AI Enhance" di bagian About untuk menyempurnakan profil Anda menggunakan Genkit.
- **Responsive Layout**: Menggunakan Container Queries untuk tampilan sempurna di semua perangkat.
- **Interactive UI**: Dilengkapi dengan teks berjalan (marquee) di home, galeri proyek, dan formulir kontak dengan validasi.
