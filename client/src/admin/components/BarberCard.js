import { User, Phone, Star } from "lucide-react"

const BarberCard = ({ barber }) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <User size={16} className="text-gray-400" />
          <span className="font-medium text-gray-900">{barber.name || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">{barber.phone || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Star size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">
            Rating: {barber.rating !== undefined ? barber.rating.toFixed(1) : "N/A"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default BarberCard
