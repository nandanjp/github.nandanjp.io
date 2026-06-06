const CACHE = 'nandanjp-v1'

// Static asset extensions worth caching
const STATIC_RE = /\.(?:js|css|woff2?|png|jpg|jpeg|svg|ico|webp|gif)$/i

self.addEventListener('install', () => {
    // Activate immediately without waiting for old tabs to close
    self.skipWaiting()
})

self.addEventListener('activate', event => {
    // Remove caches from previous versions
    event.waitUntil(
        caches
            .keys()
            .then(keys =>
                Promise.all(
                    keys.filter(k => k !== CACHE).map(k => caches.delete(k))
                )
            )
            .then(() => self.clients.claim())
    )
})

self.addEventListener('fetch', event => {
    const { request } = event
    if (request.method !== 'GET') return
    if (!request.url.startsWith(self.location.origin)) return

    const url = new URL(request.url)

    // Network-first for HTML navigations — lets SSR always win when online
    if (request.mode === 'navigate') {
        event.respondWith(fetch(request).catch(() => caches.match(request)))
        return
    }

    // Cache-first for static assets
    if (STATIC_RE.test(url.pathname)) {
        event.respondWith(
            caches.match(request).then(cached => {
                if (cached) return cached
                return fetch(request).then(response => {
                    if (!response.ok) return response
                    const clone = response.clone()
                    caches.open(CACHE).then(cache => cache.put(request, clone))
                    return response
                })
            })
        )
    }
})
