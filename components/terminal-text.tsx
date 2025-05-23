"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TerminalTextProps {
  text: string
  typingSpeed?: number
}

export function TerminalText({ text, typingSpeed = 100 }: TerminalTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let currentIndex = 0
    let typingInterval: NodeJS.Timeout

    if (isTyping) {
      typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          setIsTyping(false)
          clearInterval(typingInterval)
        }
      }, typingSpeed)
    }

    return () => {
      clearInterval(typingInterval)
    }
  }, [text, typingSpeed, isTyping])

  return (
    <motion.div
      className="font-manrope text-xl md:text-2xl text-purple-400 inline-flex italic"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
    </motion.div>
  )
}
