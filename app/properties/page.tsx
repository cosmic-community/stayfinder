import PropertyGrid from '@/components/PropertyGrid'
import PropertyFilters from '@/components/PropertyFilters'
import { getProperties, getLocations } from '@/lib/cosmic'

export const metadata = {
  title: 'Properties - StayFinder',
  description: 'Browse all available properties on StayFinder.',
}

export default async function PropertiesPage() {
  const [properties, locations] = await Promise.all([
    getProperties(),
    getLocations()
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          All Properties
        </h1>
        <p className="text-gray-600">
          {properties.length} {properties.length === 1 ? 'property' : 'properties'} available
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <PropertyFilters 
            locations={locations}
            properties={properties}
          />
        </div>

        {/* Properties Grid */}
        <div className="flex-1">
          <PropertyGrid properties={properties} />
          
          {properties.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No properties found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters to see more results.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}