import { useEffect, useState } from "react"
import { MapPin, X } from "lucide-react"
import { useLocation } from "@food/hooks/useLocation"

const DISMISSED_KEY = "locationPromptDismissed"

/**
 * Offers to use the customer's location without getting in the way: a small card
 * above the bottom bar. The browser is only asked after they tap the button.
 */
export default function LocationPrompt() {
  const { location, loading, permissionGranted, requestLocation } = useLocation()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (permissionGranted || localStorage.getItem("userLocation") || localStorage.getItem(DISMISSED_KEY)) return undefined
    const timer = setTimeout(() => {
      if (!localStorage.getItem("userLocation")) setShow(true)
    }, 2500)
    return () => clearTimeout(timer)
  }, [permissionGranted])

  const close = () => {
    setShow(false)
    localStorage.setItem(DISMISSED_KEY, "true")
  }

  const allow = async () => {
    try {
      await requestLocation()
      localStorage.setItem("deliveryAddressMode", "current")
      window.dispatchEvent(new Event("deliveryAddressModeChanged"))
      close()
    } catch {
      setShow(false) // refused or unavailable: an address can be chosen from the header
    }
  }

  if (!show || (location && permissionGranted)) return null

  return (
    <aside
      aria-label="Use your location"
      className="fixed inset-x-3 bottom-24 z-40 mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-white p-3 text-slate-900 shadow-2xl ring-1 ring-slate-200 md:bottom-6 dark:bg-zinc-900 dark:text-white dark:ring-zinc-700"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0fbe0] text-[#2b7a00]"><MapPin aria-hidden className="h-5 w-5" /></span>
      <p className="min-w-0 flex-1 text-sm font-semibold">See what delivers to you</p>
      <button type="button" onClick={allow} disabled={loading} className="shrink-0 rounded-full bg-[#061a5c] px-4 py-2.5 text-xs font-bold text-white disabled:opacity-60">
        {loading ? "Finding..." : "Use my location"}
      </button>
      <button type="button" aria-label="Not now" onClick={close} className="shrink-0 rounded-full p-2 text-slate-500"><X className="h-4 w-4" /></button>
    </aside>
  )
}
