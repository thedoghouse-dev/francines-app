/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'francines-app-v2';
const STATIC_ASSETS = [
  '/static/css/',
  '/static/js/',
];

// Install — skip waiting so the new SW activates immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate — delete old caches so stale HTML/JS is never served
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// Fetch strategy:
//   • HTML navigation requests  → network first, cache fallback
//     (ensures users always get the latest index.html after a deploy)
//   • Static assets (/static/)  → cache first, network fallback
//     (safe because CRA content-hashes filenames on every build)
//   • Everything else           → network only
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  // HTML navigation — always go to the network first
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Content-hashed static assets — cache first
  if (STATIC_ASSETS.some((prefix) => url.pathname.startsWith(prefix))) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        });
      })
    );
  }
});
