"use client"

import React, { useEffect, useRef, useState } from "react"
import { Terminal, Zap } from "lucide-react"
import HeroSubtitle from "./HeroSubtitle"

export default function Hero({ start = true }: { start?: boolean }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const floatAnimRef = useRef<any>(null)
  const isHeroInView = useRef(false)
  const [slamComplete, setSlamComplete] = useState(false)

  useEffect(() => {
    if (!start) return
    let activeAnimators: any[] = []
    let timeouts: NodeJS.Timeout[] = []
    let isCleanedUp = false

    // Timing helper to wait until the browser has stable layout, fonts loaded and is idle
    const waitUntilReady = () => {
      return new Promise<void>((resolve) => {
        const waitForFonts = typeof document !== "undefined" && "fonts" in document
          ? document.fonts.ready
          : Promise.resolve()

        waitForFonts.then(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (typeof window !== "undefined" && "requestIdleCallback" in window) {
                requestIdleCallback(() => resolve(), { timeout: 100 })
              } else {
                setTimeout(resolve, 50)
              }
            })
          })
        })
      })
    }

    const startAnimations = async () => {
      await waitUntilReady()
      if (isCleanedUp) return

      // Dynamic import of animejs
      const { waapi, stagger, random, animate } = await import("animejs")
      if (isCleanedUp) return

      const titleElements = heroRef.current?.querySelectorAll(".slam-title")
      const descElements = heroRef.current?.querySelectorAll(".slam-desc")
      const panelElement = heroRef.current?.querySelector(".slam-panel")

      // 1. Promote layers shortly before animation begins
      if (titleElements) {
        titleElements.forEach((el) => {
          ;(el as HTMLElement).style.willChange = "transform, opacity"
        })
      }
      if (descElements) {
        descElements.forEach((el) => {
          ;(el as HTMLElement).style.willChange = "transform, opacity"
        })
      }
      if (panelElement) {
        ;(panelElement as HTMLElement).style.willChange = "transform, opacity"
      }

      // 2. Start native compositor-thread WAAPI animations
      const anim1 = waapi.animate(".slam-title", {
        scale: [3, 1],
        translateY: [-200, 0],
        rotate: [12, -2],
        opacity: [0, 1],
        delay: stagger(150, { start: 200 }),
        duration: 600,
        ease: "outBack",
      })
      activeAnimators.push(anim1)

      const anim2 = waapi.animate(".slam-desc", {
        translateX: [-150, 0],
        skewX: [-10, 0],
        opacity: [0, 1],
        delay: 500,
        duration: 550,
        ease: "outBack",
      })
      activeAnimators.push(anim2)

      const anim3 = waapi.animate(".slam-panel", {
        scale: [0.4, 1],
        rotate: [20, 2],
        opacity: [0, 1],
        delay: 450,
        duration: 700,
        ease: "outElastic(1, 0.75)",
      })
      activeAnimators.push(anim3)

      // 3. Shudder Start Timeout (450ms) - Direct DOM manipulation to prevent React re-renders
      const shakeTimeoutStart = setTimeout(() => {
        if (heroRef.current && !isCleanedUp) {
          heroRef.current.classList.add("animate-shudder")
        }
      }, 450)
      timeouts.push(shakeTimeoutStart)

      // 4. Shudder End Timeout (1250ms) - Direct DOM manipulation to prevent React re-renders
      const shakeTimeoutEnd = setTimeout(() => {
        if (heroRef.current) {
          heroRef.current.classList.remove("animate-shudder")
        }
        if (!isCleanedUp) {
          // Mount the typewriter component now that the slam animations are finished
          setSlamComplete(true)
        }
      }, 1250)
      timeouts.push(shakeTimeoutEnd)

      // 5. Clean will-change properties and enable hover interactions on completion
      Promise.all([anim1.then(), anim2.then(), anim3.then()]).then(() => {
        if (isCleanedUp) return

        if (titleElements) {
          titleElements.forEach((el) => {
            ;(el as HTMLElement).style.willChange = "auto"
          })
        }
        if (descElements) {
          descElements.forEach((el) => {
            ;(el as HTMLElement).style.willChange = "auto"
          })
        }
        if (panelElement) {
          ;(panelElement as HTMLElement).style.willChange = "auto"
          // Enable panel interactive rotation classes directly on DOM
          panelElement.classList.add("hover:rotate-[0deg]", "transition-all", "duration-300")
        }

        // 6. Initialize floating accents (standard looping rAF animation) ONLY after intro finishes
        const floatAnim = animate(".hero-float-accent", {
          translateY: () => [0, random(-15, 15)],
          translateX: () => [0, random(-10, 10)],
          rotate: () => [0, random(-8, 8)],
          duration: () => random(2500, 4000),
          direction: "alternate",
          loop: true,
          easing: "easeInOutSine",
        })
        floatAnimRef.current = floatAnim
        activeAnimators.push(floatAnim)

        // Pause looping float animations if component is currently out of view or tab is hidden
        if (document.hidden || !isHeroInView.current) {
          floatAnim.pause()
        }
      })
    }

    startAnimations()

    // IntersectionObserver to track hero visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroInView.current = entry.isIntersecting
        if (floatAnimRef.current) {
          if (entry.isIntersecting && !document.hidden) {
            floatAnimRef.current.play()
          } else {
            floatAnimRef.current.pause()
          }
        }
      },
      { threshold: 0 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    // Visibility Listener to pause loops on tab blur
    const handleVisibilityChange = () => {
      if (floatAnimRef.current) {
        if (document.hidden) {
          floatAnimRef.current.pause()
        } else if (isHeroInView.current) {
          floatAnimRef.current.play()
        }
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      isCleanedUp = true
      timeouts.forEach(clearTimeout)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      observer.disconnect()
      activeAnimators.forEach((a) => {
        try {
          if (a.cancel) {
            a.cancel()
          } else if (a.pause) {
            a.pause()
          }
        } catch (e) {}
      })
    }
  }, [start])

  return (
    <section
      ref={heroRef}
      className="relative pt-24 pb-16 sm:pt-36 sm:pb-24 px-4 md:px-8 container mx-auto min-h-[90vh] lg:min-h-screen flex items-center"
    >
      {/* Background Gritty Halftone */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute inset-0 bg-halftone opacity-20"></div>
        {/* Floating red slash block */}
        <div className="absolute top-[20%] right-[10%] w-[50%] h-[40%] bg-comic-red/5 -skew-x-[20deg] pointer-events-none"></div>
        {/* Coordinate Target Lines */}
        <div className="absolute top-[40%] left-0 w-full h-[1px] bg-black/5 border-dashed border-b pointer-events-none"></div>
        <div className="absolute top-0 left-[35%] w-[1px] h-full bg-black/5 border-dashed border-r pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-12 gap-8 items-center w-full relative z-10">
        {/* Left Column: Heading & Bio */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
          {/* Mission status badge */}
          <div className="slam-desc flex items-center gap-2 mb-6 opacity-0">
            <span className="bg-black text-white font-mono text-xs px-3 py-1 font-extrabold tracking-widest">
              [ PORTFOLIO STAGE 01 ]
            </span>
            <span className="w-16 h-[2px] bg-comic-red" />
          </div>

          {/* Slamming Heading */}
          <h1 className="text-[clamp(2.25rem,11.5vw,5.5rem)] sm:text-7xl md:text-8xl xl:text-9xl font-archivo font-black tracking-tighter leading-[0.9] mb-8 text-black uppercase select-none drop-shadow-[clamp(3px,0.6vw,5px)_clamp(3px,0.6vw,5px)_0px_#FFD400]">
            <span className="slam-title inline-block origin-left opacity-0">
              SPANDAN
            </span>
            <br />
            <span className="slam-title inline-block origin-left text-stroke-black text-transparent hover:text-black transition-colors duration-300 opacity-0">
              UPAMANYU
            </span>
          </h1>

          {/* Bio Description Box */}
          <div className="slam-desc w-full max-w-xl border-l-4 sm:border-l-8 border-comic-red bg-black text-white p-4 sm:p-6 shadow-comic-solid-yellow -rotate-[1deg] opacity-0">
            <HeroSubtitle start={slamComplete} />
            <div className="h-[2px] bg-comic-yellow/30 my-3 w-1/3" />
            <p className="font-barlow font-bold text-neutral-400 text-sm md:text-base leading-relaxed">
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
          <div className="hero-float-accent absolute top-[-30px] right-[20px] w-12 h-12 border border-black rounded-full hidden sm:flex items-center justify-center opacity-40">
            <div className="w-6 h-6 border border-dashed border-comic-red rounded-full" />
          </div>

          <div
            className="slam-panel w-full aspect-[4/3] max-w-[480px] bg-comic-dark border-comic-thick shadow-comic-solid-red rotate-[2deg] relative overflow-hidden clip-comic-card p-4 sm:p-6 opacity-0 flex flex-col justify-between"
          >
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
                <span className="text-[clamp(6rem,22vw,14rem)] font-archivo font-black text-white/20 select-none">{"{}"}</span>
              </div>

              {/* Slam Graphic Novel callout text bubble */}
              <div className="bg-comic-yellow border-comic-thick text-black font-archivo font-black text-2xl sm:text-4xl px-4 py-1.5 sm:px-6 sm:py-2 tracking-tighter uppercase -skew-x-12 -rotate-3 shadow-comic-solid shadow-black z-20">
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
  )
}
