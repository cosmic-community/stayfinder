// app/properties/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getProperty } from '@/lib/cosmic'
import PropertyDetails from '@/components/PropertyDetails'
import PropertyGallery from '@/components/PropertyGallery'
import HostProfile from '@/components/HostProfile'
import AmenityList from '@/components/AmenityList'
import { Metadata } from 'next'

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) {
    return {
      title: 'Property Not Found - StayFinder',
    }
  }

  return {
    title: `${property.metadata.property_title} - StayFinder`,
    description: property.metadata.description.replace(/<[^>]*>/g, '').slice(0, 160),
  }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) {
    notFound();
  }

  const photos = property.metadata.photos || [];
  const amenities = property.metadata.amenities || [];
  const host = property.metadata.host;
  const location = property.metadata.location;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Property Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {property.metadata.property_title}
        </h1>
        {location && (
          <p className="text-lg text-gray-600">
            {location.metadata.neighborhood && `${location.metadata.neighborhood}, `}
            {location.metadata.city}, {location.metadata.state_province}
          </p>
        )}
      </div>

      {/* Property Gallery */}
      {photos.length > 0 && (
        <div className="mb-8">
          <PropertyGallery photos={photos} propertyTitle={property.metadata.property_title} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <PropertyDetails property={property} />
          
          {amenities.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Amenities
              </h3>
              <AmenityList amenities={amenities} />
            </div>
          )}

          {/* Property Description */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              About this property
            </h3>
            <div 
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: property.metadata.description }}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Booking Card */}
          <div className="sticky top-8">
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  ${property.metadata.price_per_night}
                </span>
                <span className="text-gray-500"> / night</span>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Guests:</span> {property.metadata.max_guests}
                  </div>
                  <div>
                    <span className="font-medium">Bedrooms:</span> {property.metadata.bedrooms}
                  </div>
                  <div>
                    <span className="font-medium">Bathrooms:</span> {property.metadata.bathrooms}
                  </div>
                  <div>
                    <span className="font-medium">Type:</span> {property.metadata.property_type.value}
                  </div>
                </div>
                
                <button className="btn-primary w-full">
                  Check Availability
                </button>
              </div>
            </div>

            {/* Host Profile */}
            {host && (
              <div className="mt-6">
                <HostProfile host={host} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}