// barbers-dev-panel/src/components/DashboardView.js

import React from 'react';
import { Store, Users, DollarSign, CalendarX, BarChart3, TrendingUp, User, Building, Clock, CheckCircle, XCircle } from 'lucide-react';

// MODIFIED: Added allOwners to the destructured props
const DashboardView = ({ allShops=[], allUsers=[], allSubscriptions=[], allOwners=[] }) => {
    // --- Overall Counts ---
    const totalShops = allShops.length;
    const totalUsers = allUsers.length;

    // --- Shop-related Subscriptions ---
    const totalActiveShopSubscriptions = allShops.filter(shop => shop.subscription?.status === 'active').length;
    const totalExpiredShops = allShops.filter(shop => shop.subscription?.status === 'expired').length;
    const totalTrialShops = allShops.filter(shop => shop.subscription?.status === 'trial').length;

    // --- User-related Subscriptions ---
    const totalActiveUserSubscriptions = allUsers.filter(user => user.subscription?.status === 'active').length;
    const totalExpiredUsers = allUsers.filter(user => user.subscription?.status === 'expired').length;
    const totalTrialUsers = allUsers.filter(user => user.subscription?.status === 'trial').length;

    const totalActiveSubscriptionsOverall = totalActiveShopSubscriptions + totalActiveUserSubscriptions;

    // --- Owner Categorization (FIXED: Aligned with ShopOwnersView for accuracy and mutual exclusivity) ---
    const ownersFullySubscribed = [];
    const ownersPartiallySubscribed = [];
    const ownersTrial = [];
    const ownersUnsubscribed = [];

    allOwners.forEach(owner => {
        // Filter shops associated with the current owner. Use owner._id for consistency.
        const ownerShops = allShops.filter(shop => shop.owner?._id === owner._id); 

        let ownerSubscriptionStatus = 'unsubscribed'; // Default status

        if (ownerShops.length > 0) {
            const allActive = ownerShops.every(shop => shop.subscription?.status === 'active');
            const anyActive = ownerShops.some(shop => shop.subscription?.status === 'active');
            const anyTrial = ownerShops.some(shop => shop.subscription?.status === 'trial');
            const anyExpired = ownerShops.some(shop => shop.subscription?.status === 'expired');

            if (allActive) {
                ownerSubscriptionStatus = 'fully';
            } else if (anyActive) {
                // If there's any active shop but not all are active, it's partially subscribed
                ownerSubscriptionStatus = 'partially';
            } else if (anyTrial && !anyActive && !anyExpired) {
                // If there's any trial shop, no active, and no expired, it's a trial
                ownerSubscriptionStatus = 'trial';
            } else {
                // If none of the above, it's unsubscribed (could have only expired shops or no shops with a valid status)
                ownerSubscriptionStatus = 'unsubscribed';
            }
        }
        // Owners with no shops will remain 'unsubscribed' by default, which is implicitly handled here.

        if (ownerSubscriptionStatus === 'fully') {
            ownersFullySubscribed.push(owner);
        } else if (ownerSubscriptionStatus === 'partially') {
            ownersPartiallySubscribed.push(owner);
        } else if (ownerSubscriptionStatus === 'trial') {
            ownersTrial.push(owner);
        } else {
            ownersUnsubscribed.push(owner);
        }
    });

    const ownersFullySubscribedCount = ownersFullySubscribed.length;
    const ownersPartiallySubscribedCount = ownersPartiallySubscribed.length;
    const ownersTrialCount = ownersTrial.length;
    const ownersUnsubscribedCount = ownersUnsubscribed.length;


    // --- User Categorization ---
    const usersSubscribedCount = allUsers.filter(user => user.subscription?.status === 'active').length;
    const usersTrialCount = allUsers.filter(user => user.subscription?.status === 'trial').length;
    // Users are unsubscribed if their subscription status is 'expired' or if they don't have a subscription status
    const usersUnsubscribedCount = allUsers.filter(user => user.subscription?.status === 'expired' || !user.subscription?.status).length;


    // --- DUMMY INCOME CALCULATION ---
    // This function calculates total and monthly income based on active subscriptions for a given data set (shops or users)
    const calculateDummyIncome = (data) => {
        let totalIncome = 0;
        let monthlyIncome = 0;
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        data.forEach(item => {
            // Check if the item has an active subscription and plan information
            if (item.subscription?.status === 'active' && item.subscription.lastPlanInfo?.plan) {
                // The backend is expected to populate `plan` with the full plan object including `price`
                const planDetails = item.subscription.lastPlanInfo.plan;

                if (planDetails && planDetails.price) {
                    const price = planDetails.price;
                    totalIncome += price; // Add to overall total income

                    // Check if the subscription start date is within the current month and year for monthly income
                    const startDate = new Date(item.subscription.lastPlanInfo.startDate);
                    if (startDate.getMonth() === currentMonth && startDate.getFullYear() === currentYear) {
                        monthlyIncome += price; // Add to current month's income
                    }
                }
            }
        });
        return { total: totalIncome, monthly: monthlyIncome };
    };

    // Calculate income for shops and users separately
    const shopIncome = calculateDummyIncome(allShops);
    const userIncome = calculateDummyIncome(allUsers);

    // Sum up for overall totals
    const overallTotalIncome = shopIncome.total + userIncome.total;
    const overallMonthlyIncome = shopIncome.monthly + userIncome.monthly;
    // --- END DUMMY INCOME CALCULATION ---

return (
    <div className="section-card">
        <h2 className="section-title">
            <BarChart3 size={22} color="var(--color-brand-primary)" /> Dashboard Overview
        </h2>

        <div className="summary-card-grid">
            {/* Total Shops Card */}
            <div className="summary-card total-shops">
                <div className="summary-card-icon">
                    <Store size={28} color="var(--color-text-white)" />
                </div>
                {/* Wrap text content in summary-card-content */}
                <div className="summary-card-content">
                    <p className="summary-card-title">Total Shops</p>
                    <p className="summary-card-value">{totalShops}</p>
                </div>
            </div>

            {/* Overall Active Subscriptions Card */}
            <div className="summary-card active-subscriptions">
                <div className="summary-card-icon">
                    <CheckCircle size={28} color="var(--color-text-white)" />
                </div>
                <div className="summary-card-content">
                    <p className="summary-card-title">Active Subscriptions</p>
                    <p className="summary-card-value">{totalActiveSubscriptionsOverall}</p>
                </div>
            </div>

            {/* Overall Income Card */}
            <div className="summary-card total-income">
                <div className="summary-card-icon">
                    <DollarSign size={28} color="var(--color-text-white)" />
                </div>
                <div className="summary-card-content">
                    <p className="summary-card-title">Income (Overall)</p>
                    <p className="summary-card-value">${overallTotalIncome.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">(This Month: ${overallMonthlyIncome.toFixed(2)})</p>
                    <p className="text-xs text-danger">*(Dummy Calculation)*</p>
                </div>
            </div>

            {/* Expired Shops Card */}
            <div className="summary-card expired-shops">
                <div className="summary-card-icon">
                    <CalendarX size={28} color="var(--color-text-white)" />
                </div>
                <div className="summary-card-content">
                    <p className="summary-card-title">Expired Shops</p>
                    <p className="summary-card-value">{totalExpiredShops}</p>
                </div>
            </div>
        </div>

        {/* Owners Breakdown Section */}
        <h3 className="detail-card-section-title" style={{ marginTop: 'var(--spacing-2xl)' }}>
            <Building size={20} color="var(--color-brand-primary)" /> Owners Breakdown
        </h3>
        <div className="summary-card-grid">
            {/* Total Owners Card */}
            <div className="summary-card owners">
                <div className="summary-card-icon">
                    <User size={28} color="var(--color-text-white)" />
                </div>
                <div className="summary-card-content">
                    <p className="summary-card-title">Total Owners</p>
                    <p className="summary-card-value">{allOwners.length}</p>
                </div>
            </div>
            {/* Fully Subscribed Owners Card */}
            <div className="summary-card active-subscriptions">
                <div className="summary-card-icon">
                    <CheckCircle size={28} color="var(--color-text-white)" />
                </div>
                <div className="summary-card-content">
                    <p className="summary-card-title">Fully Subscribed Owners</p>
                    <p className="summary-card-value">{ownersFullySubscribedCount}</p>
                </div>
            </div>
            {/* Partially Subscribed Owners Card */}
            <div className="summary-card owners">
                <div className="summary-card-icon">
                    <TrendingUp size={28} color="var(--color-text-white)" />
                </div>
                <div className="summary-card-content">
                    <p className="summary-card-title">Partially Subscribed Owners</p>
                    <p className="summary-card-value">{ownersPartiallySubscribedCount}</p>
                </div>
            </div>
            {/* Owners in Trial Card */}
            <div className="summary-card users">
                <div className="summary-card-icon">
                    <Clock size={28} color="var(--color-text-white)" />
                </div>
                <div className="summary-card-content">
                    <p className="summary-card-title">Owners in Trial</p>
                    <p className="summary-card-value">{ownersTrialCount}</p>
                </div>
            </div>
            {/* Unsubscribed Owners Card */}
            <div className="summary-card expired-shops">
                <div className="summary-card-icon">
                    <XCircle size={28} color="var(--color-text-white)" />
                </div>
                <div className="summary-card-content">
                    <p className="summary-card-title">Unsubscribed Owners</p>
                    <p className="summary-card-value">{ownersUnsubscribedCount}</p>
                </div>
            </div>
        </div>

        {/* Users Breakdown Section */}
        <h3 className="detail-card-section-title" style={{ marginTop: 'var(--spacing-2xl)' }}>
            <Users size={20} color="var(--color-brand-primary)" /> Users Breakdown
        </h3>
        <div className="summary-card-grid">
            {/* Total Users Card */}
            <div className="summary-card users">
                <div className="summary-card-icon">
                    <User size={28} color="var(--color-text-white)" />
                </div>
                <div className="summary-card-content">
                    <p className="summary-card-title">Total Users</p>
                    <p className="summary-card-value">{totalUsers}</p>
                </div>
            </div>
            {/* Subscribed Users Card */}
            <div className="summary-card active-subscriptions">
                <div className="summary-card-icon">
                    <CheckCircle size={28} color="var(--color-text-white)" />
                </div>
                <div className="summary-card-content">
                    <p className="summary-card-title">Subscribed Users</p>
                    <p className="summary-card-value">{usersSubscribedCount}</p>
                </div>
            </div>
            {/* Users in Trial Card */}
            <div className="summary-card users">
                <div className="summary-card-icon">
                    <Clock size={28} color="var(--color-text-white)" />
                </div>
                <div className="summary-card-content">
                    <p className="summary-card-title">Users in Trial</p>
                    <p className="summary-card-value">{usersTrialCount}</p>
                </div>
            </div>
            {/* Unsubscribed Users Card */}
            <div className="summary-card expired-shops">
                <div className="summary-card-icon">
                    <XCircle size={28} color="var(--color-text-white)" />
                </div>
                <div className="summary-card-content">
                    <p className="summary-card-title">Unsubscribed Users</p>
                    <p className="summary-card-value">{usersUnsubscribedCount}</p>
                </div>
            </div>
        </div>
    </div>
);
};

export default DashboardView;