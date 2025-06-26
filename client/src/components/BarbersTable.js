// barbers-dev-panel/src/components/BarbersTable.js

import React from 'react';
import { User, Phone, Star, Users, Scissors } from 'lucide-react';

const BarbersTable = ({ barbers }) => {
    if (!barbers || barbers.length === 0) {
        return <p className="text-gray-500" style={{ marginTop: '1rem', paddingLeft: '0.5rem' }}>No barbers found for this shop.</p>;
    }
    return (
        <div className="data-table-container" style={{ marginTop: '1rem' }}>
            <table className="data-table">
                <thead>
                    <tr>
                        <th><User size={14} /> Name</th>
                        <th><Phone size={14} /> Phone</th>
                        <th><Star size={14} /> Rating</th>
                        <th><Users size={14} /> Customers Served</th>
                        <th><Scissors size={14} /> Active</th>
                    </tr>
                </thead>
                <tbody>
                    {barbers.map(barber => (
                        <tr key={barber.id}>
                            <td>{barber.name}</td>
                            <td>{barber.phone}</td>
                            <td>{barber.rating !== undefined ? barber.rating.toFixed(1) : 'N/A'}</td>
                            <td>{barber.customersServed !== undefined ? barber.customersServed : 'N/A'}</td>
                            <td>
                                <span className={barber.activeTaking ? 'text-success font-semibold' : 'text-danger font-semibold'}>
                                    {barber.activeTaking ? 'Yes' : 'No'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BarbersTable;