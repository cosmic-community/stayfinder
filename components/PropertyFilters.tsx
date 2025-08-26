'use client'

import { useState, useEffect } from 'react'
import { Filter } from 'lucide-react'
import { Location, Property, PropertyTypeKey } from '@/types'

interface PropertyFiltersProps {
  locations: Location[];
  properties: Property[];
}

export default function PropertyFilters({ locations, properties }: PropertyFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    guests: '',
    amenities: [] as string[]
  })

  // Get unique amenities from all properties
  const allAmenities = Array.from(
    new Set(
      properties
        .flatMap(p => p.metadata.amenities || [])
        .filter(Boolean)
    )
  ).sort()

  const propertyTypes: { key: PropertyTypeKey; value: string }[] = [
    { key: 'apartment', value: 'Apartment' },
    { key: 'house', value: 'House' },
    { key: 'condo', value: 'Condo' },
    { key: 'cabin', value: 'Cabin' },
    { key: 'villa', value: 'Villa' }
  ]

  const handleFilterChange = (key: string, value: string | string[]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const clearFilters = () => {
    setFilters({
      location: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      guests: '',
      amenities: []
    })
  }

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => 
    key === 'amenities' ? Array.isArray(value) && value.length > 0 : value !== ''
  )

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All locations</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.title}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <select
            value={filters.propertyType}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All types</option>
            {propertyTypes.map((type) => (
              <option key={type.key} value={type.key}>
                {type.value}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range (per night)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Guests Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Guests
          </label>
          <select
            value={filters.guests}
            onChange={(e) => handleFilterChange('guests', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Any number</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        {/* Amenities Filter */}
        {allAmenities.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {allAmenities.map((amenity) => (
                <label key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="mr-2 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}