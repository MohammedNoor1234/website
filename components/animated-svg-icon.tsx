"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface AnimatedSvgIconProps {
  icon: React.ReactNode
  size?: number
  color?: string
  hoverColor?: string
  className?: string
}

export function AnimatedSvgIcon({
  icon,
  size = 24,
  color = "currentColor",
  hoverColor = "#9d4edd",
  className = "",
}: AnimatedSvgIconProps) {
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = iconRef.current
    if (!element) return

    const handleMouseEnter = () => {
      element.style.color = hoverColor
      element.style.transform = "scale(1.2) rotate(5deg)"
    }

    const handleMouseLeave = () => {
      element.style.color = color
      element.style.transform = "scale(1) rotate(0deg)"
    }

    element.addEventListener("mouseenter", handleMouseEnter)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [color, hoverColor])

  return (
    <motion.div
      ref={iconRef}
      className={`inline-flex items-center justify-center transition-all duration-300 ${className}`}
      style={{ color, width: size, height: size }}
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {icon}
    </motion.div>
  )
}
