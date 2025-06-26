// barbers-dev-panel/src/components/OwnerDetailView.js

import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Phone, Mail, Building, Store, MapPin, Star, Clock, CalendarDays, DollarSign, List, Info, CircleCheck, CircleX, Clock as ClockIcon, ChevronDown, ChevronRight, Scissors } from 'lucide-react';
import SubscriptionTag from './SubscriptionTag';
import BarbersTable from './BarbersTable'; // Used for desktop
import BarberCard from './BarberCard'; // Used for mobile

// Renamed ownerId to owner to accept the full object
const OwnerDetailView = ({ owner, onBack }) => {
    // No need for owner, setLoading, setError states here as data is passed via prop
    const [expandedBarbersForShopId, setExpandedBarbersForShopId] = useState(null);

    // owner and ownerShops are now directly from the prop, no fetch needed
    const ownerData = owner;
    // Ensure shopsDetails exists and is an array; otherwise, default to empty array
    const ownerShops = ownerData?.shopsDetails || [];

    // Removed useEffect for fetching owner details as it's no longer needed

    // Function to toggle barber visibility for a specific shop (mobile only)
    const toggleBarbersForShop = (shopId) => {
        setExpandedBarbersForShopId(expandedBarbersForShopId === shopId ? null : shopId);
    };

    // Removed loading and error states for direct data usage

    if (!ownerData) {
        console.log(owner);
        return <div className="error-message">Owner data is missing or could not be loaded.</div>;
    }

    return (
        <div className="section-card">
            <button onClick={onBack} className="btn-secondary back-button">
                <ArrowLeft size={18} color="var(--color-text-default)" /> Back to Owners
            </button>

            <h2 className="section-title">
                <User size={24} color="var(--color-brand-primary)" /> Owner Details: {ownerData.name}
            </h2>

            <div className="detail-card-section">
                <h3 className="detail-card-section-title">
                    <Info size={20} color="var(--color-brand-primary)" /> General Information
                </h3>
                <p className="detail-item"><Phone size={16} color="var(--color-text-light)" /> Phone: {ownerData.phone}</p>
                <p className="detail-item">
                    <CircleCheck size={16} color="var(--color-text-light)" /> Overall Subscription Status: <SubscriptionTag status={ownerData.subscriptionStatus} />
                </p>
            </div>

            <div className="detail-card-section">
                <h3 className="detail-card-section-title">
                    <Building size={20} color="var(--color-brand-primary)" /> Shops ({ownerShops.length})
                </h3>
                {ownerShops.length === 0 ? (
                    <p className="text-gray-500">This owner has no shops registered.</p>
                ) : (
                    <div className="grid-cols-1">
                        {ownerShops.map(shop => (
                            <div key={shop._id} className="info-card shop-card-nested" style={{ cursor: 'default' }}>
                                <div className="shop-card-header">
                                    <p className="shop-card-title">
                                        <Store size={18} color="var(--color-brand-primary)" /> {shop.name}
                                    </p>
                                </div>
                                <div className="owner-detail-content-grid">
                                    <div className="owner-detail-shops-info-column">
                                        <p className="shop-details-item"><MapPin size={16} color="var(--color-text-light)" /> Address: {shop.address?.fullDetails || 'N/A'}</p>
                                        <p className="shop-details-item"><Star size={16} color="var(--color-text-light)" /> Rating: {shop.rating !== undefined ? shop.rating.toFixed(1) : 'N/A'}</p>
                                        <p className="shop-details-item"><Clock size={16} color="var(--color-text-light)" /> Hours: {shop.openingTime || 'N/A'} - {shop.closingTime || 'N/A'}</p>
                                        <p className="shop-details-item"><Info size={16} color="var(--color-text-light)" /> Is Open: <span className={shop.isOpen ? 'text-success font-semibold' : 'text-danger font-semibold'}>{shop.isOpen ? 'Yes' : 'No'}</span></p>
                                        <p className="shop-details-item"><CalendarDays size={16} color="var(--color-text-light)" /> Shop Status: <SubscriptionTag status={shop.subscription?.status} /></p>

                                        {shop.subscription?.status !== 'trial' && shop.subscription?.lastPlanInfo && (
                                            <>
                                                <p className="shop-details-item"><DollarSign size={16} color="var(--color-text-light)" /> Plan: {shop.subscription.lastPlanInfo.planName || 'N/A'}</p>
                                                <p className="shop-details-item"><CalendarDays size={16} color="var(--color-text-light)" /> Subscribed: {new Date(shop.subscription.lastPlanInfo.startDate).toLocaleDateString()} - {new Date(shop.subscription.lastPlanInfo.endDate).toLocaleDateString()}</p>
                                                <p className="shop-details-item"><Info size={16} color="var(--color-text-light)" /> Transaction ID: {shop.subscription.lastPlanInfo.transactionId || 'N/A'}</p>
                                            </>
                                        )}
                                        {shop.subscription?.status === 'trial' && shop.subscription?.trialEndDate && (
                                            <p className="shop-details-item"><ClockIcon size={16} color="var(--color-text-light)" /> Trial Ends: {new Date(shop.subscription.trialEndDate).toLocaleDateString()}</p>
                                        )}

                                        {shop.services && shop.services.length > 0 && (
                                            <div style={{ marginTop: '0.8rem' }}>
                                                <p className="font-semibold text-sm" style={{ marginBottom: '0.4rem' }}>Services:</p>
                                                <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                                                    {shop.services.map((service, idx) => (
                                                        <li key={idx} className="text-sm text-gray-600" style={{ marginBottom: '0.2rem' }}>
                                                            <List size={14} color="var(--color-text-light)" style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />{service.name} - ${service.price?.toFixed(2) || 'N/A'}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="owner-detail-barbers-section">
                                        <h4 className="font-semibold" style={{ marginBottom: '0.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'space-between' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <Scissors size={18} color="var(--color-brand-primary)" /> Barbers in this Shop ({shop.barbersInShop.length})
                                            </span>
                                            <button
                                                className={`expand-button toggle-barbers-button-mobile ${expandedBarbersForShopId === shop._id ? 'expanded' : ''}`}
                                                onClick={() => toggleBarbersForShop(shop._id)}
                                                title={expandedBarbersForShopId === shop._id ? 'Hide Barbers' : 'Show Barbers'}
                                            >
                                                {expandedBarbersForShopId === shop._id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                            </button>
                                        </h4>
                                        {shop.barbersInShop.length === 0 ? (
                                            <p className="text-gray-500" style={{ paddingLeft: '0.5rem' }}>No barbers found for this shop.</p>
                                        ) : (
                                            <>
                                                <div className="barbers-desktop-table">
                                                    <BarbersTable barbers={shop.barbersInShop} />
                                                </div>
                                                {expandedBarbersForShopId === shop._id && (
                                                    <div className="barbers-mobile-cards">
                                                        {shop.barbersInShop.map(barber => (
                                                            <BarberCard key={barber._id} barber={barber} />
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OwnerDetailView;