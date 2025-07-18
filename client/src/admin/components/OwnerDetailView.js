"use client"

import { useState } from "react"
import {
  ArrowLeft,
  User,
  Phone,
  Building,
  Store,
  MapPin,
  Star,
  Clock,
  CalendarDays,
  DollarSign,
  List,
  Info,
  CircleCheck,
  ChevronDown,
  ChevronRight,
  Scissors,
  Shield,
} from "lucide-react"
import SubscriptionTag from "./SubscriptionTag"
import BarbersTable from "./BarbersTable"
import BarberCard from "./BarberCard"

const OwnerDetailView = ({ owner, onBack, onVerifyShop }) => {
  const [expandedBarbersForShopId, setExpandedBarbersForShopId] = useState(null)
  
   const ownerData = owner;
    // Corrected: Changed ownerData?.shopsDetails to ownerData?.shops
    const ownerShops = ownerData?.shops || [];

  // Function to toggle barber visibility for a specific shop (mobile only)
  const toggleBarbersForShop = (shopId) => {
    setExpandedBarbersForShopId(expandedBarbersForShopId === shopId ? null : shopId)
  }

  if (!ownerData) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center text-red-600">Owner data is missing or could not be loaded.</div>
      </div>
    )
  }
  else
  {
    console.log("Owner Data:")
    console.log(ownerData)
    console.log("Owner Shops:")
    console.log(ownerShops)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Owners
        </button>

        <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-6">
          <User size={24} className="text-gray-800" />
          Owner Details: {ownerData.name}
        </h2>

        {/* General Information */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
            <Info size={20} className="text-gray-800" />
            General Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Phone size={16} />
              <span>Phone: {ownerData.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <CircleCheck size={16} className="text-gray-600" />
              <span className="text-gray-600">Overall Status:</span>
              <SubscriptionTag status={ownerData.subscriptionStatus} />
            </div>
          </div>
        </div>

        {/* Shops Section */}
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
            <Building size={20} className="text-gray-800" />
            Shops ({ownerShops.length})
          </h3>
          {ownerShops.length === 0 ? (
            <div className="text-center py-8 text-gray-500">This owner has no shops registered.</div>
          ) : (
            <div className="space-y-6">
              {ownerShops.map((shop) => (
                <div key={shop._id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-800 rounded-lg">
                        <Store size={20} className="text-white" />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-800">{shop.name}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <SubscriptionTag status={shop.subscription?.status} />
                      {!shop.verified && (
                        <button
                          onClick={() => onVerifyShop(shop._id)}
                          className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Shield size={16} />
                          Verify Shop
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Shop Information */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={16} />
                        <span>Address: {shop.address?.fullDetails || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Star size={16} />
                        <span>Rating: {shop.rating !== undefined ? shop.rating.toFixed(1) : "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={16} />
                        <span>
                          Hours: {shop.openingTime || "N/A"} - {shop.closingTime || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Info size={16} />
                        <span>Is Open: </span>
                        <span className={shop.isOpen ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                          {shop.isOpen ? "Yes" : "No"}
                        </span>
                      </div>

                      {/* Subscription Details */}
                      {shop.subscription?.status !== "trial" && shop.subscription?.lastPlanInfo && (
                        <div className="pt-3 border-t border-gray-200">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-600">
                              <DollarSign size={16} />
                              <span>Plan: {shop.subscription.lastPlanInfo.planName || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <CalendarDays size={16} />
                              <span>
                                Subscribed: {new Date(shop.subscription.lastPlanInfo.startDate).toLocaleDateString()} -{" "}
                                {new Date(shop.subscription.lastPlanInfo.endDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Info size={16} />
                              <span>Transaction ID: {shop.subscription.lastPlanInfo.transactionId || "N/A"}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {shop.subscription?.status === "trial" && shop.subscription?.trialEndDate && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock size={16} />
                          <span>Trial Ends: {new Date(shop.subscription.trialEndDate).toLocaleDateString()}</span>
                        </div>
                      )}

                      {/* Services */}
                      {shop.services && shop.services.length > 0 && (
                        <div className="pt-3 border-t border-gray-200">
                          <p className="font-semibold text-gray-800 mb-2">Services:</p>
                          <div className="space-y-1">
                            {shop.services.map((service, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                <List size={14} />
                                <span>
                                  {service.name} - ${service.price?.toFixed(2) || "N/A"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Barbers Section */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="flex items-center gap-2 font-semibold text-gray-800">
                          <Scissors size={18} className="text-gray-800" />
                          {/* Corrected: Changed shop.barbersInShop to shop.barbers */}
                          Barbers in this Shop ({shop.barbers.length})
                        </h5>
                        <button
                          className="lg:hidden flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors"
                          onClick={() => toggleBarbersForShop(shop._id)}
                        >
                          {expandedBarbersForShopId === shop._id ? (
                            <ChevronDown size={20} />
                          ) : (
                            <ChevronRight size={20} />
                          )}
                        </button>
                      </div>

                      {/* Corrected: Changed shop.barbersInShop to shop.barbers */}
                      {shop.barbers.length === 0 ? (
                        <p className="text-gray-500 text-sm">No barbers found for this shop.</p>
                      ) : (
                        <>
                          {/* Desktop Table */}
                          <div className="hidden lg:block">
                            {/* Corrected: Changed shop.barbersInShop to shop.barbers */}
                            <BarbersTable barbers={shop.barbers} />
                          </div>

                          {/* Mobile Cards */}
                          <div className={`lg:hidden ${expandedBarbersForShopId === shop._id ? "block" : "hidden"}`}>
                            <div className="space-y-3">
                              {/* Corrected: Changed shop.barbersInShop to shop.barbers */}
                              {shop.barbers.map((barber) => (
                                <BarberCard key={barber._id} barber={barber} />
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OwnerDetailView