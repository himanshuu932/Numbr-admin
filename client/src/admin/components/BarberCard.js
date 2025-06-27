import React from 'react';
import { User, Phone, Star, Users, Scissors, CircleCheck, CircleX } from 'lucide-react';

const BarberCard = ({ barber }) => {
    return (
        <div className="barber-card">
            <div className="barber-card-header">
                <User size={20} /> {barber.name}
            </div>
            <div className="barber-card-details">
                <p className="barber-card-detail-item"><Phone size={16} /> Phone: {barber.phone}</p>
                <p className="barber-card-detail-item"><Star size={16} /> Rating: {barber.rating !== undefined ? barber.rating.toFixed(1) : 'N/A'}</p>
                <p className="barber-card-detail-item"><Users size={16} /> Customers Served: {barber.customersServed !== undefined ? barber.customersServed : 'N/A'}</p>
                <p className="barber-card-detail-item">
                    <Scissors size={16} /> Active:
                    <span className={`barber-card-status ${barber.activeTaking ? 'text-success' : 'text-danger'}`}>
                        {barber.activeTaking ? ' Yes' : ' No'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default BarberCard;