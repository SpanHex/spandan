import React from "react"
import { Mail, MapPin } from "lucide-react"
import ContactForm from "./ContactForm"

export default function Contact() {
  return (
    <section id="contact" className="relative py-16 sm:py-24 lg:py-28 px-4 md:px-8 bg-comic-red text-white overflow-hidden">
      {/* Diagonal Stripes background */}
      <div className="absolute inset-0 bg-stripes opacity-40 pointer-events-none z-0"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Left Column: Direct info */}
          <div className="flex flex-col justify-center">
            <span className="bg-black text-white font-bebas text-base px-3 py-1 clip-comic-badge shadow-comic-solid shadow-comic-yellow inline-block -rotate-2 transform w-max mb-6">
              OPEN FREELANCE CONTRACTS
            </span>

            <h2 className="text-[clamp(2.25rem,9vw,4.5rem)] md:text-7xl font-archivo font-black tracking-tighter uppercase mb-6 leading-none text-black drop-shadow-[clamp(2px,0.4vw,3px)_clamp(2px,0.4vw,3px)_0px_#FFFFFF]">
              INFILTRATE MY <span className="text-white">INBOX</span>
            </h2>

            <p className="text-lg sm:text-xl font-barlow font-black uppercase text-black leading-snug max-w-md mb-8 border-b-4 border-black pb-6">
              Interested in working together or deploying custom interactive platforms? Send a secure signal.
            </p>

            <div className="space-y-4 font-barlow font-extrabold text-sm md:text-base tracking-widest text-black w-full max-w-sm">
              <p className="flex items-center gap-3 bg-white/10 p-3 sm:p-3.5 border-comic-thick border-black shadow-comic-solid shadow-black rounded-sm w-full">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:rumis3744@gmail.com" className="hover:underline break-all">
                  rumis3744@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-3 bg-white/10 p-3 sm:p-3.5 border-comic-thick border-black shadow-comic-solid shadow-black rounded-sm w-full">
                <MapPin size={18} className="flex-shrink-0" />
                <span className="break-words">ASSAM, INDIA</span>
              </p>
            </div>
          </div>

          {/* Right Column: High-contrast Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
