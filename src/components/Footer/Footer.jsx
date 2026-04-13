import { AtSign, Globe, MessageCircle, Share2 } from 'lucide-react'
import brandLogo from '../../assets/images/brandLogo1.png'

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-20 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src={brandLogo} alt="Happily Owned" className="h-10 w-auto" />
            </div>
            <p className="text-gray-300 text-base leading-relaxed mb-6">
              Simplifying Indian real estate investment for the global Indian community. Trust, transparency, and
              technology at your service.
            </p>
            <div className="flex space-x-4">
              <a className="text-gray-400 hover:text-primary transition" href="#" aria-label="Website">
                <Globe className="h-6 w-6" aria-hidden="true" />
              </a>
              <a className="text-gray-400 hover:text-primary transition" href="#" aria-label="Share">
                <Share2 className="h-6 w-6" aria-hidden="true" />
              </a>
              <a className="text-gray-400 hover:text-primary transition" href="#" aria-label="Message">
                <MessageCircle className="h-6 w-6" aria-hidden="true" />
              </a>
              <a className="text-gray-400 hover:text-primary transition" href="#" aria-label="Email">
                <AtSign className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-6 text-white">Discover</h4>
            <ul className="space-y-3">
              <li><a className="text-gray-300 hover:text-white transition text-base" href="#">Buy Property</a></li>
              <li><a className="text-gray-300 hover:text-white transition text-base" href="#">Sell Property</a></li>
              <li><a className="text-gray-300 hover:text-white transition text-base" href="#">Property Management</a></li>
              <li><a className="text-gray-300 hover:text-white transition text-base" href="#">Investment Guide</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-6 text-white">Company</h4>
            <ul className="space-y-3">
              <li><a className="text-gray-300 hover:text-white transition text-base" href="#">About Us</a></li>
              <li><a className="text-gray-300 hover:text-white transition text-base" href="#">Careers</a></li>
              <li><a className="text-gray-300 hover:text-white transition text-base" href="/#consultation">Contact Support</a></li>
              <li><a className="text-gray-300 hover:text-white transition text-base" href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-6 text-white">Stay Updated</h4>
            <p className="text-gray-300 text-base mb-4">Get the latest market insights and new launch alerts.</p>
            <div className="flex flex-col space-y-3">
              <input
                className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary text-base placeholder-gray-400"
                placeholder="Enter your email"
                type="email"
              />
              <button className="bg-primary hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition text-base shadow-lg shadow-primary/20">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-base text-gray-400">
          <p>&copy; 2026 Happily Owned. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a className="hover:text-white transition" href="#">Terms of Service</a>
            <a className="hover:text-white transition" href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
