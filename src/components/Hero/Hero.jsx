import { useEffect, useRef } from 'react'
import heroImage from '../../assets/images/image1.png'
import SearchBar from '../SearchBar/SearchBar'

export default function Hero() {
  const dynamicTextRef = useRef(null)

  useEffect(() => {
    const phrases = ['NRI Friendly', 'RERA Certified', 'One Stop Shop', 'Remotely Managed']
    let index = 0
    const el = dynamicTextRef.current
    if (!el) return
    el.style.transition = 'opacity 0.5s ease-in-out'

    const interval = setInterval(function () {
      el.style.opacity = '0'
      setTimeout(function () {
        index = (index + 1) % phrases.length
        el.innerHTML = phrases[index]
        el.style.opacity = '1'
      }, 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-170 w-full flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          alt="Luxury Indian Villa"
          className="w-full h-full object-cover opacity-100"
          src={heroImage}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/70"></div>
      </div>
      <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6">
        <div className="text-center w-full max-w-3xl mx-auto mb-12">
          <p
            className="text-white text-[20px] md:text-[26px] leading-tight font-display font-bold mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          >
            Get happily closer to owning in India
          </p>
          <p
            ref={dynamicTextRef}
            id="dynamicText"
            className="text-white text-[24px] md:text-[48px] font-bold text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] shadow-black/80"
          >
            NRI Friendly
          </p>
        </div>
        <SearchBar />
      </div>
    </section>
  )
}
