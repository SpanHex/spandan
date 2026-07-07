"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b-4 border-black animate-nav-slide-down">
      <div className="container mx-auto px-3 sm:px-4 md:px-8 py-2 md:py-3.5 flex justify-between items-center min-h-[56px] md:min-h-[70px]">
        <Link
          href="/"
          className="text-base sm:text-xl md:text-2xl font-archivo font-black tracking-tighter text-black flex items-center gap-1 hover:text-comic-red transition-colors duration-150 py-2 min-h-[44px]"
        >
          SPANDAN.U <span className="text-comic-red">//</span> DEV
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 md:space-x-10 font-barlow font-bold md:text-base uppercase tracking-widest">
          <Link href="#work" className="text-black hover:text-comic-red transition-colors relative group py-2 min-h-[44px] flex items-center">
            Work
            <span className="absolute bottom-1 left-0 w-0 h-1 bg-comic-red transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link href="#about" className="text-black hover:text-comic-red transition-colors relative group py-2 min-h-[44px] flex items-center">
            About
            <span className="absolute bottom-1 left-0 w-0 h-1 bg-comic-red transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link href="#contact" className="text-black hover:text-comic-red transition-colors relative group py-2 min-h-[44px] flex items-center">
            Contact
            <span className="absolute bottom-1 left-0 w-0 h-1 bg-comic-red transition-all duration-200 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center w-11 h-11 border-2 border-black bg-white hover:bg-comic-yellow text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black rounded-none"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
        </button>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[56px] z-40 bg-black/95 backdrop-blur-sm border-t-4 border-black flex flex-col items-center justify-center p-6 animate-page-fade-in md:hidden">
          {/* Halftone texture overlay */}
          <div className="absolute inset-0 bg-halftone opacity-25 pointer-events-none z-0"></div>

          <div className="relative z-10 flex flex-col items-center space-y-8 w-full max-w-xs text-center">
            <Link
              href="#work"
              onClick={() => setIsOpen(false)}
              className="w-full text-white hover:text-comic-yellow font-archivo font-black text-3xl sm:text-4xl uppercase tracking-tighter py-4 border-b border-white/10 hover:border-comic-yellow transition-all duration-150 flex justify-center items-center gap-2 min-h-[44px]"
            >
              WORK
            </Link>
            <Link
              href="#about"
              onClick={() => setIsOpen(false)}
              className="w-full text-white hover:text-comic-yellow font-archivo font-black text-3xl sm:text-4xl uppercase tracking-tighter py-4 border-b border-white/10 hover:border-comic-yellow transition-all duration-150 flex justify-center items-center gap-2 min-h-[44px]"
            >
              ABOUT
            </Link>
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-white hover:text-comic-yellow font-archivo font-black text-3xl sm:text-4xl uppercase tracking-tighter py-4 border-b border-white/10 hover:border-comic-yellow transition-all duration-150 flex justify-center items-center gap-2 min-h-[44px]"
            >
              CONTACT
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
