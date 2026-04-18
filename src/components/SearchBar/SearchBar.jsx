import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Loader2, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import '../Hero/Hero.css'

const PHOTON_BBox = '68.1,6.5,97.4,35.7'

export default function SearchBar() {
  const navigate = useNavigate()
  const searchIcon =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='m20 20-3.5-3.5'/%3E%3C/svg%3E"

  const dropdownConfig = [
    {
      id: 'budget',
      label: 'Budget',
      options: ['Below 75 lacs', '75 lacs - 1 cr', '1 - 1.5 cr', 'Beyond 1.5 cr'],
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      options: ['Residential', 'Commercial'],
    },
    {
      id: 'possession',
      label: 'Possession Status',
      options: ['Pre Construction', 'Ready To Move', 'Under Construction'],
    },
  ]

  /* ── search state ──────────────────────────────────────── */
  const [query, setQuery]               = useState('')
  const [suggestions, setSuggestions]   = useState([])
  const [loading, setLoading]           = useState(false)
  const [showDrop, setShowDrop]         = useState(false)
  const [activeIdx, setActiveIdx]       = useState(-1)

  /* ── filter dropdowns state ────────────────────────────── */
  const [openDropdown, setOpenDropdown]     = useState(null)
  const [selectedFilters, setSelectedFilters] = useState({})

  const wrapperRef  = useRef(null)
  const debounceRef = useRef(null)
  const abortRef    = useRef(null)

  const submitSearch = useCallback((value) => {
    const location = value.trim()
    if (!location) return

    navigate(`/properties?location=${encodeURIComponent(location)}`)
  }, [navigate])

  /* ── fetch from Photon ─────────────────────────────────── */
  const fetchSuggestions = useCallback(async (q) => {
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    try {
      const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=6&lang=en&bbox=${PHOTON_BBox}`
      const res  = await fetch(url, { signal: controller.signal })
      const data = await res.json()

      const results = (data.features || [])
        .filter(f => f.properties?.country === 'India')
        .map(f => {
          const p = f.properties
          return {
            city:    p.city || p.name || '',
            state:   p.state || '',
            pincode: p.postcode || '',
          }
        })
        .filter(r => r.city)

      setSuggestions(results)
      setShowDrop(true)
      setActiveIdx(-1)
    } catch (e) {
      if (e.name !== 'AbortError') setSuggestions([])
    } finally {
      setLoading(false)
    }
  }, [])

  /* ── debounced input handler ───────────────────────────── */
  const handleQueryChange = (e) => {
    const val = e.target.value
    setQuery(val)
    setActiveIdx(-1)

    clearTimeout(debounceRef.current)
    if (val.length < 2) {
      setSuggestions([])
      setShowDrop(false)
      setLoading(false)
      return
    }
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 300)
  }

  /* ── keyboard navigation ───────────────────────────────── */
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      if (!showDrop || suggestions.length === 0) return
      e.preventDefault()
      setActiveIdx(i => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      if (!showDrop || suggestions.length === 0) return
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault()
      selectSuggestion(suggestions[activeIdx])
    } else if (e.key === 'Enter') {
      e.preventDefault()
      submitSearch(query)
    } else if (e.key === 'Escape') {
      setShowDrop(false)
    }
  }

  const selectSuggestion = (s) => {
    const label = [s.city, s.state, s.pincode].filter(Boolean).join(', ')
    setQuery(label)
    setShowDrop(false)
    setSuggestions([])
    submitSearch(label)
  }

  /* ── global close on outside click / Escape ────────────── */
  useEffect(() => {
    function handlePointerDown(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenDropdown(null)
        setShowDrop(false)
      }
    }
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setOpenDropdown(null)
        setShowDrop(false)
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  /* ── filter dropdown helpers ───────────────────────────── */
  function toggleDropdown(id) {
    setOpenDropdown((current) => (current === id ? null : id))
  }

  function selectOption(id, option) {
    setSelectedFilters((current) => ({ ...current, [id]: option }))
    setOpenDropdown(null)
  }

  /* ── render ────────────────────────────────────────────── */
  return (
    <div ref={wrapperRef} className="max-w-3xl mx-auto w-full">
      {/* ── search input ── */}
      <div className="relative w-full max-w-[720px] mx-auto mb-5">
        <div className="pointer-events-none absolute inset-0 rounded-full bg-white/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_18px_45px_rgba(15,23,42,0.28)]" />

        {/* left icon */}
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
          <img src={searchIcon} alt="" className="h-5 w-5 opacity-80" aria-hidden="true" />
        </div>

        {/* right — spinner or nothing */}
        {loading && (
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none z-10">
            <Loader2 className="h-4 w-4 text-white/60 animate-spin" />
          </div>
        )}

        <input
          className="glass-input block w-full pl-14 pr-10 py-4 rounded-full text-white placeholder-white/50 text-sm"
          placeholder="Pincode, City, or State (e.g., Mumbai, Bangalore)"
          type="text"
          value={query}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && suggestions.length > 0 && setShowDrop(true)}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          autoComplete="off"
        />

        {/* ── autocomplete dropdown ── */}
        {showDrop && suggestions.length > 0 && (
          <div
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+10px)] z-50 overflow-hidden p-2"
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <p className="px-3 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
              Locations in India
            </p>
            <div className="space-y-0.5">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  role="option"
                  aria-selected={i === activeIdx}
                  type="button"
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors duration-150 ${
                    i === activeIdx ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => selectSuggestion(s)}
                >
                  <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
                  <span className="flex-1 min-w-0">
                    <span className="font-semibold text-sm text-gray-800">{s.city}</span>
                    {s.state && (
                      <span className="text-sm text-gray-400 ml-1.5">{s.state}</span>
                    )}
                  </span>
                  {s.pincode && (
                    <span className="text-[11px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full shrink-0">
                      {s.pincode}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── filter pill dropdowns ── */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[720px] mx-auto">
        {dropdownConfig.map((dropdown) => {
          const isOpen = openDropdown === dropdown.id
          const selectedValue = selectedFilters[dropdown.id]

          return (
            <div key={dropdown.id} className="relative flex-1">
              <button
                type="button"
                className="glass-btn w-full px-4 py-2 rounded-full text-white font-medium flex items-center gap-6 text-sm"
                onClick={() => toggleDropdown(dropdown.id)}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
              >
                <span className="truncate text-left">
                  {selectedValue || dropdown.label}
                </span>
                <ChevronDown
                  className={`ml-auto h-4 w-4 shrink-0 text-white/75 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div className="glass-dropdown absolute left-0 right-0 top-[calc(100%+0.7rem)] z-30 overflow-hidden rounded-[1.5rem] p-2">
                  <div className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                    {dropdown.label}
                  </div>
                  <div className="space-y-1">
                    {dropdown.options.map((option) => {
                      const isSelected = selectedValue === option
                      return (
                        <button
                          key={option}
                          type="button"
                          className={`glass-dropdown-option flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm text-white/88 transition-all duration-200 ${isSelected ? 'glass-dropdown-option-selected' : ''}`}
                          onClick={() => selectOption(dropdown.id, option)}
                        >
                          <span>{option}</span>
                          {isSelected && <Check className="h-4 w-4 text-white" aria-hidden="true" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
