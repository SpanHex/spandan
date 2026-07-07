"use client"

import React, { useState, useEffect } from "react"
import CountUp from "./CountUp"

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    // Disable scrolling when preloader is active
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const handleEnd = () => {
    setIsLoaded(true)
    // Restore scrolling
    document.body.style.overflow = ""
    // Remove the preloader from the DOM after the animation completes
    const timer = setTimeout(() => {
      setShouldRender(false)
      if (onComplete) {
        onComplete()
      }
    }, 600) // matches the transition duration (600ms)
    return () => clearTimeout(timer)
  }

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#141414] flex flex-col justify-between p-6 sm:p-12 transition-all duration-700 ease-in-out ${
        isLoaded ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {/* Top Swiss Branding / Info Line */}
      <div className="flex justify-between items-start font-archivo font-black uppercase text-xs sm:text-sm tracking-widest text-white/40">
        <div>SPANDAN.U // INTEL SYSTEMS</div>
        <div>SYS_STATUS: ACTIVE</div>
      </div>

      {/* Centered Large Count Display */}
      <div className="flex flex-col items-center justify-center flex-1 select-none">
        <div className="flex items-baseline font-archivo font-black text-[clamp(5rem,24vw,16rem)] leading-none text-comic-yellow tracking-tighter">
          <CountUp
            from={0}
            to={100}
            duration={1.5}
            onEnd={handleEnd}
          />
          <span className="text-comic-red font-archivo font-black text-[clamp(2.5rem,12vw,8rem)] ml-1">%</span>
        </div>
        <div className="font-barlow font-extrabold uppercase text-xs sm:text-sm tracking-widest text-white/60 animate-pulse mt-4 text-center">
          // ESTABLISHING 60FPS STABLE ENGINES //
        </div>
      </div>

      {/* Bottom Technical Indicators */}
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4 font-barlow font-semibold text-xs text-white/40 uppercase tracking-widest border-t border-white/10 pt-6">
        <div>DEPLOYMENT_REGION: SOUTH_ASIA</div>
        <div>BUILT_ON: NEXT.JS_15 + GSAP + MOTION</div>
      </div>
    </div>
  )
}
