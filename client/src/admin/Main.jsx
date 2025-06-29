import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Store, Users, FileText, Shield, Wallet } from 'lucide-react';
import {Link} from 'react-router-dom';
import './App.css';

// Import components
import DashboardView from './components/DashboardView';
import ShopOwnersView from './components/ShopOwnersView';
import OwnerDetailView from './components/OwnerDetailView';
import UsersView from './components/UsersView';
import SubsView from './components/SubsView';
import UserDetailView from './components/UserDetailView';

// Import static pages
import TermsAndConditions from './components/StaticPages/TermsAndConditions';
import PrivacyPolicy from './components/StaticPages/PrivacyPolicy';
import CancellationRefundPolicy from './components/StaticPages/RefundPolicy';


// Admin App component
function Admin() {
  // State to manage the current active view
  const [activeView, setActiveView] = useState('dashboard');
  // State to hold the ID of the currently selected owner or user for detail views
  const [selectedOwnerId, setSelectedOwnerId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Global state for all core data
  const [allOwners, setAllOwners] = useState([]);
  const [allShops, setAllShops] = useState([]);
  const [allBarbers, setAllBarbers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allSubscriptions, setAllSubscriptions] = useState([]);
  const [loadingAllData, setLoadingAllData] = useState(true);
  const [errorAllData, setErrorAllData] = useState(null);

  // API base URL from environment variables
    const API_URL = "https://numbr-exq6.onrender.com";

  // --- IMPORTANT: AUTHENTICATION ---
  // The admin routes are protected. A valid JWT token for an admin user must be sent.
  // In a real app, this token would be stored securely after a login process (e.g., in state, context, or secure storage).
  const authToken = localStorage.getItem('token'); // <--- !!! REPLACE THIS !!!

  // useEffect hook to fetch all necessary data when the component mounts
  useEffect(() => {
    const fetchAllData = async () => {
      setLoadingAllData(true);
      setErrorAllData(null);

      // --- IMPORTANT: Added Authorization header for protected routes ---
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      };

      try {
        // --- CORRECTED API ENDPOINTS ---
        // The URLs now point to the correct admin routes prefixed with /api, as defined in server.js and adminRoutes.js
        const [ownersRes, shopsRes, barbersRes, usersRes, subscriptionsRes] = await Promise.all([
          fetch(`${API_URL}/api/admin/owners`, { headers }),
          fetch(`${API_URL}/api/admin/shops`, { headers }),
          fetch(`${API_URL}/api/admin/barbers`, { headers }),
          fetch(`${API_URL}/api/admin/users`, { headers }),
          // NOTE: This fetches subscription *plans*, not active user subscriptions.
          // The backend may need an endpoint to fetch all active subscriptions for income calculation.
          fetch(`${API_URL}/api/subscriptions`, { headers })
        ]);

        // Check if all responses are OK.
        if (!ownersRes.ok || !shopsRes.ok || !barbersRes.ok || !usersRes.ok || !subscriptionsRes.ok) {
          const errorMessages = [];
          if (!ownersRes.ok) errorMessages.push(`Owners: ${ownersRes.status} ${ownersRes.statusText}`);
          if (!shopsRes.ok) errorMessages.push(`Shops: ${shopsRes.status} ${shopsRes.statusText}`);
          if (!barbersRes.ok) errorMessages.push(`Barbers: ${barbersRes.status} ${barbersRes.statusText}`);
          if (!usersRes.ok) errorMessages.push(`Users: ${usersRes.status} ${usersRes.statusText}`);
          if (!subscriptionsRes.ok) errorMessages.push(`Subscriptions: ${subscriptionsRes.status} ${subscriptionsRes.statusText}`);
          throw new Error(`Failed to fetch initial data: ${errorMessages.join('; ')}`);
        }

        // Parse JSON data from all responses
        const ownersData = await ownersRes.json();
        const shopsData = await shopsRes.json();
        const barbersData = await barbersRes.json();
        const usersData = await usersRes.json();
        const subscriptionsData = await subscriptionsRes.json();

        setAllOwners(ownersData.data);
        setAllShops(shopsData.data);
        setAllBarbers(barbersData);
        setAllUsers(usersData.data);
        setAllSubscriptions(subscriptionsData);

      } catch (err) {
        console.error('Error fetching all data:', err);
        setErrorAllData(`Failed to load application data. Please ensure your backend is running, accessible, and that the provided Auth Token is valid. Error: ${err.message}`);
      } finally {
        setLoadingAllData(false);
      }
    };

    // Do not fetch if the placeholder token hasn't been replaced.
    if (authToken === 'REPLACE_WITH_YOUR_ADMIN_JWT_TOKEN') {
        setErrorAllData('Authentication token is not set. Please edit App.js and provide a valid admin JWT token.');
        setLoadingAllData(false);
        return;
    }
    fetchAllData();
  }, [API_URL, authToken]); // Re-run if API_URL or token changes.

  // Display loading message
  if (loadingAllData) {
    return (
      <div className="app-container flex-center" style={{ minHeight: '100vh' }}>
        <div className="loading-message">Loading application data...</div>
      </div>
    );
  }


  // Callback function to handle selecting an owner for detail view
  const handleSelectOwner = (id) => {
    setSelectedOwnerId(id);
    console.log(id);
    setActiveView('ownerDetail');
  };

  // Callback function to handle selecting a user for detail view
  const handleSelectUser = (id) => {
    setSelectedUserId(id);
    console.log(allUsers);
    setActiveView('userDetail');
  };

  // Callback to navigate back to the owner list view
  const handleBackToOwners = () => {
    setSelectedOwnerId(null);
    setActiveView('owners');
  };

  // Callback to navigate back to the user list view
  const handleBackToUsers = () => {
    setSelectedUserId(null);
    setActiveView('users');
  };

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <div className="container-content header-content">
          <h1 className="header-title">
            <LayoutDashboard size={32} strokeWidth={2.5} color="var(--color-text-white)" />
            Numbr
          </h1>
          <nav className="header-nav">
            <Link to="/dashboard" onClick={() => setActiveView('dashboard')} className={`nav-button ${activeView === 'dashboard' ? 'active' : ''}`}>
              <LayoutDashboard size={18} color={activeView === 'dashboard' ? "var(--color-brand-primary)" : "var(--color-text-white)"} /> Dashboard
            </Link>
            <Link to="/owners" onClick={() => setActiveView('owners')} className={`nav-button ${activeView === 'owners' || activeView === 'ownerDetail' ? 'active' : ''}`}>
              <Store size={18} color={activeView === 'owners' || activeView === 'ownerDetail' ? "var(--color-brand-primary)" : "var(--color-text-white)"} /> Owners
            </Link>
            <Link to="/users" onClick={() => setActiveView('users')} className={`nav-button ${activeView === 'users' || activeView === 'userDetail' ? 'active' : ''}`}>
              <Users size={18} color={activeView === 'users' || activeView === 'userDetail' ? "var(--color-brand-primary)" : "var(--color-text-white)"} /> Users
            </Link>
              <Link to="/subscription" onClick={() => setActiveView('subs')} className={`nav-button ${activeView === 'subs' ? 'active' : ''}`}> {/* FIX IS HERE */}
              <Users size={18} color={activeView === 'subs' ? "var(--color-brand-primary)" : "var(--color-text-white)"} /> Subscription
            </Link>
          </nav>
        </div>
      </header>

  
      <main className="main-content">
        <div className="main-content-inner">
          {activeView === 'dashboard' && (
            <DashboardView
              allShops={allShops}
              allUsers={allUsers}
              allSubscriptions={allSubscriptions}
              allOwners={allOwners}
            />
          )}
          {activeView === 'owners' && (
            <ShopOwnersView
              owners={allOwners}
              shops={allShops}
              barbers={allBarbers}
              onSelectOwner={handleSelectOwner}
            />
          )}
          {/* --- CORRECTED DETAIL VIEW RENDERING --- */}
          {/* Instead of passing just an ID and re-fetching, we find the data from state and pass the full objects. */}
          {/* This avoids another network call and works with the current backend which lacks `GET /items/:id` endpoints. */}
          {/* NOTE: You may need to update OwnerDetailView to accept these new props (`owner`, `shops`, `barbers`) instead of `ownerId`. */}
          {activeView === 'ownerDetail' && selectedOwnerId && (
            <OwnerDetailView
              owner={selectedOwnerId} // Pass the full owner object
              onBack={handleBackToOwners}
            />
          )}
          {activeView === 'users' && (
            <UsersView
              users={allUsers}
              onSelectUser={handleSelectUser}
            />
          )}
          {/* NOTE: You may need to update UserDetailView to accept the `user` object prop instead of `userId`. */}
          {activeView === 'userDetail' && selectedUserId && (
            <UserDetailView
              user={allUsers.find(u => u._id === selectedUserId)}
              onBack={handleBackToUsers}
            />
          )}
        
          {activeView === 'subs' && (
            <SubsView
              users={allUsers}
              onSelectUser={handleSelectUser}
            />
          )}




          {activeView === 'terms' && <TermsAndConditions />}
          {activeView === 'privacy' && <PrivacyPolicy />}
          {activeView === 'cancellation' && <CancellationRefundPolicy />}
        </div>
      </main>


    </div>
  );
}

export default Admin;