"use client"

import { Play, Apple, X } from "lucide-react"
import { useState } from "react"

export default function Download() {
  const [showModal, setShowModal] = useState(false)

  const handlePlayStoreClick = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <section className="min-h-[70vh] bg-white flex items-center justify-center font-sans w-full px-4 py-8">
        <div className="w-full max-w-7xl bg-white shadow-2xl rounded-3xl p-6 md:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Mobile: QR Code on top */}
          <div className="lg:hidden w-full flex flex-col items-center justify-center p-6 bg-gray-100 rounded-3xl shadow-xl text-center order-1">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Scan to Download</h2>
            <div className="bg-white p-4 rounded-xl shadow-lg border-4 border-gray-200 transform hover:scale-105 transition-transform duration-300">
              <img
                src="/icon2.png"
                alt="QR Code to download app"
                className="w-48 h-48 rounded-lg object-contain"
              />
            </div>
          </div>

          {/* Left Section: App Info, Download Buttons */}
          <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 md:mb-6">
              Transform Your Barber Shop Today!
            </h1>
            <p className="text-base md:text-lg text-gray-700 mb-8 md:mb-10 max-w-xl">
              Streamline bookings, manage appointments, and grow your business with Numbr – the ultimate app for
              barbershops.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-12 w-full sm:w-auto">
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border border-transparent text-sm md:text-base font-medium rounded-full shadow-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-transform transform hover:-translate-y-1"
              >
                <Apple className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3" />
                <span className="whitespace-nowrap">Download on the App Store</span>
              </a>
              <button
                onClick={handlePlayStoreClick}
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border border-transparent text-sm md:text-base font-medium rounded-full shadow-lg text-white bg-gray-800 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-transform transform hover:-translate-y-1"
              >
                <Play className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3" />
                <span className="whitespace-nowrap">Get it on Google Play</span>
              </button>
            </div>
          </div>

          {/* Desktop: QR Code on right */}
          <div className="hidden lg:flex lg:w-1/3 flex-col items-center justify-center p-8 bg-gray-100 rounded-3xl shadow-xl text-center order-3 lg:order-2">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Scan to Download</h2>
            <div className="bg-white p-6 rounded-xl shadow-lg border-4 border-gray-200 transform hover:scale-105 transition-transform duration-300">
              <img
                src="/mmmut.png"
                alt="QR Code to download app"
                className="w-64 h-64 rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Custom Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Coming Soon!</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 text-center">
              <div className="mb-4">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Play className="h-8 w-8 text-gray-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Google Play Store</h4>
                <p className="text-gray-600 mb-6">
                  We're working hard to bring Numbr to Google Play Store. Our app will be available soon!
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                >
                  Close
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
                >
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
