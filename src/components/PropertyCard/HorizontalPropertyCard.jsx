import { BadgeCheck, MapPin, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const whatsappHref = 'https://wa.me/919999999999'

export default function HorizontalPropertyCard({ property, onExplore }) {
  const navigate = useNavigate()
  const {
    title,
    location,
    price,
    slug,
    type,
    images,
    cardSpecs = [],
    priceNote,
    verified,
    city,
    state,
  } = property

  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition duration-300 hover:shadow-[0_24px_56px_rgba(15,23,42,0.12)]">
      <div className="grid lg:grid-cols-[380px_1fr]">
        <div className="relative min-h-[260px] overflow-hidden bg-slate-200 lg:h-full">
          <img
            src={images?.[0]}
            alt={title}
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-slate-900 shadow-lg">
                <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                Verified
              </span>
            )}
            <span className="rounded-full bg-slate-900/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
              {type}
            </span>
          </div>
        </div>

        <div className="flex flex-col p-5 sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                {city}, {state}
              </p>
              <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-[30px]">
                {price}
              </h2>
              <p className="mt-2 text-lg font-medium text-slate-700">{title}</p>
            </div>
            <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {priceNote}
            </span>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
            {cardSpecs.map((spec) => (
              <span key={spec} className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary/80" />
                {spec}
              </span>
            ))}
          </div>

          <div className="mb-6 flex items-start gap-2 border-t border-slate-200 pt-4 text-slate-600">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-sm leading-6">{location}</p>
          </div>

          <div className="mt-auto flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                if (onExplore) {
                  onExplore()
                  return
                }

                navigate(`/property/${slug}`)
              }}
              className="inline-flex flex-1 items-center justify-center rounded-2xl bg-secondary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary"
            >
              Explore Property
            </button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
              aria-label={`WhatsApp about ${title}`}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
