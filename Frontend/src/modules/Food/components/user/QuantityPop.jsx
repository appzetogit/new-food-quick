import { useEffect, useRef } from "react"

/** A quantity that hops when it changes: up when adding, down when taking away. */
export default function QuantityPop({ value, className = "" }) {
  const ref = useRef(null)
  const previous = useRef(value)

  useEffect(() => {
    const from = previous.current
    previous.current = value
    if (from === value || !ref.current?.animate) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
    const y = value > from ? 12 : -12
    ref.current.animate(
      [{ transform: `translateY(${y}px)`, opacity: 0 }, { transform: "translateY(0) scale(1.25)", opacity: 1, offset: 0.6 }, { transform: "none" }],
      { duration: 260, easing: "ease-out" },
    )
  }, [value])

  return <span ref={ref} className={`inline-block tabular-nums ${className}`}>{value}</span>
}
