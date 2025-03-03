# Presensi Pegawai Shahaba

Repositori ini berisi halaman web untuk presensi pegawai (guru dan staf) Shahaba. Halaman ini menggunakan Google Form yang di-embed dan mengambil data nama serta lokasi terkini dari perangkat pengguna. Hanya pegawai Shahaba yang diizinkan mengakses sistem ini.

## Fitur Utama

- **Google Form Embed**: Form presensi diambil dari Google Form yang di-embed ke dalam halaman web.
- **Ambil Data Nama dan Lokasi**: Sistem secara otomatis mengambil nama pengguna dan lokasi terkini dari perangkat.
- **Akses Terbatas**: Hanya pegawai Shahaba yang memiliki akses ke halaman ini.
- **Redirect setelah Submit**: Setelah mengisi form, pengguna akan diarahkan ke halaman konfirmasi.

## Cara Kerja

1. Pengguna (guru atau staf) mengakses halaman presensi.
2. Google Form yang di-embed akan dimuat.
3. Sistem mengambil data nama dan lokasi terkini dari perangkat pengguna (jika diizinkan).
4. Pengguna mengisi form presensi dan mengirimkannya.
5. Setelah form berhasil dikirim, pengguna akan diarahkan ke halaman konfirmasi.

## Struktur File

- **index.html**: File utama yang berisi embed Google Form dan script untuk redirect setelah submit.
- **README.md**: Dokumentasi proyek (file ini).

## Instalasi dan Penggunaan

1. Clone repositori ini:
   ```bash
   git clone https://github.com/username/repository-name.git
   
2. Masuk ke direktori proyek:
bash
cd repository-name

3. Buka file index.html dan sesuaikan dengan link Google Form Anda:

html
<iframe id="gform"
    src="https://docs.google.com/forms/d/e/your-google-form-id/viewform?embedded=true"
    width="100%" height="407" frameborder="0" marginheight="0" marginwidth="0">Memuat…</iframe>
Run HTML

4. Sesuaikan URL redirect setelah submit di bagian script:

javascript
document.location = "https://script.google.com/macros/s/your-google-apps-script-url/exec";

5. Host halaman web ini di server yang dapat diakses oleh pegawai Shahaba.

Cara Mengakses
1. Buka browser dan akses halaman presensi.

2. Izinkan akses lokasi saat diminta oleh browser.

3. Isi form presensi dan kirim.

Setelah berhasil dikirim, Anda akan diarahkan ke halaman konfirmasi.

Kontribusi
Kontribusi untuk proyek ini tidak dibuka untuk umum karena sifatnya yang internal. Jika Anda adalah pegawai Shahaba dan memiliki masukan, silakan hubungi tim IT.

Lisensi
Proyek ini adalah properti internal Shahaba dan tidak dilisensikan untuk penggunaan umum.

Kontak
Untuk bantuan atau pertanyaan lebih lanjut, silakan hubungi:

Tim IT Shahaba:

Email: mrifqi939@gmail.com

© 2025 Shahaba. All rights reserved.

---

### Penjelasan Tambahan:
1. **Google Form Embed**: File `index.html` meng-embed Google Form menggunakan tag `<iframe>`. Pastikan link Google Form yang digunakan sudah disesuaikan.
2. **Redirect setelah Submit**: Script JavaScript pada file `index.html` akan mengarahkan pengguna ke URL Google Apps Script setelah form berhasil dikirim. Pastikan URL tersebut sudah disesuaikan dengan skrip Google Apps Script Anda.
3. **Akses Terbatas**: Pastikan halaman web ini di-host di lingkungan yang aman dan hanya dapat diakses oleh pegawai Shahaba (misalnya, menggunakan autentikasi dasar atau sistem login internal).

Jika Anda memerlukan penyesuaian lebih lanjut, silakan beri tahu!
