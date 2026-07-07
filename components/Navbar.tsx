"use client"

import React from "react"
import StaggeredMenu from "./StaggeredMenu"

export default function Navbar() {
  const menuItems = [
    { label: "Work", ariaLabel: "Explore select missions", link: "#work" },
    { label: "About", ariaLabel: "Intel report details", link: "#about" },
    { label: "Contact", ariaLabel: "Infiltrate secure inbox", link: "#contact" }
  ];

  const socialItems = [
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
    { label: "Twitter", link: "https://twitter.com" }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 animate-nav-slide-down">
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#000000"
        openMenuButtonColor="#ffffff"
        changeMenuColorOnOpen={true}
        colors={["#E60012", "#FFD400", "#141414"]}
        accentColor="#E60012"
        isFixed={false}
        closeOnClickAway={true}
      />
    </nav>
  )
}
