"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterTextProps {
  text: string
  delay?: number
  speed?: number
  className?: string
  onComplete?: () => void
}

export function TypewriterText({ text, delay = 0, speed = 50, className = "", onComplete }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // Initial delay before typing starts
    timeout = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(timeout)
  }, [delay])

  useEffect(() => {
    if (!isTyping) return

    let currentIndex = 0
    const textLength = text.length
    let interval: NodeJS.Timeout

    const typeNextChar = () => {
      if (currentIndex < textLength) {
        setDisplayText(text.substring(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(interval)
        setIsTyping(false)
        setIsComplete(true)
        if (onComplete) onComplete()
      }
    }

    interval = setInterval(typeNextChar, speed)

    return () => clearInterval(interval)
  }, [isTyping, text, speed, onComplete])

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
      {isTyping && <span className="inline-block w-[2px] h-[1em] bg-current ml-[2px] animate-blink" />}
    </motion.span>
  )
}
