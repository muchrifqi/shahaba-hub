// notif.js
import { FCM } from './fcm.js';

document.addEventListener('DOMContentLoaded', async function () {
  const notifButton = document.getElementById('enable-notifications');

  if (!('serviceWorker' in navigator) || !('Notification' in window)) {
    console.error('Browser tidak mendukung Service Worker atau Notifikasi');
    notifButton.style.display = 'none';
    return;
  }

  const initialized = await FCM.init();
  if (!initialized) {
    notifButton.style.display = 'none';
    return;
  }

  notifButton.addEventListener('click', async () => {
    try {
      const token = await FCM.requestPermission();
      if (token) {
        alert('Notifikasi berhasil diaktifkan!');
        console.log('Token FCM:', token);
        // Kirim token ke server di sini jika perlu
      }
    } catch (error) {
      console.error('Error mengaktifkan notifikasi:', error);
      alert('Gagal mengaktifkan notifikasi: ' + error.message);
    }
  });
});
