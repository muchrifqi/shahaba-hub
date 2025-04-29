const CACHE_NAME = 'shahaba-app-v2';
const ASSETS_TO_CACHE = [
  '/index.html',
  '/assets/css/styles.css',
  '/assets/js/script.js',
  '/assets/images/background-ios-vertical-lg.png',
  '/assets/images/background-vertical-lg.png',
  '/assets/icons/logoshahabahub.svg'
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