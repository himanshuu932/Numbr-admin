"use client"

import { useState, useEffect } from "react"

const slides = [
  {
    src: "/icon2.png",
    caption: "Schedule Appointments",
    lines: ["Schedule", "Appointments"],
  },
  {
    src: "/icon2.png",
    caption: "Manage Payments",
    lines: ["Manage", "Payments"],
  },
  {
    src: "/icon2.png",
    caption: "Customer Profiles",
    lines: ["Customer", "Profiles"],
  },
  {
    src: "/icon2.png",
    caption: "Track Reviews",
    lines: ["Track", "Reviews"],
  },
  {
    src: "/icon2.png",
    caption: "Analytics Dashboard",
    lines: ["Analytics", "Dashboard"],
  },
  {
    src: "/icon2.png",
    caption: "Team Collaboration",
    lines: ["Team", "Collaboration"],
  },
]

export default function HeroSection() {
  const [hoveredButton, setHoveredButton] = useState(null)
  const [current, setCurrent] = useState(0)
  const [animationPhase, setAnimationPhase] = useState("entering")
  const [showFirstLine, setShowFirstLine] = useState(false)
  const [showSecondLine, setShowSecondLine] = useState(false)
  const [firstLineComplete, setFirstLineComplete] = useState(false)

  // Set document title for React.js
  useEffect(() => {
    document.title = "Barber Shop Management - Todo lo que necesitas para gestionar tu barbería"

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", "Gestión completa de barbería en una sola aplicación")
    } else {
      const meta = document.createElement("meta")
      meta.name = "description"
      meta.content = "Gestión completa de barbería en una sola aplicación"
      document.getElementsByTagName("head")[0].appendChild(meta)
    }
  }, [])

  useEffect(() => {
    setAnimationPhase("entering")
    setShowFirstLine(false)
    setShowSecondLine(false)
    setFirstLineComplete(false)

    const enterDuration = 1500
    const pauseDuration = 3000 // Increased to accommodate two-line typing
    const exitDuration = 1500

    // Start first line typing when phone reaches center
    const firstLineTimer = setTimeout(() => {
      setShowFirstLine(true)
    }, enterDuration / 2)

    // Start second line typing after first line completes
    const secondLineTimer = setTimeout(
      () => {
        setFirstLineComplete(true)
        setShowSecondLine(true)
      },
      enterDuration / 2 + 1200,
    ) // 1.2s for first line to complete

    const pauseTimer = setTimeout(() => {
      setAnimationPhase("paused")
    }, enterDuration)

    const exitTimer = setTimeout(() => {
      setAnimationPhase("exiting")
    }, enterDuration + pauseDuration)

    const nextTimer = setTimeout(
      () => {
        setCurrent((prevCurrent) => {
          const nextIndex = prevCurrent + 1
          return nextIndex >= slides.length ? 0 : nextIndex
        })
      },
      enterDuration + pauseDuration + exitDuration + 500,
    )

    return () => {
      clearTimeout(firstLineTimer)
      clearTimeout(secondLineTimer)
      clearTimeout(pauseTimer)
      clearTimeout(exitTimer)
      clearTimeout(nextTimer)
    }
  }, [current])

  if (!slides || slides.length === 0) {
    return <div>Loading...</div>
  }

  const currentSlide = slides[current]
  if (!currentSlide) {
    return <div>Error loading slide</div>
  }

  return (
    <>
      <section className="relative bg-black text-white min-h-screen overflow-hidden">
        {/* Enhanced Background with Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>

        {/* Diagonal Edge */}
        <div className="absolute top-0 left-0 w-0 h-0 border-l-[200px] md:border-l-[300px] border-l-transparent border-t-[200px] md:border-t-[300px] border-t-white opacity-10"></div>

        {/* Decorative X Clusters */}
        <div className="absolute top-16 md:top-32 right-10 md:right-20 opacity-20">
          <div className="grid grid-cols-4 md:grid-cols-6 gap-1 md:gap-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="text-white text-sm md:text-lg font-bold animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                ×
              </div>
            ))}
          </div>
        </div>

        {/* Diagonal Drip Shapes */}
        <div className="absolute bottom-0 right-0 w-48 h-48 md:w-96 md:h-96 opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M0,200 Q50,120 100,200 Q150,80 200,200 L200,200 L0,200 Z" fill="white" />
            <path d="M20,200 Q70,140 120,200 Q170,100 200,200" fill="none" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between min-h-screen py-4 md:py-8">
          {/* Left Side - Content */}
          <div className="flex flex-col justify-center flex-1 max-w-2xl mb-4 lg:mb-40 ml-0 lg:ml-5 text-center lg:text-left order-2 lg:order-1">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-3 md:mb-6">
              BARBER SHOP
              <br />
              <span className="text-gray-400">MANAGEMENT</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-gray-300 mb-6 md:mb-10 max-w-lg mx-auto lg:mx-0">
              Everything you need to manage your barbershop—in one app.
            </p>

            {/* Button Container */}
            <div className="flex flex-row gap-2 sm:gap-4 items-center justify-center lg:justify-start mt-4 md:mt-8">
              <button
                className={`px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all duration-300 shadow-lg w-auto flex-1 sm:flex-none sm:w-fit ${
                  hoveredButton === "download"
                    ? "bg-black text-white border-2 border-white shadow-white/20 scale-105"
                    : "bg-white text-black hover:bg-gray-100 hover:shadow-xl"
                }`}
                onMouseEnter={() => setHoveredButton("download")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Download Now
              </button>

              <button
                className={`px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all duration-300 shadow-lg w-auto flex-1 sm:flex-none sm:w-fit ${
                  hoveredButton === "contact"
                    ? "bg-black text-white border-2 border-white shadow-white/20 scale-105"
                    : "bg-white text-black hover:bg-gray-100 hover:shadow-xl"
                }`}
                onMouseEnter={() => setHoveredButton("contact")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Right Side - Animation */}
          <div className="flex justify-center items-center flex-1 mb-2 lg:mb-0 lg:mt-60 order-1 lg:order-2">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-96 lg:h-96">
              {/* Text overlay positioned inside the phone */}
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 z-20 text-center phone-text-position"
                style={{
                  transform: "translate(-50%, -50%) translateY(-8px)",
                }}
              >
                <div className="flex flex-col items-center space-y-1">
                  {showFirstLine && (
                    <div className="typing-text-line-1 text-base sm:text-lg md:text-xl lg:text-xl font-semibold text-black">
                      {currentSlide.lines[0]}
                    </div>
                  )}
                  {showSecondLine && (
                    <div className="typing-text-line-2 text-base sm:text-lg md:text-xl lg:text-xl font-semibold text-black">
                      {currentSlide.lines[1]}
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img
                  key={current}
                  src={currentSlide.src || "/placeholder.svg"}
                  alt={currentSlide.caption}
                  className={`arc-image ${animationPhase}`}
                />
              </div>
            </div>
          </div>
        </div>

        <style jsx>
          {`
  /* Extra Small Mobile - 480px and below */
@media (max-width: 480px) {
  .arc-image {
    width: 160px;
    height: 320px;
    transform-origin: 50% 260px;
  }

  .arc-image.entering {
    animation: enterArcXsMobile 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .arc-image.paused {
    transform: rotate(0deg) translateY(-5px);
  }

  .arc-image.exiting {
    animation: exitArcXsMobile 1.5s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
  }

  @keyframes enterArcXsMobile {
    from {
      transform: rotate(-90deg) translateY(-5px);
      opacity: 0;
      scale: 0.8;
    }
    to {
      transform: rotate(0deg) translateY(-5px);
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes exitArcXsMobile {
    from {
      transform: rotate(0deg) translateY(-5px);
      opacity: 1;
      scale: 1;
    }
    to {
      transform: rotate(90deg) translateY(-5px);
      opacity: 0;
      scale: 0.8;
    }
  }

  .phone-text-position {
    transform: translate(-50%, -50%) translateY(100px) !important;
  }
  
  .typing-text-line-1,
  .typing-text-line-2 {
    max-width: 140px;
    font-size: 0.875rem !important;
  }
}

/* Mobile Arc Animation - Bigger phone */
@media (min-width: 481px) and (max-width: 639px) {
 

    .arc-image.entering {
      animation: enterArcMobile 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }

    .arc-image.paused {
      transform: rotate(0deg) translateY(40px);
    }

    .arc-image.exiting {
      animation: exitArcMobile 1.5s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
    }

    @keyframes enterArcMobile {
      from {
        transform: rotate(-90deg) translateY(40px);
        opacity: 0;
        scale: 0.8;
      }
      to {
        transform: rotate(0deg) translateY(40px);
        opacity: 1;
        scale: 1;
      }
    }

    @keyframes exitArcMobile {
      from {
        transform: rotate(0deg) translateY(40px);
        opacity: 1;
        scale: 1;
      }
      to {
        transform: rotate(90deg) translateY(40px);
        opacity: 0;
        scale: 0.8;
      }
    }

    .phone-text-position {
      transform: translate(-50%, -50%) translateY(160px) !important;
    }
    
    .typing-text-line-1,
    .typing-text-line-2 {
      max-width: 160px;
      font-size: 1rem !important;
    }
  }

  /* Small Mobile (sm) */
  @media (min-width: 640px) and (max-width: 767px) {
    .arc-image {
      width: 200px;
      height: 400px;
      transform-origin: 50% 320px;
    }

    .arc-image.entering {
      animation: enterArcSmMobile 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }

    .arc-image.paused {
      transform: rotate(0deg) translateY(0px);
    }

    .arc-image.exiting {
      animation: exitArcSmMobile 1.5s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
    }

    @keyframes enterArcSmMobile {
      from {
        transform: rotate(-90deg) translateY(0px);
        opacity: 0;
        scale: 0.8;
      }
      to {
        transform: rotate(0deg) translateY(0px);
        opacity: 1;
        scale: 1;
      }
    }

    @keyframes exitArcSmMobile {
      from {
        transform: rotate(0deg) translateY(0px);
        opacity: 1;
        scale: 1;
      }
      to {
        transform: rotate(90deg) translateY(0px);
        opacity: 0;
        scale: 0.8;
      }
    }

    .phone-text-position {
      transform: translate(-50%, -50%) translateY(120px) !important;
    }
    
    .typing-text-line-1,
    .typing-text-line-2 {
      max-width: 180px;
      font-size: 1.125rem !important;
    }
  }

  /* Tablet Arc Animation - Bigger phone */
  @media (min-width: 768px) and (max-width: 1023px) {
    .arc-image {
      width: 220px;
      height: 440px;
      transform-origin: 50% 380px;
    }
    
    .arc-image.entering {
      animation: enterArcTablet 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }

    .arc-image.paused {
      transform: rotate(0deg) translateY(-30px);
    }

    .arc-image.exiting {
      animation: exitArcTablet 1.5s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
    }

    @keyframes enterArcTablet {
      from {
        transform: rotate(-90deg) translateY(-30px);
        opacity: 0;
        scale: 0.8;
      }
      to {
        transform: rotate(0deg) translateY(-30px);
        opacity: 1;
        scale: 1;
      }
    }

    @keyframes exitArcTablet {
      from {
        transform: rotate(0deg) translateY(-30px);
        opacity: 1;
        scale: 1;
      }
      to {
        transform: rotate(90deg) translateY(-30px);
        opacity: 0;
        scale: 0.8;
      }
    }

    .phone-text-position {
      transform: translate(-50%, -50%) translateY(100px) !important;
    }
    
    .typing-text-line-1,
    .typing-text-line-2 {
      max-width: 200px;
      font-size: 1.25rem !important;
    }
  }

  /* Desktop Arc Animation */
  @media (min-width: 1024px) {
    .arc-image {
      width: 192px;
      height: 380px;
      transform-origin: 50% 400px;
    }

    .arc-image.entering {
      animation: enterArcDesktop 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }

    .arc-image.paused {
      transform: rotate(0deg) translateY(-200px);
    }

    .arc-image.exiting {
      animation: exitArcDesktop 1.5s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
    }

    @keyframes enterArcDesktop {
      from {
        transform: rotate(-90deg) translateY(-200px);
        opacity: 0;
        scale: 0.8;
      }
      to {
        transform: rotate(0deg) translateY(-200px);
        opacity: 1;
        scale: 1;
      }
    }

    @keyframes exitArcDesktop {
      from {
        transform: rotate(0deg) translateY(-200px);
        opacity: 1;
        scale: 1;
      }
      to {
        transform: rotate(90deg) translateY(-200px);
        opacity: 0;
        scale: 0.8;
      }
    }

    .phone-text-position {
      transform: translate(-50%, -50%) translateY(-120px) !important;
    }
    
    .typing-text-line-1,
    .typing-text-line-2 {
      max-width: 300px;
      font-size: 1.25rem !important;
    }
  }

  /* Typing Text Animations */
  .typing-text-line-1 {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    animation: typing-line-1 1.2s steps(15, end) forwards;
    color: #000000;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  .typing-text-line-2 {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    animation: typing-line-2 1.2s steps(15, end) forwards;
    color: #000000;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  @keyframes typing-line-1 {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes typing-line-2 {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`}
        </style>
      </section>
    </>
  )
}
