"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"

interface GlassmorphicButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  glowColor?: string
}

export function GlassmorphicButton({
  children,
  onClick,
  className = "",
  glowColor = "rgba(157, 78, 221, 0.8)",
}: GlassmorphicButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const rippleRef = useRef<HTMLSpanElement>(null)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(true)

    // Create ripple effect
    if (rippleRef.current && buttonRef.current) {
      const button = buttonRef.current
      const ripple = rippleRef.current
      const rect = button.getBoundingClientRect()

      const size = Math.max(rect.width, rect.height) * 2
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = `${size}px`
      ripple.style.height = `${size}px`
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`

      ripple.classList.remove("animate-ripple")
      void ripple.offsetWidth // Force reflow
      ripple.classList.add("animate-ripple")
    }
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  return (
    <motion.button
      ref={buttonRef}
      className={`relative overflow-hidden px-6 py-3 rounded-lg backdrop-blur-md 
                 border border-white/20 transition-all duration-300 ${className}`}
      style={{
        background: isHovered
          ? `linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))`
          : `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))`,
        boxShadow: isHovered
          ? `0 10px 30px -10px ${glowColor}, 0 0 20px 0px rgba(255, 255, 255, 0.1) inset`
          : `0 5px 15px -5px rgba(0, 0, 0, 0.2), 0 0 10px 0px rgba(255, 255, 255, 0.05) inset`,
        transform: isPressed ? "scale(0.98) translateY(2px)" : "scale(1) translateY(0)",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
    >
      <span ref={rippleRef} className="absolute rounded-full bg-white/30 pointer-events-none opacity-0" />
      <span className="relative z-10 font-medium text-white">{children}</span>
    </motion.button>
  )
}
