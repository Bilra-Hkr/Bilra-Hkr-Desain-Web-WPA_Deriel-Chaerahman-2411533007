const CACHE_NAME = 'deriel-pwa';
const OFFLINE_URL = '/offline.html';

const CACHE_ASSETS = ['/', '/index.html', '/about.html', '/contact.html', '/offline.html', '/manifest.json', '/style.css', '/script.js', '/icons/icon-192x192.png', '/icons/icon-512x512.png'];

// Install Service Worker
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching files...');
      return cache.addAll(CACHE_ASSETS);
    })
  );

  self.skipWaiting();
});

// Aktivasi Service Worker
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activated.');

  // Hapus cache lama jika versi berubah
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)));
    })
  );

  self.clients.claim();
});

// Fetch event - menangani file request
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // file tersedia di cache, gunakan cache
      if (response) return response;

      // Jika tidak, ambil dari jaringan
      return fetch(event.request).catch(() => {
        // Jika offline dan request HTML, tampilkan offline.html
        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
      });
    })
  );
});
