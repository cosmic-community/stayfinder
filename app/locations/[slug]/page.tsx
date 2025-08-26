// app/locations/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getLocation, getPropertiesByLocation } from '@/lib/cosmic'
import PropertyGrid from '@/components/PropertyGrid'
import { Metadata } from 'next'

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = await getLocation(slug);

  if (!location) {
    return {
      title: 'Location Not Found - StayFinder',
    }
  }

  return {
    title: `${location.title} - StayFinder`,
    description: location.metadata.description || `Discover amazing properties in ${location.title}`,
  }
}

export default async function LocationPage({ params }: LocationPageProps) {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params;
  const location = await getLocation(slug);

  if (!location) {
    notFound();
  }

  const properties = await getPropertiesByLocation(location.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Location Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {location.title}
        </h1>
        
        <div className="mb-4">
          <p className="text-lg text-gray-600">
            {location.metadata.neighborhood && `${location.metadata.neighborhood}, `}
            {location.metadata.state_province && `${location.metadata.state_province}, `}
            {location.metadata.country}
          </p>
        </div>

        {location.metadata.description && (
          <p className="text-gray-700 text-lg max-w-3xl">
            {location.metadata.description}
          </p>
        )}
      </div>

      {/* Properties in this location */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Properties in {location.metadata.city}
          <span className="text-base font-normal text-gray-500 ml-2">
            ({properties.length} {properties.length === 1 ? 'property' : 'properties'})
          </span>
        </h2>
        
        {properties.length > 0 ? (
          <PropertyGrid properties={properties} />
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-500">
              Check back soon for new properties in {location.metadata.city}.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}