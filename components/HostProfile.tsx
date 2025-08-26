import { Star, Clock, Phone, Mail } from 'lucide-react'
import { Host } from '@/types'

interface HostProfileProps {
  host: Host;
}

export default function HostProfile({ host }: HostProfileProps) {
  const { metadata } = host;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Meet your host
      </h3>

      <div className="flex items-start space-x-4">
        {/* Host Photo */}
        <div className="flex-shrink-0">
          {metadata.profile_photo ? (
            <img
              src={`${metadata.profile_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
              alt={metadata.host_name}
              className="w-16 h-16 rounded-full object-cover"
              width={64}
              height={64}
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-400 text-lg font-medium">
                {metadata.host_name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Host Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-semibold text-gray-900">{metadata.host_name}</h4>
            {metadata.superhost && (
              <span className="bg-primary-100 text-primary-800 px-2 py-0.5 rounded text-xs font-medium flex items-center space-x-1">
                <Star className="w-3 h-3 fill-current" />
                <span>Superhost</span>
              </span>
            )}
          </div>

          {/* Response Time */}
          {metadata.response_time && (
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Clock className="w-4 h-4 mr-1" />
              <span>Responds {metadata.response_time.value.toLowerCase()}</span>
            </div>
          )}

          {/* Contact Info */}
          <div className="space-y-1">
            {metadata.email && (
              <div className="flex items-center text-sm text-gray-500">
                <Mail className="w-4 h-4 mr-1" />
                <span>{metadata.email}</span>
              </div>
            )}
            {metadata.phone && (
              <div className="flex items-center text-sm text-gray-500">
                <Phone className="w-4 h-4 mr-1" />
                <span>{metadata.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Host Bio */}
      {metadata.bio && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-700 leading-relaxed">
            {metadata.bio}
          </p>
        </div>
      )}

      {/* Contact Host Button */}
      <div className="mt-4">
        <button className="btn-secondary w-full text-sm">
          Contact Host
        </button>
      </div>
    </div>
  )
}