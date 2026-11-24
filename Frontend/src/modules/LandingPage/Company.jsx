import { Mail, Phone } from 'lucide-react'
import { ABOUT, BRAND, COMPANY, OWNER, PLANS, PHOTOS, photo } from './content'

/**
 * Company description, About, the owner and what comes next.
 * The owner and plans appear only once content.js holds real details.
 */
export default function Company({ wrap, title }) {
  return (
    <section id="about" className="scroll-mt-20 bg-white py-14 sm:py-20">
      <div className={wrap}>
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
          <div>
            <h2 className={`lp-reveal ${title}`}>One app for meals and groceries</h2>
            <p className="lp-reveal mt-4 text-lg leading-relaxed text-slate-600">{COMPANY}</p>
          </div>
          <div className="lp-reveal lp-grow rounded-[28px]">
            <img src={photo(PHOTOS.table, 900, 600)} alt="Plates of food on a table" loading="lazy" className="h-64 w-full object-cover sm:h-80" />
          </div>
        </div>

        <h3 className="lp-reveal mt-16 text-2xl font-extrabold tracking-tight text-[#061a5c] sm:text-3xl">About {BRAND}</h3>
        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {ABOUT.map((a, i) => (
            <li key={a.title} style={{ '--i': i }} className="lp-reveal rounded-3xl bg-[#f0fbe0] p-7">
              <h4 className="text-lg font-bold text-[#061a5c]">{a.title}</h4>
              <p className="mt-2 text-slate-700">{a.text}</p>
            </li>
          ))}
        </ul>

        {OWNER.name && (
          <div className="lp-reveal mt-16 overflow-hidden rounded-[28px] bg-[#061a5c] text-white sm:flex">
            {OWNER.photo && <img src={OWNER.photo} alt={OWNER.name} loading="lazy" className="h-72 w-full object-cover sm:h-auto sm:w-72" />}
            <div className="p-8 sm:p-10">
              <h3 className="text-2xl font-extrabold sm:text-3xl">{OWNER.name}</h3>
              {OWNER.role && <p className="mt-1 font-bold text-[#b6f23c]">{OWNER.role}</p>}
              {OWNER.bio && <p className="mt-4 max-w-2xl leading-relaxed text-blue-100">{OWNER.bio}</p>}
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                {OWNER.phone && <a href={`tel:${OWNER.phone.replace(/s/g, "")}`} className="inline-flex items-center gap-2"><Phone aria-hidden className="h-4 w-4" />{OWNER.phone}</a>}
                {OWNER.email && <a href={`mailto:${OWNER.email}`} className="inline-flex items-center gap-2"><Mail aria-hidden className="h-4 w-4" />{OWNER.email}</a>}
              </div>
            </div>
          </div>
        )}

        {PLANS.length > 0 && (
          <>
            <h3 className="lp-reveal mt-16 text-2xl font-extrabold tracking-tight text-[#061a5c] sm:text-3xl">What comes next</h3>
            <ul className="mt-6 grid gap-5 md:grid-cols-3">
              {PLANS.map((p, i) => (
                <li key={p.title} style={{ '--i': i % 3 }} className="lp-reveal rounded-3xl border-2 border-[#59c414]/30 p-7">
                  {p.when && <p className="text-sm font-bold text-[#2a8500]">{p.when}</p>}
                  <h4 className="mt-1 text-lg font-bold text-[#061a5c]">{p.title}</h4>
                  <p className="mt-2 text-slate-600">{p.text}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  )
}
