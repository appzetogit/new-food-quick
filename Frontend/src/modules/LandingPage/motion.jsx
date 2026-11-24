import { useEffect, useRef, useState } from 'react'
import LottieView from '../../shared/lottie/LottieView'

const prefersStill = () =>
  typeof window === 'undefined' || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const canObserve = () => typeof IntersectionObserver === 'function' && !prefersStill()

/**
 * Reveals every .lp-reveal inside the page as it scrolls into view, once.
 * Pieces already on screen are left alone, so nothing visible blinks out.
 * `key` re-scans when content arrives later (the restaurants).
 */
export function useReveals(rootRef, key) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || !canObserve()) return undefined
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.dataset.reveal = 'in'
        observer.unobserve(entry.target)
      }
    }, { rootMargin: '0px 0px -8% 0px' })

    root.querySelectorAll('.lp-reveal').forEach((el) => {
      if (el.dataset.reveal === 'in') return
      if (el.getBoundingClientRect().top < window.innerHeight) return
      el.dataset.reveal = ''
      observer.observe(el)
    })
    return () => {
      observer.disconnect()
      // Never leave anything hidden behind a torn-down observer.
      root.querySelectorAll('[data-reveal=""]').forEach((el) => { delete el.dataset.reveal })
    }
  }, [rootRef, key])
}

export function useScrolled() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return scrolled
}

/** Steps through `words`, resting while `paused` or when motion is not wanted. */
export function useCycle(words, paused, everyMs = 2400) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (paused || prefersStill()) return undefined
    const timer = setInterval(() => setI((n) => (n + 1) % words.length), everyMs)
    return () => clearInterval(timer)
  }, [words, paused, everyMs])
  return words[i]
}

/** Leaves from the logo, drifting down the hero. */
export function Leaves() {
  if (prefersStill()) return null
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {[8, 27, 52, 74, 91].map((left, i) => (
        <svg key={left} viewBox="0 0 24 24" className="lp-leaf absolute top-0 opacity-50" style={{ left: `${left}%`, width: 14 + (i % 3) * 6, '--i': i }}>
          <path d="M3 21C3 10 10 3 21 3c0 11-7 18-18 18Z" fill={i % 2 ? '#59c414' : '#b6f23c'} />
        </svg>
      ))}
    </div>
  )
}

/** A Lottie that is only fetched once its place is close to the screen. */
export function InViewLottie({ name, loop, className }) {
  const ref = useRef(null)
  const [near, setNear] = useState(() => typeof IntersectionObserver !== 'function')
  useEffect(() => {
    if (near || !ref.current) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setNear(true)
    }, { rootMargin: loop ? '120px' : '0px 0px -18% 0px' }) // a one-time animation waits until it is really seen
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [near, loop])
  return (
    <div ref={ref} aria-hidden className={className}>
      {near && <LottieView name={name} loop={loop} className="h-full w-full" />}
    </div>
  )
}

/** Groceries hopping into the basket, one after another. */
export function BasketFill({ photos }) {
  return (
    <div aria-hidden className="lp-basket">
      {photos.map((src, i) => (
        <img key={src} src={src} alt="" loading="lazy" className="lp-basket__item" style={{ '--i': i }} />
      ))}
      <InViewLottie name="empty-basket" className="lp-basket__basket" />
    </div>
  )
}

/** The delivery ride along "How it works". */
export function RideLine() {
  const ref = useRef(null)
  const [run, setRun] = useState(() => (canObserve() ? 'false' : undefined))
  useEffect(() => {
    if (run !== 'false' || !ref.current) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setRun('true')
    }, { threshold: 0.6 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [run])
  return (
    <div ref={ref} aria-hidden className="lp-road overflow-hidden" data-run={run}>
      <div className="lp-road__line" />
      <div className="lp-road__ride">
        <svg viewBox="0 0 92 56" fill="none">
          <rect x="6" y="10" width="26" height="22" rx="4" fill="#59c414" />
          <path d="M14 25c0-5 4-9 10-9 0 6-4 9-10 9Z" fill="#fff" />
          <path d="M12 36h34c4 0 6-2 8-6l6-14h8" stroke="#061a5c" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60 18l12 26" stroke="#061a5c" strokeWidth="5" strokeLinecap="round" />
          <path d="M34 34c0-9 3-15 9-17l7 11" stroke="#b6f23c" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="45" cy="8" r="7" fill="#061a5c" />
          <path d="M47 6h6v4h-6z" fill="#b6f23c" />
          {[20, 74].map((cx) => (
            <g key={cx} className="lp-wheel">
              <circle cx={cx} cy="46" r="8" fill="#fff" stroke="#061a5c" strokeWidth="4" />
              <path d={`M${cx} 41v10`} stroke="#061a5c" strokeWidth="2" />
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
