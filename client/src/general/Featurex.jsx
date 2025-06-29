"use client"

import { useState } from "react"
import {
  Target,
  Eye,
  Calendar,
  Users,
  MessageCircle,
  Edit3,
  Clock,
  Shield,
  BarChart3,
  FileText,
  TrendingUp,
} from "lucide-react"

export default function NumbrFeatures() {
  const [hoveredFeature, setHoveredFeature] = useState(null)

  const features = [
    {
      id: 1,
      title: "Appointment Scheduler",
      description: "Smart booking system for seamless appointments.",
      icon: Calendar,
    },
    { id: 2, title: "Live Queue Manager", description: "Real-time queue tracking and management.", icon: Clock },
    {
      id: 3,
      title: "Customer Engagement",
      description: "Build lasting relationships with clients.",
      icon: MessageCircle,
    },
    { id: 4, title: "Service Menu Editor", description: "Customize and manage your service offerings.", icon: Edit3 },
    { id: 5, title: "Shop Management", description: "Control open/closed status and operations.", icon: Shield },
    { id: 6, title: "Staff & Role Control", description: "Manage team permissions and roles.", icon: Users },
    { id: 7, title: "Rate List Management", description: "Dynamic pricing and service rates.", icon: FileText },
    { id: 8, title: "Analytics Dashboard", description: "Insights and performance metrics.", icon: BarChart3 },
    { id: 9, title: "Service History", description: "Detailed records of all services.", icon: FileText },
    { id: 10, title: "Barber Performance", description: "Track and optimize barber productivity.", icon: TrendingUp },
  ]

  return (
    <section className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-gray-200 rounded-full opacity-50 mix-blend-multiply"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-gray-200 rounded-full opacity-50 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
            Numbr: A Smart App for Barbers
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            The ultimate tool to streamline your barbershop operations and elevate the customer experience.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16 md:mb-24">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center mb-4 w-20 h-20 bg-gray-900 rounded-full">
              <Target className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Our Mission</h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              To simplify and elevate how barbershops operate by providing an intuitive and powerful management platform, fostering a frictionless barber ecosystem where owners and barbers collaborate seamlessly, backed by real-time insights and effortless workflows.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center mb-4 w-20 h-20 bg-gray-900 rounded-full">
              <Eye className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Our Vision</h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              To simplify and elevate how barbershops operate by providing an intuitive and powerful management platform, fostering a frictionless barber ecosystem where owners and barbers collaborate seamlessly, backed by real-time insights and effortless workflows.
            </p>
          </div>
        </div>

        {/* Why Choose Numbr? Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200 max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Why Choose Numbr?</h3>
            <p className="text-gray-600 text-lg">Experience the difference with our comprehensive solution.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            <div className="text-center group">
              <div className="flex justify-center items-center mx-auto w-24 h-24 mb-4 bg-gray-100 rounded-full group-hover:bg-gray-900 transition-colors duration-300">
                <TrendingUp className="h-10 w-10 text-gray-900 group-hover:text-white transition-colors duration-300" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Boost Efficiency</h4>
              <p className="text-gray-600 text-sm">Streamline operations and dramatically reduce wait times for a smoother workflow.</p>
            </div>

            <div className="text-center group">
              <div className="flex justify-center items-center mx-auto w-24 h-24 mb-4 bg-gray-100 rounded-full group-hover:bg-gray-900 transition-colors duration-300">
                <Users className="h-10 w-10 text-gray-900 group-hover:text-white transition-colors duration-300" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Delight Clients</h4>
              <p className="text-gray-600 text-sm">Enhance the customer experience from booking to checkout, building lasting loyalty.</p>
            </div>

            <div className="text-center group">
              <div className="flex justify-center items-center mx-auto w-24 h-24 mb-4 bg-gray-100 rounded-full group-hover:bg-gray-900 transition-colors duration-300">
                <BarChart3 className="h-10 w-10 text-gray-900 group-hover:text-white transition-colors duration-300" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Smart Analytics</h4>
              <p className="text-gray-600 text-sm">Leverage data-driven insights to understand performance and drive business growth.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}