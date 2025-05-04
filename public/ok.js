// app.js - Firebase Cloud Messaging dengan Google Spreadsheet Integration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { 
  getMessaging, 
  getToken, 
  onMessage,
  isSupported 
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging.js";

// 1. Konfigurasi Firebase (Ganti dengan konfigurasi Anda)
const firebaseConfig = {
    apiKey: "AIzaSyBm_CiCwn8yZCBXM29RnvO0hnYoHNhsAIE",
    authDomain: "notifikasi-shahaba.firebaseapp.com",
    projectId: "notifikasi-shahaba",
    messagingSenderId: "306837572369....93a6a9db3b37dab0"
};

// 2. URL Google Apps Script (Ganti dengan URL deploy Anda)
const SPREADSHEET_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxpqsNl9IXgRHbdDvAu8Qn8gktsQp-Rnj5MUZRHUHcJ4zIWGz1xTd22TJOoHQntNCer/exec";

// 3. VAPID Key (Ganti dengan key Anda)
const VAPID_KEY = "BPBMSJHLsSwDAS.....eJIGS_Ayc";

// 4. Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Fungsi utama yang akan dijalankan
async function initializeFirebaseMessaging() {
  try {
    // Cek dukungan browser
    const isFcmSupported = await isSupported();
    if (!isFcmSupported) {
      throw new Error('Browser tidak mendukung Firebase Messaging');
    }

    const messaging = getMessaging(app);

    // Handler untuk tombol aktifkan notifikasi
    document.getElementById("enable-notifications").addEventListener("click", async () => {
      await enableNotifications(messaging);
    });

    // Handler untuk notifikasi saat app terbuka
    onMessage(messaging, (payload) => {
      console.log("Message received:", payload);
      showNotification(payload.notification);
    });

    console.log("Firebase Messaging initialized");
  } catch (error) {
    console.error("Firebase initialization error:", error);
    alert(`Error: ${error.message}`);
  }
}

// Fungsi untuk mengaktifkan notifikasi
async function enableNotifications(messaging) {
  try {
    // Meminta izin notifikasi
    const permission = await Notification.requestPermission();
    
    if (permission !== 'granted') {
      throw new Error('Izin notifikasi ditolak');
    }

    // Mendapatkan FCM token
    const token = await getFCMToken(messaging);
    
    if (!token) {
      throw new Error('Gagal mendapatkan token');
    }

    // Mengirim token ke spreadsheet
    await sendTokenToSpreadsheet(token);
    
    alert("Notifikasi berhasil diaktifkan!\nToken telah disimpan.");
    
  } catch (error) {
    console.error("Enable notifications error:", error);
    alert(`Gagal: ${error.message}`);
  }
}

// Fungsi untuk mendapatkan FCM token
async function getFCMToken(messaging) {
  try {
    const token = await getToken(messaging, { 
      vapidKey: VAPID_KEY 
    });
    console.log("FCM Token:", token);
    return token;
  } catch (error) {
    console.error("Error getting FCM token:", error);
    throw error;
  }
}

// Fungsi untuk mengirim token ke Google Spreadsheet
async function sendTokenToSpreadsheet(token) {
    try {
      // Create form data to avoid CORS preflight
      const formData = new FormData();
      formData.append('token', token);
      formData.append('timestamp', new Date().toISOString());
      formData.append('userAgent', navigator.userAgent);
  
      const response = await fetch(`${SPREADSHEET_SCRIPT_URL}?nocache=${Date.now()}`, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Apps Script
        body: formData
      });
  
      // Even with no-cors, the request will still complete
      console.log('Token sent to spreadsheet');
      return true;
    } catch (error) {
      console.error('Error sending token:', error);
      throw error;
    }
  }

// Fungsi untuk menampilkan notifikasi
function showNotification({ title, body, icon }) {
  // Cek apakah browser mendukung Notifikasi
  if (!("Notification" in window)) {
    console.warn("Browser tidak mendukung notifikasi");
    return;
  }

  // Tampilkan notifikasi
  new Notification(title || "New Notification", { 
    body: body || "You have a new message",
    icon: icon || "/assets/icons/icon192.png" 
  });
}

// 5. Jalankan inisialisasi ketika DOM siap
document.addEventListener("DOMContentLoaded", () => {
  initializeFirebaseMessaging();
});