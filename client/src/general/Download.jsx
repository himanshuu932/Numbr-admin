      

import { Phone, Mail, Play, Star, Telescope, Scissors, Menu, X, Facebook, Instagram, Twitter } from "lucide-react"

export default function Download() {

  return (
 
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

  )
}

         