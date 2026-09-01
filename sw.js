//Asistente — Service Worker v1
const CACHE = 'Asistente-v1';
const ARCHIVOS = [
  '/Asistente/',
  '/Asistente/index.html',
  '/Asistente/manifest.json',
  '/Asistente/icon-192.png',
  '/Asistente/icon-512.png'
];

// Instalar: guarda los archivos en caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ARCHIVOS).catch(() => {}))
  );
  self.skipWaiting();
});

// Activar: limpia cachés viejas
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: responde con caché si está disponible, si no va a la red
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => cached))
  );
});
