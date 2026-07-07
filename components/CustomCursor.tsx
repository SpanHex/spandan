"use client"

import React, { useEffect, useRef } from "react"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only bind mouse listeners if the device matches pointer: fine (has a mouse)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return
    }

    const cursor = cursorRef.current
    if (!cursor) return

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Expand cursor scaling feedback on hovering interactive objects
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") || 
        target.classList.contains("clickable") ||
        target.getAttribute("role") === "button"

      if (isInteractive) {
        cursor.classList.add("cursor-hover")
      } else {
        cursor.classList.remove("cursor-hover")
      }
    }

    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  return <div id="ios-cursor" ref={cursorRef} className="pointer-events-none" />
}
