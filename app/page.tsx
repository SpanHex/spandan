import React from "react"
import dynamic from "next/dynamic"

import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import ScrollVelocity from "../components/ScrollVelocity"
import About from "../components/About"
import Contact from "../components/Contact"

// Dynamically import below-the-fold interactive works section

const Works = dynamic(() => import("../components/Works"), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-black" />,
})

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black overflow-hidden relative selection:bg-comic-yellow selection:text-black animate-page-fade-in">
      {/* Pinned Navigation */}
      <Navbar />

      {/* 1. HERO SECTION */}
      <Hero />

      {/* SCROLL VELOCITY BIO DIVIDER */}
      <div className="py-6 sm:py-10 bg-black text-white border-t-4 border-b-4 border-black overflow-hidden relative skew-y-[-2deg] my-8 sm:my-12 z-20 shadow-comic-solid-red">
        <ScrollVelocity
          texts={[
            "SPANDAN UPAMANYU // CREATIVE DEVELOPER // 60 FPS INTERFACES // SWISS REBEL //",
            "HEAVY-DUTY FRONTEND // STABLE ENGINE // BOLD GEOMETRY // NO TEMPLATES //"
          ]}
          velocity={60}
          className="font-archivo font-black text-[clamp(1.75rem,5.5vw,3.75rem)] tracking-tighter uppercase text-white/90 select-none px-4"
        />
      </div>

      {/* 2. REDESIGNED WORKS / PORTFOLIO SECTION */}
      <Works />

      {/* 3. ABOUT SECTION */}
      <About />

      {/* 4. CONTACT SECTION */}
      <Contact />

      {/* 5. FOOTER */}
      <footer className="py-10 px-4 md:px-8 bg-black text-white border-t border-white/10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs sm:text-sm font-barlow font-bold text-neutral-500 tracking-wider text-center md:text-left">
            © 2026 SPANDAN UPAMANYU. ALL RIGS RUNNING STABLE.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-barlow font-extrabold text-xs uppercase tracking-widest text-neutral-400">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-comic-red transition-colors duration-150">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-comic-red transition-colors duration-150">
              LinkedIn
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-comic-red transition-colors duration-150">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
