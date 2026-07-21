const CACHE_NAME = 'electrocalc-v2'; // 👈 ყოველ ცვლილებაზე ვერსია გაზარდე (v3, v4...)

const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/script.js?v=1.1',
    '/grounding.html',
    '/about.html',
    '/manifest.json',
    '/icon-192.png'
];

// 1. ინსტალაცია - ფაილების კეშირება
self.addEventListener('install', event => {
    self.skipWaiting(); // აიძულებს ახალ Service Worker-ს მაშინვე გააქტიურდეს
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 2. აქტივაცია - ძველი კეშების ავტომატური წაშლა
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache); // შლის ყველა ძველ კეშს
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 3. FETCH - Network First (ჯერ ინტერნეტიდან ამოიღოს, თუ ონლაინაა)
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // თუ ინტერნეტი არის, განაახლოს კეში ახალი ფაილით და დააბრუნოს პასუხი
                if (response && response.status === 200 && event.request.method === 'GET') {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // თუ ინტერნეტი არ არის (Offline), წამოიღოს კეშიდან
                return caches.match(event.request);
            })
    );
});
