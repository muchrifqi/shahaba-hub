import { FCM } from './fcm.js';

// URL Google Apps Script (Pastikan ini benar)
const SPREADSHEET_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxnDHEZic-jR1kDd00srYJn8lZRfW1Jvd0yhwu_gduAZSiqtIPJSOXR4LHqHNJ115bL/exec";

async function sendTokenToSpreadsheet(token) {
  const url = `https://script.google.com/macros/s/AKfycbxnDHEZic-jR1kDd00srYJn8lZRfW1Jvd0yhwu_gduAZSiqtIPJSOXR4LHqHNJ115bL/exec?token=${encodeURIComponent(token)}&timestamp=${encodeURIComponent(new Date().toISOString())}&ua=${encodeURIComponent(navigator.userAgent)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Token sent successfully:", data);
  } catch (error) {
    console.error("Error sending token:", error);
  }
}


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
        await sendTokenToSpreadsheet(token);
      }
    } catch (error) {
      console.error('Error mengaktifkan notifikasi:', error);
      alert('Gagal mengaktifkan notifikasi: ' + error.message);
    }
  });
});
