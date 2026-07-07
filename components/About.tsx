import React from "react"
import { Layers } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="relative py-16 sm:py-24 lg:py-28 px-4 md:px-8 bg-comic-dark text-white border-b-4 border-black">
      {/* Halftone texture overlay */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none z-0"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Side: Skewed Graphic Frame */}
          <div className="col-span-12 lg:col-span-5 relative">
            {/* Giant Outlined background text */}
            <span className="absolute -top-16 -left-4 sm:-left-8 text-[clamp(4.5rem,14vw,8rem)] md:text-9xl font-archivo font-black text-transparent text-stroke-white opacity-5 select-none pointer-events-none tracking-widest uppercase">
              CORE
            </span>

            <div className="w-full aspect-[4/5] max-w-[380px] mx-auto bg-black border-comic-red-thick shadow-comic-solid-red -rotate-2 hover:rotate-1 hover:scale-105 transition-all duration-300 relative clip-comic-card p-4 sm:p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center text-xs font-mono text-comic-yellow">
                <span className="flex items-center gap-1.5"><Layers size={12} /> DATAPACKET</span>
                <span>v1.09</span>
              </div>

              {/* SVG cyber construct */}
              <div className="flex-1 flex items-center justify-center relative my-4">
                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="#FFD400" strokeWidth="1.5" className="animate-[spin_25s_linear_infinite] opacity-60 w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 max-w-[180px] max-h-[180px]">
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

            <h2 className="text-[clamp(2.25rem,9vw,4.5rem)] md:text-7xl font-archivo font-black tracking-tighter uppercase mb-8 leading-none -rotate-[0.5deg]">
              ABOUT <span className="text-comic-red">ME</span>
            </h2>

            <p className="text-lg sm:text-xl font-barlow font-bold text-neutral-300 leading-relaxed mb-6">
              Hi, I'm Spandan Upamanyu, a frontend specialist who crafts rebellious digital experiences. I bridge the gap between strict graphic systems, cinematic motion design, and high-performance interactive layout structures.
            </p>
            
            <p className="text-neutral-400 font-barlow font-bold text-sm md:text-base leading-relaxed mb-10 border-l-4 border-comic-yellow pl-4">
              I focus heavily on building websites that are clean, modular, and optimized at 60 FPS while pushing custom visuals (WebGL, Canvas, Anime.js, raw SVGs) that defy modern, flat, cookie-cutter layouts. Maximalist energy backed by rigorous clean code.
            </p>

            {/* Grid of diagonal outline tags */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs uppercase tracking-wider">
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
                  className="bg-black hover:bg-comic-red hover:text-black border border-white/10 hover:border-black p-2.5 sm:p-3 text-center transition-all duration-150 font-bold clip-comic-badge cursor-default"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
