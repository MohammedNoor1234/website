"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ScrollReveal } from "./scroll-reveal"

export function GraphicsDesigns() {
  const categories = [
    { name: "All", id: "all" },
    { name: "Logos", id: "logos" },
    { name: "Social Media", id: "social" },
    { name: "UI/UX", id: "ui-ux" },
    { name: "Video Edits", id: "video" },
  ]

  const projects = [
    {
      title: "Tech Startup Logo",
      category: "logos",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed1-HGpvITHd2nHWB0qIwNfoVhHxV07VHW.png", // Saturn logo
      description: "Minimalist logo design for a tech startup focusing on AI solutions.",
    },
    {
      title: "Event Poster",
      category: "social",
      image: "/post-image.png",
      description: "Promotional poster for a music festival featuring vibrant colors and typography.",
    },
    {
      title: "Social Media Campaign",
      category: "social",
      image: "/manipulation-image.png",
      description: "Series of Instagram posts for a fashion brand's summer collection.",
    },
    {
      title: "Business Card Design",
      category: "logos",
      image: "/gradient-star.png",
      description: "Elegant business card design with gold foil accents for a luxury brand.",
    },
    {
      title: "Mobile Banking App",
      category: "ui-ux",
      image: "/placeholder.svg?height=600&width=800",
      description: "Complete redesign of a banking application focusing on simplicity and accessibility.",
    },
    {
      title: "E-commerce Website",
      category: "ui-ux",
      image: "/placeholder.svg?height=600&width=800",
      description: "User-centered design for an online fashion store with improved checkout flow.",
    },
    {
      title: "Product Showcase",
      category: "video",
      image: "/placeholder.svg?height=600&width=800",
      description: "Short promotional video highlighting product features and benefits.",
    },
    {
      title: "Motion Graphics Intro",
      category: "video",
      image: "/placeholder.svg?height=600&width=800",
      description: "Animated intro sequence for YouTube channel with custom typography.",
    },
  ]

  const [activeCategory, setActiveCategory] = useState("all")
  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <div>
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white font-manrope">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
            My Creative Works
          </span>
        </h2>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          A collection of my design work across various categories, from logo design to video editing projects. All
          created with passion and dedication, despite limited resources.
        </p>
      </ScrollReveal>

      {/* Category tabs */}
      <ScrollReveal delay={0.2}>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
              }`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
      </ScrollReveal>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={`${project.title}-${index}`} delay={index * 0.1}>
              <motion.div
                className="group relative overflow-hidden rounded-lg bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-all h-full"
                whileHover={{ y: -5 }}
                layout
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm">{project.description}</p>
                  </div>
                </div>
                <div className="p-4">
                  <span className="inline-block px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                    {project.category === "logos"
                      ? "Logo Design"
                      : project.category === "social"
                        ? "Social Media"
                        : project.category === "ui-ux"
                          ? "UI/UX Design"
                          : "Video Editing"}
                  </span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
