"use client"

import React, { useEffect, useRef } from "react"
import Link from "next/link"
import Works from "../components/Works"
import { animate, stagger, random } from "animejs"
import { Sparkles, Terminal, Code2, Layers, Cpu, Send, Mail, Phone, MapPin, Zap } from "lucide-react"

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = React.useState(false)
  const [isShaking, setIsShaking] = React.useState(false)
  const [introComplete, setIntroComplete] = React.useState(false)
  const [typedText, setTypedText] = React.useState("")

  useEffect(() => {
    // Smooth intro fade-in flag
    setIsMounted(true)

    // 1. Navigation Slide Down
    animate("nav", {
      translateY: [-80, 0],
      opacity: [0, 1],
      duration: 500,
      easing: "easeOutQuad",
    })

    // 2. Hero Title Line Slam (Elastic drop & heavy bounce)
    animate(".slam-title", {
      scale: [3, 1],
      translateY: [-200, 0],
      rotate: [12, -2],
      opacity: [0, 1],
      delay: stagger(150, { start: 200 }),
      duration: 600,
      easing: "easeOutBack",
    })

    // 3. Hero Description Box Slam
    animate(".slam-desc", {
      translateX: [-150, 0],
      skewX: [-10, 0],
      opacity: [0, 1],
      delay: 500,
      duration: 550,
      easing: "easeOutBack",
    })

    // 4. Hero Graphic Panel Zoom & Slam
    animate(".slam-panel", {
      scale: [0.4, 1],
      rotate: [20, 2],
      opacity: [0, 1],
      delay: 450,
      duration: 700,
      easing: "easeOutElastic(1, 0.75)",
    })

    // 5. Floating SVG Accents
    animate(".hero-float-accent", {
      translateY: () => [0, random(-15, 15)],
      translateX: () => [0, random(-10, 10)],
      rotate: () => [0, random(-8, 8)],
      duration: () => random(2500, 4000),
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    })

    // Slam Screen Shudder Effect (triggers on title slam landing, lasting 0.8 sec)
    const shakeTimeoutStart = setTimeout(() => {
      setIsShaking(true)
    }, 450)

    const shakeTimeoutEnd = setTimeout(() => {
      setIsShaking(false)
    }, 1250) // 450 + 800 = 1250ms

    // Typewriter effect starting at 800ms
    const fullSubtitle = "A freelance web developer expertising in frontend skills"
    let interval: NodeJS.Timeout
    const typewriterTimeout = setTimeout(() => {
      let currentText = ""
      let idx = 0
      interval = setInterval(() => {
        if (idx < fullSubtitle.length) {
          currentText += fullSubtitle.charAt(idx)
          setTypedText(currentText)
          idx++
        } else {
          clearInterval(interval)
        }
      }, 35)
    }, 800)

    const completeTimeout = setTimeout(() => {
      setIntroComplete(true)
    }, 1250)

    return () => {
      clearTimeout(shakeTimeoutStart)
      clearTimeout(shakeTimeoutEnd)
      clearTimeout(typewriterTimeout)
      clearTimeout(completeTimeout)
      if (interval) clearInterval(interval)
    }
  }, [])

  return (
    <main className={`min-h-screen bg-white text-black overflow-hidden relative selection:bg-comic-yellow selection:text-black transition-opacity duration-700 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Pinned Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b-4 border-black opacity-0">
        <div className="container mx-auto px-3 sm:px-4 md:px-8 py-3.5 flex justify-between items-center">
          <Link
            href="/"
            className="text-base sm:text-xl md:text-2xl font-archivo font-black tracking-tighter text-black flex items-center gap-1 hover:text-comic-red transition-colors duration-150"
          >
            SPANDAN.U <span className="text-comic-red">//</span> DEV
          </Link>
          <div className="flex space-x-3 sm:space-x-6 md:space-x-10 font-barlow font-bold text-xs sm:text-sm md:text-base uppercase tracking-widest">
            <Link href="#work" className="text-black hover:text-comic-red transition-colors relative group">
              Work
              <span className="absolute bottom-[-4px] left-0 w-0 h-1 bg-comic-red transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href="#about" className="text-black hover:text-comic-red transition-colors relative group">
              About
              <span className="absolute bottom-[-4px] left-0 w-0 h-1 bg-comic-red transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href="#contact" className="text-black hover:text-comic-red transition-colors relative group">
              Contact
              <span className="absolute bottom-[-4px] left-0 w-0 h-1 bg-comic-red transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className={`relative pt-36 pb-24 px-4 md:px-8 container mx-auto min-h-[90vh] flex items-center ${isShaking ? 'animate-shudder will-change-transform' : ''}`}
      >
        {/* Background Gritty Halftone */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <div className="absolute inset-0 bg-halftone opacity-20"></div>
          {/* Floating red slash block */}
          <div className="absolute top-[20%] right-[-10%] w-[50%] h-[40%] bg-comic-red/5 -skew-x-[20deg] pointer-events-none"></div>
          {/* Coordinate Target Lines */}
          <div className="absolute top-[40%] left-0 w-full h-[1px] bg-black/5 border-dashed border-b pointer-events-none"></div>
          <div className="absolute top-0 left-[35%] w-[1px] h-full bg-black/5 border-dashed border-r pointer-events-none"></div>
        </div>

        <div className="grid grid-cols-12 gap-8 items-center w-full relative z-10">
          {/* Left Column: Heading & Bio */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
            {/* Mission status badge */}
            <div className="slam-desc flex items-center gap-2 mb-6 opacity-0 will-change-transform will-change-opacity">
              <span className="bg-black text-white font-mono text-xs px-3 py-1 font-extrabold tracking-widest">
                [ PORTFOLIO STAGE 01 ]
              </span>
              <span className="w-16 h-[2px] bg-comic-red" />
            </div>

            {/* Slamming Heading */}
            <h1 className="text-[10.5vw] sm:text-7xl md:text-8xl xl:text-9xl font-archivo font-black tracking-tighter leading-[0.9] mb-8 text-black uppercase select-none drop-shadow-[5px_5px_0px_#FFD400]">
              <span className="slam-title inline-block origin-left will-change-transform will-change-opacity">SPANDAN</span>
              <br />
              <span className="slam-title inline-block origin-left text-stroke-black text-transparent hover:text-black transition-colors duration-300 will-change-transform will-change-opacity">
                UPAMANYU
              </span>
            </h1>

            {/* Bio Description Box */}
            <div className="slam-desc max-w-xl border-l-8 border-comic-red bg-black text-white p-6 shadow-comic-solid-yellow -rotate-[1deg] opacity-0 will-change-transform will-change-opacity">
              <p className="font-barlow font-black text-xl md:text-2xl tracking-tight leading-snug uppercase mb-2 min-h-[3.5rem] flex items-center">
                {typedText}
                <span className="inline-block w-2 h-6 bg-comic-yellow ml-1 animate-pulse" />
              </p>
              <div className="h-[2px] bg-comic-yellow/30 my-3 w-1/3" />
              <p className="font-barlow font-bold text-neutral-400 text-sm md:text-base">
                Building heavy-duty interfaces and high-energy interactive sites that slam. Bridge between bold layout geometry and raw performance.
              </p>
            </div>

            {/* CTA Arrow accent */}
            <div className="slam-desc flex items-center gap-3 mt-10 opacity-0 pl-2">
              <span className="font-barlow font-black text-sm uppercase tracking-widest text-comic-red animate-pulse">
                SCROLL TO DEPLOY
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E60012" strokeWidth="3" className="animate-bounce">
                <path d="M12,5 L12,19 M5,12 L12,19 L19,12" />
              </svg>
            </div>
          </div>

          {/* Right Column: Sleek Graphic Panel */}
          <div className="col-span-12 lg:col-span-5 flex justify-center relative mt-12 lg:mt-0">
            {/* Decorative Floating Crosshair */}
            <div className="hero-float-accent absolute top-[-30px] right-[20px] w-12 h-12 border border-black rounded-full flex items-center justify-center opacity-40">
              <div className="w-6 h-6 border border-dashed border-comic-red rounded-full" />
            </div>

            <div className={`slam-panel w-full aspect-[4/3] max-w-[480px] bg-comic-dark border-comic-thick shadow-comic-solid-red rotate-[2deg] ${introComplete ? 'hover:rotate-[0deg] transition-all duration-300' : ''} relative overflow-hidden clip-comic-card p-6 opacity-0 flex flex-col justify-between will-change-transform will-change-opacity`}>
              {/* Halftone texture */}
              <div className="absolute inset-0 bg-halftone opacity-35"></div>
              
              {/* Top Panel Controls */}
              <div className="flex justify-between items-center border-b-2 border-white/10 pb-4 z-10">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-comic-red" />
                  <span className="text-[10px] font-mono text-white/50 tracking-wider">CONSOLE://ACTIVE_ENGINE</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 bg-comic-red rounded-full animate-ping" />
                  <span className="w-2.5 h-2.5 bg-comic-yellow rounded-full" />
                </div>
              </div>

              {/* Graphic Composition Overlay */}
              <div className="flex-1 flex flex-col justify-center items-center py-6 z-10 relative">
                {/* Overlapping bracket SVGs */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <span className="text-[14rem] font-archivo font-black text-white/20 select-none">{"{}"}</span>
                </div>
                
                {/* Slam Graphic Novel callout text bubble */}
                <div className="bg-comic-yellow border-comic-thick text-black font-archivo font-black text-4xl px-6 py-2 tracking-tighter uppercase -skew-x-12 -rotate-3 shadow-comic-solid shadow-black z-20">
                  SLAM!
                </div>

                <div className="mt-4 flex gap-4 text-xs font-mono text-white/40">
                  <span className="flex items-center gap-1 text-comic-red"><Zap size={10} /> 60 FPS</span>
                  <span>// FRONTEND_CORE</span>
                </div>
              </div>

              {/* Bottom stats and parameters */}
              <div className="flex justify-between items-center border-t border-white/5 pt-4 text-[10px] font-mono text-white/40 z-10">
                <span>SYSTEM CLEARANCE: LEVEL 01</span>
                <span>STATUS: STABLE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REDESIGNED WORKS / PORTFOLIO SECTION */}
      <Works />

      {/* 3. ABOUT SECTION */}
      <section id="about" className="relative py-28 px-4 md:px-8 bg-comic-dark text-white border-b-4 border-black">
        {/* Halftone texture overlay */}
        <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none z-0"></div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-12 gap-12 items-center">
            {/* Left Side: Skewed Graphic Frame */}
            <div className="col-span-12 lg:col-span-5 relative">
              {/* Giant Outlined background text */}
              <span className="absolute -top-16 -left-8 text-8xl md:text-9xl font-archivo font-black text-transparent text-stroke-white opacity-5 select-none pointer-events-none tracking-widest uppercase">
                CORE
              </span>

              <div className="w-full aspect-[4/5] max-w-[380px] mx-auto bg-black border-comic-red-thick shadow-comic-solid-red -rotate-2 hover:rotate-1 hover:scale-105 transition-all duration-300 relative clip-comic-card p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center text-xs font-mono text-comic-yellow">
                  <span className="flex items-center gap-1.5"><Layers size={12} /> DATAPACKET</span>
                  <span>v1.09</span>
                </div>

                {/* SVG cyber construct */}
                <div className="flex-1 flex items-center justify-center relative">
                  <svg width="180" height="180" viewBox="0 0 100 100" fill="none" stroke="#FFD400" strokeWidth="1.5" className="animate-[spin_25s_linear_infinite] opacity-60">
                    <circle cx="50" cy="50" r="40" />
                    <rect x="25" y="25" width="50" height="50" stroke="#E60012" strokeWidth="1" strokeDasharray="3 3" />
                    <path d="M50,10 L50,90 M10,50 L90,50" />
                  </svg>
                  <div className="absolute w-12 h-12 bg-black border border-white/20 flex items-center justify-center font-bebas text-2xl text-white font-extrabold tracking-widest shadow-comic-solid shadow-comic-red">
                    SU
                  </div>
                </div>

                <div className="text-[10px] font-mono text-neutral-500 leading-tight">
                  FILE: SPANDAN_CORE.TXT<br />
                  COMPILED ON: 2026.07.01
                </div>
              </div>
            </div>

            {/* Right Side: Clean Bio Information */}
            <div className="col-span-12 lg:col-span-7">
              <span className="bg-comic-red text-black font-bebas text-base px-3 py-1 clip-comic-badge shadow-comic-solid shadow-black inline-block -rotate-1 transform mb-6">
                [ INTEL REPORT ]
              </span>

              <h2 className="text-5xl md:text-7xl font-archivo font-black tracking-tighter uppercase mb-8 leading-none -rotate-[0.5deg]">
                ABOUT <span className="text-comic-red">ME</span>
              </h2>

              <p className="text-xl font-barlow font-bold text-neutral-300 leading-relaxed mb-6">
                Hi, I'm Spandan Upamanyu, a frontend specialist who crafts rebellious digital experiences. I bridge the gap between strict graphic systems, cinematic motion design, and high-performance interactive layout structures.
              </p>
              
              <p className="text-neutral-400 font-barlow font-bold text-sm md:text-base leading-relaxed mb-10 border-l-4 border-comic-yellow pl-4">
                I focus heavily on building websites that are clean, modular, and optimized at 60 FPS while pushing custom visuals (WebGL, Canvas, Anime.js, raw SVGs) that defy modern, flat, cookie-cutter layouts. Maximalist energy backed by rigorous clean code.
              </p>

              {/* Grid of diagonal outline tags */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs uppercase tracking-wider">
                {[
                  "React / Next.js",
                  "TypeScript",
                  "Anime.js / GSAP",
                  "Tailwind CSS",
                  "Interactive SVGs",
                  "Performance Tuning",
                ].map((skill, index) => (
                  <div
                    key={index}
                    className="bg-black hover:bg-comic-red hover:text-black border border-white/10 hover:border-black p-3 text-center transition-all duration-150 font-bold clip-comic-badge cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONTACT SECTION */}
      <section id="contact" className="relative py-28 px-4 md:px-8 bg-comic-red text-white overflow-hidden">
        {/* Diagonal Stripes background */}
        <div className="absolute inset-0 bg-stripes opacity-40 pointer-events-none z-0"></div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Column: Direct info */}
            <div className="flex flex-col justify-center">
              <span className="bg-black text-white font-bebas text-base px-3 py-1 clip-comic-badge shadow-comic-solid shadow-comic-yellow inline-block -rotate-2 transform w-max mb-6">
                OPEN FREELANCE CONTRACTS
              </span>

              <h2 className="text-5xl md:text-7xl font-archivo font-black tracking-tighter uppercase mb-6 leading-none text-black drop-shadow-[3px_3px_0px_#FFFFFF]">
                INFILTRATE MY <span className="text-white">INBOX</span>
              </h2>

              <p className="text-xl font-barlow font-black uppercase text-black leading-snug max-w-md mb-8 border-b-4 border-black pb-6">
                Interested in working together or deploying custom interactive platforms? Send a secure signal.
              </p>

              <div className="space-y-4 font-barlow font-extrabold text-sm md:text-base tracking-widest text-black">
                <p className="flex items-center gap-3 bg-white/10 p-3.5 border-comic-thick border-black shadow-comic-solid shadow-black rounded-sm max-w-sm">
                  <Mail size={18} />
                  <a href="mailto:rumis3744@gmail.com" className="hover:underline">
                    rumis3744@gmail.com
                  </a>
                </p>
                <p className="flex items-center gap-3 bg-white/10 p-3.5 border-comic-thick border-black shadow-comic-solid shadow-black rounded-sm max-w-sm">
                  <MapPin size={18} />
                  <span>ASSAM,INDIA</span>
                </p>
              </div>
            </div>

            {/* Right Column: High-contrast Contact Form */}
            <div className="bg-black text-white border-comic-thick shadow-comic-solid shadow-black p-8 clip-comic-card relative">
              <div className="absolute -top-3.5 -right-3.5 w-8 h-8 bg-comic-yellow border-comic-thick border-black rounded-full flex items-center justify-center animate-pulse z-10 text-black">
                <Zap size={14} className="fill-current" />
              </div>

              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest font-mono text-comic-yellow mb-2">
                    // NAME:
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-comic-dark border-comic-thick border-white/20 p-3 text-sm focus:outline-none focus:border-comic-yellow focus:ring-0 placeholder-white/20 text-white font-mono rounded-none"
                    placeholder="ENTER YOUR NAME"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest font-mono text-comic-yellow mb-2">
                    // EMAIL SIGNAL:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-comic-dark border-comic-thick border-white/20 p-3 text-sm focus:outline-none focus:border-comic-yellow focus:ring-0 placeholder-white/20 text-white font-mono rounded-none"
                    placeholder="ENTER EMAIL ADDRESS"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-widest font-mono text-comic-yellow mb-2">
                    // TRANSMISSION CONTENT:
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-comic-dark border-comic-thick border-white/20 p-3 text-sm focus:outline-none focus:border-comic-yellow focus:ring-0 placeholder-white/20 text-white font-mono rounded-none"
                    placeholder="ENTER ENCRYPTED DETAILS"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 relative bg-comic-yellow hover:bg-white text-black font-bebas text-xl tracking-wider py-3 border-comic-thick shadow-comic-solid shadow-comic-red transition-all duration-200 hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[8px_8px_0px_#E60012] active:translate-y-[2px] active:translate-x-[2px] active:shadow-[2px_2px_0px_#E60012] clip-comic-button font-bold"
                >
                  <Send size={16} />
                  SEND TRANSMISSION
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="py-10 px-4 md:px-8 bg-black text-white border-t border-white/10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-barlow font-bold text-neutral-500 tracking-wider">
            © 2026 SPANDAN UPAMANYU. ALL RIGS RUNNING STABLE.
          </p>
          <div className="flex space-x-8 font-barlow font-extrabold text-xs uppercase tracking-widest text-neutral-400">
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
