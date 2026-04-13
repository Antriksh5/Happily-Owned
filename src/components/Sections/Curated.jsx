import { ArrowRight } from 'lucide-react'
import PropertyCard from '../PropertyCard/PropertyCard'
import properties from '../../data/properties'

export default function Curated() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-secondary mb-3">
              Premium Opportunities
            </h2>
            <p className="text-text-muted text-base">Curated investments selected by our in-house experts.</p>
          </div>
          <a className="hidden md:flex items-center text-primary font-semibold hover:text-primary transition" href="#">
            View all projects
            <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="mt-10 text-center md:hidden">
          <a className="inline-flex items-center text-primary font-semibold hover:underline" href="#">
            View all projects
            <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
