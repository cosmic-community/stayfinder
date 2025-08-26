import Link from 'next/link'
import { MapPin, Users, Bed, Bath, Star } from 'lucide-react'
import { Property } from '@/types'

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const photos = property.metadata.photos || [];
  const primaryPhoto = photos[0];
  const location = property.metadata.location;
  const host = property.metadata.host;

  return (
    <Link href={`/properties/${property.slug}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
        {/* Property Image */}
        <div className="relative h-64 overflow-hidden">
          {primaryPhoto ? (
            <img
              src={`${primaryPhoto.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
              alt={property.metadata.property_title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={300}
              height={200}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          
          {/* Property Type Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 text-gray-900 px-2 py-1 rounded text-xs font-medium">
              {property.metadata.property_type.value}
            </span>
          </div>

          {/* Superhost Badge */}
          {host?.metadata.superhost && (
            <div className="absolute top-3 right-3">
              <span className="bg-primary-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                <Star className="w-3 h-3 fill-current" />
                <span>Superhost</span>
              </span>
            </div>
          )}

          {/* Bottom Stats Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
            <div className="flex items-center justify-between text-white text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-black/30 rounded-full px-2 py-1">
                  <Users className="w-3 h-3 mr-1" />
                  <span className="text-xs font-medium">{property.metadata.max_guests}</span>
                </div>
                <div className="flex items-center bg-black/30 rounded-full px-2 py-1">
                  <Bed className="w-3 h-3 mr-1" />
                  <span className="text-xs font-medium">{property.metadata.bedrooms}</span>
                </div>
                <div className="flex items-center bg-black/30 rounded-full px-2 py-1">
                  <Bath className="w-3 h-3 mr-1" />
                  <span className="text-xs font-medium">{property.metadata.bathrooms}</span>
                </div>
              </div>
              
              {/* Property Type Label */}
              <div className="text-xs font-medium text-white/80">
                {property.metadata.property_type.value}
              </div>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="p-5">
          {/* Location */}
          {location && (
            <div className="flex items-center text-gray-500 text-sm mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span>
                {location.metadata.city}, {location.metadata.state_province}
              </span>
            </div>
          )}

          {/* Property Title */}
          <h3 className="font-semibold text-gray-900 text-lg mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {property.metadata.property_title}
          </h3>

          {/* Price and Availability */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                ${property.metadata.price_per_night}
              </span>
              <span className="text-gray-500 text-sm"> / night</span>
            </div>

            {/* Availability Badge */}
            <div className="flex items-center">
              {property.metadata.available ? (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                  Available
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
                  Unavailable
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}