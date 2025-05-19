// NOTIFICATION SYSTEM - info.js
const NOTIF_STORAGE_KEY = "lastSeenNotif";

// Data Notifikasi (Contoh)
const notifications = [
    {
    id: "notif-005",
    title: "lagi 🗓️",
    content: "Kegiatan Jumat Ceria akan diadakan tanggal 16 Juni 2025. Jangan lupa membawa bekal dan alat gambar!",
    link: "",
    type: "event"
  },
  {
    id: "notif-004",
    title: "Jalan-Jalan lagi 🗓️",
    content: "Kegiatan Jumat Ceria akan diadakan tanggal 16 Juni 2025. Jangan lupa membawa bekal dan alat gambar!",
    link: "",
    type: "event"
  },
    {
    id: "notif-003",
    title: "Kegiatan Jalan-Jalan sebentar lagi 🗓️",
    content: "Kegiatan Jumat Ceria akan diadakan tanggal 16 Juni 2025. Jangan lupa membawa bekal dan alat gambar!",
    link: "",
    type: "event"
  },
  {
    id: "notif-002",
    title: "Kegiatan Terdekat 🗓️",
    content: "Kegiatan Jumat Ceria akan diadakan tanggal 16 Mei 2025. Jangan lupa membawa bekal dan alat gambar!",
    link: "",
    type: "event"
  },
  {
    id: "notif-001",
    title: "Kenali Aplikasi Shahaba PWA 📱",
    content: "Pelajari manfaat dan fitur Shahaba PWA agar bisa dimanfaatkan maksimal oleh orang tua dan siswa.",
    link: "https://shahaba.com/apa-itu-pwa-shahaba",
    type: "article"
  }
];

// Render Halaman Notifikasi
function renderNotificationPage() {
  const container = document.querySelector('#notifications-page .space-y-4');
  if (!container) return;

  container.innerHTML = notifications.map(notif => `
    <div class="bg-white/10 rounded-lg p-4">
      <h4 class="font-semibold text-white mb-1">${notif.title}</h4>
      <p class="text-white/80 text-sm">${notif.content}</p>
      ${notif.link ? 
        `<a href="${notif.link}" target="_blank" class="text-blue-300 text-sm underline mt-1 inline-block">Baca selengkapnya</a>` 
        : ''}
    </div>
  `).join('');

  // Tandai sudah dilihat
  markNotificationsAsSeen();
}

// Tandai notifikasi telah dilihat
function markNotificationsAsSeen() {
  if (notifications.length > 0) {
    localStorage.setItem(NOTIF_STORAGE_KEY, notifications[0].id);
    updateNotificationBadge();
  }
}

// Cek notifikasi baru
function checkNewNotifications() {
  const lastSeenId = localStorage.getItem(NOTIF_STORAGE_KEY);
  return notifications.length > 0 && notifications[0].id !== lastSeenId;
}

// Update Badge
function updateNotificationBadge() {
  const badge = document.getElementById('notif-badge');
  if (!badge) return;

  if (checkNewNotifications()) {
    badge.classList.remove('hidden', 'scale-0');
    badge.classList.add('scale-100', 'animate-pulse');
  } else {
    badge.classList.add('scale-0');
    badge.classList.remove('animate-pulse');
  }
}

// Navigasi ke halaman notifikasi
function navigateToNotifications() {
  navigateToPage('notifications-page');
  renderNotificationPage();
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash.includes('notifications-page')) {
    renderNotificationPage();
  }
  updateNotificationBadge();
});

function handleNotificationClick() {
  // Sembunyikan badge
    const badge = document.getElementById('notif-badge');
  if (badge) {
    badge.style.transform = 'scale(0)'; // Efek menghilang
    setTimeout(() => badge.classList.add('hidden'), 200);
  }
  
  // Panggil fungsi existing
  navigateToNotifications();
  
  // Update last seen (jika perlu)
  if (window.notifications) {
    localStorage.setItem('lastSeenNotif', window.notifications[0]?.id || '');
  }
}