

import { useState } from "react"
import { Phone, Mail, Play, Star, Telescope, Scissors, Menu, X, Facebook, Instagram, Twitter } from "lucide-react"
import Navbar from "./Navbar"
import Footer from './Footer';
import ContactUs from './ContactUs';
import Features from './Featurex';
import Download from './Download';
import Hero from "./Hero";

export default function NumbrRedesignedLanding({setActiveView}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredButton, setHoveredButton] = useState(null)

  return (
    <div className="min-h-screen bg-white">
 
       
   
       <Hero/>
  
      <div className="h-6 bg-gradient-to-r from-white via-gray-300 to-black relative">
        <svg className="w-full h-full" viewBox="0 0 400 24" preserveAspectRatio="none">
          <path d="M0,12 Q100,0 200,12 T400,12" stroke="black" strokeWidth="2" fill="none" opacity="0.3" />
        </svg>
      </div>

       <Features/>

         
      <div className="h-6 bg-gradient-to-r from-black via-gray-500 to-white">
        <svg className="w-full h-full" viewBox="0 0 400 24" preserveAspectRatio="none">
          <path d="M0,0 Q100,24 200,0 Q300,24 400,0 L400,24 Q300,0 200,24 Q100,0 0,24 Z" fill="white" opacity="0.3" />
        </svg>
      </div>
        
        <Download/>

        <div className="h-6 bg-gradient-to-r from-black via-gray-500 to-white">
        <svg className="w-full h-full" viewBox="0 0 400 24" preserveAspectRatio="none">
          <path d="M0,0 Q100,24 200,0 Q300,24 400,0 L400,24 Q300,0 200,24 Q100,0 0,24 Z" fill="white" opacity="0.3" />
        </svg>
      </div>   

        <ContactUs/>

         <div className="h-6 bg-gradient-to-r from-white via-gray-300 to-black relative">
        <svg className="w-full h-full" viewBox="0 0 400 24" preserveAspectRatio="none">
          <path d="M0,12 Q100,0 200,12 T400,12" stroke="black" strokeWidth="2" fill="none" opacity="0.3" />
        </svg>
      </div>

        {/* <Footer/> */}
    </div>
  )
}
