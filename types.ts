// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Property interface
export interface Property extends CosmicObject {
  type: 'properties';
  metadata: {
    property_title: string;
    description: string;
    property_type: {
      key: PropertyTypeKey;
      value: string;
    };
    price_per_night: number;
    max_guests: number;
    bedrooms: number;
    bathrooms: number;
    photos?: Array<{
      url: string;
      imgix_url: string;
    }>;
    amenities?: string[];
    host?: Host;
    location?: Location;
    available: boolean;
  };
}

// Host interface
export interface Host extends CosmicObject {
  type: 'hosts';
  metadata: {
    host_name: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    bio?: string;
    email: string;
    phone?: string;
    response_time?: {
      key: ResponseTimeKey;
      value: string;
    };
    superhost: boolean;
  };
}

// Location interface
export interface Location extends CosmicObject {
  type: 'locations';
  metadata: {
    city: string;
    state_province?: string;
    country: string;
    neighborhood?: string;
    description?: string;
  };
}

// Type literals for select-dropdown values
export type PropertyTypeKey = 'apartment' | 'house' | 'condo' | 'cabin' | 'villa';
export type ResponseTimeKey = 'within_hour' | 'few_hours' | 'day';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Search filters
export interface SearchFilters {
  location?: string;
  propertyType?: PropertyTypeKey;
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
  amenities?: string[];
}

// Type guards
export function isProperty(obj: CosmicObject): obj is Property {
  return obj.type === 'properties';
}

export function isHost(obj: CosmicObject): obj is Host {
  return obj.type === 'hosts';
}

export function isLocation(obj: CosmicObject): obj is Location {
  return obj.type === 'locations';
}