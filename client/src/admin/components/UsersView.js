// barbers-dev-panel/src/components/UsersView.js
import React, { useState } from 'react';
import { Users, Filter, User, Phone, Calendar, CircleCheck } from 'lucide-react';
import SubscriptionTag from './SubscriptionTag';

// Component to display Users information (List View)
function UsersView({ users, onSelectUser }) {
  const [userSubscriptionFilter, setUserSubscriptionFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    return userSubscriptionFilter === 'all' || user.subscription?.status === userSubscriptionFilter;
  });

  return (
    <div className="section-card">
      <h2 className="section-title">
        <Users size={22} color="var(--color-brand-primary)" /> Users Information
      </h2>

      <div className="filter-section">
        <div className="form-group filter-group">
          <label htmlFor="userSubscriptionFilter" className="form-label">
            <Filter size={14} color="var(--color-text-light)" style={{ marginRight: '0.4rem' }} />Filter by Subscription Status:
          </label>
          <select
            id="userSubscriptionFilter"
            className="form-select"
            value={userSubscriptionFilter}
            onChange={(e) => setUserSubscriptionFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="trial">Trial</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <p className="text-gray-500 text-center" style={{ marginTop: '1.5rem' }}>No users found matching the current filter.</p>
      ) : (
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th><User size={14} color="var(--color-text-light)" /> Name</th>
                <th><Phone size={14} color="var(--color-text-light)" /> Phone</th>
                <th><CircleCheck size={14} color="var(--color-text-light)" /> Subscription Status</th>
                <th><Calendar size={14} color="var(--color-text-light)" /> Subscription Dates</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id} className="user-table-row" onClick={() => onSelectUser(user._id)}> {/* Changed user.id to user._id */}
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>
                    <SubscriptionTag status={user.subscription?.status} />
                  </td>
                  <td>
                    {user.subscription?.status === 'trial' && user.subscription?.trialEndDate ? (
                      `Trial Ends: ${new Date(user.subscription.trialEndDate).toLocaleDateString()}`
                    ) : user.subscription?.lastPlanInfo?.startDate && user.subscription?.lastPlanInfo?.endDate ? (
                      `From: ${new Date(user.subscription.lastPlanInfo.startDate).toLocaleDateString()} To: ${new Date(user.subscription.lastPlanInfo.endDate).toLocaleDateString()}`
                    ) : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UsersView;