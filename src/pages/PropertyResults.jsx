import { useUser } from '@clerk/clerk-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import HorizontalPropertyCard from '../components/PropertyCard/HorizontalPropertyCard'
import properties from '../data/properties'
import { matchesPropertyLocation } from '../utils/propertySearch'

function useQuery() {
  const { search } = useLocation()
  return new URLSearchParams(search)
}

export default function PropertyResults() {
  const { isSignedIn } = useUser()
  const navigate = useNavigate()
  const query = useQuery()
  const location = useLocation()
  const locationQuery = query.get('location') || ''
  const redirectUrl = `${location.pathname}${location.search}`

  const matchedProperties = properties.filter((property) =>
    matchesPropertyLocation(property, locationQuery),
  )

  return (
    <>
      <Navbar alwaysSolid={true} />
      <main className="min-h-screen bg-[#f8f9fa] pt-28">
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] sm:p-8">
            <Link to="/" className="text-sm font-semibold text-primary transition hover:text-secondary">
              Back to home
            </Link>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Search Results
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Properties in {locationQuery || 'your selected location'}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Showing {matchedProperties.length} curated {matchedProperties.length === 1 ? 'property' : 'properties'} from our current inventory.
            </p>
            {!isSignedIn && matchedProperties.length > 0 && (
              <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
                Sign in to unlock full property details and continue from this listing page.
              </p>
            )}
          </div>

          {matchedProperties.length > 0 ? (
            <div className="space-y-6">
              {matchedProperties.map((property) => (
                <HorizontalPropertyCard
                  key={property.id}
                  property={property}
                  onExplore={() => {
                    if (isSignedIn) {
                      navigate(`/property/${property.slug}`)
                      return
                    }

                    navigate(`/sign-in?redirectUrl=${encodeURIComponent(redirectUrl)}`)
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <h2 className="font-display text-2xl font-bold text-slate-900">No properties found</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                We could not find a current listing matching "{locationQuery}". Try searching for cities like Mumbai, Bangalore, Gurgaon, or Udaipur.
              </p>
              <Link
                to="/"
                className="mt-6 inline-flex items-center justify-center rounded-2xl bg-secondary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary"
              >
                Search Again
              </Link>
            </div>
          )}
        </section>
      </main>
    </>
  )
}
