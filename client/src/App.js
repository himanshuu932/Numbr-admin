import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './index.css';

import Admin from './admin/Main';
import TermsAndConditions from './admin/components/StaticPages/TermsAndConditions';
import PrivacyPolicy from './admin/components/StaticPages/PrivacyPolicy';
import CancellationRefundPolicy from './admin/components/StaticPages/RefundPolicy';

import Navbar from './general/Navbar';
import Footer from './general/Footer';
import NumbrLanding from './general/Landingpage';
import Features from './general/Featurex';
import ContactUs from './general/ContactUs';
import Download from './general/Download';
import Login from './general/Login';
import PricingPage from './general/Pricing';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔁 Remove token every 3 minutes and on mount
  useEffect(() => {
    const removeToken = () => {
      localStorage.removeItem('token'); // change key if different
      console.log('Token removed from localStorage');
    };

    removeToken(); // on mount

    const interval = setInterval(removeToken, 3 * 60 * 1000); // every 3 minutes

    return () => clearInterval(interval); // cleanup
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setActiveView('admin');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>

      {activeView === 'admin' ? (
        isAuthenticated ? (
          <div>
            <Admin setActiveView={setActiveView} />
          </div>
        ) : (
          <Navigate to="/login" replace />
        )
      ) : (
        <div className="app-container">
          <Navbar setActiveView={setActiveView} />

          <Routes>
            <Route path="/" element={<NumbrLanding setActiveView={setActiveView} />} />
            <Route path="/features" element={<Features />} />
            <Route path="/download" element={<Download />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/terms" element={<TermsAndConditions />} />
             <Route path="/pricing" element={<PricingPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/refund" element={<CancellationRefundPolicy />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          </Routes>

          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
