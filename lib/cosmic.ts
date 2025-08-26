import { createBucketClient } from '@cosmicjs/sdk'
import { Property, Host, Location, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all properties with related data
export async function getProperties(): Promise<Property[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'properties' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as Property[]).sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA; // Newest first
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch properties');
  }
}

// Get single property by slug
export async function getProperty(slug: string): Promise<Property | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'properties',
        slug
      })
      .depth(1);
    
    const property = response.object as Property;
    
    if (!property || !property.metadata) {
      return null;
    }
    
    return property;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch property');
  }
}

// Get all locations
export async function getLocations(): Promise<Location[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'locations' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Location[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch locations');
  }
}

// Get single location by slug
export async function getLocation(slug: string): Promise<Location | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'locations',
        slug
      });
    
    return response.object as Location;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch location');
  }
}

// Get properties by location
export async function getPropertiesByLocation(locationId: string): Promise<Property[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'properties',
        'metadata.location': locationId 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Property[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch properties by location');
  }
}

// Get all hosts
export async function getHosts(): Promise<Host[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'hosts' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Host[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch hosts');
  }
}

// Get single host by slug
export async function getHost(slug: string): Promise<Host | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'hosts',
        slug
      });
    
    return response.object as Host;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch host');
  }
}

// Search properties with filters
export async function searchProperties(filters: {
  location?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
}): Promise<Property[]> {
  try {
    const query: Record<string, any> = { type: 'properties' };
    
    // Add filters to query
    if (filters.location) {
      query['metadata.location'] = filters.location;
    }
    
    if (filters.propertyType) {
      query['metadata.property_type.key'] = filters.propertyType;
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    let properties = response.objects as Property[];
    
    // Apply client-side filters
    if (filters.minPrice) {
      properties = properties.filter(p => p.metadata.price_per_night >= filters.minPrice!);
    }
    
    if (filters.maxPrice) {
      properties = properties.filter(p => p.metadata.price_per_night <= filters.maxPrice!);
    }
    
    if (filters.guests) {
      properties = properties.filter(p => p.metadata.max_guests >= filters.guests!);
    }
    
    return properties;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to search properties');
  }
}