// barbers-dev-panel/src/components/UserDetailView.js
import React from 'react'; // Removed useState, useEffect
import { ArrowLeft, User, Phone, Mail, CalendarDays, DollarSign, Info, Store, CircleCheck, CircleX, Clock as ClockIcon, MapPin, Star } from 'lucide-react';
import SubscriptionTag from './SubscriptionTag';

// Updated to accept 'user' object directly as a prop
const UserDetailView = ({ user, onBack }) => {
    // Removed all state and effect hooks as data is passed directly via prop
    // const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    // const API_URL = process.env."https://numbr-p7zc.onrender.com";
    // useEffect hook and its content are removed

    if (!user) {
        // Updated loading and error handling based on prop existence
        return <div className="error-message">User data is missing or could not be loaded. Please select a user from the list.</div>;
    }

    return (
        <div className="section-card">
            <button onClick={onBack} className="btn-secondary back-button">
                <ArrowLeft size={18} color="var(--color-text-default)" /> Back to Users
            </button>

            <h2 className="section-title">
                <User size={24} color="var(--color-brand-primary)" /> User Details: {user.name}
            </h2>

            <div className="detail-card-section">
                <h3 className="detail-card-section-title">
                    <Info size={20} color="var(--color-brand-primary)" /> General Information
                </h3>
                <p className="detail-item"><Phone size={16} color="var(--color-text-light)" /> Phone: {user.phone}</p>
                {/* Assuming email exists in the user object based on the data structure for owners, if not, it will be undefined */}
                {user.email && <p className="detail-item"><Mail size={16} color="var(--color-text-light)" /> Email: {user.email}</p>}
            </div>

            <div className="detail-card-section">
                <h3 className="detail-card-section-title">
                    <CalendarDays size={20} color="var(--color-brand-primary)" /> Subscription Information
                </h3>
                <p className="detail-item">
                    <CircleCheck size={16} color="var(--color-text-light)" /> Status: <SubscriptionTag status={user.subscription?.status} />
                </p>
                {user.subscription?.status === 'trial' && user.subscription?.trialEndDate ? (
                    <p className="detail-item">
                        <ClockIcon size={16} color="var(--color-text-light)" /> Trial Ends: {new Date(user.subscription.trialEndDate).toLocaleDateString()}
                    </p>
                ) : user.subscription?.lastPlanInfo?.startDate && user.subscription?.lastPlanInfo?.endDate ? ( // Corrected to check for lastPlanInfo
                    <>
                        <p className="detail-item"><DollarSign size={16} color="var(--color-text-light)" /> Plan: {user.subscription.lastPlanInfo.planName || 'N/A'}</p>
                        <p className="detail-item"><CalendarDays size={16} color="var(--color-text-light)" /> Subscribed: {new Date(user.subscription.lastPlanInfo.startDate).toLocaleDateString()} - {new Date(user.subscription.lastPlanInfo.endDate).toLocaleDateString()}</p>
                        <p className="detail-item"><Info size={16} color="var(--color-text-light)" /> Transaction ID: {user.subscription.lastPlanInfo.transactionId || 'N/A'}</p>
                    </>
                ) : (
                    <p className="detail-item">No active subscription details.</p>
                )}
            </div>

            <div className="detail-card-section">
                <h3 className="detail-card-section-title">
                    <Store size={20} color="var(--color-brand-primary)" /> Pinned Shop
                </h3>
                {user.pinnedShop ? (
                    <>
                        <p className="detail-item"><Store size={16} color="var(--color-text-light)" /> Name: {user.pinnedShop.name}</p>
                        <p className="detail-item"><MapPin size={16} color="var(--color-text-light)" /> Address: {user.pinnedShop.address?.fullDetails || 'N/A'}</p>
                        <p className="detail-item"><Star size={16} color="var(--color-text-light)" /> Rating: {user.pinnedShop.rating !== undefined ? user.pinnedShop.rating.toFixed(1) : 'N/A'}</p>
                    </>
                ) : (
                    <p className="text-gray-500">No pinned shop for this user.</p>
                )}
            </div>
        </div>
    );
};

export default UserDetailView;