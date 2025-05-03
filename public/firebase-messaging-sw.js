// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

// Config dari Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyBm_CiCwn8yZCBXM29RnvO0hnYoHNhsAIE",
  authDomain: "notifikasi-shahaba.firebaseapp.com",
  projectId: "notifikasi-shahaba",
  storageBucket: "notifikasi-shahaba.firebasestorage.app",
  messagingSenderId: "306837572369",
  appId: "1:306837572369:web:a6818d93a6a9db3b37dab0"
};

// Inisialisasi Firebase App di SW
firebase.initializeApp(firebaseConfig);

// Ambil instance messaging
const messaging = firebase.messaging();

// Menangani pesan saat service worker aktif (background)
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Menerima pesan latar belakang:', payload);

  const notificationTitle = payload.notification?.title || 'Notifikasi';
  const notificationOptions = {
    body: payload.notification?.body || 'Pesan baru diterima',
    icon: payload.notification?.icon || '/assets/icons/icon-192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
