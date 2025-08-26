'use client'

import { useState } from 'react'
import { Search, MapPin, Calendar, Users } from 'lucide-react'
import { Location } from '@/types'

interface HeroProps {
  locations: Location[];
}

export default function Hero({ locations }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to properties page with search parameters
    const params = new URLSearchParams()
    if (searchQuery) params.set('location', searchQuery)
    if (checkIn) params.set('checkin', checkIn)
    if (checkOut) params.set('checkout', checkOut)
    if (guests > 1) params.set('guests', guests.toString())
    
    window.location.href = `/properties?${params.toString()}`
  }

  return (
    <div 
      className="relative bg-cover bg-center bg-no-repeat min-h-[600px] flex items-center justify-center"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://imgix.cosmicjs.com/5698b830-8227-11f0-a561-cd0208bbad0c-photo-1441974231531-c6227db76b6e-1756176591561.jpg?w=1920&h=600&fit=crop&auto=format,compress)'
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Find your perfect
          <span className="text-primary-400 block">getaway</span>
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Discover unique accommodations and experiences around the world with StayFinder.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg p-4 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Location */}
            <div className="relative">
              <label className="block text-left text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                Where
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-none focus:ring-0 text-gray-900 placeholder-gray-500"
                  list="locations"
                />
                <datalist id="locations">
                  {locations.map((location) => (
                    <option key={location.id} value={location.title} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Check In */}
            <div>
              <label className="block text-left text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                Check In
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-none focus:ring-0 text-gray-900"
                />
              </div>
            </div>

            {/* Check Out */}
            <div>
              <label className="block text-left text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                Check Out
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || undefined}
                  className="w-full pl-10 pr-4 py-3 border-none focus:ring-0 text-gray-900"
                />
              </div>
            </div>

            {/* Guests */}
            <div>
              <label className="block text-left text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                Guests
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border-none focus:ring-0 text-gray-900 appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button 
              type="submit" 
              className="btn-primary w-full md:w-auto px-8 flex items-center justify-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Search Properties</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}