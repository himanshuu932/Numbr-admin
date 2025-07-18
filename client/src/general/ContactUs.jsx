"use client"

import { Linkedin, Globe, Instagram } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function App() {
  // State to track the mouse position relative to the card for the 3D tilt effect.
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  // Effect to add and clean up the mouse move event listener for the tilt effect.
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
      // Cleanup function to remove the event listener.
      return () => card.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section
      id="contact"
      className="relative w-full min-h-[70vh] bg-gray-200 flex items-center justify-center p-4 overflow-hidden font-sans"
    >
      {/* Geometric background shapes with interactive light effects */}
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

       {/* Scattered decorative elements with light beams */}
       <div className="absolute top-0 left-0 w-full h-full z-0">
         {/* X patterns with staggered hover and light effects */}
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
       </div>

      {/* Contact form card with magnetic cursor effect */}
      <div
        ref={cardRef}
        className="relative z-10 bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center w-full max-w-2xl mx-auto border border-gray-300/50 hover:shadow-2xl transition-all duration-500 group overflow-hidden"
        style={{
          transform: `perspective(1000px) rotateX(${(mousePosition.y - 200) * 0.02}deg) rotateY(${(mousePosition.x - 300) * 0.02}deg)`,
        }}
      >
        {/* Ripple effect overlay that follows the mouse */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.1) 0%, transparent 50%)`,
          }}
        ></div>

        {/* Contact form section */}
        <div className="relative w-full flex flex-col items-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">Contact us</h1>

          <div className="w-full max-w-md space-y-4">
            {/* LinkedIn Link */}
            {/* <a href="https://www.linkedin.com/in/username" target="_blank" rel="noopener noreferrer" className="flex items-center w-full space-x-4 group/link">
              <div className="p-3 bg-gray-900 text-white rounded-lg flex items-center justify-center shadow-lg group-hover/link:scale-110 transition-transform">
                <Linkedin className="h-6 w-6" />
              </div>
              <div className="flex-grow bg-gray-600 rounded-full px-4 py-3 shadow-inner group-hover/link:bg-gray-500 transition-colors">
                <p className="w-full bg-transparent outline-none text-white text-lg">
                  linkedin.com/in/username
                </p>
              </div>
            </a> */}

            {/* Email Link */}
            <a href="mailto:bludgers52@gmail.com" className="flex items-center w-full space-x-4 group/link">
              <div className="p-3 bg-gray-900 text-white rounded-lg flex items-center justify-center shadow-lg group-hover/link:scale-110 transition-transform">
                <Globe className="h-6 w-6" />
              </div>
              <div className="flex-grow bg-gray-500 rounded-full px-4 py-3 shadow-inner group-hover/link:bg-gray-400 transition-colors">
                <p className="w-full bg-transparent outline-none text-white text-lg">
                  bludgers52@gmail.com
                </p>
              </div>
            </a>

            {/* Instagram Link */}
            <a href="https://www.instagram.com/bludgers.52" target="_blank" rel="noopener noreferrer" className="flex items-center w-full space-x-4 group/link">
              <div className="p-3 bg-gray-900 text-white rounded-lg flex items-center justify-center shadow-lg group-hover/link:scale-110 transition-transform">
                <Instagram className="h-6 w-6" />
              </div>
              <div className="flex-grow bg-gray-700 rounded-full px-4 py-3 shadow-inner group-hover/link:bg-gray-600 transition-colors">
                <p className="w-full bg-transparent outline-none text-white text-lg">
                  bludgers.52
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
