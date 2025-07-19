"use client"

import { useState, useEffect } from "react"
import { LayoutDashboard, Store, Users, Wallet } from "lucide-react"

// Import components
import DashboardView from "./components/DashboardView"
import ShopOwnersView from "./components/ShopOwnersView"
import OwnerDetailView from "./components/OwnerDetailView"
import UsersView from "./components/UsersView"
import SubsView from "./components/SubsView"
import UserDetailView from "./components/UserDetailView"

// Import static pages
import TermsAndConditions from "./components/StaticPages/TermsAndConditions"
import PrivacyPolicy from "./components/StaticPages/PrivacyPolicy"
import CancellationRefundPolicy from "./components/StaticPages/RefundPolicy"

// Admin App component
function Admin() {
  // State to manage the current active view
  const [activeView, setActiveView] = useState("dashboard")
  // State to hold the ID of the currently selected owner or user for detail views
  const [selectedOwnerId, setSelectedOwnerId] = useState(null)
  const [selectedUserId, setSelectedUserId] = useState(null)

  // Global state for all core data
  const [allOwners, setAllOwners] = useState([])
  const [allShops, setAllShops] = useState([])
  const [allBarbers, setAllBarbers] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [allSubscriptions, setAllSubscriptions] = useState([])
  const [loadingAllData, setLoadingAllData] = useState(true)
  const [errorAllData, setErrorAllData] = useState(null)

  // API base URL from environment variables
  const API_URL = "https://numbr-exq6.onrender.com"

  // --- IMPORTANT: AUTHENTICATION ---
  const authToken = localStorage.getItem("token")

  // Function to fetch all data
  const fetchAllData = async () => {
    setLoadingAllData(true)
    setErrorAllData(null)

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    }

    try {
      const [ownersRes, shopsRes, barbersRes, usersRes, subscriptionsRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/owners`, { headers }),
        fetch(`${API_URL}/api/admin/shops`, { headers }),
        fetch(`${API_URL}/api/admin/barbers`, { headers }),
        fetch(`${API_URL}/api/admin/users`, { headers }),
        fetch(`${API_URL}/api/subscriptions`, { headers }),
      ])

      if (!ownersRes.ok || !shopsRes.ok || !barbersRes.ok || !usersRes.ok || !subscriptionsRes.ok) {
        throw new Error(`Failed to fetch initial data.`)
      }

      const ownersData = await ownersRes.json()
      const shopsData = await shopsRes.json()
      const barbersData = await barbersRes.json()
      const usersData = await usersRes.json()
      const subscriptionsData = await subscriptionsRes.json()

      setAllOwners(ownersData.data)
      setAllShops(shopsData.data)
      setAllBarbers(barbersData)
      setAllUsers(usersData.data)
      setAllSubscriptions(subscriptionsData)
    } catch (err) {
      console.error("Error fetching all data:", err)
      setErrorAllData(
        `Failed to load application data. Please ensure your backend is running, accessible, and that the provided Auth Token is valid. Error: ${err.message}`,
      )
    } finally {
      setLoadingAllData(false)
    }
  }

  useEffect(() => {
    if (authToken === "REPLACE_WITH_YOUR_ADMIN_JWT_TOKEN" || !authToken) {
      setErrorAllData("Authentication token is not set. Please log in.")
      setLoadingAllData(false)
      return
    }
    fetchAllData()
  }, [API_URL, authToken])

  // Handler for verifying a shop
  const handleShopVerification = async (shopId) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/shops/${shopId}/verify`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ verified: true }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to verify shop.")
      }

      alert("Shop verified successfully!")
      // Refresh all data to ensure UI is consistent
      fetchAllData()
    } catch (err) {
      console.error("Error verifying shop:", err)
      alert(`Error: ${err.message}`)
    }
  }

  // Display loading message
  if (loadingAllData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <div className="text-gray-700 font-medium">Loading application data...</div>
        </div>
      </div>
    )
  }

  // Display error message
  if (errorAllData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <div className="text-red-600 font-semibold mb-2">Error</div>
          <div className="text-gray-700">{errorAllData}</div>
        </div>
      </div>
    )
  }

  // Callback function to handle selecting an owner for detail view
  const handleSelectOwner = (id) => {
    setSelectedOwnerId(id._id)
    console.log("Selected Owner ID:",allOwners.find((o) => o._id === selectedOwnerId))

    setActiveView("ownerDetail");
  }

  // Callback function to handle selecting a user for detail view
  const handleSelectUser = (id) => {
    setSelectedUserId(id)
    setActiveView("userDetail")
  }

  // Callback to navigate back to the owner list view
  const handleBackToOwners = () => {
    setSelectedOwnerId(null)
    setActiveView("owners")
  }

  // Callback to navigate back to the user list view
  const handleBackToUsers = () => {
    setSelectedUserId(null)
    setActiveView("users")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-black shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="flex items-center gap-3 text-white text-xl font-bold">
              <LayoutDashboard size={28} className="text-white" />
              Numbr Admin
            </h1>
            <nav className="flex items-center space-x-1">
              <button
                onClick={() => setActiveView("dashboard")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeView === "dashboard"
                    ? "bg-white text-black"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </button>
              <button
                onClick={() => setActiveView("owners")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeView === "owners" || activeView === "ownerDetail"
                    ? "bg-white text-black"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Store size={16} />
                Owners
              </button>
              <button
                onClick={() => setActiveView("users")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeView === "users" || activeView === "userDetail"
                    ? "bg-white text-black"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Users size={16} />
                Users
              </button>
              <button
                onClick={() => setActiveView("subs")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeView === "subs" ? "bg-white text-black" : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Wallet size={16} />
                Subscription
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === "dashboard" && (
          <DashboardView
            allShops={allShops}
            allUsers={allUsers}
            allSubscriptions={allSubscriptions}
            allOwners={allOwners}
            onVerifyShop={handleShopVerification}
          />
        )}
        {activeView === "owners" && (
          <ShopOwnersView owners={allOwners} shops={allShops} barbers={allBarbers} onSelectOwner={handleSelectOwner} />
        )}
        {activeView === "ownerDetail" && selectedOwnerId && (
          <OwnerDetailView
            owner={allOwners.find((o) => o._id === selectedOwnerId)}
            onBack={handleBackToOwners}
            onVerifyShop={handleShopVerification}
          />
        )}
        {activeView === "users" && <UsersView users={allUsers} onSelectUser={handleSelectUser} />}
        {activeView === "userDetail" && selectedUserId && (
          <UserDetailView user={allUsers.find((u) => u._id === selectedUserId)} onBack={handleBackToUsers} />
        )}
        {activeView === "subs" && <SubsView users={allUsers} onSelectUser={handleSelectUser} />}
        {activeView === "terms" && <TermsAndConditions />}
        {activeView === "privacy" && <PrivacyPolicy />}
        {activeView === "cancellation" && <CancellationRefundPolicy />}
      </main>
    </div>
  )
}

export default Admin
