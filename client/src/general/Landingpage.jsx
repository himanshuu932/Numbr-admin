

import { useState } from "react"
import { Phone, Mail, Play, Star, Telescope, Scissors, Menu, X, Facebook, Instagram, Twitter } from "lucide-react"

export default function NumbrRedesignedLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredButton, setHoveredButton] = useState(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Scissors className="h-8 w-8 text-black" />
              <span className="text-2xl font-bold">Numbr</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-black transition-colors">
                Features
              </a>
              <a href="#mission" className="text-gray-600 hover:text-black transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-600 hover:text-black transition-colors">
                Contact
              </a>
              <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-600 hover:text-black">
                Features
              </a>
              <a href="#mission" className="block text-gray-600 hover:text-black">
                About
              </a>
              <a href="#contact" className="block text-gray-600 hover:text-black">
                Contact
              </a>
              <button className="w-full bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 1. Hero Section (Black BG) - Redesigned */}
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

      {/* Accent Block */}
    <div className="h-6 bg-gradient-to-r from-black via-gray-500 to-white">
        <svg className="w-full h-full" viewBox="0 0 400 24" preserveAspectRatio="none">
          <path d="M0,0 Q100,24 200,0 Q300,24 400,0 L400,24 Q300,0 200,24 Q100,0 0,24 Z" fill="white" opacity="0.3" />
        </svg>
      </div>



      {/* Accent Block */}
      <div className="h-6 bg-gradient-to-r from-white via-gray-300 to-black relative">
        <svg className="w-full h-full" viewBox="0 0 400 24" preserveAspectRatio="none">
          <path d="M0,12 Q100,0 200,12 T400,12" stroke="black" strokeWidth="2" fill="none" opacity="0.3" />
        </svg>
      </div>

      {/* 3. Features Wheel (Black BG) - Created with Code */}
      <section id="features" className="relative bg-black text-white  overflow-hidden">
        <img 
    src="/fu.png" 
    alt="Contact Foreground" 
    className="w-[99vw] h-[100] object-cover z-10" 
  />
      </section>

      {/* Accent Block */}
      <div className="h-6 bg-gradient-to-r from-black via-gray-500 to-white">
        <svg className="w-full h-full" viewBox="0 0 400 24" preserveAspectRatio="none">
          <path d="M0,0 Q100,24 200,0 Q300,24 400,0 L400,24 Q300,0 200,24 Q100,0 0,24 Z" fill="white" opacity="0.3" />
        </svg>
      </div>








  


      <section className="relative bg-white text-black py-32 border-t-2 border-black">
        <div className="container mx-auto px-4">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 text-center mb-16">
            <div className="group hover:scale-105 transition-transform">
              <div className="text-6xl font-black text-black mb-4">5,000+</div>
              <div className="text-xl text-gray-600 font-medium">Barbershops Served</div>
            </div>
            <div className="group hover:scale-105 transition-transform">
              <div className="text-6xl font-black text-black mb-4">98%</div>
              <div className="text-xl text-gray-600 font-medium">User Retention</div>
            </div>
            <div className="flex flex-col items-center group hover:scale-105 transition-transform">
              <div className="flex items-center mb-4">
                <div className="text-6xl font-black text-black">4.9</div>
                <Star className="h-10 w-10 text-black ml-2 fill-current" />
              </div>
              <div className="text-xl text-gray-600 font-medium">Average Rating</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">"</div>
              <p className="text-lg text-gray-700 italic mb-6">
                Numbr transformed our booking system completely. No more double bookings or confused customers.
              </p>
              <div className="font-bold text-black">- Classic Cuts, NYC</div>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">"</div>
              <p className="text-lg text-gray-700 italic mb-6">
                Revenue increased 40% in our first month. The payment system is seamless and professional.
              </p>
              <div className="font-bold text-black">- Modern Barber Co.</div>
            </div>
          </div>
        </div>
      </section>
         
      <div className="h-6 bg-gradient-to-r from-black via-gray-500 to-white">
        <svg className="w-full h-full" viewBox="0 0 400 24" preserveAspectRatio="none">
          <path d="M0,0 Q100,24 200,0 Q300,24 400,0 L400,24 Q300,0 200,24 Q100,0 0,24 Z" fill="white" opacity="0.3" />
        </svg>
      </div>    
{/* 4. contact us (White BG) - Created with Code */}
<section id="contact" className="relative bg-black text-white  flex justify-center items-center overflow-hidden">
  <img 
    src="/cu.png" 
    alt="Contact Foreground" 
    className="w-[99vw] h-[90] object-cover z-10" 
  />
</section>

    </div>
  )
}
