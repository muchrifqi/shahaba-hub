// fcm.js (ES module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging.js";
import { firebaseConfig } from "./firebase-config.js";

let messaging;

export const FCM = {
  async init() {
    try {
      const app = initializeApp(firebaseConfig);
      messaging = getMessaging(app);

      // Inisialisasi handler pesan foreground
      onMessage(messaging, (payload) => {
        console.log("Pesan diterima di foreground:", payload);
        if (payload.notification) {
          FCM.showNotification(payload.notification);
        }
      });

      return true;
    } catch (error) {
      console.error("Inisialisasi FCM gagal:", error);
      return false;
    }
  },

  async requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      throw new Error("Izin notifikasi ditolak.");
    }

    if (!messaging) throw new Error("Messaging belum diinisialisasi");

    const token = await getToken(messaging, {
      vapidKey: "BPBMSJHLsSwDASYDB00qO__5hp0FpKtwD0BDM_Gt1Vr-RC9dBvjHO5wxvrXz5EYTu8ZgcBtTt638WreJIGS_Ayc"
    });

    if (!token) throw new Error("Token tidak tersedia");

    return token;
  },

  showNotification(notification) {
    if (Notification.permission === "granted") {
      new Notification(notification.title, {
        body: notification.body,
        icon: notification.icon || "../assets/icons/icon-192.png",
      });
    }
  }
};
