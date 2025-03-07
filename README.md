# Sistem Pembatasan Akses Berdasarkan Lokasi

## Deskripsi
Sistem ini memungkinkan akses ke suatu link (misalnya Google Form) hanya jika pengguna berada dalam radius tertentu dari lokasi yang telah ditentukan. Jika pengguna berada di luar radius, mereka akan mendapatkan pesan akses ditolak.

## Fitur Utama
- Membatasi akses berdasarkan lokasi GPS.
- Mendukung lebih dari satu lokasi yang diizinkan.
- Tampilan responsif dengan animasi loading.
- Pesan error jika GPS tidak aktif atau pengguna berada di luar area.

## Persyaratan
- Perangkat pengguna harus memiliki GPS yang aktif.
- Browser harus memberikan izin akses lokasi.
- Koneksi internet diperlukan untuk memverifikasi lokasi.

## Cara Menggunakan
1. **Buka file HTML** di browser.
2. **Tunggu sistem memeriksa lokasi Anda**.
3. Jika Anda berada dalam radius yang diizinkan, Anda akan diarahkan ke halaman yang ditentukan.
4. Jika tidak, pesan error akan ditampilkan.

## Konfigurasi
- **Mengubah Lokasi yang Diizinkan:**
  - Buka file `index.html`.
  - Edit bagian berikut dengan koordinat lokasi yang diizinkan:
    ```javascript
    const locations = [
        { lat: -6.4025, lng: 106.7942 }, // Lokasi 1
        { lat: -6.4030, lng: 106.7950 }  // Lokasi 2
    ];
    ```
- **Mengubah Radius:**
  - Sesuaikan nilai `radius` dalam kilometer. Contoh:
    ```javascript
    const radius = 0.01; // 10 meter
    ```
- **Mengubah Link Tujuan:**
  - Edit URL pada baris berikut:
    ```javascript
    window.location.href = "https:/linkanda";
    ```

## Troubleshooting
- **GPS Tidak Aktif:** Pastikan perangkat memiliki GPS yang diaktifkan.
- **Browser Tidak Memberikan Izin Lokasi:** Periksa pengaturan browser dan izinkan akses lokasi.
- **Tidak Dialihkan Meskipun Berada di Lokasi yang Benar:** Coba refresh halaman atau gunakan perangkat lain.

## Kontribusi
Jika ada perbaikan atau fitur tambahan yang ingin ditambahkan, silakan buat pull request atau hubungi tim pengembang.

## Lisensi
Proyek ini dibuat untuk penggunaan internal dan tidak untuk didistribusikan secara bebas tanpa izin.

---
Dikembangkan oleh Tim IT Muchamad Rifqi Hermawan
