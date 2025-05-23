"use client"

import { useEffect, useRef } from "react"

export function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const elementCount = 20

    for (let i = 0; i < elementCount; i++) {
      const element = document.createElement("div")
      element.className = "floating-element"

      // Random size and position
      const size = Math.random() * 4 + 2
      element.style.width = `${size}px`
      element.style.height = `${size}px`
      element.style.left = `${Math.random() * 100}%`
      element.style.top = `${Math.random() * 100}%`

      // Random color from our palette
      const colors = [
        "rgba(157, 78, 221, 0.6)",
        "rgba(255, 107, 53, 0.6)",
        "rgba(247, 147, 30, 0.6)",
        "rgba(255, 204, 2, 0.6)",
      ]
      element.style.background = colors[Math.floor(Math.random() * colors.length)]
      element.style.borderRadius = "50%"
      element.style.position = "absolute"
      element.style.animation = `float ${5 + Math.random() * 10}s infinite linear`
      element.style.animationDelay = `${Math.random() * 5}s`

      container.appendChild(element)
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />
}
