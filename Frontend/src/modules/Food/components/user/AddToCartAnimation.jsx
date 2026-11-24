import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { ChevronRight, ShoppingBag } from "lucide-react"
import { useCart } from "@food/context/CartContext"

/** Pages with their own cart or checkout controls, with or without the /food prefix. */
const HIDDEN_ON = /^(\/food)?(\/user)?\/(cart|orders|account)(\/|$)/

/** Where the tapped button is now: the event stored its place and the scroll at the time. */
const currentPoint = (p) =>
  p.viewportX !== undefined
    ? { x: p.viewportX - (window.scrollX - (p.scrollX || 0)), y: p.viewportY - (window.scrollY - (p.scrollY || 0)) }
    : { x: p.x - window.scrollX, y: p.y - window.scrollY }

/**
 * One thumbnail travelling in a curve. Sideways and vertical movement run on
 * separate elements with different easing, which is what bends the path, and each
 * flight is its own element so quick taps never cut one another off.
 */
function fly(product, from, to, { rise, onDone }) {
  if (typeof Element.prototype.animate !== "function") return onDone?.()
  const size = 44
  const outer = document.createElement("div")
  const inner = document.createElement("div")
  outer.setAttribute("aria-hidden", "true")
  Object.assign(outer.style, { position: "fixed", left: `${from.x - size / 2}px`, top: `${from.y - size / 2}px`, zIndex: 10000, pointerEvents: "none" })
  Object.assign(inner.style, {
    width: `${size}px`, height: `${size}px`, borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center",
    justifyContent: "center", background: "#59c414", color: "#fff", font: "700 16px system-ui", border: "2px solid #fff",
    boxShadow: "0 8px 20px rgba(6,26,92,.3)",
  })
  if (product?.imageUrl) {
    const img = document.createElement("img")
    img.src = product.imageUrl
    img.alt = ""
    Object.assign(img.style, { width: "100%", height: "100%", objectFit: "cover" })
    img.onerror = () => img.remove()
    inner.append(img)
  } else {
    inner.textContent = (product?.name || "+").charAt(0).toUpperCase()
  }
  outer.append(inner)
  document.body.append(outer)

  const dx = to.x - from.x
  const dy = to.y - from.y
  const duration = Math.min(800, 480 + Math.hypot(dx, dy) * 0.35)
  outer.animate([{ transform: "translateX(0)" }, { transform: `translateX(${dx}px)` }], { duration, easing: "linear", fill: "forwards" })
  const path = rise
    ? [
        { transform: "translateY(0) scale(.6)", easing: "ease-out" },
        { transform: "translateY(-60px) scale(1.15)", offset: 0.28, easing: "ease-in" },
        { transform: `translateY(${dy}px) scale(.35)`, opacity: 0.9 },
      ]
    : [
        { transform: "translateY(0) scale(.5)", opacity: 1, easing: "ease-in" },
        { transform: `translateY(${dy}px) scale(.8)`, opacity: 0 },
      ]
  let finished = false
  const finish = () => {
    if (finished) return
    finished = true
    outer.remove()
    onDone?.()
  }
  inner.animate(path, { duration, fill: "forwards" }).onfinish = finish
  // A hidden tab can hold animations back; never leave the thumbnail behind.
  setTimeout(finish, duration + 400)
}

/** Counts to `value`; jumps straight there when motion is off or the tab is hidden. */
function useCountUp(value, still) {
  const [shown, setShown] = useState(value)
  const shownRef = useRef(value)
  useEffect(() => {
    const set = (v) => { shownRef.current = v; setShown(v) }
    if (still || document.hidden) {
      set(value)
      return undefined
    }
    const from = shownRef.current
    const start = performance.now()
    let frame = requestAnimationFrame(function step(now) {
      const t = Math.min(1, (now - start) / 420)
      set(t === 1 ? value : from + (value - from) * (1 - (1 - t) ** 3))
      if (t < 1) frame = requestAnimationFrame(step)
    })
    return () => cancelAnimationFrame(frame)
  }, [value, still])
  return shown
}

/**
 * The cart bar, and what flies into it. Listens to the cart on its own.
 *
 * dynamicBottom: a Tailwind bottom-* class; otherwise bottomOffset in pixels.
 */
export default function AddToCartAnimation({
  bottomOffset = 96,
  pillClassName = "",
  hideOnPages = true,
  linkTo = "/food/user/cart",
  dynamicBottom = null,
}) {
  const { items, itemCount, total, lastAddEvent, lastRemoveEvent } = useCart()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const still = useReducedMotion()
  const pillRef = useRef(null)
  const iconRef = useRef(null)
  const shownTotal = useCountUp(total, still)
  const hidden = hideOnPages && HIDDEN_ON.test(pathname)

  useEffect(() => {
    if (!lastAddEvent?.sourcePosition || still || hidden) return undefined
    // Next frame, so a bar that has only just appeared has a place to be measured.
    const frame = requestAnimationFrame(() => {
      const r = iconRef.current?.getBoundingClientRect()
      const to = r
        ? { x: r.left + r.width / 2, y: r.top + r.height / 2 }
        : { x: window.innerWidth / 2, y: window.innerHeight - bottomOffset }
      fly(lastAddEvent.product, currentPoint(lastAddEvent.sourcePosition), to, {
        rise: true,
        onDone: () =>
          iconRef.current?.animate?.(
            [{ transform: "scale(1)" }, { transform: "scale(1.35) rotate(-10deg)" }, { transform: "scale(.92) rotate(4deg)" }, { transform: "scale(1)" }],
            { duration: 420, easing: "ease-out" },
          ),
      })
    })
    return () => cancelAnimationFrame(frame)
  }, [lastAddEvent, still, hidden, bottomOffset])

  useEffect(() => {
    if (!lastRemoveEvent?.sourcePosition || still || hidden || !iconRef.current) return
    const r = iconRef.current.getBoundingClientRect()
    fly(lastRemoveEvent.product, { x: r.left + r.width / 2, y: r.top + r.height / 2 }, currentPoint(lastRemoveEvent.sourcePosition), { rise: false })
  }, [lastRemoveEvent, still, hidden])

  const thumbs = (Array.isArray(items) ? items : []).filter((i) => i?.product).slice(-3).reverse()

  return (
    <AnimatePresence>
      {itemCount > 0 && !hidden && (
        <motion.div
          initial={still ? { opacity: 0 } : { y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={still ? { opacity: 0 } : { y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          style={dynamicBottom ? undefined : { bottom: bottomOffset }}
          className={`pointer-events-none fixed inset-x-0 z-[9999] flex justify-center px-4 pb-4 transition-[bottom] duration-300 md:pb-6 ${dynamicBottom || ""}`}
        >
          <motion.button
            ref={pillRef}
            type="button"
            whileTap={still ? undefined : { scale: 0.96 }}
            onClick={() => navigate(linkTo)}
            aria-label={`View cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}, ₹${Math.round(total)}`}
            className={`pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-2xl bg-[#061a5c] px-3 py-2.5 text-left text-white shadow-[0_14px_36px_rgba(6,26,92,0.4)] ${pillClassName}`}
          >
            <span ref={iconRef} className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#b6f23c] text-[#061a5c]">
              <ShoppingBag aria-hidden className="h-5 w-5" />
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center overflow-hidden rounded-full bg-white px-1 text-[11px] font-extrabold shadow">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span key={itemCount} initial={still ? false : { y: 14 }} animate={{ y: 0 }} exit={still ? undefined : { y: -14 }} transition={{ duration: 0.22 }}>
                    {itemCount}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-base font-extrabold tabular-nums">₹{Math.round(shownTotal)}</span>
              <span className="block text-xs text-blue-100">{itemCount} {itemCount === 1 ? "item" : "items"}, before fees and taxes</span>
            </span>
            <span aria-hidden className="hidden -space-x-3 min-[380px]:flex">
              {thumbs.map(({ product }, i) => (
                <span key={product.id || i} className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-[#061a5c] bg-white text-xs font-bold text-[#061a5c]">
                  {product.imageUrl ? <img src={product.imageUrl} alt="" className="h-full w-full object-cover" /> : (product.name || "?").charAt(0).toUpperCase()}
                </span>
              ))}
            </span>
            <span aria-hidden className="flex items-center gap-0.5 text-sm font-bold">View cart<ChevronRight className="h-4 w-4" /></span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
