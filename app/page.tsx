import Hero from '@/components/Hero'
import PropertyGrid from '@/components/PropertyGrid'
import LocationGrid from '@/components/LocationGrid'
import { getProperties, getLocations } from '@/lib/cosmic'
import { Property, Location } from '@/types'

export default async function HomePage() {
  // Fetch data in parallel
  const [properties, locations] = await Promise.all([
    getProperties(),
    getLocations()
  ])

  // Get featured properties (first 6)
  const featuredProperties = properties.slice(0, 6)

  return (
    <div>
      <Hero locations={locations} />
      
      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          Featured Properties
        </h2>
        <PropertyGrid properties={featuredProperties} />
        
        {properties.length > 6 && (
          <div className="mt-8 text-center">
            <a 
              href="/properties" 
              className="btn-primary inline-block"
            >
              View All Properties
            </a>
          </div>
        )}
      </section>

      {/* Popular Destinations */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Popular Destinations
          </h2>
          <LocationGrid locations={locations} />
        </div>
      </section>
    </div>
  )
}