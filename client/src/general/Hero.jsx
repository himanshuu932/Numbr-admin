"use client"

import { useState, useEffect } from "react"

// Slide data with placeholder images
const slides = [
  {
    src: "icon3.png",
    caption: "Schedule Appointments",
    lines: ["Schedule", "Appointments"],
  },
  {
    src: "icon4.png",
    caption: "Manage Queues",
    lines: ["Manage", "Queues"],
  },
  {
    src: "icon5.png",
    caption: "Gain Reach",
    lines: ["Gain", "Reach"],
  },
  {
    src: "icon2.png",
    caption: "Track Reviews",
    lines: ["Track", "Reviews"],
  },
  {
    src: "icon1.png",
    caption: "Analytics Dashboard",
    lines: ["Analytics", "Dashboard"],
  },
  {
    src: "icon6.png",
    caption: "Loyal Customers",
    lines: ["Loyal", "Customers"],
  },
]

export default function App() {
  // State for button hover effects
  const [hoveredButton, setHoveredButton] = useState(null)
  // State for the current slide index
  const [current, setCurrent] = useState(0)
  // State to manage the animation lifecycle (entering, paused, exiting)
  const [animationPhase, setAnimationPhase] = useState("entering")
  // States to control the two-line typing animation
  const [showFirstLine, setShowFirstLine] = useState(false)
  const [showSecondLine, setShowSecondLine] = useState(false)

  // Effect to set page metadata
  useEffect(() => {
    document.title = "Barber Shop Management - Todo lo que necesitas para gestionar tu barbería"
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", "Gestión completa de barbería en una sola aplicación")
    } else {
      const meta = document.createElement("meta")
      meta.name = "description"
      meta.content = "Gestión completa de barbería en una sola aplicación"
      document.head.appendChild(meta)
    }
  }, [])

  // Effect to handle the slide animation and text typing timers
  useEffect(() => {
    // Reset animation states for the new slide
    setAnimationPhase("entering")
    setShowFirstLine(false)
    setShowSecondLine(false)

    const enterDuration = 1500
    const pauseDuration = 3000
    const exitDuration = 1500

    // Timer to start the first line of typing animation
    const firstLineTimer = setTimeout(() => setShowFirstLine(true), enterDuration / 2)
    // Timer to start the second line of typing animation
    const secondLineTimer = setTimeout(() => setShowSecondLine(true), enterDuration / 2 + 1200)
    // Timer to pause the slide animation
    const pauseTimer = setTimeout(() => setAnimationPhase("paused"), enterDuration)
    // Timer to start the exiting animation
    const exitTimer = setTimeout(() => setAnimationPhase("exiting"), enterDuration + pauseDuration)
    // Timer to advance to the next slide
    const nextTimer = setTimeout(() => {
      setCurrent((prevCurrent) => (prevCurrent + 1) % slides.length)
    }, enterDuration + pauseDuration + exitDuration + 500)

    // Cleanup timers on component unmount or when 'current' changes
    return () => {
      clearTimeout(firstLineTimer)
      clearTimeout(secondLineTimer)
      clearTimeout(pauseTimer)
      clearTimeout(exitTimer)
      clearTimeout(nextTimer)
    }
  }, [current])

  // Loading state
  if (!slides || slides.length === 0) {
    return <div>Loading...</div>
  }

  const currentSlide = slides[current]
  // Error state for slide loading
  if (!currentSlide) {
    return <div>Error loading slide</div>
  }

  return (
    <>
      <section className="relative bg-black text-white max-h-[90vh] overflow-hidden">
        {/* Enhanced Background with Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-0 h-0 border-l-[200px] md:border-l-[300px] border-l-transparent border-t-[200px] md:border-t-[300px] border-t-white opacity-10"></div>
        <div className="absolute top-16 md:top-32 right-10 md:right-20 opacity-20">
          <div className="grid grid-cols-4 md:grid-cols-6 gap-1 md:gap-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="text-white text-sm md:text-lg font-bold animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>×</div>
            ))}
          </div>
        </div>
        <div className="absolute top-10 left-10 opacity-20">
          <div className="grid grid-cols-4 md:grid-cols-6 gap-1 md:gap-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="text-white text-sm md:text-lg font-bold animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>×</div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-10 md:10 left-10 opacity-20">
          <div className="grid grid-cols-4 md:grid-cols-6 gap-1 md:gap-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="text-white text-sm md:text-lg font-bold animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>×</div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-48 h-48 md:w-96 md:h-96 opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M0,200 Q50,120 100,200 Q150,80 200,200 L200,200 L0,200 Z" fill="white" />
            <path d="M20,200 Q70,140 120,200 Q170,100 200,200" fill="none" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        {/* Main Content Container - Desktop Flex Layout */}
        <div className="relative z-10 container mx-auto px-4 hidden lg:flex lg:flex-row items-center justify-between min-h-screen py-4 md:py-8">
          {/* Left Side - Content */}
          <div className="flex flex-col justify-center flex-1 max-w-2xl mb-40 ml-5 text-left">
            <h1 className="text-7xl font-black leading-none mb-6">
              BARBER SHOP<br /><span className="text-gray-400">MANAGEMENT</span>
            </h1>
            <p className="text-2xl text-gray-300 mb-10 max-w-lg">
              Everything you need to manage your barbershop—in one app.
            </p>
            <div className="flex flex-row gap-4 items-center justify-start mt-8">
              <a
                href="https://play.google.com/store/apps/details?id=com.x2023021235.barber&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg ${
                  hoveredButton === "download"
                    ? "bg-black text-white border-2 border-white shadow-white/20 scale-105"
                    : "bg-white text-black hover:bg-gray-100 hover:shadow-xl"
                }`}
                onMouseEnter={() => setHoveredButton("download")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Download Now
              </a>
              <a
                href="#contact"
                role="button"
                className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg ${
                  hoveredButton === "contact"
                    ? "bg-black text-white border-2 border-white shadow-white/20 scale-105"
                    : "bg-white text-black hover:bg-gray-100 hover:shadow-xl"
                }`}
                onMouseEnter={() => setHoveredButton("contact")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Right Side - Animation */}
          <div className="flex justify-center items-center flex-1 mt-60">
            <div className="relative w-96 h-96">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 z-20 text-center phone-text-position" style={{ transform: "translate(-50%, -50%) translateY(-120px)" }}>
                <div className="flex flex-col items-center space-y-1">
                  {showFirstLine && <div className="typing-text-line-1 text-xl font-semibold text-black max-w-[300px]">{currentSlide.lines[0]}</div>}
                  {showSecondLine && <div className="typing-text-line-2 text-xl font-semibold text-black max-w-[300px]">{currentSlide.lines[1]}</div>}
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img key={current} src={currentSlide.src} alt={currentSlide.caption} className={`arc-image ${animationPhase}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Absolute Layout */}
        <div className="relative z-10 lg:hidden min-h-screen">
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 mobile-phone-container">
            <div className="relative mobile-phone-wrapper">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 z-20 text-center phone-text-position">
                <div className="flex flex-col items-center space-y-1">
                  {showFirstLine && <div className="typing-text-line-1 font-semibold text-black mobile-text-size">{currentSlide.lines[0]}</div>}
                  {showSecondLine && <div className="typing-text-line-2 font-semibold text-black mobile-text-size">{currentSlide.lines[1]}</div>}
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img key={current} src={currentSlide.src} alt={currentSlide.caption} className={`arc-image ${animationPhase}`} />
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 text-center mobile-content-container px-4">
            <h1 className="mobile-heading font-black leading-none mb-3">
              BARBER SHOP<br /><span className="text-gray-400">MANAGEMENT</span>
            </h1>
            <p className="mobile-description text-gray-300 mb-6 max-w-lg mx-auto">
              Everything you need to manage your barbershop—in one app.
            </p>
            <div className="flex flex-row gap-2 sm:gap-4 items-center justify-center mt-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.x2023021235.barber&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                className={`mobile-button rounded-full font-semibold transition-all duration-300 shadow-lg flex-1 sm:flex-none sm:w-fit ${
                  hoveredButton === "download"
                    ? "bg-black text-white border-2 border-white shadow-white/20 scale-105"
                    : "bg-white text-black hover:bg-gray-100 hover:shadow-xl"
                }`}
                onMouseEnter={() => setHoveredButton("download")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Download Now
              </a>
              <a
                href="#contact"
                role="button"
                className={`mobile-button rounded-full font-semibold transition-all duration-300 shadow-lg flex-1 sm:flex-none sm:w-fit ${
                  hoveredButton === "contact"
                    ? "bg-black text-white border-2 border-white shadow-white/20 scale-105"
                    : "bg-white text-black hover:bg-gray-100 hover:shadow-xl"
                }`}
                onMouseEnter={() => setHoveredButton("contact")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <style jsx>
          {`
            /* Responsive styles for mobile, tablet, and desktop */
            /* Extra Small Mobile - 480px and below */
            @media (max-width: 480px) {
              .mobile-phone-container { top: 2rem; }
              .mobile-phone-wrapper { width: 380px; height: 280px; }
              .mobile-content-container { top: 340px; width: 100%; }
              .mobile-heading { font-size: 2.25rem; }
              .mobile-description { text-align: justify; max-width: 68%; font-size: 1.125rem; }
              .mobile-button { padding: 0.75rem 1rem; font-size: 1rem; }
              .mobile-text-size { font-size: 0.875rem !important; max-width: 140px; }
              .arc-image { width: 160px; height: 320px; transform-origin: 50% 260px; }
              .arc-image.entering { animation: enterArcXsMobile 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
              .arc-image.paused { transform: rotate(0deg) translateY(-5px); }
              .arc-image.exiting { animation: exitArcXsMobile 1.5s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards; }
              .phone-text-position { transform: translate(-50%, -50%) translateY(100px) !important; }
            }

            /* Mobile Arc Animation - 481px to 639px */
            @media (min-width: 481px) and (max-width: 639px) {
              .mobile-phone-container { top: 2rem; }
              .mobile-phone-wrapper { width: 350px; height: 450px; }
              .mobile-content-container { top: 400px; width: 100%; }
              .mobile-heading { font-size: 3rem; }
              .mobile-description { text-align: justify; max-width: 80%; font-size: 1.1rem; }
              .mobile-button { padding: 0.75rem 1.5rem; font-size: 1rem; }
              .mobile-text-size { font-size: 1rem !important; max-width: 160px; }
              .arc-image.entering { animation: enterArcMobile 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
              .arc-image.paused { transform: rotate(0deg) translateY(-50px); }
              .arc-image.exiting { animation: exitArcMobile 1.5s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards; }
              .phone-text-position { transform: translate(-50%, -50%) translateY(80px) !important; }
            }

            /* Small Mobile (sm) - 640px to 767px */
            @media (min-width: 640px) and (max-width: 767px) {
              .mobile-phone-container { top: 2rem; }
              .mobile-phone-wrapper { width: 500px; height: 350px; }
              .mobile-content-container { top: 420px; width: 100%; }
              .mobile-heading { font-size: 3.75rem; }
              .mobile-description { text-align: justify; max-width: 75%; font-size: 1.5rem; }
              .mobile-button { padding: 1rem 2rem; font-size: 1.125rem; }
              .mobile-text-size { font-size: 1.125rem !important; max-width: 180px; }
              .arc-image { width: 200px; height: 400px; transform-origin: 50% 320px; }
              .arc-image.entering { animation: enterArcSmMobile 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
              .arc-image.paused { transform: rotate(0deg) translateY(0px); }
              .arc-image.exiting { animation: exitArcSmMobile 1.5s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards; }
              .phone-text-position { transform: translate(-50%, -50%) translateY(150px) !important; }
            }

            /* Tablet - 768px to 1023px */
            @media (min-width: 768px) and (max-width: 1023px) {
              .mobile-phone-container { top: 2rem; }
              .mobile-phone-wrapper { width: 500px; height: 440px; }
              .mobile-content-container { top: 460px; width: 100%; }
              .mobile-heading { font-size: 3.75rem; }
              .mobile-description { text-align: justify; max-width: 58%; font-size: 1.5rem; }
              .mobile-button { padding: 1rem 2rem; font-size: 1.125rem; }
              .mobile-text-size { font-size: 1.25rem !important; max-width: 200px; }
              .arc-image { width: 220px; height: 440px; transform-origin: 50% 380px; }
              .arc-image.entering { animation: enterArcTablet 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
              .arc-image.paused { transform: rotate(0deg) translateY(-30px); }
              .arc-image.exiting { animation: exitArcTablet 1.5s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards; }
              .phone-text-position { transform: translate(-50%, -50%) translateY(130px) !important; }
            }

            /* Desktop Arc Animation */
            @media (min-width: 1024px) {
              .arc-image { width: 192px; height: 380px; transform-origin: 50% 400px; }
              .arc-image.entering { animation: enterArcDesktop 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
              .arc-image.paused { transform: rotate(0deg) translateY(-230px); }
              .arc-image.exiting { animation: exitArcDesktop 1.5s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards; }
            }
            
            /* Keyframes for animations */
            @keyframes enterArcXsMobile { from { transform: rotate(-90deg) translateY(-5px); opacity: 0; scale: 0.8; } to { transform: rotate(0deg) translateY(-5px); opacity: 1; scale: 1; } }
            @keyframes exitArcXsMobile { from { transform: rotate(0deg) translateY(-5px); opacity: 1; scale: 1; } to { transform: rotate(90deg) translateY(-5px); opacity: 0; scale: 0.8; } }
            @keyframes enterArcMobile { from { transform: rotate(-90deg) translateY(-50px); opacity: 0; scale: 0.8; } to { transform: rotate(0deg) translateY(-50px); opacity: 1; scale: 1; } }
            @keyframes exitArcMobile { from { transform: rotate(0deg) translateY(-50px); opacity: 1; scale: 1; } to { transform: rotate(90deg) translateY(-50px); opacity: 0; scale: 0.8; } }
            @keyframes enterArcSmMobile { from { transform: rotate(-90deg) translateY(0px); opacity: 0; scale: 0.8; } to { transform: rotate(0deg) translateY(0px); opacity: 1; scale: 1; } }
            @keyframes exitArcSmMobile { from { transform: rotate(0deg) translateY(0px); opacity: 1; scale: 1; } to { transform: rotate(90deg) translateY(0px); opacity: 0; scale: 0.8; } }
            @keyframes enterArcTablet { from { transform: rotate(-90deg) translateY(-30px); opacity: 0; scale: 0.8; } to { transform: rotate(0deg) translateY(-30px); opacity: 1; scale: 1; } }
            @keyframes exitArcTablet { from { transform: rotate(0deg) translateY(-30px); opacity: 1; scale: 1; } to { transform: rotate(90deg) translateY(-30px); opacity: 0; scale: 0.8; } }
            @keyframes enterArcDesktop { from { transform: rotate(-90deg) translateY(-230px); opacity: 0; scale: 0.8; } to { transform: rotate(0deg) translateY(-230px); opacity: 1; scale: 1; } }
            @keyframes exitArcDesktop { from { transform: rotate(0deg) translateY(-230px); opacity: 1; scale: 1; } to { transform: rotate(90deg) translateY(-230px); opacity: 0; scale: 0.8; } }

            /* Typing Text Animations */
            .typing-text-line-1, .typing-text-line-2 {
              display: inline-block;
              white-space: nowrap;
              overflow: hidden;
              color: #000000;
              font-weight: 700;
              letter-spacing: 0.02em;
            }
            .typing-text-line-1 { animation: typing 1.2s steps(15, end) forwards; }
            .typing-text-line-2 { animation: typing 1.2s steps(15, end) forwards; }
            @keyframes typing { from { width: 0; } to { width: 100%; } }
          `}
        </style>
      </section>
    </>
  )
}
