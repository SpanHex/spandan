import type React from "react"
import "./globals.css"
import { Inter, Bebas_Neue, Archivo_Black, Barlow_Condensed } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
})
const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
})
const barlowCondensed = Barlow_Condensed({
  weight: ["800", "900"],
  subsets: ["latin"],
  variable: "--font-barlow",
})

export const metadata = {
  title: "SWISS / REBEL DESIGN STUDIO",
  description: "A bold, graphic novel-inspired portfolio and modern design studio.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${bebasNeue.variable} ${archivoBlack.variable} ${barlowCondensed.variable} font-sans bg-black text-white antialiased`}
      >
        {children}
      </body>
    </html>
  )
}

