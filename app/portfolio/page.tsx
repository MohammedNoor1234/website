"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ParticlesBackground } from "@/components/particles-background"
import { PortfolioTabs } from "@/components/portfolio-tabs"
import { GraphicsDesigns } from "@/components/graphics-designs"
import { PolygonConnections } from "@/components/polygon-connections"
import { useRouter, useSearchParams } from "next/navigation"
import { ContactFormSubmit } from "@/components/contact-form-submit"

export default function PortfolioPage() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") || "about"
  const [activeTab, setActiveTab] = useState(initialTab)
  const [showWorks, setShowWorks] = useState(initialTab === "works")
  const worksRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (initialTab === "works") {
      setShowWorks(true)
      setTimeout(() => {
        worksRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }, [initialTab])

  const handleEmailClick = () => {
    window.location.href = "mailto:mahi00373@gmail.com"
  }

  const handleViewWorks = () => {
    setShowWorks(true)
    setActiveTab("works")
    setTimeout(() => {
      worksRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  return (
    <main className="min-h-screen flex flex-col relative bg-black overflow-hidden">
      <Navbar />

      {/* Background effects */}
      <div className="fixed inset-0 z-0 opacity-20">
        <ParticlesBackground />
      </div>

      {/* Polygon connections background */}
      <div className="fixed inset-0 z-1 opacity-30">
        <PolygonConnections density={15} opacity={0.2} />
      </div>

      {/* Hero section with tabs */}
      <section className="pt-32 pb-16 px-4 relative z-10">
        <div className="container mx-auto">
          <PortfolioTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </section>

      {/* Content based on active tab */}
      <AnimatePresence mode="wait">
        <motion.section
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex-1 px-4 pb-20 relative z-10"
        >
          <div className="container mx-auto">
            {activeTab === "about" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <ScrollReveal>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white font-manrope">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 block">
                        About Me
                      </span>
                    </h1>
                    <div className="text-gray-300 mb-8 font-manrope leading-relaxed space-y-4">
                      <p>
                        Hi, I'm Md Samiul Haque Mahin from Bangladesh. I'm 21 years old — an introverted yet creative
                        individual who's currently in the second year of a Bachelor's degree in Computer Science and
                        Engineering. While I'm still building my skills in IT, I'm deeply interested in pursuing a
                        career in cybersecurity.
                      </p>
                      <p>
                        For the past 7 years, I've been passionate about graphic design and video editing. Despite
                        working entirely on mobile due to the lack of a PC or laptop, I've gained a lot of hands-on
                        experience. I still consider myself a beginner on the professional side, but I'm actively
                        pushing forward, learning and creating on my own.
                      </p>
                      <p>
                        Right now, I'm seeking opportunities to grow — whether through freelance work, internships, or
                        any project that lets me gain experience and build my CV. I'm the only son in my family, with no
                        income yet, and a blank CV that I'm eager to fill with real contributions. If you're open to
                        giving me a chance to prove myself, I'd be genuinely excited to take it on.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <motion.button
                        onClick={() => setActiveTab("contact")}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all backdrop-blur-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Get in Touch
                      </motion.button>
                      <motion.button
                        onClick={handleViewWorks}
                        className="px-6 py-3 bg-transparent border border-purple-500 rounded-lg text-purple-400 font-medium hover:bg-purple-500/10 transition-all backdrop-blur-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View My Work
                      </motion.button>
                    </div>
                  </ScrollReveal>
                </div>
                <ScrollReveal delay={0.3}>
                  <motion.div
                    className="relative aspect-square max-w-md mx-auto"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                    <div className="relative z-10 border-4 border-white/10 rounded-full p-2 bg-black/50 backdrop-blur-sm overflow-hidden">
                      <div className="aspect-square rounded-full overflow-hidden">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed.jpg-jTobjBb5eAJbCobn7B4sCHLLNG8Pey.jpeg"
                          alt="Md. Samiul Haque Mahin"
                          width={500}
                          height={500}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-20"></div>
                    <div className="absolute bottom-10 left-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-20"></div>
                  </motion.div>
                </ScrollReveal>
              </div>
            )}

            {activeTab === "education" && <EducationSection />}
            {activeTab === "experience" && <ExperienceSection />}
            {activeTab === "works" && (
              <div ref={worksRef}>
                <GraphicsDesigns />
              </div>
            )}
            {activeTab === "contact" && (
              <div>
                <ContactFormSubmit />
              </div>
            )}
          </div>
        </motion.section>
      </AnimatePresence>

      <Footer hideToolsInSubtab={true} />
    </main>
  )
}

function EducationSection() {
  const education = [
    {
      degree: "Bachelor of Computer Science and Engineering",
      institution: "Northern University Bangladesh",
      period: "2024 - Ongoing",
      description:
        "Currently pursuing a degree in Computer Science and Engineering, focusing on building a strong foundation in programming, algorithms, and software development.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white font-manrope">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Educational Background
        </span>
      </h2>

      <div className="relative border-l-2 border-purple-500/30 pl-8 ml-4 space-y-12">
        {education.map((item, index) => (
          <ScrollReveal key={index} delay={index * 0.2}>
            <motion.div
              className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-purple-500/50 transition-all overflow-hidden"
              whileHover={{ x: 5 }}
            >
              <div className="absolute inset-0 z-0">
                <PolygonConnections density={40} opacity={0.08} />
              </div>
              {/* Timeline dot */}
              <div className="absolute left-0 top-6 w-4 h-4 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50 -translate-x-[2.25rem] z-10"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 relative z-10">
                <h3 className="text-xl font-bold text-white">{item.degree}</h3>
                <span className="text-purple-400 font-medium text-sm px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                  {item.period}
                </span>
              </div>
              <h4 className="text-lg text-gray-300 mb-3 relative z-10">{item.institution}</h4>
              <p className="text-gray-400 relative z-10">{item.description}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}

function ExperienceSection() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white font-manrope">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Design Journey
        </span>
      </h2>

      <ScrollReveal>
        <motion.div
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 hover:border-purple-500/50 transition-all relative overflow-hidden"
          whileHover={{ y: -5 }}
        >
          <div className="absolute inset-0 z-0">
            <PolygonConnections density={35} opacity={0.1} />
          </div>
          <div className="flex flex-col md:flex-row justify-between mb-6 relative z-10">
            <h3 className="text-xl font-bold text-white">Graphics Design & Video Editing</h3>
            <span className="text-purple-400 font-medium text-sm px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
              2019 - Present
            </span>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed relative z-10">
            Although I didn't work on many projects early on — especially back in class 9 when I wasn't sure which
            direction to take — I've been steadily growing and finding my path. Over the past 7 years (2019-till now),
            I've gained hands-on experience in visual design and video editing, learning and creating entirely on mobile
            due to limited access to a PC or laptop. While I still consider myself a beginner professionally, my
            dedication and passion are reflected in the work I produce. You're welcome to explore my designs and edits —
            and if they resonate with you, I'd be thrilled to take on a project or even a trial task to demonstrate my
            skills.
          </p>

          <div className="flex flex-wrap gap-2 mt-6 relative z-10">
            <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
              Logo Design
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
              Social Media Graphics
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
              Video Editing
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
              Mobile Design
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
              Self-taught
            </span>
          </div>
        </motion.div>
      </ScrollReveal>
    </div>
  )
}
