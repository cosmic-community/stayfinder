import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { Location } from '@/types'

interface LocationCardProps {
  location: Location;
}

export default function LocationCard({ location }: LocationCardProps) {
  // Use a fallback image from Unsplash for locations
  const getLocationImage = (city: string, state: string) => {
    const searchTerm = `${city}-${state}`.toLowerCase().replace(/\s+/g, '-')
    return `https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop&auto=format&q=75`
  }

  return (
    <Link href={`/locations/${location.slug}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
        {/* Location Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={getLocationImage(location.metadata.city, location.metadata.state_province || '')}
            alt={location.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={300}
            height={200}
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
        </div>

        {/* Location Details */}
        <div className="p-4">
          {/* Location Name */}
          <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-primary-600 transition-colors">
            {location.title}
          </h3>

          {/* Location Info */}
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span>
              {location.metadata.neighborhood && `${location.metadata.neighborhood}, `}
              {location.metadata.country}
            </span>
          </div>

          {/* Description */}
          {location.metadata.description && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {location.metadata.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}