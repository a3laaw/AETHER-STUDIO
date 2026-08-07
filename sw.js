/* ============================================================
   AURA Studio — Service Worker
   Strategy:
   - Core files precached at install (app shell).
   - Frames & assets: cache-first with runtime cache → second
     visit plays the film instantly, works offline.
   - HTML navigations: network-first, fallback to cached index
     (so admin edits are never stale forever).
   ============================================================ */
const VERSION = 'aura-v1';
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './assets/icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION)
      .then(c => c.addAll(CORE))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  /* navigations: network-first, offline fallback to app shell */
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => {
          const clone = res.clone();
          caches.open(VERSION).then(c => c.put('./index.html', clone)).catch(() => {});
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  /* assets & frames: cache-first, fill cache in background */
  e.respondWith(
    caches.match(req).then(hit => {
      if (hit) return hit;
      return fetch(req).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(VERSION).then(c => c.put(req, clone)).catch(() => {});
        }
        return res;
      });
    })
  );
});
