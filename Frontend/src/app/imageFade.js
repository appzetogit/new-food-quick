/**
 * Lazy images fade in as they arrive instead of popping.
 *
 * One capturing listener for the whole app ("load" does not bubble). The image is
 * never hidden beforehand, so a failure here cannot leave a picture invisible.
 */
export function installImageFade() {
  if (typeof window === 'undefined' || typeof Element.prototype.animate !== 'function') return
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')
  document.addEventListener('load', (event) => {
    const img = event.target
    if (reduced?.matches || !(img instanceof HTMLImageElement) || img.loading !== 'lazy') return
    img.animate([{ opacity: 0 }, {}], { duration: 260, easing: 'ease-out' })
  }, true)
}
