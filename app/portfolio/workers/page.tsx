"use client"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PortfolioWorkersPage() {
  const workers = [
    {
      id: 1,
      name: "Logo Design",
      image: "/vector-logo.png",
      count: 24,
      description: "Professional brand identity and logo design projects",
    },
    {
      id: 2,
      name: "Social Media",
      image: "/post-image.png",
      count: 56,
      description: "Engaging content for various social media platforms",
    },
    {
      id: 3,
      name: "UI/UX Design",
      image: "/manipulation-image.png",
      count: 18,
      description: "User interface and experience design for web and mobile",
    },
    {
      id: 4,
      name: "Print Design",
      image: "/gradient-star.png",
      count: 32,
      description: "Business cards, brochures, and other print materials",
    },
    {
      id: 5,
      name: "Illustrations",
      image: "/placeholder.svg?height=400&width=600",
      count: 15,
      description: "Custom digital illustrations and artwork",
    },
    {
      id: 6,
      name: "Motion Graphics",
      image: "/placeholder.svg?height=400&width=600",
      count: 9,
      description: "Animated logos, intros, and promotional videos",
    },
  ]

  return (
    <main className="min-h-screen flex flex-col relative bg-black">
      <Navbar />

      {/* Hero section */}
      <section className="pt-32 pb-16 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="flex items-center mb-12">
            <Link
              href="/portfolio"
              className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Portfolio</span>
            </Link>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center text-white font-manrope">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Design Works
            </span>
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
            Explore my complete collection of design projects across various categories and styles.
          </p>
        </div>
      </section>

      {/* Workers grid */}
      <section className="px-4 pb-20 relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workers.map((worker, index) => (
              <ScrollReveal key={worker.id} delay={index * 0.1}>
                <motion.div
                  className="group relative overflow-hidden rounded-lg bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-all h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={worker.image || "/placeholder.svg"}
                      alt={worker.name}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-white">
                      {worker.count} Projects
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{worker.name}</h3>
                    <p className="text-gray-300 mb-4">{worker.description}</p>
                    <motion.button
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View All
                    </motion.button>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer hideToolsInSubtab={true} />
    </main>
  )
}
