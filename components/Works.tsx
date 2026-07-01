"use client"

import React, { useEffect, useRef } from "react"
import { ExternalLink, Github, Sparkles, AlertCircle, Play, Heart } from "lucide-react"
import { animate, createTimeline, stagger, random } from "animejs"

interface Project {
  id: string
  title: string
  url: string
  github: string | null
  tech: string[]
  description: string
  accentColor: string
  previewType: "soundwave" | "terminal" | "schematic" | "fashion"
}

const projects: Project[] = [
  {
    id: "01",
    title: "SPANDAN",
    url: "https://spandan-one.vercel.app/",
    github: "https://github.com/Spandanone/spandan",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Three.js", "Web Audio API"],
    description:
      "A high-fidelity interactive audio visualization experience. Features dynamic canvas spectrum grids, custom sound synthesis, and real-time procedural audio visualizers that pulsate in sync with background loops.",
    accentColor: "#E60012",
    previewType: "soundwave",
  },
  {
    id: "02",
    title: "FORSAKEN ARCHIVE",
    url: "https://forsaken-archive.vercel.app/",
    github: "https://github.com/ForsakenArchive/forsaken-archive",
    tech: ["React", "TypeScript", "Vite", "Canvas API", "GLSL Shaders"],
    description:
      "A terminal-inspired digital repository cataloging forbidden post-apocalyptic lore. Employs stylized CRT scanline distortion filters, digital grain, glitch text outputs, and mechanical typing sounds.",
    accentColor: "#FFD400",
    previewType: "terminal",
  },
  {
    id: "03",
    title: "ROXIMA",
    url: "https://roxima-b.pages.dev/",
    github: "https://github.com/roxima-tech/roxima",
    tech: ["Astro", "Tailwind CSS", "GSAP Animations", "WebGL", "SVG Path Morphing"],
    description:
      "A heavy-industrial schematic showcase. Integrates rotating vector gears, high-contrast mechanical schematics, coordinate target lines, and blueprint grids that respond to cursor movement.",
    accentColor: "#E60012",
    previewType: "schematic",
  },
  {
    id: "04",
    title: "BL BEAUTY ALPHA",
    url: "https://blbeautyalpha.pages.dev/",
    github: null,
    tech: ["Next.js", "React Server Components", "Tailwind CSS", "Figma", "Framer Motion"],
    description:
      "An edgy, premium cosmetics catalog. Fuses high-contrast typography, asymmetrical grids, overlapping yellow vector slashes, and floating cosmetic outline graphics in a dynamic magazine layout.",
    accentColor: "#FFD400",
    previewType: "fashion",
  },
]

export default function Works() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // 1. Initial Load / Staggered Entrance of Header
    if (headerRef.current) {
      animate(headerRef.current.querySelectorAll(".animate-header"), {
        opacity: [0, 1],
        translateX: [-50, 0],
        rotate: [-3, -2],
        delay: stagger(150),
        duration: 800,
        easing: "easeOutElastic(1, 0.6)",
      })
    }

    // 2. Background Polygons & Graphics Animation
    animate(".bg-decor-poly", {
      translateX: () => random(-15, 15),
      translateY: () => random(-15, 15),
      rotate: () => random(-5, 5),
      duration: () => random(3000, 5000),
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    })

    // 3. Scroll triggered reveal using Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardEl = entry.target as HTMLElement
            const index = cardEl.getAttribute("data-index")

            // Anime.js timeline for reveal sequence
            const tl = createTimeline({
              easing: "easeOutQuad",
            })

            // Red block flash behind
            tl.add(cardEl.querySelector(".reveal-flash-panel"), {
              width: ["0%", "100%"],
              duration: 400,
            })
              // Reveal the card itself
              .add(cardEl.querySelector(".card-inner"), {
                opacity: [0, 1],
                scale: [0.95, 1],
                rotate: [index && parseInt(index) % 2 === 0 ? -1 : 1, index && parseInt(index) % 2 === 0 ? -1.5 : 1.5],
                duration: 500,
              }, "-=200")
              // Retract the red flash block (leaving a border or shifting background)
              .add(cardEl.querySelector(".reveal-flash-panel"), {
                translateX: ["0%", "101%"],
                duration: 350,
              }, "-=300")
              // Stagger reveal text elements
              .add(cardEl.querySelectorAll(".animate-text-reveal"), {
                opacity: [0, 1],
                translateY: [20, 0],
                delay: stagger(80),
                duration: 400,
              }, "-=200")

            observer.unobserve(cardEl)
          }
        })
      },
      { threshold: 0.15 }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  // Parallax cursor tracking on individual cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index]
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Normalize coordinates around card center (-1 to 1)
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateY = ((x - centerX) / centerX) * 5 // Max 5 deg
    const rotateX = -((y - centerY) / centerY) * 5

    const innerCard = card.querySelector(".card-inner") as HTMLElement
    const previewContent = card.querySelector(".preview-inner-layer") as HTMLElement
    const bgNumber = card.querySelector(".bg-project-num") as HTMLElement

    if (innerCard) {
      innerCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    }
    if (previewContent) {
      // Parallax shifts inside the preview
      previewContent.style.transform = `translate3d(${(x - centerX) * 0.05}px, ${(y - centerY) * 0.05}px, 20px)`
    }
    if (bgNumber) {
      bgNumber.style.transform = `translate3d(${(x - centerX) * -0.08}px, ${(y - centerY) * -0.08}px, 0px)`
    }
  }

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index]
    if (!card) return

    const innerCard = card.querySelector(".card-inner") as HTMLElement
    const previewContent = card.querySelector(".preview-inner-layer") as HTMLElement
    const bgNumber = card.querySelector(".bg-project-num") as HTMLElement

    // Smoothly reset transformations
    animate(innerCard, {
      transform: [`perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`],
      duration: 500,
      easing: "easeOutCubic",
    })

    animate(previewContent, {
      transform: [`translate3d(0px, 0px, 0px)`],
      duration: 500,
      easing: "easeOutCubic",
    })

    animate(bgNumber, {
      transform: [`translate3d(0px, 0px, 0px)`],
      duration: 500,
      easing: "easeOutCubic",
    })
  }

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-28 px-4 md:px-8 bg-black overflow-hidden noise-overlay min-h-screen border-t border-b border-comic-red-thick"
    >
      {/* 1. GRAPHIC BACKGROUND DECORATIONS */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Halftone Overlay */}
        <div className="absolute inset-0 bg-halftone opacity-40"></div>
        {/* Diagonal Stripes */}
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-stripes opacity-30"></div>
        {/* Large abstract red polygons */}
        <div className="bg-decor-poly absolute top-12 left-10 w-96 h-96 bg-comic-red opacity-10 blur-2xl rounded-full"></div>
        <div className="bg-decor-poly absolute bottom-20 right-10 w-[500px] h-[500px] bg-comic-red opacity-5 blur-3xl rounded-full"></div>


        {/* Diagonal slashing background elements */}
        <svg className="absolute top-1/4 left-0 w-full h-24 text-comic-red/10 opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,0 100,40 100,60 0,20" className="fill-current" />
        </svg>
        <svg className="absolute bottom-1/4 left-0 w-full h-32 text-comic-yellow/5 opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,40 100,0 100,20 0,60" className="fill-current" />
        </svg>

        {/* Grid lines */}
        <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-white/5"></div>
        <div className="absolute top-0 bottom-0 right-12 w-[1px] bg-white/5"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* 2. SECTION HEADER */}
        <div ref={headerRef} className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative">
          <div className="relative">
            {/* Giant Outlined background text */}
            <span className="absolute -top-16 -left-8 text-8xl md:text-9xl font-archivo font-black text-transparent text-stroke-red opacity-10 select-none pointer-events-none tracking-widest uppercase">
              REBELS
            </span>
            <div className="animate-header inline-block bg-comic-red text-black text-6xl md:text-7xl lg:text-8xl font-bebas px-6 py-2 border-comic-thick shadow-comic-solid-yellow -rotate-2 transform tracking-tight">
              WORKS // PORTFOLIO
            </div>
            <div className="animate-header mt-4 text-comic-yellow font-barlow text-lg md:text-xl font-extrabold uppercase tracking-widest pl-2">
              [ STAGE 01: SELECT MISSIONS ]
            </div>
          </div>
          <p className="animate-header max-w-md font-barlow font-bold text-neutral-400 text-sm md:text-base border-l-4 border-comic-red pl-4 py-1">
            Redesigned into a high-energy interactive experience. Hit the live links to infiltrate the active sites.
          </p>
        </div>

        {/* 3. SHOWCASE CARDS */}
        <div className="space-y-36">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0
            const cardRotation = isEven ? "-rotate-[1.5deg]" : "rotate-[1.5deg]"

            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                data-index={index}
                className="relative grid grid-cols-12 gap-8 items-center"
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {/* Reveal transition panel overlay */}
                <div className="reveal-flash-panel absolute inset-0 bg-comic-red z-20 pointer-events-none w-0"></div>

                {/* PROJECT LAYOUT WRAPPER */}
                {/* PREVIEW CONTAINER - Alternate Column order */}
                <div
                  className={`col-span-12 lg:col-span-6 xl:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"
                    } w-full h-[320px] md:h-[420px] relative`}
                >
                  {/* Outer Layer: Angled Border & Card Wrapper */}
                  <div
                    className={`card-inner w-full h-full bg-comic-dark border-comic-thick ${cardRotation} transition-[box-shadow,border-color] duration-300 relative group overflow-hidden shadow-comic-solid-red hover:shadow-comic-solid-yellow clip-comic-card flex items-center justify-center opacity-0`}
                  >
                    {/* Glowing highlight corner */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>

                    {/* Preview Graphics Render */}
                    <div className="preview-inner-layer w-full h-full relative z-10 transition-transform duration-300 ease-out flex items-center justify-center">

                      {/* PREVIEW TYPE: SOUNDWAVE */}
                      {project.previewType === "soundwave" && (
                        <div className="w-full h-full bg-black relative overflow-hidden flex flex-col justify-between p-6">
                          {/* Halftone texture */}
                          <div className="absolute inset-0 bg-halftone opacity-30"></div>
                          {/* Radial overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-comic-red/40 via-transparent to-transparent"></div>

                          {/* Top UI stats */}
                          <div className="flex justify-between items-center text-xs font-barlow text-white/50 z-10">
                            <span className="flex items-center gap-1.5"><Play size={10} className="text-comic-red fill-current" /> AUDIO ENGINE ACTIVE</span>
                            <span>FREQ: 44.1 KHZ</span>
                          </div>

                          {/* Sound wave graphics */}
                          <div className="h-40 flex items-end justify-center gap-1 w-full px-4 z-10">
                            {[25, 45, 65, 35, 90, 80, 50, 75, 40, 95, 30, 70, 85, 60, 45, 80, 90, 35, 65, 50, 75, 95, 40, 60, 85, 20].map((h, i) => (
                              <div
                                key={i}
                                className="w-[3px] bg-comic-red opacity-80 rounded-t-sm animate-pulse-height"
                                style={{
                                  height: `${h}%`,
                                  animationDelay: `${(i % 5) * 0.15}s`,
                                  animationDuration: `${0.7 + (i % 4) * 0.25}s`
                                }}
                              />
                            ))}
                          </div>

                          {/* Bottom UI details */}
                          <div className="flex justify-between items-center z-10">
                            <div className="flex items-center gap-2">
                              <div className="w-2.5 h-2.5 rounded-full bg-comic-red animate-ping" />
                              <span className="text-sm font-barlow font-extrabold tracking-widest text-comic-red">BEAT TRACKER</span>
                            </div>
                            <span className="text-[10px] text-white/40 border border-white/20 px-2 py-0.5">DB Lvl: -3.2</span>
                          </div>
                        </div>
                      )}

                      {/* PREVIEW TYPE: TERMINAL */}
                      {project.previewType === "terminal" && (
                        <div className="w-full h-full bg-[#0a0a0a] relative overflow-hidden flex flex-col p-6 font-mono text-xs text-green-400">
                          {/* CRT Screen scanlines */}
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none z-20"></div>

                          <div className="flex justify-between items-center text-[10px] text-yellow-400 border-b border-green-950 pb-2 mb-3">
                            <span>SESSION: FORSAKEN_ROOT</span>
                            <span className="text-comic-red animate-pulse flex items-center gap-1"><AlertCircle size={10} /> SECURITY WARNING</span>
                          </div>

                          <div className="flex-1 flex flex-col justify-start space-y-1 overflow-hidden font-mono select-none">
                            <p className="text-white">&gt;_ INITIATING FORSAKEN DECRYPTER...</p>
                            <p className="text-neutral-500">LOAD_MODULE: CORE_SHADERS [OK]</p>
                            <p className="text-neutral-500">GLSL_SETUP: COMPILED_24_VARIANTS</p>
                            <p className="text-green-500">&gt; SEARCHING DATABASE KEYS...</p>
                            <p className="text-yellow-400 text-[10px] pl-4"># KEY_01: SPANDAN_SECURE_AUTH [PASSED]</p>
                            <p className="text-yellow-400 text-[10px] pl-4"># KEY_02: FORSAKEN_CORE_ACCESS [GRANTED]</p>
                            <p className="text-neutral-400 font-bold mt-2 animate-pulse">&gt; LOADING ENCRYPTED LOGS [88.94% completed]</p>
                          </div>

                          {/* SVG terminal decoration */}
                          <div className="absolute bottom-4 right-4 opacity-15">
                            <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="#FFD400" strokeWidth="2">
                              <path d="M10,10 L90,10 L90,90 L10,90 Z" strokeDasharray="5 5" />
                              <circle cx="50" cy="50" r="30" />
                              <path d="M50,10 L50,90" />
                              <path d="M10,50 L90,50" />
                            </svg>
                          </div>
                        </div>
                      )}

                      {/* PREVIEW TYPE: SCHEMATIC */}
                      {project.previewType === "schematic" && (
                        <div className="w-full h-full bg-[#111111] relative overflow-hidden flex items-center justify-center p-6 text-white/50 border border-white/5">
                          {/* Blueprint Grid */}
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] opacity-70"></div>

                          {/* SVG rotating mechanical blueprint gears */}
                          <div className="absolute inset-0 z-0 flex items-center justify-center">
                            <svg width="240" height="240" viewBox="0 0 100 100" fill="none" stroke="#E60012" strokeWidth="1" className="opacity-25 animate-[spin_20s_linear_infinite]">
                              <circle cx="50" cy="50" r="40" strokeDasharray="3 3" />
                              <circle cx="50" cy="50" r="25" />
                              <path d="M50,5 L50,95 M5,50 L95,50" />
                              {[...Array(12)].map((_, i) => (
                                <path
                                  key={i}
                                  d="M50,50 L50,5"
                                  transform={`rotate(${i * 30} 50 50)`}
                                  strokeDasharray="2 4"
                                />
                              ))}
                            </svg>
                            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="#FFD400" strokeWidth="1.5" className="absolute top-10 left-10 opacity-20 animate-[spin_10s_linear_infinite_reverse]">
                              <circle cx="50" cy="50" r="35" />
                              <path d="M50,50 L50,5 M5,50 L95,50" transform="rotate(45 50 50)" />
                            </svg>
                          </div>

                          {/* Technical crosshairs overlays */}
                          <div className="absolute top-6 left-6 flex flex-col font-mono text-[9px] z-10 text-white/30">
                            <span>SYS.LOC: ROXIMA_ENG</span>
                            <span>AXIS_T: 282.88 DEG</span>
                          </div>

                          <div className="z-10 relative flex flex-col items-center">
                            <div className="w-16 h-16 border-2 border-dashed border-comic-red rounded-full flex items-center justify-center animate-[spin_15s_linear_infinite]">
                              <div className="w-8 h-8 border border-comic-yellow flex items-center justify-center">
                                <div className="w-2 h-2 bg-comic-red" />
                              </div>
                            </div>
                            <span className="mt-4 font-bebas text-sm tracking-widest text-white">ENGINEERING GRID SCHEMATIC v3.0</span>
                          </div>
                        </div>
                      )}

                      {/* PREVIEW TYPE: FASHION */}
                      {project.previewType === "fashion" && (
                        <div className="w-full h-full bg-[#050505] relative overflow-hidden flex items-center justify-center p-6">
                          {/* Halftone texture */}
                          <div className="absolute inset-0 bg-halftone-yellow opacity-20"></div>

                          {/* Floating yellow graphics & Red accents */}
                          <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none z-0">
                            <div className="absolute top-1/4 left-1/4 w-32 h-[80%] bg-comic-yellow -skew-x-[20deg] opacity-25"></div>
                            <div className="absolute top-1/3 right-1/4 w-12 h-[60%] bg-comic-red -skew-x-[20deg] opacity-15"></div>
                          </div>

                          <div className="relative z-10 flex flex-col items-center text-center">
                            {/* SVG Makeup/Beauty vector logo concept outline */}
                            <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
                              <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="#FFFFFF" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(255,212,0,0.6)]">
                                <circle cx="50" cy="50" r="30" />
                                <path d="M50,10 L50,90" stroke="#FFD400" />
                                <path d="M20,35 L80,35" stroke="#E60012" strokeWidth="3" />
                                <polygon points="50,15 60,35 40,35" fill="#E60012" />
                              </svg>
                            </div>

                            <h4 className="font-bebas text-3xl tracking-wide text-white">
                              BL BEAUTY <span className="text-comic-yellow">ALPHA</span>
                            </h4>
                            <p className="font-barlow text-xs text-white/50 tracking-widest mt-2 uppercase">
                              // PREMIUM FASHION - TECH
                            </p>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </div>

                {/* DETAILS CONTAINER */}
                <div
                  className={`col-span-12 lg:col-span-6 xl:col-span-5 ${isEven ? "lg:order-2" : "lg:order-1"
                    } flex flex-col justify-center relative`}
                >
                  {/* 4. LARGE OUTLINED PROJECT NUMBER */}
                  <span className="bg-project-num absolute -top-24 right-4 md:-top-32 md:-right-8 text-[12rem] md:text-[16rem] font-archivo font-black text-transparent text-stroke-white opacity-[0.04] select-none pointer-events-none tracking-tighter transition-transform duration-300 ease-out z-0">
                    {project.id}
                  </span>

                  {/* 5. CARD CONTENT */}
                  <div className="relative z-10 select-text">
                    {/* Project Tag */}
                    <div className="animate-text-reveal flex items-center gap-2 mb-4 opacity-0">
                      <span className="bg-comic-red text-black font-bebas text-base px-3 py-0.5 clip-comic-badge border border-black shadow-comic-solid-yellow">
                        MISSION {project.id}
                      </span>
                      <span className="h-[2px] flex-1 bg-gradient-to-r from-comic-red via-comic-yellow to-transparent"></span>
                    </div>

                    {/* Project Title */}
                    <h3 className="animate-text-reveal text-4xl md:text-5xl lg:text-6xl font-archivo font-extrabold tracking-tighter text-white mb-4 -rotate-[1deg] origin-left drop-shadow-[4px_4px_0px_#000000] opacity-0">
                      {project.title}
                    </h3>

                    {/* Project Description */}
                    <p className="animate-text-reveal font-barlow font-bold text-neutral-300 text-sm md:text-base leading-relaxed mb-6 border-b border-comic-red/20 pb-6 opacity-0">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="animate-text-reveal flex flex-wrap gap-2 mb-8 opacity-0">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className="bg-comic-dark text-white font-mono text-[10px] md:text-xs px-3 py-1 border border-white/10 hover:border-comic-yellow hover:text-comic-yellow transition-colors duration-150"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="animate-text-reveal flex flex-wrap gap-4 items-center opacity-0">
                      {/* Live Link Button */}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group/btn inline-flex items-center gap-2 relative bg-comic-red hover:bg-comic-yellow text-black hover:text-black font-bebas text-lg tracking-wider px-6 py-2.5 border-comic-thick shadow-comic-solid transition-all duration-200 hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[10px_10px_0px_#000000] active:translate-y-[2px] active:translate-x-[2px] active:shadow-[4px_4px_0px_#000000] clip-comic-button font-bold"
                      >
                        <ExternalLink size={16} className="group-hover/btn:rotate-12 transition-transform duration-200" />
                        ACCESS MISSION
                      </a>

                      {/* GitHub Link Button */}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="group/btn inline-flex items-center gap-2 relative bg-white hover:bg-comic-yellow text-black font-bebas text-lg tracking-wider px-6 py-2.5 border-comic-thick shadow-comic-solid transition-all duration-200 hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[10px_10px_0px_#000000] active:translate-y-[2px] active:translate-x-[2px] active:shadow-[4px_4px_0px_#000000] clip-comic-button font-bold"
                        >
                          <Github size={16} className="group-hover/btn:scale-110 transition-transform duration-200" />
                          INSPECT CODE
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

        {/* 6. EDITORIAL FOOTER DECORATION */}
        <div className="mt-40 border-t-8 border-double border-white/20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-neutral-500 font-barlow text-sm font-extrabold uppercase tracking-widest z-10 relative">
          <div className="flex items-center gap-3">
            <Sparkles size={16} className="text-comic-red" />
            <span>[ SYSTEM PORTFOLIO INTERFACE REDESIGNED: STAGE 01 VERIFIED ]</span>
          </div>
          <div className="flex items-center gap-2">
            <span>HEALTH: 100%</span>
            <div className="w-16 h-4 bg-comic-dark border border-white/20 p-0.5 flex gap-0.5">
              <div className="w-3 h-full bg-comic-red" />
              <div className="w-3 h-full bg-comic-red" />
              <div className="w-3 h-full bg-comic-red" />
              <div className="w-3 h-full bg-comic-yellow animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
