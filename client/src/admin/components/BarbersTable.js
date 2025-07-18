import { User, Phone, Star } from "lucide-react"

const BarbersTable = ({ barbers }) => {
  if (!barbers || barbers.length === 0) {
    return <div className="text-center py-4 text-gray-500">No barbers available</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barber</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {barbers.map((barber) => (
            <tr key={barber._id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">{barber.name || "N/A"}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600">{barber.phone || "N/A"}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {barber.rating !== undefined ? barber.rating.toFixed(1) : "N/A"}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BarbersTable
