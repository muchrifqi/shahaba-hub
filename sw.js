const CACHE_NAME = 'shahaba-hub-v2';
const ASSETS_TO_CACHE = [
  '/index.html',
  '/pages/offline.html',
  '/pages/parent-dashboard.html',
  '/pages/jadwal.html',
  '/pages/info-gmeet.html',
  '/pages/kegiatan.html',
  '/pages/landing-ortu.html',
  '/pages/input-izin.html',
  '/assets/css/styles.css',
  '/assets/js/info.js',
  '/assets/js/install.js',
  '/assets/js/izin-pd.js',
  '/assets/js/jadwal.js',
  '/assets/js/kegiatan.js',
  '/assets/js/offline-checker.js',
  '/assets/js/parent-dashboard.js',
  '/assets/js/whatsapp.js',
  '/assets/icons/logoshahabahub.png',
  '/assets/icons/logoshahabahub.svg',
  '/assets/images/prasekolah_belajar1.png',
  '/assets/images/prasekolah_outing1.png',
  '/assets/images/sd_karya1.png',
  '/assets/images/sd_outing1.png',
];

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open(CACHE_NAME)
          .then((cache) => {
              return cache.addAll(ASSETS_TO_CACHE);
          })
          .catch((error) => {
              console.error('Failed to cache resources:', error);
          })
  );
});

// Fetch cached assets
self.addEventListener('fetch', (event) => {
  event.respondWith(
      caches.match(event.request)
          .then((response) => {
              return response || fetch(event.request);
          })
  );
});

// Update service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
      caches.keys().then((cacheNames) => {
          return Promise.all(
              cacheNames.map((cacheName) => {
                  if (!cacheWhitelist.includes(cacheName)) {
                      return caches.delete(cacheName);
                  }
              })
          );
      })
  );
});