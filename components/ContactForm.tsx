"use client"

import React from "react"
import { Send, Zap } from "lucide-react"

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Intentionally matches original behavior (which has no actions, just a standard static form)
  }

  return (
    <div className="bg-black text-white border-comic-thick shadow-comic-solid shadow-black p-4 xs:p-6 sm:p-8 clip-comic-card relative">
      <div className="absolute -top-3.5 -right-3.5 w-8 h-8 bg-comic-yellow border-comic-thick border-black rounded-full flex items-center justify-center animate-pulse z-10 text-black">
        <Zap size={14} className="fill-current" />
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
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
  )
}
