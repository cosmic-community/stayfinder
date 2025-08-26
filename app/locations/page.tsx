import LocationGrid from '@/components/LocationGrid'
import { getLocations } from '@/lib/cosmic'

export const metadata = {
  title: 'Destinations - StayFinder',
  description: 'Explore popular destinations on StayFinder.',
}

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Popular Destinations
        </h1>
        <p className="text-gray-600">
          Discover amazing places to stay around the world
        </p>
      </div>

      <LocationGrid locations={locations} />

      {locations.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No destinations found
          </h3>
          <p className="text-gray-500">
            Check back soon for more amazing destinations.
          </p>
        </div>
      )}
    </div>
  )
}