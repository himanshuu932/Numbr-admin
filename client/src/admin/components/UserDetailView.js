// barbers-dev-panel/src/components/UserDetailView.js
import React from 'react';
import { ArrowLeft, User, Phone, Mail, CalendarDays, DollarSign, Info, Store, Clock as ClockIcon, MapPin, Star } from 'lucide-react';
import SubscriptionTag from './SubscriptionTag';

const UserDetailView = ({ user, onBack }) => {
    if (!user) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="text-center py-16 bg-red-50 rounded-xl border-2 border-dashed border-red-200">
                    <p className="text-red-500 font-medium">User data is missing or could not be loaded. Please select a user from the list.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 mb-6 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 group"
            >
                <ArrowLeft size={18} className="text-gray-500 group-hover:text-gray-700 transition-colors" />
                Back to Users
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-100">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-blue-100">
                        <User size={32} className="text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">User Details: {user.name}</h2>
                        <p className="text-sm text-gray-500 font-mono">ID: {user._id}</p>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* General Information Card */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                        <Info size={20} className="text-blue-600" />
                        General Information
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Phone size={18} className="text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                                <p className="text-sm font-semibold text-gray-900 font-mono">{user.phone || 'N/A'}</p>
                            </div>
                        </div>
                        {user.email && (
                            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail size={18} className="text-green-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</p>
                                    <p className="text-sm font-semibold text-gray-900 break-all">{user.email}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Subscription Information Card */}
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-200 hover:shadow-md transition-all duration-200">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-blue-200">
                        <CalendarDays size={20} className="text-blue-600" />
                        Subscription Information
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Status</p>
                                <SubscriptionTag status={user.subscription?.status} />
                            </div>
                        </div>

                        {user.subscription?.status === 'trial' && user.subscription?.trialEndDate ? (
                            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <ClockIcon size={18} className="text-orange-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-orange-700 uppercase tracking-wider mb-1">Trial Ends</p>
                                    <p className="text-sm font-bold text-orange-900">{new Date(user.subscription.trialEndDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ) : user.subscription?.lastPlanInfo?.startDate && user.subscription?.lastPlanInfo?.endDate ? (
                            <>
                                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <DollarSign size={18} className="text-purple-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Plan</p>
                                        <p className="text-sm font-semibold text-gray-900">{user.subscription.lastPlanInfo.planName || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <CalendarDays size={18} className="text-green-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Subscription Period</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {new Date(user.subscription.lastPlanInfo.startDate).toLocaleDateString()} - {new Date(user.subscription.lastPlanInfo.endDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Info size={18} className="text-indigo-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Transaction ID</p>
                                        <p className="text-sm font-mono text-gray-900 break-all">{user.subscription.lastPlanInfo.transactionId || 'N/A'}</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                                <p className="text-gray-500 text-sm font-medium">No active subscription details.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pinned Shop Card - Full Width */}
                <div className="lg:col-span-2 bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-200 hover:shadow-md transition-all duration-200">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-purple-200">
                        <Store size={20} className="text-purple-600" />
                        Pinned Shop
                    </h3>
                    {user.pinnedShop ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-purple-200 transition-colors">
                                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Store size={18} className="text-purple-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Shop Name</p>
                                    <p className="text-sm font-semibold text-gray-900">{user.pinnedShop.name}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-purple-200 transition-colors">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MapPin size={18} className="text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Address</p>
                                    <p className="text-sm font-semibold text-gray-900 line-clamp-2">{user.pinnedShop.address?.fullDetails || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-purple-200 transition-colors">
                                <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Star size={18} className="text-yellow-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Rating</p>
                                    <p className="text-sm font-bold text-gray-900">{user.pinnedShop.rating !== undefined ? user.pinnedShop.rating.toFixed(1) : 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 bg-white rounded-lg border-2 border-dashed border-gray-200">
                            <p className="text-gray-500 text-sm font-medium">No pinned shop for this user.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDetailView;