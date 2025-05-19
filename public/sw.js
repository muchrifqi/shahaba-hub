const CACHE_NAME = 'shahaba-app-v3.1.4';
const ASSETS_TO_CACHE = [
    '/',
    'index.html',
    '404.html',
    'content/main.html',
    'src/output.css', 
    'assets/css/styles.css',
    'assets/js/script.js',
    'assets/images/bg_ver.webp',
    'assets/images/bg_ver_ios.webp',
    'assets/images/bg_ver_cover.webp',
    'assets/images/bg_desk_tr.webp',
    'assets/icons/icon_b144.png',
    'assets/icons/icon_b180_ios.png'
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(ASSETS_TO_CACHE))
        .catch((err) => console.error('Gagal caching:', err))
    );
  });
  
  // Fetch Strategy: Cache First, Fallback to Network
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => response || fetch(event.request))
    );
  });
  
  // Hapus cache lama saat update
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });