# Proyek Frontend - Learning Management System (LMS)

Ini adalah aplikasi frontend untuk proyek tes Fullstack Developer. Aplikasi ini dibangun menggunakan Ionic/React dan berfungsi sebagai antarmuka pengguna untuk LMS, lengkap dengan autentikasi dan manajemen konten.

---

## Fitur Utama

- **Autentikasi Pengguna**: Halaman Login dan Register yang aman terhubung ke API.
- **Rute Terlindungi**: Halaman *dashboard* hanya bisa diakses setelah pengguna berhasil login.
- **Manajemen Konten (CRUD)**:
  - **Create**: Menambah data modul baru melalui form.
  - **Read**: Menampilkan daftar modul secara dinamis dari database.
  - **Update**: Mengubah data modul yang sudah ada.
  - **Delete**: Menghapus data modul dengan konfirmasi.
- **Pencarian & Pagination**: Fitur untuk mencari modul berdasarkan judul dan navigasi antar halaman.
- **Desain Responsif**: Tampilan beradaptasi dengan baik antara desktop dan mobile.
  - **Desktop**: Tampilan tiga kolom yang informatif.
  - **Mobile**: Tampilan satu kolom yang bersih dengan *Bottom Navigation Bar* untuk UX yang optimal.
- **UI Modern**: Dilengkapi dengan *loading indicator*, efek animasi, dan *pop-up* konfirmasi untuk pengalaman pengguna yang lebih baik.

---

## Tech Stack

- **Framework**: [Ionic](https://ionicframework.com/) 7 dengan [React](https://reactjs.org/) 18
- **Bahasa**: TypeScript
- **Navigasi**: React Router DOM
- **Komunikasi API**: Axios
- **Styling**: CSS Modules
- **Ikon**: Ionicons

---

## Prasyarat

- Node.js (v18 atau lebih baru)
- NPM atau Yarn
- Ionic CLI
- Server backend proyek ini harus sudah berjalan.

**➡️ [Lihat Repository Backend di Sini]()**

---

## Instalasi & Cara Menjalankan

1.  **Clone repository ini:**
    ```bash
    git clone ```

2.  **Masuk ke direktori proyek:**
    ```bash
    cd nama-folder-proyek
    ```

3.  **Install semua *dependencies*:**
    ```bash
    npm install
    ```

4.  **Konfigurasi Environment Variable**
    Buat file bernama `.env` di folder root proyek dan tambahkan baris berikut. Ini adalah URL dasar dari API backend Anda.
    ```
    VITE_API_BASE_URL=http://localhost:3000/api
    ```
    *Catatan: Anda perlu sedikit mengubah file `src/services/api.ts` untuk menggunakan variabel ini:*
    *Ubah:* `baseURL: 'http://localhost:3000/api'`
    *Menjadi:* `baseURL: import.meta.env.VITE_API_BASE_URL`

5.  **Jalankan aplikasi di mode development:**
    ```bash
    ionic serve
    ```
    Aplikasi akan terbuka secara otomatis di `http://localhost:8100`.

---

## Skrip yang Tersedia

- `ionic serve`: Menjalankan aplikasi dalam mode pengembangan.
- `ionic serve --lab`: Menjalankan aplikasi dengan preview iOS dan Android berdampingan.
- `npm run build`: Mem-build aplikasi untuk lingkungan produksi.

--

## Backend API
Aplikasi ini terhubung ke REST API yang dibuat menggunakan Node.js/Express. Silakan kunjungi repository backend di sini:
**[Repository Backend: lms-backend](https://github.com/cakcakgelo10/tes-fullstack.git)**

