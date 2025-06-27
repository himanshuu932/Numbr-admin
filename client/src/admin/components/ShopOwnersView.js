// barbers-dev-panel/src/components/ShopOwnersView.js

import React, { useState } from 'react';
import { Store, User, Phone, Building, Filter, Search } from 'lucide-react';
import SubscriptionTag from './SubscriptionTag';
import OwnerDetailView from './OwnerDetailView'; // Import the OwnerDetailView component

// Component to display Shop Owners information (List View)
function ShopOwnersView({ owners, onSelectOwner }) {
  const [ownerFilter, setOwnerFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
   // State for modal visibility
  const [selectedOwner, setSelectedOwner] = useState(null); // State for selected owner object

  // Function to categorize owners based on shops data and apply filter
  const getCategorizedAndFilteredOwners = () => {
    const categorized = {
      fullySubscribed: [],
      partiallySubscribed: [],
      unsubscribed: [],
      trial: []
    };

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    owners.forEach(owner => {
      const matchesSearch = owner.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                            owner.phone.toLowerCase().includes(lowerCaseSearchTerm);

      if (!matchesSearch) {
        return;
      }

      const ownerShops = owner.shops;

      let ownerSubscriptionStatus = 'unsubscribed';

      if (ownerShops.length > 0) {
        const allActive = ownerShops.every(shop => shop.subscription?.status === 'active');
        const anyActive = ownerShops.some(shop => shop.subscription?.status === 'active');
        const anyTrial = ownerShops.some(shop => shop.subscription?.status === 'trial');
        const anyExpired = ownerShops.some(shop => shop.subscription?.status === 'expired');

        if (allActive) {
          ownerSubscriptionStatus = 'fully';
        } else if (anyActive) {
          ownerSubscriptionStatus = 'partially';
        } else if (anyTrial && !anyActive && !anyExpired) {
          ownerSubscriptionStatus = 'trial';
        } else {
          ownerSubscriptionStatus = 'unsubscribed';
        }
      }

      const ownerWithDetails = {
        ...owner,
        subscriptionStatus: ownerSubscriptionStatus,
        // Ensure shopsDetails is correctly populated here if owner.shops already has barbers
        shopsDetails: ownerShops.map(shop => ({
          ...shop,
          barbersInShop: shop.barbers || [] // Ensure barbersInShop is an array
        }))
      };

      if (ownerSubscriptionStatus === 'fully') {
        categorized.fullySubscribed.push(ownerWithDetails);
      } else if (ownerSubscriptionStatus === 'partially') {
        categorized.partiallySubscribed.push(ownerWithDetails);
      } else if (ownerSubscriptionStatus === 'trial') {
        categorized.trial.push(ownerWithDetails);
      } else {
        categorized.unsubscribed.push(ownerWithDetails);
      }
    });

    if (ownerFilter === 'fully') return { fullySubscribed: categorized.fullySubscribed, partiallySubscribed: [], unsubscribed: [], trial: [] };
    if (ownerFilter === 'partially') return { fullySubscribed: [], partiallySubscribed: categorized.partiallySubscribed, unsubscribed: [], trial: [] };
    if (ownerFilter === 'unsubscribed') return { fullySubscribed: [], partiallySubscribed: [], unsubscribed: categorized.unsubscribed, trial: [] };
    if (ownerFilter === 'trial') return { fullySubscribed: [], partiallySubscribed: [], unsubscribed: [], trial: categorized.trial };

    return categorized;
  };

  const { fullySubscribed, partiallySubscribed, unsubscribed, trial } = getCategorizedAndFilteredOwners();

  const totalFilteredOwners = fullySubscribed.length + partiallySubscribed.length + unsubscribed.length + trial.length;

  // Handler to open the modal and set the selected owner object
  const handleSelectOwner = (owner) => {
    setSelectedOwner(owner);
    onSelectOwner(owner);
    console.log(owner)
  };



  return (
    <div className="section-card">
      <h2 className="section-title">
        <Store size={22} color="var(--color-brand-primary)" /> Shop Owners
      </h2>

      <div className="filter-section">
        <div className="form-group filter-group">
          <label htmlFor="ownerSearch" className="form-label">
            <Search size={14} color="var(--color-text-light)" style={{ marginRight: '0.4rem' }} />Search Owners:
          </label>
          <input
            id="ownerSearch"
            type="text"
            className="form-input"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="form-group filter-group">
          <label htmlFor="ownerFilter" className="form-label">
            <Filter size={14} color="var(--color-text-light)" style={{ marginRight: '0.4rem' }} />Filter by Subscription:
          </label>
          <select
            id="ownerFilter"
            className="form-select"
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
          >
            <option value="all">All Owners</option>
            <option value="fully">Fully Subscribed</option>
            <option value="partially">Partially Subscribed</option>
            <option value="unsubscribed">Unsubscribed</option>
            <option value="trial">Trial</option>
          </select>
        </div>
      </div>

      {totalFilteredOwners === 0 && (
        <p className="text-gray-500 text-center" style={{ marginTop: '1.5rem' }}>No owners found matching the current filters.</p>
      )}

      {fullySubscribed.length > 0 && (
        <div className="subsection-owners">
          <h3 className="subsection-title green">Fully Subscribed Owners ({fullySubscribed.length})</h3>
          <div className="grid-cols-1 grid-cols-2-sm grid-cols-3-lg">
            {fullySubscribed.map(owner => (
              <div key={owner._id} className="info-card owner-card fully-subscribed clickable" onClick={() => handleSelectOwner(owner)}>
                <div className="info-card-header">
                    <p className="info-card-name">
                        <User size={18} color="var(--color-text-default)" /> {owner.name}
                    </p>
                    <SubscriptionTag status={owner.subscriptionStatus} />
                </div>
                <div className="info-card-details">
                    <p><Phone size={14} color="var(--color-text-light)" style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />Phone: {owner.phone}</p>
                    <p><Building size={14} color="var(--color-text-light)" style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />Total Shops: {owner.shopsDetails.length}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {partiallySubscribed.length > 0 && (
        <div className="subsection-owners">
          <h3 className="subsection-title yellow">Partially Subscribed Owners ({partiallySubscribed.length})</h3>
          <div className="grid-cols-1 grid-cols-2-sm grid-cols-3-lg">
            {partiallySubscribed.map(owner => (
              <div key={owner._id} className="info-card owner-card partially-subscribed clickable" onClick={() => handleSelectOwner(owner)}>
                <div className="info-card-header">
                    <p className="info-card-name">
                        <User size={18} color="var(--color-text-default)" /> {owner.name}
                    </p>
                    <SubscriptionTag status={owner.subscriptionStatus} />
                </div>
                <div className="info-card-details">
                    <p><Phone size={14} color="var(--color-text-light)" style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />Phone: {owner.phone}</p>
                    <p><Building size={14} color="var(--color-text-light)" style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />Total Shops: {owner.shopsDetails.length}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {trial.length > 0 && (
        <div className="subsection-owners">
          <h3 className="subsection-title blue">Owners in Trial ({trial.length})</h3>
          <div className="grid-cols-1 grid-cols-2-sm grid-cols-3-lg">
            {trial.map(owner => (
              <div key={owner._id} className="info-card owner-card trial clickable" onClick={() => handleSelectOwner(owner)}>
                <div className="info-card-header">
                    <p className="info-card-name">
                        <User size={18} color="var(--color-text-default)" /> {owner.name}
                    </p>
                    <SubscriptionTag status={owner.subscriptionStatus} />
                </div>
                <div className="info-card-details">
                    <p><Phone size={14} color="var(--color-text-light)" style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />Phone: {owner.phone}</p>
                    <p><Building size={14} color="var(--color-text-light)" style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />Total Shops: {owner.shopsDetails.length}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {unsubscribed.length > 0 && (
        <div>
          <h3 className="subsection-title red">Unsubscribed Owners ({unsubscribed.length})</h3>
          <div className="grid-cols-1 grid-cols-2-sm grid-cols-3-lg">
            {unsubscribed.map(owner => (
              <div key={owner._id} className="info-card owner-card unsubscribed clickable" onClick={() => handleSelectOwner(owner)}>
                <div className="info-card-header">
                    <p className="info-card-name">
                        <User size={18} color="var(--color-text-default)" /> {owner.name}
                    </p>
                    <SubscriptionTag status={owner.subscriptionStatus} />
                </div>
                <div className="info-card-details">
                    <p><Phone size={14} color="var(--color-text-light)" style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />Phone: {owner.phone}</p>
                    <p><Building size={14} color="var(--color-text-light)" style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />Total Shops: {owner.shopsDetails.length}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

  
    </div>
  );
}

export default ShopOwnersView;