import { useState } from 'react'
import { Link } from 'react-router-dom'
import brandLogoDark from '../../assets/images/brandLogo2.png'

const NAV_LINKS = ['Buy', 'Sell', 'Manage']

export default function PropertyNavbar() {
  const [active, setActive] = useState('Buy')

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e8e8e8] font-['Nunito_Sans']">
      <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <img 
            src={brandLogoDark} 
            alt="Happily Owned" 
            className="w-18 h-18 object-contain"
          />  
        </Link>

        {/* Center nav links */}
        <nav className="flex gap-[30px] items-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              onClick={(e) => { e.preventDefault(); setActive(link) }}
              className={`text-[14px] font-semibold no-underline transition-colors duration-200 ${
                active === link ? 'text-[#171717]' : 'text-[#999999] hover:text-[#171717]'
              }`}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-[14px] font-semibold text-[#171717] no-underline hover:text-black"
          >
            Sign In
          </a>
          <a
            href="/#consultation"
            className="text-[13px] font-bold text-white bg-[#171717] px-4 py-2 rounded-full no-underline hover:bg-black transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  )
}
