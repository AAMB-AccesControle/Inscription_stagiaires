const CACHE_NAME = 'stagiaire-aamb-v1';
const urlsToCache = [
  './index.html',
  './manifest_stagiaire.json',
  './logo-aamb.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        urlsToCache.map(url => cache.add(url).catch(err => console.warn('Cache error:', url)))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
