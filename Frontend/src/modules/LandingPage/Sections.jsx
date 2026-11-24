import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, BadgePercent, Bike, Check, CreditCard, FileText, Gift, Headphones, Heart, Leaf, MapPin,
  ShieldCheck, ShoppingBasket, Star, Store, UtensilsCrossed, Wallet,
} from 'lucide-react'
import { AISLES, BRAND, CARE, CRAVINGS, FEATURES, PARTNER_TOOLS, SPOTLIGHTS, TRUST, VALUES, photo } from './content'
import { InViewLottie } from './motion'

const ICONS = {
  percent: BadgePercent, bike: Bike, card: CreditCard, file: FileText, gift: Gift, help: Headphones, heart: Heart, leaf: Leaf,
  map: MapPin, shield: ShieldCheck, basket: ShoppingBasket, star: Star, store: Store, food: UtensilsCrossed, wallet: Wallet,
}
const FOCUS = 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8fdc1f]/60'

function Icon({ name, className }) {
  const Glyph = ICONS[name]
  return Glyph ? <Glyph aria-hidden className={className} /> : null
}

export function TrustStrip({ wrap }) {
  return (
    <section aria-label={`Why ${BRAND}`} className="border-b border-slate-100 bg-white">
      <ul className={`${wrap} grid gap-x-6 gap-y-5 py-8 sm:grid-cols-2 lg:grid-cols-4`}>
        {TRUST.map((t, i) => (
          <li key={t.title} style={{ '--i': i }} className="lp-reveal flex items-start gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0fbe0] text-[#2a8500]"><Icon name={t.icon} className="h-5 w-5" /></span>
            <span>
              <span className="block font-bold text-[#061a5c]">{t.title}</span>
              <span className="block text-sm text-slate-600">{t.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Two rows of photos gliding past each other. Purely decorative; the lists above carry the links. */
export function PhotoRibbon() {
  const rows = [CRAVINGS.slice(0, 8), AISLES.slice(0, 8)]
  return (
    <div aria-hidden className="space-y-4 overflow-hidden bg-[#061a5c] py-8">
      {rows.map((row, r) => (
        <div key={r} className={`lp-ribbon ${r ? 'lp-ribbon--back' : ''}`}>
          {[...row, ...row].map((x, i) => (
            <span key={i} className="flex shrink-0 items-center gap-3 rounded-full bg-white/10 py-2 pl-2 pr-6 text-lg font-bold text-white">
              <img src={photo(x.photo, 120, 120)} alt="" loading="lazy" className="h-14 w-14 rounded-full object-cover" />{x.name}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export function Spotlights({ wrap, title }) {
  return (
    <section className="overflow-hidden bg-slate-50 py-14 sm:py-20">
      <div className={`${wrap} space-y-14 sm:space-y-20`}>
        {SPOTLIGHTS.map((s, i) => (
          <div key={s.title} className="grid items-center gap-7 md:grid-cols-2 md:gap-14">
            <div className={`lp-reveal ${i % 2 ? 'lp-from-right md:order-2' : 'lp-from-left'}`}>
              <div className="lp-grow rounded-[28px]">
                <img src={photo(s.photo, 900, 620)} alt={s.alt} loading="lazy" className="h-64 w-full object-cover sm:h-96" />
              </div>
            </div>
            <div>
              <h2 className={`lp-reveal ${title}`}>{s.title}</h2>
              <p className="lp-reveal mt-4 text-lg leading-relaxed text-slate-600">{s.text}</p>
              <ul className="mt-6 space-y-3">
                {s.points.map((p, n) => (
                  <li key={p} style={{ '--i': n * 2 }} className="lp-reveal flex items-start gap-3 font-medium text-slate-800">
                    <span className="lp-tick mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#b6f23c] text-[#061a5c]"><Check aria-hidden className="h-4 w-4" strokeWidth={3} /></span>
                    {p}
                  </li>
                ))}
              </ul>
              {s.to && (
                <Link to={s.to} className={`lp-press group mt-7 inline-flex items-center gap-2 rounded-full bg-[#061a5c] px-6 py-3 text-sm font-bold text-white hover:bg-[#0b2a8f] ${FOCUS}`}>
                  {s.cta}<ArrowRight aria-hidden className="lp-arrow h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Features({ wrap, title }) {
  return (
    <section id="features" className="scroll-mt-20 bg-white py-14 sm:py-20">
      <div className={wrap}>
        <h2 className={`lp-reveal ${title}`}>Everything in your {BRAND} account</h2>
        <p className="lp-reveal mt-2 max-w-2xl text-slate-600">Small things that make ordering easier, all in one place.</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <li key={f.title} style={{ '--i': i % 4 }} className="lp-reveal lp-lift rounded-3xl bg-slate-50 p-6 hover:bg-[#f0fbe0]">
              <span className="lp-lift__icon flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#2a8500] shadow-sm"><Icon name={f.icon} className="h-6 w-6" /></span>
              <h3 className="mt-5 text-lg font-bold text-[#061a5c]">{f.title}</h3>
              <p className="mt-1.5 text-slate-600">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function PartnerTools({ wrap }) {
  const [active, setActive] = useState(0)
  const tab = PARTNER_TOOLS[active]
  const onKey = (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    if (!step) return
    const next = (active + step + PARTNER_TOOLS.length) % PARTNER_TOOLS.length
    setActive(next)
    document.getElementById(`lp-tab-${next}`)?.focus()
  }
  return (
    <section className="bg-[#03103d] py-14 text-white sm:py-20">
      <div className={wrap}>
        <h2 className="lp-reveal text-2xl font-extrabold tracking-tight sm:text-4xl">The tools you work with</h2>
        <div role="tablist" aria-label="Partner type" onKeyDown={onKey} className="mt-7 flex flex-wrap gap-2">
          {PARTNER_TOOLS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              role="tab"
              id={`lp-tab-${i}`}
              aria-selected={i === active}
              aria-controls="lp-tabpanel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`lp-press rounded-full px-6 py-3 text-sm font-bold ${FOCUS} ${i === active ? 'bg-[#b6f23c] text-[#061a5c]' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              {t.name}
            </button>
          ))}
        </div>
        <div key={tab.name} id="lp-tabpanel" role="tabpanel" aria-labelledby={`lp-tab-${active}`} className="mt-8 grid gap-8 rounded-[28px] bg-white/5 p-6 sm:p-10 md:grid-cols-[1fr_1.4fr]">
          <div className="lp-in">
            <h3 className="text-xl font-extrabold sm:text-2xl">{tab.title}</h3>
            <p className="mt-3 text-blue-100">{tab.text}</p>
            <Link to={tab.to} className={`lp-press group mt-6 inline-flex items-center gap-2 rounded-full bg-[#b6f23c] px-6 py-3 text-sm font-extrabold text-[#061a5c] ${FOCUS}`}>{tab.cta}<ArrowRight aria-hidden className="lp-arrow h-4 w-4" /></Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {tab.points.map((p, i) => (
              <li key={p} style={{ '--i': i }} className="lp-in flex items-start gap-3 rounded-2xl bg-white/5 p-4 font-medium">
                <Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-[#b6f23c]" strokeWidth={3} />{p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function Care({ wrap, title }) {
  return (
    <section className="bg-[#f0fbe0] py-14 sm:py-20">
      <div className={`${wrap} grid items-center gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-14`}>
        <InViewLottie name="cooking" loop className="mx-auto h-56 w-56 sm:h-72 sm:w-72" />
        <div>
          <h2 className={`lp-reveal ${title}`}>Care at every step</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {CARE.map((c, i) => (
              <li key={c.title} style={{ '--i': i }} className="lp-reveal lp-lift rounded-3xl bg-white p-6 shadow-sm">
                <span className="lp-lift__icon inline-block text-[#2a8500]"><Icon name={c.icon} className="h-6 w-6" /></span>
                <h3 className="mt-3 text-lg font-bold text-[#061a5c]">{c.title}</h3>
                <p className="mt-1.5 text-slate-600">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function Values() {
  return (
    <ul className="mt-16 grid gap-8 md:grid-cols-3 md:gap-5">
      {VALUES.map((v, i) => (
        <li key={v.title} style={{ '--i': i * 2 }} className="lp-reveal lp-rule relative pt-6">
          <h3 className="text-xl font-extrabold text-[#061a5c]">{v.title}</h3>
          <p className="mt-2 leading-relaxed text-slate-600">{v.text}</p>
        </li>
      ))}
    </ul>
  )
}

export function Closing({ wrap }) {
  return (
    <section className="relative overflow-hidden bg-[#2a8500] py-14 text-white sm:py-20">
      <svg aria-hidden viewBox="0 0 1200 300" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-30">
        <path className="lp-sway" d="M0 300 C 300 80 700 20 1200 150 L1200 300 Z" fill="#061a5c" />
      </svg>
      <div className={`${wrap} relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center`}>
        <h2 className="lp-reveal max-w-xl text-3xl font-extrabold tracking-tight sm:text-5xl">Hungry, or out of milk? Start here.</h2>
        <div className="flex flex-wrap gap-3">
          <a href="#food" className={`lp-press rounded-full bg-[#b6f23c] px-7 py-4 font-extrabold text-[#061a5c] ${FOCUS}`}>Explore food</a>
          <a href="#groceries" className={`lp-press rounded-full bg-white px-7 py-4 font-extrabold text-[#061a5c] ${FOCUS}`}>See groceries</a>
        </div>
      </div>
    </section>
  )
}
