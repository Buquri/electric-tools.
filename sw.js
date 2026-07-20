const CACHE_NAME = 'electrocalc-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com' // თუ Tailwind CDN-ს იყენებ
];

// ინსტალაციისას ფაილების ქეშირებას აკეთებს
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// მოთხოვნისას ჯერ ქეშიდან იღებს ფაილს (Offline მუშაობისთვის)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
