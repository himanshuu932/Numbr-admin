import React, { useState } from 'react';
import { Store, User, Phone, Building, Filter, Search } from 'lucide-react';
import SubscriptionTag from './SubscriptionTag';
import OwnerDetailView from './OwnerDetailView';

function ShopOwnersView({ owners = [], onSelectOwner = [] }) {
  const [ownerFilter, setOwnerFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOwner, setSelectedOwner] = useState(null);

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
        shopsDetails: ownerShops.map(shop => ({
          ...shop,
          barbersInShop: shop.barbers || []
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

  const handleSelectOwner = (owner) => {
    setSelectedOwner(owner);
    onSelectOwner(owner);

  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="flex items-center text-xl font-semibold text-gray-900 mb-6">
        <Store size={22} className="text-blue-600 mr-2" /> Shop Owners
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="ownerSearch" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Search size={14} className="text-gray-400 mr-2" />Search Owners
          </label>
          <input
            id="ownerSearch"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="ownerFilter" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Filter size={14} className="text-gray-400 mr-2" />Filter by Subscription
          </label>
          <select
            id="ownerFilter"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
        <p className="text-gray-500 text-center mt-6">No owners found matching the current filters.</p>
      )}

      {partiallySubscribed.length > 0 && (
        <div className="mb-8">
          <h3 className="flex items-center text-lg font-medium text-orange-600 mb-4">
            <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
            Partially Subscribed Owners ({partiallySubscribed.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partiallySubscribed.map(owner => (
              <div 
                key={owner._id} 
                className="bg-white border-2 border-orange-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleSelectOwner(owner)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center mr-3">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{owner.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-1"></div>
                    N/A
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Phone size={14} className="text-gray-400 mr-2" />
                    Phone:
                  </div>
                  <div className="flex items-center">
                    <Building size={14} className="text-gray-400 mr-2" />
                    Total Shops: {owner.shopsDetails.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {trial.length > 0 && (
        <div className="mb-8">
          <h3 className="flex items-center text-lg font-medium text-blue-600 mb-4">
            <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
            Owners in Trial ({trial.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trial.map(owner => (
              <div 
                key={owner._id} 
                className="bg-white border-2 border-blue-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleSelectOwner(owner)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{owner.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
                    Trial
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Phone size={14} className="text-gray-400 mr-2" />
                    Phone:
                  </div>
                  <div className="flex items-center">
                    <Building size={14} className="text-gray-400 mr-2" />
                    Total Shops: {owner.shopsDetails.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {unsubscribed.length > 0 && (
        <div className="mb-8">
          <h3 className="flex items-center text-lg font-medium text-red-600 mb-4">
            <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
            Unsubscribed Owners ({unsubscribed.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unsubscribed.map(owner => (
              <div 
                key={owner._id} 
                className="bg-white border-2 border-red-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleSelectOwner(owner)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{owner.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-1"></div>
                    N/A
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Phone size={14} className="text-gray-400 mr-2" />
                    Phone:
                  </div>
                  <div className="flex items-center">
                    <Building size={14} className="text-gray-400 mr-2" />
                    Total Shops: {owner.shopsDetails.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {fullySubscribed.length > 0 && (
        <div className="mb-8">
          <h3 className="flex items-center text-lg font-medium text-green-600 mb-4">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
            Fully Subscribed Owners ({fullySubscribed.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fullySubscribed.map(owner => (
              <div 
                key={owner._id} 
                className="bg-white border-2 border-green-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleSelectOwner(owner)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{owner.name}</span>
                  </div>
                  <SubscriptionTag status={owner.subscriptionStatus} />
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Phone size={14} className="text-gray-400 mr-2" />
                    Phone: {owner.phone}
                  </div>
                  <div className="flex items-center">
                    <Building size={14} className="text-gray-400 mr-2" />
                    Total Shops: {owner.shopsDetails.length}
                  </div>
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