import { MapPin, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const whatsappHref = 'https://wa.me/919999999999'

export default function PropertyCard({ property }) {
  const navigate = useNavigate()
  const {
    title,
    location,
    price,
    slug,
    type,
    images,
    cardHighlight,
    cardSpecs = [],
    priceNote,
  } = property

  return (
    <div className="bg-white rounded-[28px] overflow-hidden shadow-soft card-hover transition duration-300 group border border-gray-100">
      <div className="relative h-44 overflow-hidden">
        <img
          alt={title}
          className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-100"
          src={images?.[0]}
        />
        <div className="absolute top-3 left-3 bg-white/95 text-secondary text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-[0.2em] shadow-lg">
          {type}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-secondary/60 to-transparent" />
      </div>
      <div className="p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.02px] text-primary/70 mb-2.5">{cardHighlight}</p>
        <h3 className="font-display font-bold text-lg text-secondary mb-1.5 leading-tight">{title}</h3>
        <p className="text-text-muted text-sm mb-3.5 flex items-center">
          <MapPin className="h-4 w-4 mr-1 text-primary" aria-hidden="true" />
          {location}
        </p>
        <div className="grid gap-2 py-2.5 border-t border-b border-gray-100 mb-3.5">
          {cardSpecs.map((spec) => (
            <div key={spec} className="flex items-center gap-2.5 text-[13px] text-secondary">
              <span className="h-2 w-2 rounded-full bg-primary/80" />
              <span className="font-medium">{spec}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-end mb-3.5">
          <div>
            <p className="font-display font-bold text-xl text-secondary">{price}</p>
            <p className="mt-1 text-[13px] text-text-muted">{priceNote}</p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => navigate(`/property/${slug}`)}
            className="flex-1 justify-center py-2.5 px-4 bg-secondary text-white rounded-xl font-medium hover:bg-primary transition text-sm text-center shadow-lg shadow-secondary/10"
          >
            Explore Property
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 text-gray-600 transition hover:bg-gray-50 hover:text-secondary"
            aria-label={`WhatsApp about ${title}`}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}
