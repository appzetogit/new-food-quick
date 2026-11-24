// The player and each drawing are separate chunks, fetched only when shown.
const DATA = {
  'empty-basket': () => import('./data/empty-basket.json'),
  searching: () => import('./data/searching.json'),
  'order-placed': () => import('./data/order-placed.json'),
  cooking: () => import('./data/cooking.json'),
  scooter: () => import('./data/scooter.json'),
  offline: () => import('./data/offline.json'),
}

// A missing chunk normally reloads the app (see index.jsx). A decoration must
// never do that, least of all offline or just after an order was placed.
let pending = 0
const OURS = /lottie|empty-basket|searching|order-placed|cooking|scooter|offline/i
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', (event) => {
    if (!pending) return
    const message = String(event?.payload?.message || '')
    // Safari's message carries no URL to match on.
    if (!/https?:/i.test(message) || OURS.test(message.split('/').pop())) {
      event.preventDefault()
      event.stopImmediatePropagation()
    }
  }, true)
}

const once = (load) => {
  let promise = null
  return () => {
    if (!promise) {
      pending += 1
      promise = Promise.resolve()
        .then(load)
        .then((mod) => {
          const value = mod?.default || mod
          if (!value) throw new Error('Animation chunk missing')
          return value
        })
        .catch((error) => {
          promise = null // a later mount may try again
          throw error
        })
        .finally(() => { pending -= 1 })
    }
    return promise
  }
}

const loadPlayer = once(() => import('lottie-web/build/player/lottie_light'))
const loadData = Object.fromEntries(Object.entries(DATA).map(([name, load]) => [name, once(load)]))

export const loadLottie = (name) =>
  loadData[name]
    ? Promise.all([loadPlayer(), loadData[name]()])
    : Promise.reject(new Error(`Unknown animation: ${name}`))

/** Warm the cache before a moment that should not wait for the network. */
export const preloadLottie = (name) => { loadLottie(name).catch(() => {}) }
