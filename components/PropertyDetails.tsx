import { Users, Bed, Bath, Home } from 'lucide-react'
import { Property } from '@/types'

interface PropertyDetailsProps {
  property: Property;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const { metadata } = property;

  return (
    <div className="space-y-6">
      {/* Property Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
          <Users className="w-5 h-5 text-gray-600" />
          <div>
            <div className="text-sm text-gray-500">Guests</div>
            <div className="font-semibold text-gray-900">{metadata.max_guests}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
          <Bed className="w-5 h-5 text-gray-600" />
          <div>
            <div className="text-sm text-gray-500">Bedrooms</div>
            <div className="font-semibold text-gray-900">{metadata.bedrooms}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
          <Bath className="w-5 h-5 text-gray-600" />
          <div>
            <div className="text-sm text-gray-500">Bathrooms</div>
            <div className="font-semibold text-gray-900">{metadata.bathrooms}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
          <Home className="w-5 h-5 text-gray-600" />
          <div>
            <div className="text-sm text-gray-500">Type</div>
            <div className="font-semibold text-gray-900">{metadata.property_type.value}</div>
          </div>
        </div>
      </div>

      {/* Availability Status */}
      <div className="flex items-center space-x-2">
        <span className="text-gray-700">Availability:</span>
        {metadata.available ? (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Available for booking
          </span>
        ) : (
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
            Currently unavailable
          </span>
        )}
      </div>
    </div>
  )
}