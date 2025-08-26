import PropertyCard from '@/components/PropertyCard'
import { Property } from '@/types'

interface PropertyGridProps {
  properties: Property[];
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No properties found
        </h3>
        <p className="text-gray-500">
          Try adjusting your search criteria or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard 
          key={property.id} 
          property={property} 
        />
      ))}
    </div>
  )
}