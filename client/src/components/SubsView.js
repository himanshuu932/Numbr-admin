// /src/components/SubsView.js
import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import './SubsView.css';

// Main component for managing subscription plans
const SubsView = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPlan, setCurrentPlan] = useState(null);

    // Add a state for duration unit
    const [durationValue, setDurationValue] = useState('');
    const [durationUnit, setDurationUnit] = useState('days'); // Default to 'days'

   const API_URL = process.env.REACT_APP_API_URL;

    const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NWQyMzA3ODA1ZDY1MWE4NWUxMGNjYiIsImlhdCI6MTc1MDkzNDI3OSwiZXhwIjoxNzUxMjk0Mjc5fQ.WV5KnRkxKqBoBejewcth7GCoOsH43U70Y7RvRFYFQ9A";

    const fetchPlans = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/api/subscriptions`, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPlans(data.data || []);
        } catch (err) {
            setError(`Failed to fetch subscription plans: ${err.message}`);
            console.error("Fetch plans error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleAddPlan = () => {
        setCurrentPlan(null); // Clear currentPlan for new creation
        setDurationValue('');
        setDurationUnit('days'); // Set default unit for new plan
        setIsModalOpen(true);
    };

    const handleEditPlan = (plan) => {
        setCurrentPlan({ ...plan, features: plan.features.join(', ') });
        setDurationValue(plan.duration.value); // Set value from existing plan
        setDurationUnit(plan.duration.unit); // Set unit from existing plan
        setIsModalOpen(true);
    };

    const handleDeletePlan = async (id) => {
        if (window.confirm('Are you sure you want to delete this plan? This action cannot be undone.')) {
            try {
                const response = await fetch(`${API_URL}/api/subscriptions/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${TOKEN}` },
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }
                alert('Plan deleted successfully!');
                fetchPlans();
            } catch (err) {
                alert(`Error deleting plan: ${err.message}`);
                console.error("Delete plan error:", err);
            }
        }
    };

    const handleCreatePlan = async (planData) => {
        try {
            const response = await fetch(`${API_URL}/api/subscriptions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${TOKEN}`
                },
                body: JSON.stringify(planData),
            });
            console.log(response);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            alert('Plan created successfully!');
            setIsModalOpen(false);
            setCurrentPlan(null);
            fetchPlans();
        } catch (err) {
            alert(`Error creating plan: ${err.message}`);
            console.error("Create plan error:", err);
        }
    };

    const handleUpdatePlan = async (planData) => {
        try {
            const response = await fetch(`${API_URL}/api/subscriptions/${planData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${TOKEN}`
                },
                body: JSON.stringify(planData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            alert('Plan updated successfully!');
            setIsModalOpen(false);
            setCurrentPlan(null);
            fetchPlans();
        } catch (err) {
            alert(`Error updating plan: ${err.message}`);
            console.error("Update plan error:", err);
        }
    };

    const handleSavePlan = async () => {
        // Validate required fields including duration value and unit
        if (!currentPlan?.name || durationValue === '' || !durationUnit) {
            alert('Please fill in all required fields: Name, Price, Duration Value, and Duration Unit.');
            return;
        }
        if (currentPlan?.price === '') { // Ensure price is not empty string
            alert('Please fill in price.');
            return;
        }


        const payload = {
            ...currentPlan,
            name: currentPlan?.name || '', // Ensure name is not undefined for new plans
            price: Number(currentPlan.price), // Convert price to number
            duration: {
                value: Number(durationValue), // Convert duration value to number
                unit: durationUnit
            },
            features: currentPlan?.features ? currentPlan.features.split(',').map(f => f.trim()).filter(f => f) : []
        };

        if (currentPlan?._id) {
            handleUpdatePlan(payload);
        } else {
            handleCreatePlan(payload);
        }
    };

    if (loading) return <div className="loading-state">Loading subscription plans...</div>;
    if (error) return <div className="error-state">{error}</div>;

    return (
        <div className="subs-view-container">
            <div className="subs-view-content">
                <header className="subs-header">
                    <h1>Subscription Plans</h1>
                    <button onClick={handleAddPlan} className="add-plan-button">
                        <PlusCircle size={20} />
                        Add New Plan
                    </button>
                </header>

                <main className="table-container">
                    <div className="table-wrapper">
                        <table className="plans-table">
                            <thead>
                                <tr>
                                    <th>Plan Name</th>
                                    <th>Price</th>
                                    <th>Duration</th> {/* Changed header to just Duration */}
                                    <th>Status</th>
                                    <th className="actions-cell">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {plans.length > 0 ? plans.map((plan) => (
                                    <tr key={plan._id}>
                                        <td className="plan-name">{plan.name}</td>
                                        <td>${plan.price.toFixed(2)}</td>
                                        <td>{`${plan.duration.value} ${plan.duration.unit}`}</td> {/* Displaying value and unit */}
                                        <td>
                                            <span className={`status-badge ${plan.isActive ? 'active' : 'inactive'}`}>
                                                {plan.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="actions-cell">
                                            <button onClick={() => handleEditPlan(plan)} className="action-button edit" title="Edit Plan">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => handleDeletePlan(plan._id)} className="action-button delete" title="Delete Plan">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No subscription plans found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{currentPlan?._id ? 'Edit Plan' : 'Create New Plan'}</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleSavePlan(); }}>
                            <div className="form-grid">
                                <div className="form-field">
                                    <label htmlFor="name" className="form-label">Plan Name</label>
                                    <input type="text" id="name" value={currentPlan?.name || ''} onChange={(e) => setCurrentPlan({ ...currentPlan, name: e.target.value })} className="form-input" required />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="price" className="form-label">Price ($)</label>
                                    <input type="number" id="price" value={currentPlan?.price || ''} onChange={(e) => setCurrentPlan({ ...currentPlan, price: e.target.value })} className="form-input" required />
                                </div>
                            </div>
                            <div className="form-field">
                                <label htmlFor="durationValue" className="form-label">Duration Value</label>
                                <input type="number" id="durationValue" value={durationValue} onChange={(e) => setDurationValue(e.target.value)} className="form-input" required />
                            </div>
                            <div className="form-field">
                                <label htmlFor="durationUnit" className="form-label">Duration Unit</label>
                                <select id="durationUnit" value={durationUnit} onChange={(e) => setDurationUnit(e.target.value)} className="form-input" required>
                                    <option value="days">Days</option>
                                    <option value="months">Months</option>
                                    <option value="years">Years</option>
                                </select>
                            </div>
                            <div className="form-field">
                                <label htmlFor="features" className="form-label">Features (comma-separated)</label>
                                <textarea id="features" rows="3" value={currentPlan?.features || ''} onChange={(e) => setCurrentPlan({ ...currentPlan, features: e.target.value })} className="form-textarea"></textarea>
                            </div>
                            <div className="form-field">
                                <label className="checkbox-label">
                                    <input type="checkbox" checked={currentPlan?.isActive ?? true} onChange={(e) => setCurrentPlan({ ...currentPlan, isActive: e.target.checked })} className="form-checkbox" />
                                    <span className="checkbox-text">Is Active</span>
                                </label>
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => { setIsModalOpen(false); setCurrentPlan(null); setDurationValue(''); setDurationUnit('days'); }} className="button cancel">Cancel</button>
                                <button type="submit" className="button save">{currentPlan?._id ? 'Save Changes' : 'Create Plan'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubsView;