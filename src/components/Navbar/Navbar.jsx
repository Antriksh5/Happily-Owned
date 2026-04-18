import { useEffect, useRef, useState, useCallback } from 'react'
import { useClerk, useUser } from '@clerk/clerk-react'
import { motion, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import brandLogoLight from '../../assets/images/brandLogo1.png'
import brandLogoDark from '../../assets/images/brandLogo2.png'
import './Navbar.css'

/* Nav items */
const NAV_LINKS = ['Buy', 'Sell', 'Manage', 'About']

/* Spring config tuned for liquid bounce/settle feel */
const BUBBLE_SPRING = { type: 'spring', stiffness: 380, damping: 30, mass: 0.8 }

export default function Navbar({ alwaysSolid = false }) {
  const clerk = useClerk()
  const { isSignedIn, user } = useUser()
  const navigate = useNavigate()
  const headerRef = useRef(null)
  const pillRef = useRef(null)
  const linkRefs = useRef([])
  const lastScrollYRef = useRef(0)

  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [navVisible, setNavVisible] = useState(true)
  const solidNav = alwaysSolid || (scrolled && (navVisible || mobileOpen))

  const bubbleX = useSpring(0, BUBBLE_SPRING)
  const bubbleW = useSpring(80, BUBBLE_SPRING)
  const bubbleScale = useSpring(1, { type: 'spring', stiffness: 400, damping: 20 })

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

  const moveBubbleTo = useCallback((idx) => {
    const el = linkRefs.current[idx]
    const parent = pillRef.current
    if (!el || !parent) return

    const parentRect = parent.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()

    bubbleX.set(elRect.left - parentRect.left)
    bubbleW.set(elRect.width)
  }, [bubbleX, bubbleW])

  useEffect(() => {
    const t = setTimeout(() => moveBubbleTo(activeIndex), 60)
    return () => clearTimeout(t)
  }, [activeIndex, moveBubbleTo])

  useEffect(() => {
    const t = setTimeout(() => moveBubbleTo(0), 150)
    return () => clearTimeout(t)
  }, [moveBubbleTo])

  useEffect(() => {
    const handleResize = () => moveBubbleTo(activeIndex)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeIndex, moveBubbleTo])

  useEffect(() => {
    if (hoveredIndex !== null && hoveredIndex !== activeIndex) {
      bubbleScale.set(1.04)
      const t = setTimeout(() => bubbleScale.set(1), 250)
      return () => clearTimeout(t)
    }
  }, [hoveredIndex, activeIndex, bubbleScale])

  const handleSignOut = async () => {
    await clerk.signOut({ redirectUrl: '/' })
  }

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
        <div className="navbar-logo">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
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

        <nav className="navbar-nav-desktop" aria-label="Main navigation">
          <div ref={pillRef} className="nav-pill">
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

            {NAV_LINKS.map((label, i) => (
              <motion.a
                key={label}
                ref={(el) => (linkRefs.current[i] = el)}
                href="#"
                role="menuitem"
                aria-current={i === activeIndex ? 'page' : undefined}
                className={`nav-pill-link ${i === activeIndex ? 'active' : ''}`}
                onClick={(e) => {
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

        <div className="navbar-actions">
          {isSignedIn ? (
            <>
              <div className={`flex items-center gap-2 rounded-full px-2 py-1 ${solidNav ? 'bg-slate-100' : 'bg-white/10 backdrop-blur-sm'}`}>
                <img
                  src={user.imageUrl}
                  alt={user.firstName || 'User avatar'}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className={`text-sm font-medium ${solidNav ? 'text-slate-900' : 'text-white'}`}>
                  {user.firstName || 'Account'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className={`text-sm font-medium transition ${solidNav ? 'text-slate-700 hover:text-slate-900' : 'text-white/70 hover:text-white'}`}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => navigate('/sign-in')}
              className={`text-sm font-medium transition ${solidNav ? 'text-slate-700 hover:text-slate-900' : 'text-white/70 hover:text-white'}`}
            >
              Sign In
            </button>
          )}

          <motion.a
            href="/#consultation"
            className="nav-cta"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Contact Us
          </motion.a>
        </div>

        <div className="navbar-mobile-toggle">
          <motion.button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen((o) => !o)}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

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
              onClick={(e) => {
                e.preventDefault()
                setActiveIndex(i)
                setMobileOpen(false)
              }}
            >
              {label}
            </a>
          ))}
          <div className="mobile-nav-footer">
            {isSignedIn ? (
              <>
                <div className="flex items-center gap-2">
                  <img
                    src={user.imageUrl}
                    alt={user.firstName || 'User avatar'}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className={`text-sm font-medium ${solidNav ? 'text-slate-900' : 'text-white'}`}>
                    {user.firstName || 'Account'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className={`text-sm font-medium ${solidNav ? 'text-slate-700' : 'text-white/70'}`}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  navigate('/sign-in')
                }}
                className={`text-sm font-medium ${solidNav ? 'text-slate-700' : 'text-white/70'}`}
              >
                Sign In
              </button>
            )}
            <a className="mobile-footer-link bold" href="/#consultation">Contact Us</a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
