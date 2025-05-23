"use client"

import { useState, useEffect } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

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

    const handleMouseDown = (e: MouseEvent) => {
      // Create ripple effect on click
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      }

      setRipples((prev) => [...prev, newRipple])

      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
      }, 800)
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
    window.addEventListener("mousedown", handleMouseDown)

    const cleanup = handleHoverChange()

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mousedown", handleMouseDown)
      cleanup()
    }
  }, [isVisible])

  if (typeof window === "undefined") return null

  return (
    <>
      <div
        className={`custom-cursor ${isHovering ? "hover" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="ripple"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
        />
      ))}
    </>
  )
}
