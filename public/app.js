// Import modul dari Firebase v9 modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase config (ganti dengan milikmu)
const firebaseConfig = {
    apiKey: "AIzaSyBm_CiCwn8yZCBXM29RnvO0hnYoHNhsAIE",
    authDomain: "notifikasi-shahaba.firebaseapp.com",
    projectId: "notifikasi-shahaba",
    messagingSenderId: "306837572369",
    appId: "1:306837572369:web:a6818d93a6a9db3b37dab0"
};

// Inisialisasi Firebase dan servicenya
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const db = getFirestore(app);

// Tombol aktifkan notifikasi
document.getElementById("enable-notifications").addEventListener("click", async () => {
  try {
    const fcmToken = await getToken(messaging, {
      vapidKey: "BPBMSJHLsSwDASYDB00qO__5hp0FpKtwD0BDM_Gt1Vr-RC9dBvjHO5wxvrXz5EYTu8ZgcBtTt638WreJIGS_Ayc",
    });

    if (fcmToken) {
      console.log("Token FCM:", fcmToken);

      // Simpan token ke Firestore (dijadikan ID dokumen)
      await setDoc(doc(db, "fcmTokens", fcmToken), {
        token: fcmToken,
        userAgent: navigator.userAgent,
        updatedAt: new Date()
      });

      alert("Notifikasi diaktifkan!");
    } else {
      alert("Tidak bisa ambil token.");
    }
  } catch (err) {
    console.error("Gagal ambil token FCM:", err);
  }
});

// Terima pesan saat aplikasi aktif
onMessage(messaging, (payload) => {
  console.log("Notifikasi masuk saat app aktif:", payload);
  const { title, body } = payload.notification;
  new Notification(title, { body });
});
