"use client"

import React, { useEffect, useState } from "react"

interface HeroSubtitleProps {
  start: boolean;
}

export default function HeroSubtitle({ start }: HeroSubtitleProps) {
  const [typedText, setTypedText] = useState("")

  useEffect(() => {
    if (!start) return

    const fullSubtitle = "A freelance web developer expertising in frontend skills"
    let idx = 0
    let currentText = ""
    const interval = setInterval(() => {
      if (idx < fullSubtitle.length) {
        currentText += fullSubtitle.charAt(idx)
        setTypedText(currentText)
        idx++
      } else {
        clearInterval(interval)
      }
    }, 35)

    return () => {
      clearInterval(interval)
    }
  }, [start])

  return (
    <p className="font-barlow font-black text-xl md:text-2xl tracking-tight leading-snug uppercase mb-2 min-h-[3.5rem] flex items-center">
      {typedText}
      {start && <span className="inline-block w-2 h-6 bg-comic-yellow ml-1 animate-pulse" />}
    </p>
  )
}
