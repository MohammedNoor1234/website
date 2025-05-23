"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { DoorTransition } from "./door-transition"

interface SeeMoreButtonProps {
  targetRoute: string
  className?: string
}

export function SeeMoreButton({ targetRoute, className = "" }: SeeMoreButtonProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleClick = () => {
    setIsTransitioning(true)
  }

  const handleTransitionComplete = () => {
    setIsTransitioning(false)
  }

  return (
    <>
      <motion.button
        onClick={handleClick}
        className={`group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 
                   text-white font-bold rounded-lg transition-all duration-300 hover:from-purple-700 
                   hover:to-blue-700 hover:shadow-lg hover:shadow-purple-500/25 ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        disabled={isTransitioning}
      >
        <span className="relative z-10 flex items-center gap-2 font-manrope">
          See More
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
      </motion.button>

      <DoorTransition isOpen={isTransitioning} targetRoute={targetRoute} onComplete={handleTransitionComplete} />
    </>
  )
}
