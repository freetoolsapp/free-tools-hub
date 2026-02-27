// ================================================
// FREE TOOLS HUB — Service Worker
// Version: 1.0
// ================================================

const CACHE_NAME = 'freetoolshub-v1';

// Yeh files offline bhi kaam karengi
const STATIC_CACHE = [
  '/',
  '/index.html',
  '/tools.html',
  '/blog.html',
  '/style.css',
  '/header-new.css',
  '/header.js',
  '/tools.json',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.json',
];

// ── Install ──
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('FreeToolsHub SW: Caching static files');
      return cache.addAll(STATIC_CACHE);
    })
  );
  self.skipWaiting();
});

// ── Activate ──
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// ── Fetch — Network First, Cache Fallback ──
self.addEventListener('fetch', (event) => {
  // Sirf GET requests handle karo
  if (event.request.method !== 'GET') return;

  // External requests skip karo
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Successful response cache mein save karo
        if (response && response.status === 200) {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, cloned);
          });
        }
        return response;
      })
      .catch(() => {
        // Offline — cache se do
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          // Agar kuch bhi nahi mila — index.html do
          return caches.match('/index.html');
        });
      })
  );
});
