"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"

import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import ScrollVelocity from "../components/ScrollVelocity"
import FlowingMenu from "../components/FlowingMenu"
import Preloader from "../components/Preloader"
import About from "../components/About"
import Contact from "../components/Contact"

// Dynamically import below-the-fold interactive works section

const Works = dynamic(() => import("../components/Works"), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-black" />,
})

const flowingMenuItems = [
  {
    link: "#about",
    text: "FRONTEND ARCHITECTURE",
    marqueeBgColor: "#FFD400",
    marqueeTextColor: "#000000",
    image: (
      <svg viewBox="0 0 100 100" fill="none" stroke="#FFD400" strokeWidth="4" className="w-10 h-10">
        <rect x="10" y="10" width="80" height="80" strokeDasharray="4 4" />
        <path d="M35,30 L20,30 L20,70 L35,70 M65,30 L80,30 L80,70 L65,70" />
        <circle cx="50" cy="50" r="8" fill="#E60012" />
      </svg>
    )
  },
  {
    link: "#work",
    text: "CREATIVE MOTION SYSTEMS",
    marqueeBgColor: "#E60012",
    marqueeTextColor: "#ffffff",
    image: (
      <svg viewBox="0 0 100 100" fill="none" stroke="#E60012" strokeWidth="4" className="w-10 h-10">
        <path d="M10,50 Q30,10 50,50 T90,50" />
        <circle cx="50" cy="50" r="8" fill="#FFD400" />
        <line x1="50" y1="15" x2="50" y2="85" strokeDasharray="3 3" />
      </svg>
    )
  },
  {
    link: "#work",
    text: "HIGH PERFORMANCE CODES",
    marqueeBgColor: "#FFD400",
    marqueeTextColor: "#000000",
    image: (
      <svg viewBox="0 0 100 100" fill="none" stroke="#FFD400" strokeWidth="4" className="w-10 h-10">
        <path d="M50,10 L25,55 L45,55 L35,90 L75,45 L55,45 Z" fill="#E60012" />
      </svg>
    )
  },
  {
    link: "#about",
    text: "STABLE COMPOSITION",
    marqueeBgColor: "#E60012",
    marqueeTextColor: "#ffffff",
    image: (
      <svg viewBox="0 0 100 100" fill="none" stroke="#E60012" strokeWidth="4" className="w-10 h-10">
        <circle cx="50" cy="50" r="28" />
        <line x1="15" y1="50" x2="85" y2="50" />
        <line x1="50" y1="15" x2="50" y2="85" />
        <rect x="40" y="40" width="20" height="20" stroke="#FFD400" />
      </svg>
    )
  }
]

export default function Home() {
  const [preloaderActive, setPreloaderActive] = useState(true);

  return (
    <main className="min-h-screen bg-white text-black overflow-hidden relative selection:bg-comic-yellow selection:text-black animate-page-fade-in">
      {/* 0. STARTUP PRELOADER */}
      <Preloader onComplete={() => setPreloaderActive(false)} />

      {/* Pinned Navigation */}
      <Navbar />

      {/* 1. HERO SECTION */}
      <Hero />

      {/* SCROLL VELOCITY BIO DIVIDER */}
      {!preloaderActive && (
        <div className="py-6 sm:py-10 bg-black text-white border-t-4 border-b-4 border-black overflow-hidden relative skew-y-[-2deg] my-8 sm:my-12 z-20 shadow-comic-solid-red animate-page-fade-in">
          <ScrollVelocity
            texts={[
              "SPANDAN UPAMANYU // CREATIVE DEVELOPER // 60 FPS INTERFACES // SWISS REBEL //",
              "HEAVY-DUTY FRONTEND // STABLE ENGINE // BOLD GEOMETRY // NO TEMPLATES //"
            ]}
            velocity={60}
            className="font-archivo font-black text-[clamp(1.75rem,5.5vw,3.75rem)] tracking-tighter uppercase text-white/90 select-none px-4"
          />
        </div>
      )}

      {/* 2. REDESIGNED WORKS / PORTFOLIO SECTION */}
      {!preloaderActive ? (
        <Works />
      ) : (
        <div className="min-h-[50vh] bg-black" />
      )}

      {/* 3. ABOUT SECTION */}
      <About />

      {/* FLOWING INTEL MENU SECTION */}
      {!preloaderActive && (
        <section className="border-t-4 border-b-4 border-black relative z-10 animate-page-fade-in">
          <FlowingMenu
            items={flowingMenuItems}
            bgColor="#141414"
            textColor="#ffffff"
            borderColor="#000000"
            speed={12}
          />
        </section>
      )}

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
