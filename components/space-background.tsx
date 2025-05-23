"use client"

import { useEffect, useRef } from "react"

export function SpaceBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particleCount = 100

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.classList.add("particle")

      // Random size
      const size = Math.random() * 3 + 1
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Random position
      const posX = Math.random() * 100
      const posY = Math.random() * 100
      particle.style.left = `${posX}%`
      particle.style.top = `${posY}%`

      // Random movement direction
      const endX = (Math.random() - 0.5) * 200
      const endY = (Math.random() - 0.5) * 200
      particle.style.setProperty("--end-x", `${endX}px`)
      particle.style.setProperty("--end-y", `${endY}px`)

      // Random animation delay
      particle.style.animationDelay = `${Math.random() * 15}s`

      container.appendChild(particle)
    }

    // Create black hole effect
    const blackHole = document.createElement("div")
    blackHole.style.position = "absolute"
    blackHole.style.top = "50%"
    blackHole.style.left = "50%"
    blackHole.style.transform = "translate(-50%, -50%)"
    blackHole.style.width = "300px"
    blackHole.style.height = "300px"
    blackHole.style.borderRadius = "50%"
    blackHole.style.background = "radial-gradient(circle at center, rgba(77, 24, 255, 0.1) 0%, rgba(0, 0, 0, 0) 70%)"
    blackHole.style.boxShadow = "0 0 100px 20px rgba(77, 24, 255, 0.1)"
    blackHole.style.animation = "pulse 8s infinite alternate"

    container.appendChild(blackHole)

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [])

  return <div ref={containerRef} className="space-background" />
}
