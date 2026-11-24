import { useEffect, useRef, useState } from 'react'
import { loadLottie } from './lottieLoader.js'
import { STILLS } from './stills.jsx'

const REDUCED = '(prefers-reduced-motion: reduce)'
const prefersReduced = () => {
  try {
    return window.matchMedia(REDUCED).matches
  } catch {
    return false
  }
}

/**
 * A small brand animation. The matching still drawing holds the same box while
 * it loads, if it cannot load, and for viewers who asked for less motion.
 * Size it with className, for example "h-40 w-40".
 */
export default function LottieView({ name, loop = true, className = 'h-40 w-40', label }) {
  const stageRef = useRef(null)
  const [readyName, setReadyName] = useState(null)
  const [reduced, setReduced] = useState(prefersReduced)

  useEffect(() => {
    let query = null
    try {
      query = window.matchMedia(REDUCED)
    } catch {
      return undefined
    }
    const onChange = () => setReduced(query.matches)
    query.addEventListener?.('change', onChange)
    return () => query.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    if (reduced) return undefined
    const stage = stageRef.current
    let cancelled = false
    let anim = null
    let finished = false

    const destroy = () => {
      try {
        anim?.destroy()
      } catch { /* already gone */ }
      anim = null
      stage?.replaceChildren()
    }
    const syncPlayback = () => {
      if (!anim || finished) return
      if (document.hidden) anim.pause()
      else anim.play()
    }

    loadLottie(name)
      .then(([player, data]) => {
        if (cancelled || !stage) return
        anim = player.loadAnimation({
          container: stage,
          renderer: 'svg',
          loop,
          autoplay: false,
          // The player writes into the data it is given.
          animationData: JSON.parse(JSON.stringify(data)),
          rendererSettings: { preserveAspectRatio: 'xMidYMid meet' },
        })
        anim.addEventListener('complete', () => { finished = true })
        setReadyName(name)
        syncPlayback()
      })
      .catch(() => {
        if (cancelled) return
        destroy() // the still stays
        setReadyName(null)
      })

    document.addEventListener('visibilitychange', syncPlayback)
    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', syncPlayback)
      destroy()
      setReadyName(null)
    }
  }, [name, loop, reduced])

  const Still = STILLS[name]
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true }

  return (
    <div className={`relative shrink-0 overflow-hidden ${className}`} {...a11y}>
      {Still && (reduced || readyName !== name) && (
        <div className="absolute inset-0"><Still /></div>
      )}
      <div ref={stageRef} className="absolute inset-0" />
    </div>
  )
}
