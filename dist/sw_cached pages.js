const cacheName = 'v1'
// must be updated each time we run "pnpm build"
const cacheAssets = [
  'index.html',
  'assets/index-d526a0c5.css',
  'assets/index-c573b36e.js',
  'vite.svg'
]

self.addEventListener('install', e => {
  console.log('service worker: installed')

  // caching files
  const cachePromise = caches.open(cacheName)
    .then(cache => {
      console.log('service worker: chaching files')
      cache.addAll(cacheAssets)
    })
    .then(() => self.skipWaiting())

  e.waitUntil(cachePromise)
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

  // use cache on offline connection
  const fetchPromise = fetch(e.request)
    .catch(() => caches.match(e.request))

  e.respondWith(fetchPromise)
})
