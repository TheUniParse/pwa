const cacheName = 'v1'


self.addEventListener('install', () => {
  console.log('service worker: installed')
})

self.addEventListener('activate', e => {
  console.log('service worker: activated')

  // delete old chaches
  const clearPromise = caches.keys()
    .then(cacheNames => {
      const oldCaches = cacheNames.filter(c => c !== cacheName)
      const promises = oldCaches.map(cache => {
        console.log('service worker: clearing old cache')
        return caches.delete(cache)
      })

      return Promise.all(promises)
    })

  e.waitUntil(clearPromise)

})


self.addEventListener('fetch', e => {
  console.log('service worker: fetching')

  const fetchPromise = fetch(e.request)
    .then(res => {
      // Caching files
      const resClone = res.clone()
      caches
        .open(cacheName)
        .then(cache => {
          cache.put(e.request, resClone)
        })

      return res
    })
    .catch(() => {
      // Using cache on offline connection
      console.log('service worker: use offline cache')
      return caches
        .match(e.request)
        .then(res => res)
    })

  e.respondWith(fetchPromise)
})