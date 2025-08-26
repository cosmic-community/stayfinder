import LocationCard from '@/components/LocationCard'
import { Location } from '@/types'

interface LocationGridProps {
  locations: Location[];
}

export default function LocationGrid({ locations }: LocationGridProps) {
  if (!locations || locations.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No destinations found
        </h3>
        <p className="text-gray-500">
          Check back soon for more amazing destinations.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {locations.map((location) => (
        <LocationCard 
          key={location.id} 
          location={location} 
        />
      ))}
    </div>
  )
}