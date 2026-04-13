import { useState, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Download,
  Headphones,
  Home,
  TrendingUp,
  Sparkles,
  AlignLeft,
  CheckSquare,
  MapPin,
  Tag
} from 'lucide-react'
import Navbar from '../components/Navbar/Navbar'
import properties from '../data/properties'

/* ─── Lock SVG icon ────────────────────────────────────────── */
function LockIcon({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#cccccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

/* ─── Document row ─────────────────────────────────────────── */
function DocRow({ name, meta }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[#f0f0f0] last:border-b-0">
      <div className="w-9 h-9 rounded-[10px] bg-[#f8f9fa] flex items-center justify-center shrink-0">
        <FileText size={16} color="#171717" />
      </div>
      <div className="flex-1">
        <p className="text-[13px] font-bold text-[#171717] m-0">{name}</p>
        <p className="text-[11px] text-[#999] mt-0.5 font-medium">{meta}</p>
      </div>
      <button className="text-[12px] font-semibold text-[#171717] border-[1.5px] border-[#e8e8e8] rounded-full px-3.5 py-1.5 bg-white cursor-pointer flex items-center gap-1.5 hover:bg-gray-50 transition-colors">
        <Download size={12} /> Download
      </button>
    </div>
  )
}

export default function PropertyDetails() {
  const { slug } = useParams()
  const property = properties.find((p) => p.slug === slug)
  const [requested, setRequested] = useState(false)
  const [imgIdx, setImgIdx] = useState(0)
  const [hoverIndex, setHoverIndex] = useState(null)

  if (!property) return <Navigate to="/" replace />

  /* ── Derived ─────────────────────────────────────────────── */
  const handleRequestDetails = () => {
    setRequested(true)
    setTimeout(() => {
      document.getElementById('documents')?.scrollIntoView({ behavior: 'smooth' })
    }, 60)
  }

  const next = () => setImgIdx((i) => (i + 1) % property.images.length)
  const prev = () => setImgIdx((i) => (i - 1 + property.images.length) % property.images.length)

  const description =
    `${property.title} in ${property.location} is a curated ` +
    `${property.category.toLowerCase()} opportunity with ${property.featureLine?.toLowerCase()}, ` +
    `${property.units?.toLowerCase()}, and shared units enabling intimate weddings ` +
    `and rental income. The project is structured for buyers looking for premium lifestyle ` +
    `value with professionally supported ownership.`

  const amenities = [
    ...property.highlights,
    ...(['24/7 Security', 'Concierge Service'].slice(0, Math.max(0, 6 - property.highlights.length))),
  ]

  const getCommissionRate = (priceString) => {
    if (!priceString) return '';
    const match = priceString.match(/₹([\d.]+)(L|Cr)/i);
    if (!match) return '';
    const value = parseFloat(match[1]);
    const unit = match[2].toUpperCase();

    let valueInCr = 0;
    if (unit === 'L') {
      valueInCr = value / 100;
    } else if (unit === 'CR') {
      valueInCr = value;
    }

    if (valueInCr < 0.75) {
      return '1.5%';
    } else if (valueInCr >= 0.75 && valueInCr < 1) {
      return '1%';
    } else if (valueInCr >= 1 && valueInCr <= 1.5) {
      return '0.9%';
    } else {
      return '0.75%';
    }
  }
  const commissionRate = getCommissionRate(property.price);

  /* ── Render ──────────────────────────────────────────────── */
  return (
    <>
      <Navbar alwaysSolid={true} />

      <main className="bg-[#f8f9fa] font-['Nunito_Sans'] pt-28">
        <div className="max-w-[1400px] mx-auto px-4 pb-20">

          {/* ── Breadcrumb ──────────────────────────────────── */}
          <div className="py-5 flex items-center gap-1 text-[13px] text-[#aaaaaa]">
            <Link to="/" className="text-[#aaaaaa] no-underline hover:text-gray-600 transition-colors">
              ← Back to opportunities
            </Link>
            <span className="mx-0.5">›</span>
            <span>{property.title}</span>
          </div>

          {/* ══════════════ HERO GRID ══════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-7 mb-7 items-stretch">

            {/* LEFT — Image Card */}
            <div className="relative rounded-[20px] overflow-hidden bg-[#1a1a2e] min-h-[440px]">
              {/* Placeholder gradient */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1a1a2e] via-[#2d1b4e] to-[#0f1f3d]" />

              {/* Property image */}
              <img
                src={property.images[imgIdx]}
                alt={property.title}
                className="absolute inset-0 w-full h-full object-cover z-10"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />


              {/* Top-right counter */}
              <span className="absolute top-4 right-4 z-40 bg-black/50 text-white text-[12px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                {imgIdx + 1}/{property.images.length}
              </span>

              {/* Bottom text overlay */}
              <div className="absolute bottom-16 left-5 right-5 z-40">
                <p className="text-white/70 text-[11px] font-semibold uppercase tracking-widest mb-1">
                  {property.location}
                </p>
                <p className="text-white text-[24px] font-extrabold leading-tight m-0">
                  {property.title}
                </p>
                <div className="flex gap-2 mt-3.5">
                  <span className="bg-white/20 border border-white/30 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md">
                    {property.type || 'Pre-Construction'}
                  </span>
                  <span className="bg-white/20 border border-white/30 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md">
                    {property.category || 'Residential'}
                  </span>
                </div>
              </div>

              {/* Prev / Next arrows */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-40">
                <button
                  onClick={prev}
                  className="w-[34px] h-[34px] rounded-full cursor-pointer bg-white/20 border border-white/30 text-white flex items-center justify-center backdrop-blur hover:bg-white/30 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={next}
                  className="w-[34px] h-[34px] rounded-full cursor-pointer bg-white/20 border border-white/30 text-white flex items-center justify-center backdrop-blur hover:bg-white/30 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* RIGHT — Info Card */}
            <div className="bg-white rounded-[20px] border border-[#e8e8e8] p-6 flex flex-col gap-4.5">

              {/* Location label + title */}
              <div>
                <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#aaaaaa] mb-1.5">{property.location}</p>
                <h1 className="text-[20px] font-extrabold text-[#171717] m-0 leading-tight">
                  {property.title}
                </h1>
              </div>

              {/* 3-col stat grid */}
              <div className="border border-[#e8e8e8] rounded-[12px] flex">
                {[
                  { label: 'CONFIG', value: property.config },
                  { label: 'RETURNS', value: property.investment.returns },
                  { label: 'BEST FOR', value: property.investment.bestFor },
                ].map((s, i, arr) => (
                  <div
                    key={s.label}
                    className={`flex-1 p-3 text-center ${i < arr.length - 1 ? 'border-r border-[#e8e8e8]' : ''}`}
                  >
                    <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#aaaaaa] m-0">{s.label}</p>
                    <p className="text-[13px] font-extrabold text-[#171717] mt-1 mb-0">{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Price range */}
              <div>
                <p className="text-[10px] font-semibold tracking-[0.5px] uppercase text-[#aaaaaa] mb-1">Total Price Range (Inc. 1.5% Happily Owned Fee)</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[28px] font-extrabold text-[#171717]">
                    {property.price}
                  </span>
                  
                </div>
              </div>

              {/* Agent row */}
              <div>
                <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#aaaaaa] mb-2.5">Your Agent</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full shrink-0 bg-[#171717] text-white flex items-center justify-center text-[13px] font-extrabold">
                    DK
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-bold text-[#171717] m-0">Devkaran</p>
                    <p className="text-[11px] text-[#999] mt-0.5 font-medium">Sales Director · Advisor</p>
                  </div>
                    
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-2.5">
                <button className="w-full py-3 px-4 bg-[#171717] text-white border-none rounded-[14px] cursor-pointer text-center hover:bg-black transition-colors font-['Nunito_Sans']">
                  <p className="text-[14px] font-bold m-0">Request a Tour</p>

                </button>

                <button
                  onClick={() => {
                    if (requested) {
                      document.getElementById('pricelist')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    } else {
                      handleRequestDetails()
                    }
                  }}
                  className={`w-full py-3 px-4 rounded-[14px] cursor-pointer text-[14px] font-bold transition-all duration-200 font-['Nunito_Sans'] ${requested
                      ? 'bg-[#171717] text-white border-[1.5px] border-[#171717] hover:bg-black'
                      : 'bg-white text-[#171717] border-[1.5px] border-[#e8e8e8] hover:bg-gray-50'
                    }`}
                >
                  {requested ? '→ Select a Villa' : 'Request Details'}
                </button>
              </div>

              {/* Promoted strip */}
              <div className="bg-[#f8f9fa] rounded-[12px] p-3 flex items-center gap-2.5 mt-auto">
                <div className="w-8 h-8 bg-[#171717] rounded-lg shrink-0 flex items-center justify-center">
                  <Home size={14} color="#ffffff" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#aaa] m-0">
                    Promoted by Happily Owned
                  </p>
                  <p className="text-[12px] font-bold text-[#171717] mt-0.5 mb-0">Happily Owned</p>
                  <p className="text-[11px] text-[#999] mt-px mb-0 font-medium">End-to-end ownership &amp; management</p>
                </div>
              </div>
            </div>
          </div>
          {/* ══════════════ END HERO GRID ══════════════ */}

          {/* ══════════════ BELOW-HERO GRID ══════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-7">

            {/* ─── LEFT COLUMN ─────────────────────────── */}
            <div>

              {/* ── Section Drawer Nav ──────────────────── */}
              <div className="bg-white rounded-[20px] border border-[#e8e8e8] mb-4 overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="flex min-w-max px-2">
                    {[
                      { id: 'highlights', label: 'Highlights' },
                      { id: 'pricelist', label: 'Price List' },
                      { id: 'description', label: 'About' },
                      { id: 'amenities', label: 'Amenities' },
                      { id: 'documents', label: 'Documents' },
                      { id: 'location', label: 'Location' },
                      { id: 'support', label: 'Support' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }}
                        className="px-4 py-4 text-[13px] font-semibold text-[#666] hover:text-[#171717] whitespace-nowrap border-b-2 border-transparent hover:border-[#171717] transition-all duration-200 cursor-pointer bg-transparent font-['Nunito_Sans']"
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 1 — Highlights */}
              <div id="highlights" className="bg-white rounded-[20px] border border-[#e8e8e8] p-7 mb-4">
                <div className="flex items-center gap-3 mb-4.5">
                  <div className="w-10 h-10 bg-[#171717] rounded-[12px] shrink-0 flex items-center justify-center">
                    <Sparkles size={18} color="#ffffff" />
                  </div>
                  <h2 className="text-[18px] font-extrabold text-[#171717] m-0">Highlights</h2>
                </div>
                <div className="border border-[#e8e8e8] rounded-[12px] flex overflow-hidden">
                  {[
                    { label: 'Config', value: property.config },
                    { label: 'Feature', value: property.featureLine },
                    { label: 'Units', value: property.units },
                    { label: 'Ceiling', value: property.ceiling },
                  ].map((s, i, arr) => (
                    <div
                      key={s.label}
                      className={`flex-1 p-4 text-center ${i < arr.length - 1 ? 'border-r border-[#e8e8e8]' : ''}`}
                    >
                      <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#aaaaaa] m-0">{s.label}</p>
                      <p className="text-[16px] font-extrabold text-[#171717] mt-1 mb-0">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2 — Investment Snapshot */}
              <div className="bg-white rounded-[20px] border border-[#e8e8e8] p-7 mb-4">
                <div className="flex items-center gap-3 mb-4.5">
                  <div className="w-10 h-10 bg-[#171717] rounded-[12px] shrink-0 flex items-center justify-center">
                    <TrendingUp size={18} color="#ffffff" />
                  </div>
                  <div>
                    <h2 className="text-[18px] font-extrabold text-[#171717] m-0">Investment Snapshot</h2>
                    <p className="text-[12px] text-[#999] mt-0.5 mb-0 font-medium">
                      Structured returns with hospitality-led monetization.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Investment Cards */}
                  {[
                    { title: 'Fixed Returns', value: property.investment.fixed, sub: 'Guaranteed annual yield', valSize: 'text-[28px]', valLineHeight: 'leading-none' },
                    { title: 'Variable Returns', value: property.investment.variable, sub: 'Variable on occupancy', valSize: 'text-[28px]', valLineHeight: 'leading-none' },
                    { title: 'Income Model', value: 'Shared Units', sub: 'Intimate weddings + rental income', valSize: 'text-[16px]', valLineHeight: 'leading-tight' }
                  ].map((card, idx) => {
                    const isHovered = hoverIndex === idx
                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoverIndex(idx)}
                        onMouseLeave={() => setHoverIndex(null)}
                        className={`rounded-[14px] p-4.5 cursor-default transition-all duration-200 border ${isHovered
                            ? 'bg-[#ff291b] border-transparent'
                            : 'bg-white border-[#e8e8e8]'
                          }`}
                      >
                        <p className={`text-[10px] font-semibold tracking-[0.12em] uppercase m-0 transition-colors duration-200 ${isHovered ? 'text-white/80' : 'text-[#aaa]'}`}>{card.title}</p>
                        <p className={`${card.valSize} ${card.valLineHeight} font-extrabold mt-2 mb-1 transition-colors duration-200 ${isHovered ? 'text-white' : 'text-[#171717]'}`}>{card.value}</p>
                        <p className={`text-[11px] m-0 font-medium transition-colors duration-200 ${card.valSize === 'text-[16px]' ? 'leading-relaxed ' : ''}${isHovered ? 'text-white/75' : 'text-[#999]'}`}>{card.sub}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Card 3 — Description */}
              <div id="description" className="bg-white rounded-[20px] border border-[#e8e8e8] p-7 mb-4">
                <div className="flex items-center gap-3 mb-4.5">
                  <div className="w-10 h-10 bg-[#171717] rounded-[12px] shrink-0 flex items-center justify-center">
                    <AlignLeft size={18} color="#ffffff" />
                  </div>
                  <h2 className="text-[18px] font-extrabold text-[#171717] m-0">Description</h2>
                </div>
                <p className="text-[14px] text-[#555] leading-[1.85] m-0 font-normal">
                  {description}
                </p>
              </div>

              {/* Card 4 — Amenities */}
              <div id="amenities" className="bg-white rounded-[20px] border border-[#e8e8e8] p-7 mb-4">
                <div className="flex items-center gap-3 mb-4.5">
                  <div className="w-10 h-10 bg-[#171717] rounded-[12px] shrink-0 flex items-center justify-center">
                    <CheckSquare size={18} color="#ffffff" />
                  </div>
                  <h2 className="text-[18px] font-extrabold text-[#171717] m-0">Amenities</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {amenities.map((item) => (
                    <div
                      key={item}
                      className="bg-[#f8f9fa] rounded-[12px] py-3.5 px-4 flex items-center gap-2.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#ff291b] shrink-0" />
                      <span className="text-[13px] font-bold text-[#171717]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 4b — Price List */}
              <div id="pricelist" className="bg-white rounded-[20px] border border-[#e8e8e8] p-7 mb-4">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#171717] rounded-[12px] shrink-0 flex items-center justify-center">
                    <Tag size={18} color="#ffffff" />
                  </div>
                  <h2 className="text-[18px] font-extrabold text-[#171717] m-0">Price List</h2>
                </div>
                <div className="rounded-[14px] border border-[#e8e8e8] overflow-hidden">
                  {/* Table header */}
                  <div className="grid grid-cols-[1fr_130px_140px] bg-[#f8f9fa] px-5 py-3 border-b border-[#e8e8e8]">
                    <span className="text-[11px] font-semibold text-[#aaa] uppercase tracking-[0.1em]">Unit Type</span>
                    <span className="text-[11px] font-semibold text-[#aaa] uppercase tracking-[0.1em]">Area</span>
                    <span className="text-[11px] font-semibold text-[#aaa] uppercase tracking-[0.1em]">Price</span>
                  </div>
                  {[
                    { type: 'Luxury Pool Villa', area: '3,200 sq.ft', price: '₹45L', tag: 'Standard' },
                    { type: 'Luxury Pool Villa', area: '3,400 sq.ft', price: '₹47L', tag: 'Standard' },
                    { type: 'Premium Pool Villa', area: '3,600 sq.ft', price: '₹49L', tag: 'Premium' },
                    { type: 'Premium Pool Villa', area: '3,800 sq.ft', price: '₹50L', tag: 'Premium' },
                    { type: 'Grand Villa', area: '4,000 sq.ft', price: '₹51L', tag: 'Grand' },
                    { type: 'Grand Villa', area: '4,200 sq.ft', price: '₹52L', tag: 'Grand' },
                    { type: 'Grand Villa (Corner)', area: '4,400 sq.ft', price: '₹52L', tag: 'Grand' },
                    { type: 'Signature Villa', area: '4,800 sq.ft', price: 'Price on Request', tag: 'Signature' },
                    { type: 'Signature Villa (Lake View)', area: '5,200 sq.ft', price: 'Price on Request', tag: 'Signature' },
                  ].map((row, i, arr) => {
                    const tagColors = {
                      Standard: 'bg-[#f0f0f0] text-[#555]',
                      Premium: 'bg-[#fff3e0] text-[#e07000]',
                      Grand: 'bg-[#e8f5e9] text-[#1a7a40]',
                      Signature: 'bg-[#171717] text-white',
                    }
                    return (
                      <div
                        key={i}
                        className={`grid grid-cols-[1fr_130px_140px] items-center px-5 py-4 hover:bg-[#fafafa] transition-colors ${
                          i < arr.length - 1 ? 'border-b border-[#f0f0f0]' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${tagColors[row.tag]}`}>
                            {row.tag}
                          </span>
                          <span className="text-[13px] font-bold text-[#171717]">{row.type}</span>
                        </div>
                        <span className="text-[13px] text-[#666] font-medium">{row.area}</span>
                        <span className={`text-[13px] font-extrabold ${
                          row.price === 'Price on Request' ? 'text-[#aaa] italic font-medium' : 'text-[#171717]'
                        }`}>{row.price}</span>
                      </div>
                    )
                  })}
                </div>
                <p className="text-[11px] text-[#bbb] mt-3 mb-0 font-medium">* Prices are indicative and subject to change. Contact us for the latest pricing.</p>
              </div>

              {/* Card 5 — Documents */}
              <div id="documents" className="bg-white rounded-[20px] border border-[#e8e8e8] p-7 mb-4">
                <div className="flex items-center justify-between mb-4.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#171717] rounded-[12px] shrink-0 flex items-center justify-center">
                      <FileText size={18} color="#ffffff" />
                    </div>
                    <h2 className="text-[18px] font-extrabold text-[#171717] m-0">Documents</h2>
                  </div>
                  {requested ? (
                    <span className="text-[12px] font-bold text-[#00a060] bg-[#00a060]/10 rounded-full px-3 py-1 flex items-center">
                      ✓ Unlocked
                    </span>
                  ) : (
                    <span className="text-[12px] font-bold text-[#ff291b] bg-[#ff291b]/10 rounded-full px-3 py-1 flex items-center">
                      🔒 Locked
                    </span>
                  )}
                </div>

                {requested ? (
                  /* Unlocked state */
                  <div>
                    <DocRow name="Project Brochure.pdf" meta="PDF · 2.4 MB" />
                    <DocRow name="Floor Plans.pdf" meta="PDF · 1.8 MB" />
                    <DocRow name="RERA Certificate.pdf" meta="PDF · 856 KB" />
                  </div>
                ) : (
                  /* Locked state */
                  <div className="border-2 border-dashed border-[#e8e8e8] rounded-[16px] py-9 px-6 text-center">
                    <div className="flex justify-center mb-3">
                      <LockIcon size={44} />
                    </div>
                    <p className="text-[15px] font-extrabold text-[#171717] mb-1.5 mt-0">
                      Documents are locked
                    </p>
                    <p className="text-[13px] text-[#999] mb-5 mt-0 font-medium">
                      Click "Request Details" above to access the project brochure, floor plans, and all documents.
                    </p>
                    <button
                      onClick={handleRequestDetails}
                      className="bg-[#171717] text-white border-none rounded-[12px] py-3 px-6 text-[13px] font-bold cursor-pointer hover:bg-black transition-colors font-['Nunito_Sans']"
                    >
                      Request Details to Unlock
                    </button>
                  </div>
                )}
              </div>

              {/* Card 6 — Location */}
              <div id="location" className="bg-white rounded-[20px] border border-[#e8e8e8] p-7 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#171717] rounded-[12px] shrink-0 flex items-center justify-center">
                    <MapPin size={18} color="#ffffff" />
                  </div>
                  <h2 className="text-[18px] font-extrabold text-[#171717] m-0">Location</h2>
                </div>
                <p className="text-[14px] font-bold text-[#171717] mb-3 mt-0">{property.location}</p>
                <div className="h-[160px] bg-[#f8f9fa] rounded-[14px] flex flex-col items-center justify-center relative overflow-hidden border border-[#e8e8e8]">
                  <span className="text-[36px] mb-1">📍</span>
                  <span className="text-[12px] text-[#999] font-semibold">{property.location}</span>
                </div>
              </div>

              {/* Card 7 — Support */}
              <div id="support" className="bg-white rounded-[20px] border border-[#e8e8e8] overflow-hidden mb-4">
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4.5">
                    <div className="w-10 h-10 bg-[#171717] rounded-[12px] shrink-0 flex items-center justify-center">
                      <Headphones size={18} color="#ffffff" />
                    </div>
                    <h2 className="text-[18px] font-extrabold text-[#171717] m-0">Support</h2>
                  </div>
                  <div className="bg-[#171717] rounded-[16px] p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-[12px] bg-white/10 flex items-center justify-center shrink-0">
                        <Headphones size={18} color="#ffffff" />
                      </div>
                      <div>
                        <p className="text-[14px] font-extrabold text-white m-0">24/7 Customer Support</p>
                        <p className="text-[12px] text-white/55 mt-1 mb-0 font-medium">
                          Our team is always available for you.
                        </p>
                      </div>
                    </div>
                    <button className="bg-[#ff291b] text-white border-none rounded-[10px] py-2.5 px-4.5 text-[13px] font-bold cursor-pointer shrink-0 hover:bg-[#e02418] transition-colors font-['Nunito_Sans']">
                      Get Help
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* ─── END LEFT COLUMN ─────────────────────── */}

            {/* ─── RIGHT COLUMN (sticky) ───────────────── */}
            <div className="sticky top-28 self-start">

              {/* Card C — Price Breakdown */}
              <div className="bg-white rounded-[20px] border border-[#e8e8e8] p-7 mb-4">
                <div className="flex items-center gap-3 mb-4.5">
                  <div className="w-10 h-10 bg-[#171717] rounded-[12px] shrink-0 flex items-center justify-center">
                    <Tag size={18} color="#ffffff" />
                  </div>
                  <h3 className="text-[18px] font-extrabold text-[#171717] m-0">Price Breakdown</h3>
                </div>
                {[
                  { label: 'Base Price', value: '₹45L' },
                  { label: 'Premium Units', value: '₹52L' },
                  { label: 'Booking Amount', value: '₹2L' },
                  { label: 'Possession', value: 'Dec 2026' },
                ].map((row, i, arr) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between py-2.5 ${i < arr.length - 1 ? 'border-b border-[#e8e8e8]' : ''
                      }`}
                  >
                    <span className="text-[13px] text-[#888] font-medium">{row.label}</span>
                    <span className="text-[13px] font-bold text-[#171717]">{row.value}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </main>
    </>
  )
}
