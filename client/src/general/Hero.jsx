"use client"

import { useState, useEffect } from "react"

const slides = [
  { src: "https://picsum.photos/seed/schedule/200", caption: "Schedule Appointments" },
  { src: "https://picsum.photos/seed/payments/200", caption: "Manage Payments" },
  { src: "https://picsum.photos/seed/profiles/200", caption: "Customer Profiles" },
  { src: "https://picsum.photos/seed/reviews/200", caption: "Track Reviews" },
  { src: "https://picsum.photos/seed/analytics/200", caption: "Analytics Dashboard" },
  { src: "https://picsum.photos/seed/teamwork/200", caption: "Team Collaboration" },
]

export default function HeroSection() {
  const [hoveredButton, setHoveredButton] = useState(null)
  const [current, setCurrent] = useState(0)
  const [animationPhase, setAnimationPhase] = useState("entering")
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    setAnimationPhase("entering")
    setShowText(false)

    const enterDuration = 1500
    const pauseDuration = 2000
    const exitDuration = 1500

    const textTimer = setTimeout(() => {
      setShowText(true)
    }, enterDuration / 2)

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
      clearTimeout(textTimer)
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
    <section className="relative bg-black text-white max-h-screen overflow-hidden">
      {/* Enhanced Background with Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>

      {/* Diagonal Edge */}
      <div className="absolute top-0 left-0 w-0 h-0 border-l-[300px] border-l-transparent border-t-[300px] border-t-white opacity-10"></div>

      {/* Decorative X Clusters */}
      <div className="absolute top-32 right-20 opacity-20">
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="text-white text-lg font-bold animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
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

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between min-h-screen py-12">
        {/* Left Side - Content */}
        <div className="flex flex-col justify-center flex-1 max-w-2xl mb-40 ml-5">
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
            className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg w-fit ${
              hoveredButton === "contact"
                ? "bg-black text-white border-2 border-white shadow-white/20"
                : "bg-white text-black hover:bg-gray-100 hover:shadow-xl"
            }`}
            onMouseEnter={() => setHoveredButton("contact")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Contact Us
          </button>
        </div>

        {/* Right Side - Animation */}
        <div className="flex justify-center items-center flex-1 mt-12 lg:mt-60">
          <div className="relative w-96 h-96">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-16 z-10 text-center">
              {showText && (
                <h2 className="text-2xl md:text-3xl w-fit-content font-semibold text-white typing-text whitespace-nowrap">
                  {currentSlide.caption}
                </h2>
              )}
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

      <style jsx>{`
        .arc-image {
          width: 280px;
          height: 380px;
          border-radius: 1.5rem;
          transform-origin: 50% 200px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .arc-image.entering {
          animation: enterArc 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .arc-image.paused {
          transform: rotate(0deg) translateY(-200px);
        }

        .arc-image.exiting {
          animation: exitArc 1.5s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
        }

        @keyframes enterArc {
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

        @keyframes exitArc {
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

        .typing-text {
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          border-right: 3px solid #ffffff;
          animation: 
            typing 2s steps(20, end) forwards,
            blink 1.2s step-end infinite;
          color: #ffffff;
          font-weight: 600;
          letter-spacing: 0.02em;
          max-width: 300px;
        }

        @keyframes typing {
          from { 
            width: 0;
            opacity: 0.8;
          }
          to { 
            width: 100%;
            opacity: 1;
          }
        }

        @keyframes blink {
          0%, 45% { 
            border-color: #ffffff;
            opacity: 1;
          }
          46%, 100% { 
            border-color: transparent;
            opacity: 0.7;
          }
        }

        @media (max-width: 1024px) {
          .arc-image {
            width: 80px;
            height: 150px;
            transform-origin: 50% 170px;
          }

          .arc-image.entering {
            animation: enterArcMobile 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }

          .arc-image.paused {
            transform: rotate(0deg) translateY(-170px);
          }

          .arc-image.exiting {
            animation: exitArcMobile 1.5s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
          }

          .typing-text {
            font-size: 1.5rem;
            max-width: 250px;
          }

          @keyframes enterArcMobile {
            from {
              transform: rotate(-90deg) translateY(-170px);
              opacity: 0;
              scale: 0.8;
            }
            to {
              transform: rotate(0deg) translateY(-170px);
              opacity: 1;
              scale: 1;
            }
          }

          @keyframes exitArcMobile {
            from {
              transform: rotate(0deg) translateY(-170px);
              opacity: 1;
              scale: 1;
            }
            to {
              transform: rotate(90deg) translateY(-170px);
              opacity: 0;
              scale: 0.8;
            }
          }
        }
      `}</style>
    </section>
  )
}
