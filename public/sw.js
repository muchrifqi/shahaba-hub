const CACHE_NAME = 'shahaba-app-v2';
const ASSETS_TO_CACHE = [
    '/',
    'index.html',
    'content/main.html',
    'src/output.css', 
    'assets/css/styles.css',
    'assets/js/script.js',
    'assets/images/background-ios-vertical-lg.png',
    'assets/images/background-vertical-lg.png',
    'assets/icons/logoshahabahub.svg',
    'assets/icons/logoshahabahub144.png'
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