import Link from 'next/link'
import { Home, MapPin, User } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-xl font-bold text-primary-500"
          >
            <Home className="w-6 h-6" />
            <span>StayFinder</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              href="/properties" 
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Properties
            </Link>
            <Link 
              href="/locations" 
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center space-x-1"
            >
              <MapPin className="w-4 h-4" />
              <span>Destinations</span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button className="btn-secondary text-sm">
              Become a Host
            </button>
            <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200">
              <User className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}