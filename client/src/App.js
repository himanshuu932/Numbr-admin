import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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


function App() {

  const [activeView, setActiveView] = useState('dashboard');

  return (
    <Router>
      {activeView === 'dashboard' ? (
        <div className="app-container">
          <Navbar setActiveView={setActiveView} />
          
          <Routes>
            <Route path="/" element={<NumbrLanding setActiveView={setActiveView} />} />
            <Route path="/features" element={<Features />} />
            <Route path="/download" element={<Download />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/refund" element={<CancellationRefundPolicy />} />
          </Routes>

          <Footer />
        </div>)
        : (<>
          <Admin /> :
        </>)
      }
    </Router>
  );
}

export default App;