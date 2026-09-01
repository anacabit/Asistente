// Asistente — Service Worker v1
const CACHE = 'asistente-v1';
const ARCHIVOS = [
  '/Asistente/',
  '/Asistente/index.html',
  '/Asistente/manifest.json',
  '/Asistente/icon-192.png',
  '/Asistente/icon-512.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(ARCHIVOS).catch(function(){});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k){ return k !== CACHE; })
            .map(function(k){ return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).catch(function(){ return cached; });
    })
  );
});
