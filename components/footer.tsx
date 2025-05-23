"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DoorTransition } from "./door-transition"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { PolygonConnections } from "./polygon-connections"

interface FooterProps {
  hideToolsInSubtab?: boolean
}

export function Footer({ hideToolsInSubtab = false }: FooterProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const tools = [
    {
      name: "Midjourney",
      url: "https://midjourney.com",
      logo: "/midjourney-new.png",
    },
    {
      name: "ChatGPT",
      url: "https://openai.com/chatgpt",
      logo: "/runway-logo.png",
    },
    {
      name: "Runway",
      url: "https://runwayml.com",
      logo: "/chatgpt-logo.png",
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
      <footer className="py-12 px-4 relative z-10 border-t border-gray-700 bg-black overflow-hidden">
        {/* Polygon connections background */}
        <div className="absolute inset-0 z-0">
          <PolygonConnections density={20} opacity={0.2} />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 relative overflow-hidden">
            {/* Inner polygon connections */}
            <div className="absolute inset-0 z-0">
              <PolygonConnections density={25} opacity={0.15} />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
              {/* Powered By Section - Only show on home page */}
              {(!hideToolsInSubtab || isHomePage) && (
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-4 font-manrope text-white">Powered by</h3>
                  <div className="flex flex-row gap-4">
                    {tools.map((tool, index) => (
                      <motion.a
                        key={index}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-3 py-2 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-600 hover:border-purple-500 rounded-md transition-colors group backdrop-blur-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-10 h-10 relative">
                          <Image
                            src={tool.logo || "/placeholder.svg"}
                            alt={`${tool.name} logo`}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
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
                <div className="mt-4">
                  <motion.button
                    onClick={handleSectionClick}
                    className="px-4 py-2 bg-purple-600/80 hover:bg-purple-700/80 text-white rounded-lg transition-colors font-medium backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Portfolio
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DoorTransition isOpen={isTransitioning} targetRoute="/portfolio" onComplete={handleTransitionComplete} />
      </footer>
    </>
  )
}
