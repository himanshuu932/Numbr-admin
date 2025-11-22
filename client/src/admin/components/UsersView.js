import React, { useState } from 'react';
import { Users, Filter, User, Phone, Calendar, CircleCheck, Search } from 'lucide-react';
import SubscriptionTag from './SubscriptionTag';

// Component to display Users information (List View)
function UsersView({ users = [], onSelectUser = [] }) {
  const [userSubscriptionFilter, setUserSubscriptionFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Process users: Filter -> Sort -> Paginate
  const getProcessedUsers = () => {
    let processed = [...users];

    // 1. Filter
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      processed = processed.filter(user =>
        user.name.toLowerCase().includes(lowerTerm) ||
        user.phone.toLowerCase().includes(lowerTerm)
      );
    }

    if (userSubscriptionFilter !== 'all') {
      processed = processed.filter(user => user.subscription?.status === userSubscriptionFilter);
    }

    // 2. Sort
    processed.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Handle nested properties
      if (sortConfig.key === 'subscriptionStatus') {
        aValue = a.subscription?.status || '';
        bValue = b.subscription?.status || '';
      }

      // Handle strings
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return processed;
  };

  const processedUsers = getProcessedUsers();
  const totalPages = Math.ceil(processedUsers.length / itemsPerPage);

  // 3. Paginate
  const paginatedUsers = processedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h2 className="flex items-center text-2xl font-bold text-gray-900 mb-8">
        <Users size={28} className="text-blue-600 mr-3" /> Users Information
      </h2>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Search Users</label>
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
              value={userSubscriptionFilter}
              onChange={(e) => { setUserSubscriptionFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="expired">Expired</option>
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
            <option value="phone">Phone</option>
            <option value="subscriptionStatus">Status</option>
          </select>
        </div>
      </div>

      {processedUsers.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">No users found matching your criteria.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-2">
                    <User size={14} /> Name
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('phone')}>
                  <div className="flex items-center gap-2">
                    <Phone size={14} /> Phone
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('subscriptionStatus')}>
                  <div className="flex items-center gap-2">
                    <CircleCheck size={14} /> Status
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} /> Subscription Dates
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paginatedUsers.map(user => (
                <tr
                  key={user._id}
                  className="hover:bg-blue-50/50 cursor-pointer transition-colors duration-150"
                  onClick={() => onSelectUser(user._id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 font-mono">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="transform scale-90 origin-left">
                      <SubscriptionTag status={user.subscription?.status} />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.subscription?.status === 'trial' && user.subscription?.trialEndDate ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        Trial Ends: {new Date(user.subscription.trialEndDate).toLocaleDateString()}
                      </span>
                    ) : user.subscription?.lastPlanInfo?.startDate && user.subscription?.lastPlanInfo?.endDate ? (
                      <div className="flex flex-col text-xs">
                        <span className="text-green-700 font-medium">From: {new Date(user.subscription.lastPlanInfo.startDate).toLocaleDateString()}</span>
                        <span className="text-red-700 font-medium">To: {new Date(user.subscription.lastPlanInfo.endDate).toLocaleDateString()}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 pt-6 mt-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-gray-900">{Math.min(currentPage * itemsPerPage, processedUsers.length)}</span> of <span className="font-bold text-gray-900">{processedUsers.length}</span> results
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

export default UsersView;