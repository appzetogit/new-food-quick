import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Bike, ChevronDown, Menu, Search, ShoppingBasket, Star, UtensilsCrossed, X } from 'lucide-react'
import apiClient from '@food/api'
import api from '../Taxi/shared/api/axiosInstance'
import logo from './assets/aodo-logo.webp'
import { AISLES, BRAND, CRAVINGS, FAQS, FOOD_HOME, PARTNERS, PHOTOS, STEPS, photo, searchPath } from './content'
import { BasketFill, InViewLottie, Leaves, RideLine, ScrollProgress, useCycle, useReveals, useScrolled } from './motion'
import Company from './Company'
import { Care, Closing, Features, PartnerTools, PhotoRibbon, Spotlights, TrustStrip } from './Sections'
import './landing.css'

const NAV = [
  { label: 'Food', href: '#food' },
  { label: 'Groceries', href: '#groceries' },
  { label: 'How it works', href: '#how' },
  { label: 'Features', href: '#features' },
  { label: 'About', href: '#about' },
  { label: 'Partner with us', href: '#partners' },
]

const FOCUS = 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8fdc1f]/60'
const WRAP = 'mx-auto max-w-7xl px-4 sm:px-6'
const SECTION_TITLE = 'text-2xl font-extrabold tracking-tight text-[#061a5c] sm:text-4xl'

const imageUrl = (value) => {
  const first = Array.isArray(value) ? value[0] : value
  return typeof first === 'string' ? first : first?.url || ''
}

/** A real store link, not the old in-app placeholder path. */
const storeUrl = (url) => (String(url || '').startsWith('https://') ? url : '')

/** Only what the API really returned: no placeholder names, ratings or times. */
const toCard = (r) => ({
  id: r._id || r.id,
  slug: r.slug || r._id || r.id,
  name: r.restaurantName || r.name || '',
  image: imageUrl(r.coverImages) || imageUrl(r.coverImage) || imageUrl(r.profileImage) || imageUrl(r.image),
  cuisine: Array.isArray(r.cuisines) ? r.cuisines.slice(0, 3).join(', ') : '',
  rating: Number(r.rating) > 0 ? Number(r.rating).toFixed(1) : '',
})

function Header() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled()
  return (
    <header data-scrolled={scrolled} className="lp-header sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur">
      <div className={`${WRAP} flex h-16 items-center justify-between gap-4 sm:h-20`}>
        <Link to="/" className={`flex items-center gap-2.5 rounded-xl ${FOCUS}`}>
          <img src={logo} alt="" width="48" height="48" className="h-11 w-11 sm:h-12 sm:w-12" />
          <span className="text-2xl font-extrabold tracking-tight text-[#061a5c]">{BRAND}</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={`rounded text-sm font-semibold text-slate-600 hover:text-[#061a5c] ${FOCUS}`}>{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to={`${FOOD_HOME}/auth/login`} className={`lp-press rounded-full bg-[#061a5c] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0b2a8f] ${FOCUS}`}>Log in</Link>
          <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)} className={`rounded-full p-2.5 text-[#061a5c] lg:hidden ${FOCUS}`}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-3 font-semibold text-slate-700">{n.label}</a>
          ))}
        </nav>
      )}
      <ScrollProgress />
    </header>
  )
}

const SEARCH_WORDS = CRAVINGS.map((c) => c.name.toLowerCase())

function Hero() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [focused, setFocused] = useState(false)
  const word = useCycle(SEARCH_WORDS, focused || q !== '')
  const submit = (e) => {
    e.preventDefault()
    navigate(q.trim() ? searchPath(q.trim()) : FOOD_HOME)
  }
  return (
    <section className="relative overflow-hidden bg-[#061a5c] text-white">
      {/* the leaf from the logo, as a sweep behind the headline */}
      <svg aria-hidden viewBox="0 0 1200 400" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-1/2 w-full">
        <path className="lp-sway lp-sway--slow" d="M0 400 C 260 120 640 40 1200 190 L1200 400 Z" fill="#0c2fa3" />
        <path className="lp-sway" d="M0 400 C 320 230 700 170 1200 290 L1200 400 Z" fill="#59c414" />
      </svg>
      <Leaves />
      <div className={`${WRAP} relative pb-14 pt-12 sm:pb-20 sm:pt-20`}>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="lp-in text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
            Dinner or groceries?<br /><span className="text-[#b6f23c]">Get both from {BRAND}.</span>
          </h1>
          <p style={{ '--i': 1 }} className="lp-in mx-auto mt-4 max-w-xl text-base text-blue-100 sm:text-lg">
            Restaurant meals and fresh essentials from places near you, brought to your door.
          </p>
          <form onSubmit={submit} role="search" style={{ '--i': 2 }} className="lp-in mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-full bg-white p-2 shadow-2xl">
            <Search aria-hidden className="ml-3 h-5 w-5 shrink-0 text-slate-400" />
            <span className="relative min-w-0 flex-1">
              {!q && (
                <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center gap-1 overflow-hidden whitespace-nowrap text-left text-base text-slate-500">
                  Search <span key={word} className="lp-word inline-block font-semibold text-[#061a5c]">{word}</span>
                </span>
              )}
              <input value={q} onChange={(e) => setQ(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} aria-label="Search dishes or restaurants" className="w-full bg-transparent py-2 text-base text-slate-900 outline-none" />
            </span>
            <button type="submit" className={`lp-press rounded-full bg-[#b6f23c] px-5 py-3 text-sm font-extrabold text-[#061a5c] hover:bg-[#a4e02b] sm:px-7 ${FOCUS}`}>Search</button>
          </form>
        </div>
        <div className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-2 md:gap-6">
          <div style={{ '--i': 3 }} className="lp-in relative h-60 overflow-hidden rounded-[28px] shadow-xl sm:h-72">
            <img src={photo(PHOTOS.thali, 900, 600)} alt="Bowls of Indian curries with rice" className="lp-zoom h-full w-full object-cover" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <span>
                <UtensilsCrossed aria-hidden className="mb-2 h-6 w-6 text-[#b6f23c]" />
                <span className="block text-2xl font-extrabold sm:text-3xl">Order food</span>
                <span className="block text-sm text-white/85">From restaurants near you</span>
              </span>
            </span>
          </div>
          <div style={{ '--i': 4 }} className="lp-in relative h-60 overflow-hidden rounded-[28px] shadow-xl sm:h-72">
            <img src={photo(PHOTOS.produce, 900, 600)} alt="Shelves of fresh fruit and vegetables" className="lp-zoom h-full w-full object-cover" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <span>
                <ShoppingBasket aria-hidden className="mb-2 h-6 w-6 text-[#b6f23c]" />
                <span className="block text-2xl font-extrabold sm:text-3xl">Shop groceries</span>
                <span className="block text-sm text-white/85">Fresh and everyday essentials</span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Cravings() {
  return (
    <section id="food" className="scroll-mt-20 bg-white py-14 sm:py-20">
      <div className={WRAP}>
        <div className="flex items-end justify-between gap-4">
          <h2 className={`lp-reveal ${SECTION_TITLE}`}>What are you craving?</h2>
          <Link to={FOOD_HOME} className={`shrink-0 rounded text-sm font-bold text-[#2b7a00] hover:underline ${FOCUS}`}>See all food</Link>
        </div>
        <ul className="mt-8 grid grid-cols-4 gap-x-3 gap-y-6 sm:gap-6 lg:grid-cols-8">
          {CRAVINGS.map((c, i) => (
            <li key={c.name} className="lp-reveal" style={{ '--i': i % 8 }}>
              <div className="lp-pop text-center">
                <img src={photo(c.photo, 240, 240)} alt="" loading="lazy" className="aspect-square w-full rounded-full object-cover shadow-md" />
                <span className="mt-2.5 block text-xs font-bold text-slate-700 sm:text-sm">{c.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Restaurants({ items }) {
  if (!items.length) return null
  return (
    <section className="bg-slate-50 py-14 sm:py-20">
      <div className={WRAP}>
        <h2 className={`lp-reveal ${SECTION_TITLE}`}>Restaurants on {BRAND}</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((r, i) => (
            <li key={r.id} className="lp-reveal" style={{ '--i': i % 4 }}>
              <div className="lp-grow overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/70">
                <img src={r.image || photo(PHOTOS.thali, 480, 320)} alt="" loading="lazy" className="h-40 w-full object-cover" />
                <span className="block p-4">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate font-bold text-slate-900">{r.name}</span>
                    {r.rating && <span className="flex items-center gap-1 rounded-lg bg-[#2b7a00] px-1.5 py-0.5 text-xs font-bold text-white"><Star aria-hidden className="h-3 w-3 fill-current" />{r.rating}</span>}
                  </span>
                  {r.cuisine && <span className="mt-1 block truncate text-sm text-slate-500">{r.cuisine}</span>}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Groceries({ playStore, appStore }) {
  return (
    <section id="groceries" className="scroll-mt-20 bg-[#f0fbe0] py-14 sm:py-20">
      <div className={WRAP}>
        <h2 className={`lp-reveal ${SECTION_TITLE}`}>Stock up the kitchen</h2>
        <p className="mt-2 text-slate-600">Groceries and daily essentials, ordered in the {BRAND} app.</p>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {AISLES.map((a, i) => (
            <li key={a.name} style={{ '--i': i % 4 }} className="lp-reveal lp-grow overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#59c414]/15">
              <img src={photo(a.photo, 400, 300)} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <p className="relative bg-white p-3.5 text-sm font-bold text-slate-800 sm:text-base">{a.name}</p>
            </li>
          ))}
        </ul>
        <div className="lp-reveal relative mt-8 overflow-hidden rounded-[28px] bg-[#061a5c] text-white md:grid md:grid-cols-2">
          <div className="p-8 sm:p-12">
            <BasketFill photos={AISLES.slice(0, 4).map((a) => photo(a.photo, 120, 120))} />
            <h3 className="text-2xl font-extrabold sm:text-4xl">Fruit and veg, <span className="text-[#b6f23c]">picked fresh.</span></h3>
            <p className="mt-3 max-w-md text-blue-100">Fill your basket from stores near you and have it brought home.</p>
            {(playStore || appStore) ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {playStore && <a href={playStore} target="_blank" rel="noreferrer" className={`rounded-full bg-[#b6f23c] px-6 py-3 text-sm font-extrabold text-[#061a5c] ${FOCUS}`}>Get it on Android</a>}
                {appStore && <a href={appStore} target="_blank" rel="noreferrer" className={`rounded-full bg-white px-6 py-3 text-sm font-extrabold text-[#061a5c] ${FOCUS}`}>Get it on iPhone</a>}
              </div>
            ) : (
              <p className="mt-6 inline-block rounded-full bg-white/10 px-5 py-2.5 text-sm font-bold">App links coming soon</p>
            )}
          </div>
          <img src={photo(PHOTOS.fruits, 900, 600)} alt="Pineapple, papaya, citrus and other fruit" loading="lazy" className="h-56 w-full object-cover md:h-full md:min-h-[300px]" />
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 bg-white py-14 sm:py-20">
      <div className={WRAP}>
        <h2 className={`lp-reveal ${SECTION_TITLE}`}>How it works</h2>
        <RideLine />
        <ol className="mt-4 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} style={{ '--i': i * 3 }} className="lp-reveal rounded-3xl bg-slate-50 p-7">
              <div className="flex items-center justify-between">
                <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full bg-[#b6f23c] text-lg font-extrabold text-[#061a5c]">{i + 1}</span>
                <InViewLottie name={s.animation} loop={!s.once} className="-my-3 h-28 w-28" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-[#061a5c]">{s.title}</h3>
              <p className="mt-2 text-slate-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Partners() {
  return (
    <section id="partners" className="scroll-mt-20 bg-[#061a5c] py-14 text-white sm:py-20">
      <div className={WRAP}>
        <h2 className="lp-reveal text-2xl font-extrabold tracking-tight sm:text-4xl">Grow with {BRAND}</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {PARTNERS.map((p, i) => (
            <li key={p.title} style={{ '--i': i }} className="lp-reveal lp-grow flex flex-col overflow-hidden rounded-3xl bg-white text-slate-900">
              <img src={photo(p.photo, 600, 400)} alt="" loading="lazy" className="h-44 w-full object-cover" />
              <div className="relative flex flex-1 flex-col bg-white p-6">
                <h3 className="text-xl font-bold text-[#061a5c]">{p.title}</h3>
                <p className="mt-2 flex-1 text-slate-600">{p.text}</p>
                <Link to={p.to} className={`lp-press mt-5 inline-flex items-center gap-2 self-start rounded-full bg-[#061a5c] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0b2a8f] ${FOCUS}`}>{p.cta}<ArrowRight aria-hidden className="lp-arrow h-4 w-4" /></Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Faq({ items }) {
  return (
    <section className="bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className={`lp-reveal ${SECTION_TITLE}`}>Questions</h2>
        <div className="mt-6 space-y-3">
          {items.map((f) => (
            <details key={f.question} className="lp-reveal lp-faq group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
              <summary className={`flex cursor-pointer list-none items-center justify-between gap-4 rounded font-bold text-[#061a5c] [&::-webkit-details-marker]:hidden ${FOCUS}`}>
                {f.question}<ChevronDown aria-hidden className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-slate-600">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer({ settings }) {
  const { contact_email: email, contact_phone: phone, contact_address: address } = settings || {}
  const link = `rounded text-sm text-blue-100 hover:text-white ${FOCUS}`
  return (
    <footer className="bg-[#03103d] py-12 text-white">
      <div className={`${WRAP} grid gap-10 sm:grid-cols-2 lg:grid-cols-4`}>
        <div>
          <div className="flex items-center gap-2.5"><img src={logo} alt="" width="44" height="44" loading="lazy" className="h-11 w-11" /><span className="text-xl font-extrabold">{BRAND}</span></div>
          <p className="mt-3 flex items-center gap-2 text-sm text-blue-100"><Bike aria-hidden className="h-4 w-4 text-[#b6f23c]" />Food and groceries, delivered.</p>
        </div>
        <div className="flex flex-col gap-2.5">
          <h3 className="font-bold">Order</h3>
          <Link to={FOOD_HOME} className={link}>Food</Link>
          <a href="#groceries" className={link}>Groceries</a>
          <a href="#about" className={link}>About</a>
          <Link to="/support" className={link}>Help and support</Link>
        </div>
        <div className="flex flex-col gap-2.5">
          <h3 className="font-bold">Legal</h3>
          <Link to="/terms?tab=terms" className={link}>Terms of service</Link>
          <Link to="/terms?tab=privacy" className={link}>Privacy policy</Link>
          <Link to="/terms?tab=refund" className={link}>Refund policy</Link>
          <Link to="/terms?tab=cancellation" className={link}>Cancellation policy</Link>
        </div>
        {(email || phone || address) && (
          <div className="flex flex-col gap-2.5">
            <h3 className="font-bold">Contact</h3>
            {phone && <a href={`tel:${phone}`} className={link}>{phone}</a>}
            {email && <a href={`mailto:${email}`} className={link}>{email}</a>}
            {address && <p className="text-sm text-blue-100">{address}</p>}
          </div>
        )}
      </div>
      <p className={`${WRAP} mt-10 text-xs text-blue-200`}>© {new Date().getFullYear()} {BRAND}</p>
    </footer>
  )
}

export default function LandingPage() {
  const [settings, setSettings] = useState(null)
  const [restaurants, setRestaurants] = useState([])
  const pageRef = useRef(null)
  useReveals(pageRef, restaurants.length)

  useEffect(() => {
    document.title = `${BRAND} - Food and groceries, delivered`
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = `Order restaurant food and groceries from places near you with ${BRAND}.`

    let live = true
    api.get('/common/landing-page/settings')
      .then((res) => { if (live && res?.success && res?.data) setSettings(res.data) })
      .catch(() => {}) // the page stands on its own without settings
    apiClient.get('/food/restaurant/restaurants', { params: { limit: 8 } })
      .then((res) => {
        const data = res?.data?.data
        const list = Array.isArray(data) ? data : data?.restaurants
        if (live && Array.isArray(list)) setRestaurants(list.map(toCard).filter((r) => r.id && r.name).slice(0, 8))
      })
      .catch(() => {}) // the section is hidden when there is nothing to show
    return () => { live = false }
  }, [])

  const faqs = settings?.faqs?.length ? settings.faqs : FAQS

  return (
    <div ref={pageRef} className="min-h-screen overflow-x-clip bg-white text-slate-900 antialiased" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <Header />
      <main>
        <Hero />
        <TrustStrip wrap={WRAP} />
        <Cravings />
        <PhotoRibbon />
        <Restaurants items={restaurants} />
        <Spotlights wrap={WRAP} title={SECTION_TITLE} />
        <Groceries playStore={storeUrl(settings?.play_store_url)} appStore={storeUrl(settings?.app_store_url)} />
        <HowItWorks />
        <Features wrap={WRAP} title={SECTION_TITLE} />
        <Care wrap={WRAP} title={SECTION_TITLE} />
        <Company wrap={WRAP} title={SECTION_TITLE} />
        <Partners />
        <PartnerTools wrap={WRAP} />
        <Faq items={faqs} />
        <Closing wrap={WRAP} />
      </main>
      <Footer settings={settings} />
    </div>
  )
}
