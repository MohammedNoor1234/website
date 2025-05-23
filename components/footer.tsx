"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DoorTransition } from "./door-transition"
import { usePathname } from "next/navigation"
import Image from "next/image"

interface FooterProps {
  hideToolsInSubtab?: boolean
  onContactClick?: () => void
}

export function Footer({ hideToolsInSubtab = false, onContactClick }: FooterProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const tools = [
    {
      name: "ChatGPT",
      url: "https://openai.com/chatgpt",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chatgpt-logo-png_seeklogo-465219-vuEhj8QcAPATsF5JgHKWCQeKC3xz5S.png",
    },
    {
      name: "Midjourney",
      url: "https://midjourney.com",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Midjourney_Emblem-T54N96iqDdC5E1L8Wvz9iQHXeB6wWX.png",
    },
    {
      name: "Runway",
      url: "https://runwayml.com",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Runway-Z5VSgcVotlvxqttd5LjGbhWns6lNfn.webp",
    },
  ]

  const handleSectionClick = () => {
    setIsTransitioning(true)
  }

  const handleTransitionComplete = () => {
    setIsTransitioning(false)
  }

  return (
    <>
      <footer className="py-12 px-4 relative z-10 border-t border-gray-700 bg-black">
        <div className="container mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              {/* Powered By Section - Only show on home page */}
              {(!hideToolsInSubtab || isHomePage) && (
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-4 font-manrope text-white">Powered by</h3>
                  <div className="flex flex-row gap-4 overflow-x-auto pb-2">
                    {tools.map((tool, index) => (
                      <motion.a
                        key={index}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-purple-500 rounded-md text-sm transition-colors text-white group min-w-[100px]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-10 h-10 relative">
                          <Image
                            src={tool.logo || "/placeholder.svg"}
                            alt={`${tool.name} logo`}
                            fill
                            className="object-contain"
                            loading="lazy"
                          />
                        </div>
                        <span className="group-hover:text-purple-300 transition-colors">{tool.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}

              {/* Vertical Separator - Only show if tools are visible */}
              {(!hideToolsInSubtab || isHomePage) && (
                <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
              )}

              {/* Contact Section */}
              <div className={`flex-1 ${hideToolsInSubtab && !isHomePage ? "w-full text-center" : "text-right"}`}>
                <h3 className="text-lg font-medium mb-4 font-manrope text-white">Contact</h3>
                <motion.a
                  href="mailto:mahi00373@gmail.com"
                  className="text-purple-400 hover:text-purple-300 transition-colors text-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  mahi00373@gmail.com
                </motion.a>
                <div className="mt-4 flex flex-wrap gap-2 justify-end">
                  <motion.button
                    onClick={handleSectionClick}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Portfolio
                  </motion.button>

                  {onContactClick && isHomePage && (
                    <motion.button
                      onClick={onContactClick}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get in Touch
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <DoorTransition isOpen={isTransitioning} targetRoute="/portfolio" onComplete={handleTransitionComplete} />
    </>
  )
}
