import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import brandLogoLight from '../../assets/images/brandLogo1.png'
import brandLogoDark from '../../assets/images/brandLogo2.png'
import './Navbar.css'

/* ─── Nav items ─────────────────────────────────────────────── */
const NAV_LINKS = ['Buy', 'Sell', 'Manage', 'About']

/* ─── Spring config — tuned for liquid bounce/settle feel ───── */
const BUBBLE_SPRING = { type: 'spring', stiffness: 380, damping: 30, mass: 0.8 }

export default function Navbar({ alwaysSolid = false }) {
  const headerRef     = useRef(null)
  const pillRef       = useRef(null)
  const linkRefs      = useRef([])
  const lastScrollYRef = useRef(0)

  const [activeIndex, setActiveIndex]   = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [scrolled, setScrolled]         = useState(false)
  const [navVisible, setNavVisible]     = useState(true)
  const solidNav = alwaysSolid || (scrolled && (navVisible || mobileOpen))

  /* ─── Framer Motion springs for bubble position & size ────── */
  const bubbleX     = useSpring(0,  BUBBLE_SPRING)
  const bubbleW     = useSpring(80, BUBBLE_SPRING)
  const bubbleScale = useSpring(1,  { type: 'spring', stiffness: 400, damping: 20 })

  /* ─── Scroll detection ───────────────────────────────────── */
  useEffect(() => {
    const threshold = 30
    const directionThreshold = 8

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollYRef.current

      setScrolled(currentScrollY > threshold)

      if (currentScrollY <= threshold) {
        setNavVisible(true)
      } else if (delta < -directionThreshold) {
        setNavVisible(true)
      } else if (delta > directionThreshold) {
        setNavVisible(false)
        setMobileOpen(false)
      }

      lastScrollYRef.current = currentScrollY
    }

    lastScrollYRef.current = window.scrollY
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* ─── Measure & animate bubble ──────────────────────────── */
  const moveBubbleTo = useCallback((idx) => {
    const el     = linkRefs.current[idx]
    const parent = pillRef.current
    if (!el || !parent) return

    const parentRect = parent.getBoundingClientRect()
    const elRect     = el.getBoundingClientRect()

    bubbleX.set(elRect.left - parentRect.left)
    bubbleW.set(elRect.width)
  }, [bubbleX, bubbleW])

  // Move bubble when active changes
  useEffect(() => {
    const t = setTimeout(() => moveBubbleTo(activeIndex), 60)
    return () => clearTimeout(t)
  }, [activeIndex, moveBubbleTo])

  // Init bubble position after mount
  useEffect(() => {
    const t = setTimeout(() => moveBubbleTo(0), 150)
    return () => clearTimeout(t)
  }, [moveBubbleTo])

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => moveBubbleTo(activeIndex)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeIndex, moveBubbleTo])

  /* ─── Hover bubble pulse ─────────────────────────────────── */
  useEffect(() => {
    if (hoveredIndex !== null && hoveredIndex !== activeIndex) {
      bubbleScale.set(1.04)
      const t = setTimeout(() => bubbleScale.set(1), 250)
      return () => clearTimeout(t)
    }
  }, [hoveredIndex, activeIndex, bubbleScale])

  return (
    <motion.header
      ref={headerRef}
      id="siteHeader"
      className="navbar-header"
      data-scrolled={scrolled ? 'true' : 'false'}
      data-solid={solidNav ? 'true' : 'false'}
      animate={{
        y: navVisible || mobileOpen ? 0 : '-120%',
        opacity: navVisible || mobileOpen ? 1 : 0,
      }}
      transition={{
        duration: 0.24,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="navbar-inner">

        {/* ── Logo ──────────────────────────────────────────── */}
        <div className="navbar-logo">
          <a
            href="/"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            aria-label="Go to home page"
            style={{ display: 'contents', cursor: 'pointer' }}
          >
            <img
              id="headerLogo"
              src={solidNav ? brandLogoDark : brandLogoLight}
              alt="Happily Owned"
              className="navbar-logo-img"
            />
          </a>
        </div>

        {/* ── Pill nav (center) ─────────────────────────────── */}
        <nav className="navbar-nav-desktop" aria-label="Main navigation">
          <div
            ref={pillRef}
            className="nav-pill"
          >
            {/* ── Liquid drop indicator ─────────────────────── */}
            <motion.span
              aria-hidden="true"
              className="nav-drop"
              style={{
                x: bubbleX,
                width: bubbleW,
                scaleX: bubbleScale,
                transformOrigin: 'center',
              }}
            />

            {/* ── Nav links ─────────────────────────────────── */}
            {NAV_LINKS.map((label, i) => (
              <motion.a
                key={label}
                ref={el => (linkRefs.current[i] = el)}
                href="#"
                role="menuitem"
                aria-current={i === activeIndex ? 'page' : undefined}
                className={`nav-pill-link ${i === activeIndex ? 'active' : ''}`}
                onClick={e => {
                  e.preventDefault()
                  setActiveIndex(i)
                }}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileTap={{ scale: 0.96 }}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </nav>

        {/* ── Right actions ─────────────────────────────────── */}
        <div className="navbar-actions">
          <a className="nav-signin" href="#">
            Sign In
          </a>

          <motion.a
            href="/#consultation"
            className="nav-cta"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Contact Us
          </motion.a>
        </div>

        {/* ── Mobile menu toggle ────────────────────────────── */}
        <div className="navbar-mobile-toggle">
          <motion.button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(o => !o)}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* ── Mobile dropdown ──────────────────────────────────── */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="navbar-mobile-dropdown"
        >
          {NAV_LINKS.map((label, i) => (
            <a
              key={label}
              href="#"
              className={`mobile-nav-link ${i === activeIndex ? 'active' : ''}`}
              onClick={e => { e.preventDefault(); setActiveIndex(i); setMobileOpen(false) }}
            >
              {label}
            </a>
          ))}
          <div className="mobile-nav-footer">
            <a className="mobile-footer-link" href="#">Sign In</a>
            <a className="mobile-footer-link bold" href="/#consultation">Contact Us</a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
