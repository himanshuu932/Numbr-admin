import React, { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ setActiveView }) {
  const [isOpen, setIsOpen] = useState(false);
  const brandClickCount = useRef(0);
  const logoClickCount = useRef(0);
  const firstClickTime = useRef(0); // Tracks the time of the very first click in the sequence
  const adminModeReady = useRef(false); // Flag to indicate if the 5-click combo is met
  const clickThreshold = 5000; // 5 seconds for the logo/brand clicks
  const contactClickThreshold = 4000; // 4 seconds for the Contact menu item click

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const resetClickTracking = () => {
    brandClickCount.current = 0;
    logoClickCount.current = 0;
    firstClickTime.current = 0;
    adminModeReady.current = false; // Reset the ready flag
  };

  const handleInteraction = (type) => {
    const currentTime = Date.now();

    // If adminModeReady is true, we should ignore logo/brand clicks
    // and only wait for the contact click.
    if (adminModeReady.current) {
        return;
    }

    // If this is the very first click in a potential sequence, record the time
    if (firstClickTime.current === 0) {
      firstClickTime.current = currentTime;
    }

    // Check if the current click is within the 5-second window from the first click
    if (currentTime - firstClickTime.current < clickThreshold) {
      if (type === 'logo') {
        logoClickCount.current += 1;
      } else if (type === 'brand') {
        brandClickCount.current += 1;
      }
      checkComboCompletion(); // Check if the 5-click combo is met
    } else {
      // If outside the 5-second window, reset and start a new sequence
      resetClickTracking();
      // Apply the current click to the new sequence
      if (type === 'logo') {
        logoClickCount.current = 1;
      } else if (type === 'brand') {
        brandClickCount.current = 1;
      }
      firstClickTime.current = currentTime; // Set new start time
    }
  };

  const checkComboCompletion = () => {
    if (brandClickCount.current >= 3 && logoClickCount.current >= 2) {
      adminModeReady.current = true;
      firstClickTime.current = Date.now(); // Reset timer for the contact click
    }
  };

  const handleContactClick = (event) => {
    if (adminModeReady.current) {
      const currentTime = Date.now();
      // Check if the contact click happened within 4 seconds of the combo completion
      if (currentTime - firstClickTime.current < contactClickThreshold) {
        setActiveView("admin");
        alert("Admin view activated!");
      } 
      resetClickTracking(); // Always reset after attempting contact click
      event.preventDefault(); // Prevent default navigation if admin mode was attempted
    } else {
      // If not in adminModeReady, allow default navigation for Contact link
      // If your Contact link normally scrolls to a section, you might not need event.preventDefault() here.
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 ml-2">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                src='/image.png'
                alt="Logo"
                className="h-10 cursor-pointer"
                onClick={() => handleInteraction('logo')}
              />
            </div>
            <div className="flex-shrink-0 z-10 left-1">
              <h1
                className="text-xl font-bold text-gray-800 cursor-pointer"
                onClick={() => handleInteraction('brand')}
              >
                Numbr
              </h1>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Home
            </Link>
            <Link to="/features" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Features
            </Link>
            <Link to="/download" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Download
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              onClick={handleContactClick} // Added onClick handler
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                Home
              </Link>
              <Link to="/features" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                Features
              </Link>
              <Link to="/download" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                Download
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={handleContactClick} // Added onClick handler for mobile
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}