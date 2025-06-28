import React from 'react';
import { FaPhone, FaGlobe, FaInstagram } from 'react-icons/fa';

export default function ContactUs() {
  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-gray-100 flex items-center justify-center p-4 overflow-hidden font-sans"
    >
      {/* Background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-gray-900 rounded-full opacity-75 transform rotate-15"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gray-900 rounded-full opacity-75 transform -rotate-30"></div>
      </div>

      {/* Wider card only */}
      <div className="relative z-10 bg-white shadow-2xl rounded-2xl p-6 md:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto space-y-8 md:space-y-0 md:space-x-8">
        {/* Image section */}
        <div className="w-full md:w-1/3 flex items-center justify-center p-2">
          <img
            src="/barber.png"
            alt="Barber Shop Tools"
            className="w-full h-auto max-w-full object-cover rounded-xl shadow-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/500x500/CCCCCC/FFFFFF?text=Barber+Tools';
            }}
          />
        </div>

        {/* Contact form section */}
        <div className="w-full md:w-1/2 flex flex-col items-start space-y-5 md:space-y-6 p-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 self-center md:self-start">
            Contact us
          </h1>

          <div className="w-full space-y-4">
            {/* Phone */}
            <div className="flex items-center w-full space-x-3">
              <span className="p-3 bg-gray-800 text-white rounded-full flex items-center justify-center text-xl">
                <FaPhone className="h-6 w-6" />
              </span>
              <div className="flex-grow bg-gray-200 rounded-xl p-2 shadow-inner">
                <input
                  type="text"
                  placeholder=""
                  className="w-full bg-transparent outline-none text-gray-800 text-lg py-2"
                />
              </div>
            </div>

            {/* Website */}
            <div className="flex items-center w-full space-x-3">
              <span className="p-3 bg-gray-800 text-white rounded-full flex items-center justify-center text-xl">
                <FaGlobe className="h-6 w-6" />
              </span>
              <div className="flex-grow bg-gray-200 rounded-xl p-2 shadow-inner">
                <input
                  type="text"
                  placeholder=""
                  className="w-full bg-transparent outline-none text-gray-800 text-lg py-2"
                />
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-center w-full space-x-3">
              <span className="p-3 bg-gray-800 text-white rounded-full flex items-center justify-center text-xl">
                <FaInstagram className="h-6 w-6" />
              </span>
              <div className="flex-grow bg-gray-200 rounded-xl p-2 shadow-inner">
                <input
                  type="text"
                  placeholder=""
                  className="w-full bg-transparent outline-none text-gray-800 text-lg py-2"
                />
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 self-center md:self-start">
            Watch Tutorial
          </h2>
        </div>
      </div>
    </section>
  );
}
