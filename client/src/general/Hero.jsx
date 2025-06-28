
import { useState } from "react"
import { Phone, Mail, Play, Star, Telescope, Scissors, Menu, X, Facebook, Instagram, Twitter } from "lucide-react"

export default function Hero() {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredButton, setHoveredButton] = useState(null)
  return (
 
    <section className="relative bg-black text-white min-h-screen overflow-hidden pt-16">
        {/* Diagonal Edge */}
        <div className="absolute top-0 left-0 w-0 h-0 border-l-[300px] border-l-transparent border-t-[300px] border-t-white opacity-10"></div>

        {/* Decorative X Clusters */}
        <div className="absolute top-32 right-20 opacity-20">
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="text-white text-lg font-bold">
                ×
              </div>
            ))}
          </div>
        </div>

        {/* Diagonal Drip Shapes */}
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M0,200 Q50,120 100,200 Q150,80 200,200 L200,200 L0,200 Z" fill="white" />
            <path d="M20,200 Q70,140 120,200 Q170,100 200,200" fill="none" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col justify-center min-h-screen">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div>
              {/* Mini Logo Phone Mockup */}
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-20 bg-white rounded-lg flex items-center justify-center relative">
                  <Scissors className="h-6 w-6 text-black" />
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gray-300 rounded-full"></div>
                </div>
                <span className="text-lg font-medium text-gray-300">www.numbr.org</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-7xl font-black leading-none mb-6">
                BARBER SHOP
                <br />
                <span className="text-gray-400">MANAGEMENT</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-lg">
                Everything you need to manage your barbershop—in one app.
              </p>

              <button
                className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${
                  hoveredButton === "contact"
                    ? "bg-black text-white border-2 border-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
                onMouseEnter={() => setHoveredButton("contact")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Contact Us
              </button>
            </div>

            {/* Right Side - Visual Element */}
            <div className="flex justify-center">
                
              <div className="relative w-80 h-80">
                {/* Animated Scissors */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Scissors className="h-32 w-32 text-white animate-pulse" />
                </div>

                {/* Orbiting Elements */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "20s" }}>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </section>
      

  )
}
