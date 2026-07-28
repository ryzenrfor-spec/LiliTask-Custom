const CACHE_NAME = 'yourtask-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icon.png'
];

// Install event: langsung skip waiting agar service worker baru langsung aktif
self.addEventListener('install', (e) => {
  e.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Activate event: bersihkan cache versi lama yang menumpuk
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event: tangani navigasi halaman utama dengan aman saat offline
self.addEventListener('fetch', (e) => {
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .catch(() => caches.match('./index.html') || caches.match('./'))
    );
  } else {
    e.respondWith(
      fetch(e.request)
        .then((response) => response)
        .catch(() => caches.match(e.request))
    );
  }
});
