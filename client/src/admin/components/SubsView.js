// /src/components/SubsView.js
import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
// import './SubsView.css'; // This import is now removed as CSS is embedded

// Main component for managing subscription plans
const SubsView = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPlan, setCurrentPlan] = useState(null);

    // State for duration unit
    const [durationValue, setDurationValue] = useState('');
    const [durationUnit, setDurationUnit] = useState('days'); // Default to 'days'

    // You should use environment variables for these in a real application
    const API_URL = "https://numbr-exq6.onrender.com";
    const TOKEN = localStorage.getItem('token');
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
        // Convert features array back to comma-separated string for the textarea
        setCurrentPlan({ ...plan, features: plan.features ? plan.features.join(', ') : '' });
        setDurationValue(plan.duration.value); // Set value from existing plan
        setDurationUnit(plan.duration.unit); // Set unit from existing plan
        setIsModalOpen(true);
    };

    const handleDeletePlan = async (id) => {
        // IMPORTANT: Never use window.confirm() or alert() in Canvas.
        // Replace with a custom modal for confirmation.
        // For demonstration, leaving window.confirm as a placeholder.
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
                // IMPORTANT: Never use alert() in Canvas.
                // Replace with a custom message display.
                alert('Plan deleted successfully!');
                fetchPlans(); // Refresh the list
            } catch (err) {
                // IMPORTANT: Never use alert() in Canvas.
                // Replace with a custom message display.
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
            console.log(response); // Log response for debugging
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            // IMPORTANT: Never use alert() in Canvas.
            alert('Plan created successfully!');
            setIsModalOpen(false);
            setCurrentPlan(null);
            fetchPlans(); // Refresh the list
        } catch (err) {
            // IMPORTANT: Never use alert() in Canvas.
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
            // IMPORTANT: Never use alert() in Canvas.
            alert('Plan updated successfully!');
            setIsModalOpen(false);
            setCurrentPlan(null);
            fetchPlans(); // Refresh the list
        } catch (err) {
            // IMPORTANT: Never use alert() in Canvas.
            alert(`Error updating plan: ${err.message}`);
            console.error("Update plan error:", err);
        }
    };

    const handleSavePlan = async () => {
        // Validate required fields including duration value and unit
        if (!currentPlan?.name || durationValue === '' || !durationUnit || currentPlan?.price === '') {
            // IMPORTANT: Never use alert() in Canvas.
            alert('Please fill in all required fields: Name, Price, Duration Value, and Duration Unit.');
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
            features: currentPlan?.features ? currentPlan.features.split(',').map(f => f.trim()).filter(f => f) : [] // Ensure features is an array of strings
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
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                /* --- SubsView.css (Black & White Theme) --- */

                /* Base Styles (assuming these would be globally applied or in a main stylesheet) */
                body {
                  font-family: 'Inter', sans-serif;
                  background-color: #f8f8f8; /* Lightest gray for backgrounds */
                  color: #333333; /* Dark gray for primary text */
                  margin: 0;
                  padding: 0;
                  line-height: 1.6;
                }

                /* General Section Card Styling */
                .section-card {
                  background-color: #ffffff;
                  padding: 2rem;
                  border-radius: 12px;
                  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                  margin: 2rem auto;
                  max-width: 1200px;
                  width: 95%;
                  border: 1px solid #e5e5e5;
                }

                .section-title {
                  font-size: 1.5rem;
                  color: #000000;
                  margin-bottom: 1.5rem;
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                  border-bottom: 1px solid #e5e5e5;
                  padding-bottom: 0.5rem;
                }

                /* --- Page Layout Specifics for SubsView --- */
                .subs-view-container {
                  padding: 2rem;
                  max-width: 1200px;
                  margin: 0 auto;
                }

                .subs-view-content {
                  background-color: #ffffff;
                  padding: 2rem;
                  border-radius: 8px;
                  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                  border: 1px solid #e5e5e5;
                }

                .subs-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 1.5rem;
                  padding-bottom: 1rem;
                  border-bottom: 1px solid #f0f0f0; /* Lighter gray separator */
                }

                .subs-header h1 {
                  font-size: 1.8rem;
                  color: #000000; /* Black for headings */
                  margin: 0;
                }

                /* --- Add New Plan Button --- */
                .add-plan-button {
                  background-color: #000000; /* Black button */
                  color: #ffffff; /* White text */
                  border: 1px solid #000000;
                  padding: 0.8rem 1.5rem;
                  border-radius: 8px;
                  font-size: 1rem;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.2s ease-in-out;
                  display: inline-flex;
                  align-items: center;
                  gap: 0.5rem;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }

                .add-plan-button:hover {
                  background-color: #333333; /* Darker gray on hover */
                  border-color: #333333;
                  transform: translateY(-2px);
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                }

                .add-plan-button:active {
                  transform: translateY(0);
                  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                }

                /* --- Filter Dropdown Styling (form-select) --- */
                .filter-section {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 1.5rem;
                  margin-bottom: 1.5rem;
                  padding-bottom: 1rem;
                  border-bottom: 1px solid #f8f8f8; /* Lighter separator for filter section */
                }

                .form-group {
                  display: flex;
                  flex-direction: column;
                  gap: 0.25rem;
                  flex: 1;
                  min-width: 250px; /* Ensures sufficient width before wrapping */
                }

                .form-label {
                  font-size: 0.875rem;
                  color: #555555; /* Medium-dark gray for labels */
                  font-weight: 500;
                  display: flex;
                  align-items: center;
                  margin-bottom: 0.25rem;
                }

                .form-select {
                  padding: 0.5rem;
                  border: 1px solid #cccccc; /* Light gray border */
                  border-radius: 4px;
                  font-size: 1rem;
                  color: #333333; /* Dark gray for text */
                  background-color: #ffffff; /* White background */
                  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
                  appearance: none; /* Remove default select arrow */
                  -webkit-appearance: none;
                  -moz-appearance: none;
                  /* Custom SVG for dropdown arrow */
                  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%23333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>');
                  background-repeat: no-repeat;
                  background-position: right 0.5rem center;
                  background-size: 16px;
                  padding-right: 1.5rem; /* Make space for the custom arrow */
                }

                .form-select:focus {
                  border-color: #333333; /* Dark gray on focus */
                  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
                  outline: none;
                }

                /* --- Table Styling --- */
                .table-container {
                  margin-top: 1.5rem;
                  border-radius: 8px;
                  overflow: hidden; /* Ensures rounded corners on table container */
                  border: 1px solid #e5e5e5; /* Main table border */
                  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
                }

                .table-wrapper {
                  overflow-x: auto; /* For horizontal scrolling if table is too wide */
                }

                .plans-table {
                  width: 100%;
                  border-collapse: collapse; /* Collapses borders for clean lines */
                  font-size: 1rem;
                  background-color: #ffffff; /* White background for the table rows */
                  min-width: 700px; /* Ensure table is wide enough for content */
                }

                .plans-table th, .plans-table td {
                  padding: 1rem 1.5rem; /* Ample padding for content */
                  text-align: left;
                  border-bottom: 1px solid #f0f0f0; /* Light gray separator between rows */
                }

                .plans-table th {
                  background-color: #f8f8f8; /* Lightest gray for header background */
                  font-weight: 600; /* Semibold */
                  color: #555555; /* Medium-dark gray for header text */
                  text-transform: uppercase;
                  font-size: 0.875rem;
                  letter-spacing: 0.05em;
                  position: sticky; /* Sticky header for scrolling */
                  top: 0;
                  z-index: 1; /* Ensure header is above scrolling content */
                }

                .plans-table tbody tr:last-child td {
                  border-bottom: none; /* No border on the very last row */
                }

                .plans-table tbody tr:hover {
                  background-color: #f0f0f0; /* Subtle light gray on row hover */
                  cursor: pointer; /* Indicate row is clickable if it has an action */
                }

                .plan-name {
                  font-weight: 500;
                  color: #000000; /* Black for plan names */
                }

                /* --- Status Badges (Active/Inactive) --- */
                .status-badge {
                  display: inline-block;
                  padding: 0.3rem 0.7rem;
                  border-radius: 50px; /* Pill shape */
                  font-size: 0.75rem;
                  font-weight: 700;
                  text-transform: uppercase;
                  letter-spacing: 0.02em;
                  white-space: nowrap;
                }

                .status-badge.active {
                  background-color: #000000; /* Black for Active */
                  color: #ffffff; /* White text */
                }

                .status-badge.inactive {
                  background-color: #999999; /* Medium-light gray for Inactive */
                  color: #000000; /* Black text */
                }

                .actions-cell {
                  text-align: center; /* Center actions in their column */
                  width: 120px; /* Fixed width for actions column */
                }

                .action-button {
                  background: none;
                  border: none;
                  cursor: pointer;
                  padding: 0.5rem;
                  border-radius: 4px;
                  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
                  color: #777777; /* Default icon color */
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                }

                .action-button:hover {
                  background-color: #e5e5e5; /* Light gray background on hover */
                  color: #000000; /* Black icon on hover */
                }

                .action-button.edit:hover {
                  color: #000000; /* Black */
                }

                .action-button.delete:hover {
                  color: #dc3545; /* Red for delete (semantic color for impact) */
                }

                /* --- Modal Styling (for add/edit plan) --- */
                .modal-overlay {
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent black overlay */
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  z-index: 1000;
                }

                .modal-content {
                  background-color: #ffffff; /* White modal background */
                  padding: 2.5rem;
                  border-radius: 12px;
                  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
                  max-width: 600px;
                  width: 90%;
                  color: #333333; /* Dark gray text */
                  position: relative;
                }

                .modal-content h2 {
                  font-size: 1.8rem;
                  color: #000000;
                  margin-top: 0;
                  margin-bottom: 1.5rem;
                  text-align: center;
                  border-bottom: 1px solid #e5e5e5;
                  padding-bottom: 1rem;
                }

                .form-grid {
                  display: grid;
                  grid-template-columns: 1fr;
                  gap: 1rem;
                  margin-bottom: 1rem;
                }

                @media (min-width: 600px) {
                  .form-grid {
                    grid-template-columns: 1fr 1fr;
                  }
                }

                .form-field {
                  margin-bottom: 1rem;
                }

                .form-input, .form-textarea {
                  width: 100%;
                  padding: 0.75rem;
                  border: 1px solid #cccccc;
                  border-radius: 4px;
                  font-size: 1rem;
                  color: #333333;
                  background-color: #f8f8f8; /* Light gray input background */
                  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
                }

                .form-input:focus, .form-textarea:focus {
                  border-color: #000000;
                  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
                  outline: none;
                }

                .form-textarea {
                  resize: vertical;
                  min-height: 80px;
                }

                .checkbox-label {
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                  cursor: pointer;
                  font-size: 1rem;
                  color: #333333;
                }

                .form-checkbox {
                  width: 18px;
                  height: 18px;
                  border: 1px solid #555555;
                  border-radius: 4px;
                  appearance: none;
                  -webkit-appearance: none;
                  -moz-appearance: none;
                  background-color: #ffffff;
                  cursor: pointer;
                  position: relative;
                  display: inline-block;
                  flex-shrink: 0; /* Prevent checkbox from shrinking */
                }

                .form-checkbox:checked {
                  background-color: #000000; /* Black when checked */
                  border-color: #000000;
                }

                .form-checkbox:checked::before {
                  content: '✔'; /* Checkmark symbol */
                  display: block;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  color: #ffffff; /* White checkmark */
                  font-size: 14px;
                }

                .modal-actions {
                  display: flex;
                  justify-content: flex-end;
                  gap: 1rem;
                  margin-top: 1.5rem;
                  padding-top: 1rem;
                  border-top: 1px solid #f0f0f0;
                }

                .button {
                  padding: 0.8rem 1.5rem;
                  border-radius: 8px;
                  font-size: 1rem;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.2s ease-in-out;
                  border: 1px solid transparent; /* Default transparent border */
                }

                .button.cancel {
                  background-color: #f0f0f0; /* Light gray background */
                  color: #333333; /* Dark gray text */
                  border-color: #cccccc;
                }

                .button.cancel:hover {
                  background-color: #e5e5e5;
                  color: #000000;
                  border-color: #999999;
                }

                .button.save {
                    background-color: #000000; /* Black */
                    color: #ffffff; /* White text */
                    border-color: #000000;
                }

                .button.save:hover {
                    background-color: #333333;
                    border-color: #333333;
                }

                /* Loading and Error States */
                .loading-state, .error-state {
                    text-align: center;
                    padding: 2rem;
                    font-size: 1.2rem;
                    color: #555555;
                }
                .error-state {
                    color: #dc3545; /* A subtle red for errors */
                    font-weight: 600;
                }
            `}} />
            <div className="subs-view-container">
                <div className="subs-view-content">
                    <header className="subs-header">
                        <h1>Subscription Plans</h1>
                        <button onClick={handleAddPlan} className="add-plan-button">
                            <PlusCircle size={20} color="#ffffff"/> {/* Set icon color to white for black button */}
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
                                        <th>Duration</th>
                                        <th>Status</th>
                                        <th className="actions-cell">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {plans.length > 0 ? plans.map((plan) => (
                                        <tr key={plan._id}>
                                            <td className="plan-name">{plan.name}</td>
                                            {/* Changed currency symbol from $ to ₹ */}
                                            <td>₹{plan.price.toFixed(2)}</td>
                                            <td>{`${plan.duration.value} ${plan.duration.unit}`}</td>
                                            <td>
                                                <span className={`status-badge ${plan.isActive ? 'active' : 'inactive'}`}>
                                                    {plan.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="actions-cell">
                                                <button onClick={() => handleEditPlan(plan)} className="action-button edit" title="Edit Plan">
                                                    <Edit size={18} color="#777777"/> {/* Default icon color */}
                                                </button>
                                                <button onClick={() => handleDeletePlan(plan._id)} className="action-button delete" title="Delete Plan">
                                                    <Trash2 size={18} color="#777777"/> {/* Default icon color */}
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
                                        <label htmlFor="price" className="form-label">Price (₹)</label> {/* Updated label here too */}
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
        </>
    );
};

export default SubsView;
