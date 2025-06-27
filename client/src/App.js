import React, { useState, useEffect } from 'react';

import './index.css';

import Admin from './admin/Main';
import TermsAndConditions from './admin/components/StaticPages/TermsAndConditions';
import PrivacyPolicy from './admin/components/StaticPages/PrivacyPolicy';
import CancellationRefundPolicy from './admin/components/StaticPages/RefundPolicy';
import Navbar from './general/Navbar';
import NumbrLanding from './general/Landingpage';
import Footer from './general/Footer';


function App() {
  // State to manage the current active view
  const [activeView, setActiveView] = useState('dashboard');




  return (
    activeView === 'dashboard' ? (
    <div className="app-container">
      
        <NumbrLanding/>
        
        <Footer/>
    </div>)
    :(<>
    
       <Admin /> :
    </>)
  
  );
}

export default App;