import { 
  Wifi, 
  ChefHat, 
  Waves, 
  Car, 
  Dumbbell, 
  Wind, 
  Flame, 
  WashingMachine,
  UtensilsCrossed,
  Snowflake
} from 'lucide-react'

interface AmenityListProps {
  amenities: string[];
}

const amenityIcons: Record<string, JSX.Element> = {
  'WiFi': <Wifi className="w-5 h-5" />,
  'Kitchen': <ChefHat className="w-5 h-5" />,
  'Pool': <Waves className="w-5 h-5" />,
  'Parking': <Car className="w-5 h-5" />,
  'Gym': <Dumbbell className="w-5 h-5" />,
  'Air Conditioning': <Snowflake className="w-5 h-5" />,
  'Heating': <Flame className="w-5 h-5" />,
  'Washer': <WashingMachine className="w-5 h-5" />,
  'Dryer': <Wind className="w-5 h-5" />,
  'Hot Tub': <Waves className="w-5 h-5" />,
}

export default function AmenityList({ amenities }: AmenityListProps) {
  if (!amenities || amenities.length === 0) {
    return (
      <div className="text-gray-500 text-sm">
        No amenities listed
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {amenities.map((amenity, index) => (
        <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
          <div className="text-gray-600">
            {amenityIcons[amenity] || <UtensilsCrossed className="w-5 h-5" />}
          </div>
          <span className="text-sm text-gray-900 font-medium">{amenity}</span>
        </div>
      ))}
    </div>
  )
}