import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import Curated from '../components/Sections/Curated'
import Features from '../components/Sections/Features'
import Process from '../components/Sections/Process'
import Consultation from '../components/Sections/Consultation'
import Footer from '../components/Footer/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Curated />
      <Features />
      <Process />
      <Consultation />
      <Footer />
    </>
  )
}
