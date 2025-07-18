"use client"
import {
  Store,
  Users,
  DollarSign,
  BarChart3,
  TrendingUp,
  UserIcon,
  Building,
  Clock,
  CheckCircle,
  XCircle,
  ShieldOff,
  MapPin,
} from "lucide-react"

const DashboardView = ({ allShops = [], allUsers = [], allSubscriptions = [], allOwners = [], onVerifyShop }) => {
  // Filter unverified shops from allShops list
  const unverifiedShops = allShops.filter((shop) => !shop.verified)

  // Overall Counts
  const totalShops = allShops.length
  const totalUsers = allUsers.length
  const totalUnverifiedShops = unverifiedShops.length

  // Shop-related Subscriptions
  const totalActiveShopSubscriptions = allShops.filter((shop) => shop.subscription?.status === "active").length
  const totalExpiredShops = allShops.filter((shop) => shop.subscription?.status === "expired").length
  const totalTrialShops = allShops.filter((shop) => shop.subscription?.status === "trial").length

  // User-related Subscriptions
  const totalActiveUserSubscriptions = allUsers.filter((user) => user.subscription?.status === "active").length
  const totalExpiredUsers = allUsers.filter((user) => user.subscription?.status === "expired").length
  const totalTrialUsers = allUsers.filter((user) => user.subscription?.status === "trial").length

  const totalActiveSubscriptionsOverall = totalActiveShopSubscriptions + totalActiveUserSubscriptions

  // Owner Categorization
  const ownersFullySubscribed = []
  const ownersPartiallySubscribed = []
  const ownersTrial = []
  const ownersUnsubscribed = []

  allOwners.forEach((owner) => {
    const ownerShops = allShops.filter((shop) => shop.owner?._id === owner._id)

    let ownerSubscriptionStatus = "unsubscribed"

    if (ownerShops.length > 0) {
      const allActive = ownerShops.every((shop) => shop.subscription?.status === "active")
      const anyActive = ownerShops.some((shop) => shop.subscription?.status === "active")
      const anyTrial = ownerShops.some((shop) => shop.subscription?.status === "trial")
      const anyExpired = ownerShops.some((shop) => shop.subscription?.status === "expired")

      if (allActive) {
        ownerSubscriptionStatus = "fully"
      } else if (anyActive) {
        ownerSubscriptionStatus = "partially"
      } else if (anyTrial && !anyActive && !anyExpired) {
        ownerSubscriptionStatus = "trial"
      } else {
        ownerSubscriptionStatus = "unsubscribed"
      }
    }

    if (ownerSubscriptionStatus === "fully") {
      ownersFullySubscribed.push(owner)
    } else if (ownerSubscriptionStatus === "partially") {
      ownersPartiallySubscribed.push(owner)
    } else if (ownerSubscriptionStatus === "trial") {
      ownersTrial.push(owner)
    } else {
      ownersUnsubscribed.push(owner)
    }
  })

  const ownersFullySubscribedCount = ownersFullySubscribed.length
  const ownersPartiallySubscribedCount = ownersPartiallySubscribed.length
  const ownersTrialCount = ownersTrial.length
  const ownersUnsubscribedCount = ownersUnsubscribed.length

  // User Categorization
  const usersSubscribedCount = allUsers.filter((user) => user.subscription?.status === "active").length
  const usersTrialCount = allUsers.filter((user) => user.subscription?.status === "trial").length
  const usersUnsubscribedCount = allUsers.filter(
    (user) => user.subscription?.status === "expired" || !user.subscription?.status,
  ).length

  // Income Calculation
  const calculateDummyIncome = (data) => {
    let totalIncome = 0
    let monthlyIncome = 0
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    data.forEach((item) => {
      if (item.subscription?.status === "active" && item.subscription.lastPlanInfo?.plan) {
        const planDetails = item.subscription.lastPlanInfo.plan
        if (planDetails && planDetails.price) {
          const price = planDetails.price
          totalIncome += price
          const startDate = new Date(item.subscription.lastPlanInfo.startDate)
          if (startDate.getMonth() === currentMonth && startDate.getFullYear() === currentYear) {
            monthlyIncome += price
          }
        }
      }
    })
    return { total: totalIncome, monthly: monthlyIncome }
  }

  const shopIncome = calculateDummyIncome(allShops)
  const userIncome = calculateDummyIncome(allUsers)
  const overallTotalIncome = shopIncome.total + userIncome.total
  const overallMonthlyIncome = shopIncome.monthly + userIncome.monthly

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-8">
        <BarChart3 size={22} className="text-blue-600" />
        Dashboard Overview
      </h2>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Shops */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Shops</p>
              <p className="text-3xl font-bold">{totalShops}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <Store size={28} />
            </div>
          </div>
        </div>

        {/* Unverified Shops */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Unverified Shops</p>
              <p className="text-3xl font-bold">{totalUnverifiedShops}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <ShieldOff size={28} />
            </div>
          </div>
        </div>

        {/* Active Subscriptions */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Active Subscriptions</p>
              <p className="text-3xl font-bold">{totalActiveSubscriptionsOverall}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <CheckCircle size={28} />
            </div>
          </div>
        </div>

        {/* Total Income */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Income (Overall)</p>
              <p className="text-3xl font-bold">₹{overallTotalIncome.toFixed(2)}</p>
              <p className="text-purple-200 text-xs mt-1">This Month: ₹{overallMonthlyIncome.toFixed(2)}</p>
              <p className="text-purple-300 text-xs">*(Dummy Calculation)*</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <DollarSign size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Unverified Shops Section */}
      {unverifiedShops.length > 0 && (
        <div className="mb-8">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
            <ShieldOff size={20} className="text-orange-600" />
            Shops Awaiting Verification
          </h3>
          <div className="space-y-4">
            {unverifiedShops.map((shop) => (
              <div
                key={shop._id}
                className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center justify-between hover:bg-orange-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-lg">{shop.name}</p>
                  <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                    <UserIcon size={14} />
                    <span>Owner: {shop.owner?.name || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                    <MapPin size={14} />
                    <span>{shop.address?.fullDetails || "No address provided"}</span>
                  </div>
                </div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  onClick={() => onVerifyShop(shop._id)}
                >
                  Verify Shop
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Owners Breakdown Section */}
      <div className="mb-8">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
          <Building size={20} className="text-blue-600" />
          Owners Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-100 text-sm">Total Owners</p>
                <p className="text-2xl font-bold">{allOwners.length}</p>
              </div>
              <UserIcon size={24} className="text-slate-200" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Fully Subscribed</p>
                <p className="text-2xl font-bold">{ownersFullySubscribedCount}</p>
              </div>
              <CheckCircle size={24} className="text-green-200" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Partially Subscribed</p>
                <p className="text-2xl font-bold">{ownersPartiallySubscribedCount}</p>
              </div>
              <TrendingUp size={24} className="text-yellow-200" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Owners in Trial</p>
                <p className="text-2xl font-bold">{ownersTrialCount}</p>
              </div>
              <Clock size={24} className="text-blue-200" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Unsubscribed</p>
                <p className="text-2xl font-bold">{ownersUnsubscribedCount}</p>
              </div>
              <XCircle size={24} className="text-red-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Users Breakdown Section */}
      <div>
        <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
          <Users size={20} className="text-blue-600" />
          Users Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm">Total Users</p>
                <p className="text-2xl font-bold">{totalUsers}</p>
              </div>
              <UserIcon size={24} className="text-indigo-200" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Subscribed Users</p>
                <p className="text-2xl font-bold">{usersSubscribedCount}</p>
              </div>
              <CheckCircle size={24} className="text-green-200" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Users in Trial</p>
                <p className="text-2xl font-bold">{usersTrialCount}</p>
              </div>
              <Clock size={24} className="text-blue-200" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Unsubscribed Users</p>
                <p className="text-2xl font-bold">{usersUnsubscribedCount}</p>
              </div>
              <XCircle size={24} className="text-red-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardView
