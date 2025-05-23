"use client"

import { motion } from "framer-motion"
import { Briefcase, GraduationCap, Palette, Mail } from "lucide-react"

interface PortfolioTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function PortfolioTabs({ activeTab, setActiveTab }: PortfolioTabsProps) {
  const tabs = [
    {
      id: "about",
      label: "About Me",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      id: "education",
      label: "Education",
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      id: "experience",
      label: "Experience",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      id: "works",
      label: "My Works",
      icon: <Palette className="w-5 h-5" />,
    },
    {
      id: "contact",
      label: "Contact",
      icon: <Mail className="w-5 h-5" />,
    },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
            activeTab === tab.id ? "text-white" : "text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Background for active tab */}
          {activeTab === tab.id && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg -z-10"
              layoutId="activeTab"
              transition={{ type: "spring", duration: 0.6 }}
            />
          )}

          {tab.icon}
          {tab.label}
        </motion.button>
      ))}
    </div>
  )
}
