"use client"

import { Users, Rocket, Lightbulb, Shield } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function AboutUs() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const card = cardRef.current
    if (card) {
      card.addEventListener("mousemove", handleMouseMove)
      return () => card.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section
      id="about"
      className="relative w-full min-h-[75vh] bg-gray-200 flex items-center justify-center p-4 pb-14 overflow-hidden font-sans" // Increased min-h and added pb
    >
      {/* Geometric background shapes with light effects - black and white version */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {/* Top left triangle */}
        <div className="absolute top-0 left-0 w-0 h-0 border-l-[200px] border-l-black border-b-[150px] border-b-transparent opacity-90 hover:scale-110 transition-all duration-700 ease-out group">
          <div className="absolute -top-4 -left-48 w-full h-full bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform rotate-45 blur-sm"></div>
          <div className="absolute -top-2 -left-44 w-32 h-1 bg-gradient-to-r from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform rotate-45"></div>
        </div>

        {/* Top right curved shape */}
        <div className="absolute top-0 right-0 w-64 h-32 bg-black opacity-90 rounded-bl-[100px] hover:rounded-bl-[150px] transition-all duration-1000 ease-in-out group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-800"></div>
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 transform translate-x-full group-hover:translate-x-0"></div>
        </div>

        {/* Bottom right triangle */}
        <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[250px] border-r-black border-t-[200px] border-t-transparent opacity-90 hover:scale-110 transition-all duration-700 ease-out group">
          <div className="absolute -bottom-4 -right-60 w-full h-full bg-gradient-to-tl from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -rotate-45 blur-sm"></div>
          <div className="absolute -bottom-2 -right-56 w-40 h-1 bg-gradient-to-l from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -rotate-45"></div>
        </div>

        {/* Bottom left curved accent */}
        <div className="absolute bottom-0 left-0 w-48 h-24 bg-black opacity-80 rounded-tr-[80px] hover:rounded-tr-[120px] transition-all duration-1000 ease-in-out group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-800"></div>
          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 transform translate-y-full group-hover:translate-y-0"></div>
        </div>
      </div>

      {/* Scattered decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {/* X patterns */}
        <div className="absolute top-[20%] right-[15%] grid grid-cols-7 gap-2 opacity-60 group">
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className="relative w-2 h-2 text-black font-bold text-xs flex items-center justify-center hover:text-white hover:scale-150 hover:rotate-45 transition-all duration-300 group-hover:animate-pulse"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              ×
              <div className="absolute inset-0 bg-white/60 opacity-0 hover:opacity-100 transition-opacity duration-200 blur-sm scale-150"></div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-[25%] left-[10%] grid grid-cols-7 gap-2 opacity-60 group">
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className="relative w-2 h-2 text-black font-bold text-xs flex items-center justify-center hover:text-white hover:scale-150 hover:-rotate-45 transition-all duration-300 group-hover:animate-bounce"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              ×
              <div className="absolute inset-0 bg-white/60 opacity-0 hover:opacity-100 transition-opacity duration-200 blur-sm scale-150"></div>
            </div>
          ))}
        </div>

        {/* Circular accents */}
        <div className="absolute top-[60%] left-[20%] w-8 h-8 rounded-full bg-black/50 hover:scale-150 hover:bg-black/80 transition-all duration-500 group">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <div className="absolute top-[30%] right-[25%] w-6 h-6 rounded-full bg-black/40 hover:scale-150 hover:bg-black/70 transition-all duration-700 group">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>

      {/* Main content card with magnetic cursor effect */}
      <div
        ref={cardRef}
        className="relative z-10 bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center w-full max-w-2xl mx-auto border border-gray-300/50 hover:shadow-2xl transition-all duration-500 group overflow-hidden mb-14" // Added mb-16 for bottom margin
        style={{
          transform: `perspective(1000px) rotateX(${(mousePosition.y - 200) * 0.02}deg) rotateY(${(mousePosition.x - 300) * 0.02}deg)`,
        }}
      >
        {/* Ripple effect overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.1) 0%, transparent 50%)`,
          }}
        ></div>

        {/* About Us content */}
        <div className="relative w-full flex flex-col items-center space-y-8">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">About Us</h1>

          {/* Mission statement */}
          <p className="text-lg text-gray-700 text-center max-w-2xl">
            We are a passionate team dedicated to creating innovative solutions that make a difference. 
            Our mission is to blend creativity with technology to build products that inspire.
          </p>

          {/* Features grid */}
          <div className="grid grid-cols-2 gap-6 w-full mt-6">
            {/* Team */}
            <div className="bg-gray-900/10 p-4 rounded-xl hover:bg-gray-900/20 transition-all duration-300 group">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-black text-white rounded-lg">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900">Expert Team</h3>
              </div>
              <p className="mt-2 text-gray-700 text-sm">
                A diverse team of professionals with years of industry experience.
              </p>
            </div>

            {/* Innovation */}
            <div className="bg-gray-900/10 p-4 rounded-xl hover:bg-gray-900/20 transition-all duration-300 group">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-black text-white rounded-lg">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900">Innovation</h3>
              </div>
              <p className="mt-2 text-gray-700 text-sm">
                Constantly pushing boundaries with cutting-edge solutions.
              </p>
            </div>

            {/* Growth */}
            <div className="bg-gray-900/10 p-4 rounded-xl hover:bg-gray-900/20 transition-all duration-300 group">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-black text-white rounded-lg">
                  <Rocket className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900">Rapid Growth</h3>
              </div>
              <p className="mt-2 text-gray-700 text-sm">
                Expanding our reach and impact every single day.
              </p>
            </div>

            {/* Security */}
            <div className="bg-gray-900/10 p-4 rounded-xl hover:bg-gray-900/20 transition-all duration-300 group">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-black text-white rounded-lg">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900">Security</h3>
              </div>
              <p className="mt-2 text-gray-700 text-sm">
                Your data's safety is our top priority.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-black">20+</div>
              <div className="text-gray-600">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black">10+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black">1000%</div>
              <div className="text-gray-600">Dedication</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}