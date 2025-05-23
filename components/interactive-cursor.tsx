"use client"

import { useState, useEffect } from "react"

export function InteractiveCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      if (!isVisible) {
        setIsVisible(true)
      }
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleHoverChange = () => {
      const hoverable = document.querySelectorAll("a, button, .card, [role='button']")

      const handleElementMouseEnter = () => setIsHovering(true)
      const handleElementMouseLeave = () => setIsHovering(false)

      hoverable.forEach((element) => {
        element.addEventListener("mouseenter", handleElementMouseEnter)
        element.addEventListener("mouseleave", handleElementMouseLeave)
      })

      return () => {
        hoverable.forEach((element) => {
          element.removeEventListener("mouseenter", handleElementMouseEnter)
          element.removeEventListener("mouseleave", handleElementMouseLeave)
        })
      }
    }

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("mouseleave", handleMouseLeave)

    const cleanup = handleHoverChange()

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cleanup()
    }
  }, [isVisible])

  if (typeof window === "undefined") return null

  // Removed the cursor completely to eliminate the blur radius animation
  return null
}
