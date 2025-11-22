import React, { useState } from 'react';
import { Store, User, Phone, Building, Filter, Search } from 'lucide-react';
import SubscriptionTag from './SubscriptionTag';
import OwnerDetailView from './OwnerDetailView';

function ShopOwnersView({ owners = [], onSelectOwner = [] }) {
  const [ownerFilter, setOwnerFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Process owners: Filter -> Sort -> Paginate
  const getProcessedOwners = () => {
    let processed = owners.map(owner => {
      const ownerShops = owner.shops || [];
      let status = 'unsubscribed';

      if (ownerShops.length > 0) {
        const allActive = ownerShops.every(shop => shop.subscription?.status === 'active');
        const anyActive = ownerShops.some(shop => shop.subscription?.status === 'active');
        const anyTrial = ownerShops.some(shop => shop.subscription?.status === 'trial');
        const anyExpired = ownerShops.some(shop => shop.subscription?.status === 'expired');

        if (allActive) status = 'fully';
        else if (anyActive) status = 'partially';
        else if (anyTrial && !anyActive && !anyExpired) status = 'trial';
      }

      return {
        ...owner,
        subscriptionStatus: status,
        shopsDetails: ownerShops.map(shop => ({
          ...shop,
          barbersInShop: shop.barbers || []
        })),
        shopCount: ownerShops.length
      };
    });

    // 1. Filter
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      processed = processed.filter(owner =>
        owner.name.toLowerCase().includes(lowerTerm) ||
        owner.phone.toLowerCase().includes(lowerTerm)
      );
    }

    if (ownerFilter !== 'all') {
      processed = processed.filter(owner => owner.subscriptionStatus === ownerFilter);
    }

    // 2. Sort
    processed.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Handle special cases
      if (sortConfig.key === 'name') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return processed;
  };

  const processedOwners = getProcessedOwners();
  const totalPages = Math.ceil(processedOwners.length / itemsPerPage);

  // 3. Paginate
  const paginatedOwners = processedOwners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Helper function to get status-based styling
  const getStatusStyles = (status) => {
    switch (status) {
      case 'fully':
        return {
          card: 'bg-gradient-to-br from-green-50 to-white border-green-200 hover:border-green-300 hover:shadow-green-100',
          avatar: 'bg-green-50 group-hover:bg-green-100 border-green-100 group-hover:border-green-200',
          icon: 'text-green-500 group-hover:text-green-600',
          divider: 'border-green-100'
        };
      case 'partially':
        return {
          card: 'bg-gradient-to-br from-blue-50 to-white border-blue-200 hover:border-blue-300 hover:shadow-blue-100',
          avatar: 'bg-blue-50 group-hover:bg-blue-100 border-blue-100 group-hover:border-blue-200',
          icon: 'text-blue-500 group-hover:text-blue-600',
          divider: 'border-blue-100'
        };
      case 'trial':
        return {
          card: 'bg-gradient-to-br from-orange-50 to-white border-orange-200 hover:border-orange-300 hover:shadow-orange-100',
          avatar: 'bg-orange-50 group-hover:bg-orange-100 border-orange-100 group-hover:border-orange-200',
          icon: 'text-orange-500 group-hover:text-orange-600',
          divider: 'border-orange-100'
        };
      case 'unsubscribed':
      default:
        return {
          card: 'bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-gray-300 hover:shadow-gray-100',
          avatar: 'bg-gray-50 group-hover:bg-gray-100 border-gray-100 group-hover:border-gray-200',
          icon: 'text-gray-400 group-hover:text-gray-500',
          divider: 'border-gray-100'
        };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-8">
        <Store size={28} className="text-blue-600 mr-3" /> Shop Owners
      </h2>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Search Owners</label>
          <div className="relative group">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-gray-700 placeholder-gray-400"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full lg:w-56">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Filter Status</label>
          <div className="relative group">
            <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <select
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-gray-700 appearance-none cursor-pointer"
              value={ownerFilter}
              onChange={(e) => { setOwnerFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="all">All Statuses</option>
              <option value="fully">Fully Subscribed</option>
              <option value="partially">Partially Subscribed</option>
              <option value="trial">Trial</option>
              <option value="unsubscribed">Unsubscribed</option>
            </select>
          </div>
        </div>

        <div className="w-full lg:w-56">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sort By</label>
          <select
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-gray-700 cursor-pointer"
            value={sortConfig.key}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="shopCount">Total Shops</option>
            <option value="subscriptionStatus">Status</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {paginatedOwners.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">No owners found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedOwners.map(owner => {
            const styles = getStatusStyles(owner.subscriptionStatus);
            return (
              <div
                key={owner._id}
                className={`${styles.card} border rounded-xl p-5 cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group`}
                onClick={() => onSelectOwner(owner)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-colors border ${styles.avatar}`}>
                      <User size={24} className={`transition-colors ${styles.icon}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight mb-0.5">{owner.name}</h3>
                      <p className="text-xs text-gray-400 font-mono">ID: {owner._id.slice(-6)}</p>
                    </div>
                  </div>
                  <div className="transform scale-90 origin-top-right">
                    <SubscriptionTag status={owner.subscriptionStatus} />
                  </div>
                </div>

                <div className={`space-y-3 text-sm text-gray-600 mt-4 pt-4 border-t ${styles.divider}`}>
                  <div className="flex items-center justify-between group/item">
                    <div className="flex items-center text-gray-400 group-hover/item:text-gray-600 transition-colors">
                      <Phone size={16} className="mr-2.5" />
                      Phone
                    </div>
                    <span className="font-semibold text-gray-700">{owner.phone}</span>
                  </div>
                  <div className="flex items-center justify-between group/item">
                    <div className="flex items-center text-gray-400 group-hover/item:text-gray-600 transition-colors">
                      <Building size={16} className="mr-2.5" />
                      Shops Owned
                    </div>
                    <span className="font-semibold text-gray-700 bg-white/60 px-2 py-0.5 rounded text-xs">{owner.shopCount}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-gray-900">{Math.min(currentPage * itemsPerPage, processedOwners.length)}</span> of <span className="font-bold text-gray-900">{processedOwners.length}</span> results
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopOwnersView;