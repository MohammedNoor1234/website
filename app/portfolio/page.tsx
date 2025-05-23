"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { TypewriterText } from "@/components/typewriter-text"
import { ParticlesBackground } from "@/components/particles-background"
import { PortfolioTabs } from "@/components/portfolio-tabs"
import { GraphicsDesigns } from "@/components/graphics-designs"
import { useRouter, useSearchParams } from "next/navigation"

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

  const handleGetInTouch = () => {
    router.push("/?contact=true")
  }

  return (
    <main className="min-h-screen flex flex-col relative bg-black">
      <Navbar />

      {/* Background effects */}
      <div className="fixed inset-0 z-0 opacity-20">
        <ParticlesBackground />
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
                      <TypewriterText text="Hello, I am" delay={300} speed={50} className="block text-purple-400" />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 block text-3xl md:text-5xl">
                        Md. Samiul Haque Mahin
                      </span>
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 font-manrope leading-relaxed">
                      A beginner graphic designer with a passion for creativity — I enjoy making logos, social media
                      posts, and I'm exploring the world of UI/UX design with growing interest and curiosity.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <motion.button
                        onClick={handleGetInTouch}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Get in Touch
                      </motion.button>
                      <motion.button
                        onClick={handleViewWorks}
                        className="px-6 py-3 bg-transparent border border-purple-500 rounded-lg text-purple-400 font-medium hover:bg-purple-500/10 transition-all"
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
                          loading="eager"
                          priority
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
      degree: "Bachelor of Fine Arts in Graphic Design",
      institution: "University of Creative Arts",
      period: "2018 - 2022",
      description:
        "Specialized in digital design with focus on UI/UX principles. Graduated with honors and received the Outstanding Design Portfolio award.",
    },
    {
      degree: "Diploma in Web Development",
      institution: "Tech Institute",
      period: "2017 - 2018",
      description:
        "Learned front-end development technologies including HTML, CSS, JavaScript, and responsive design principles.",
    },
    {
      degree: "High School Diploma",
      institution: "Creative Arts High School",
      period: "2013 - 2017",
      description: "Focused on visual arts and digital media. Participated in national design competitions.",
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
              className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-purple-500/50 transition-all"
              whileHover={{ x: 5 }}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-6 w-4 h-4 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50 -translate-x-[2.25rem]"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{item.degree}</h3>
                <span className="text-purple-400 font-medium text-sm px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                  {item.period}
                </span>
              </div>
              <h4 className="text-lg text-gray-300 mb-3">{item.institution}</h4>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}

function ExperienceSection() {
  const experiences = [
    {
      position: "Senior Graphic Designer",
      company: "Creative Solutions Agency",
      period: "2022 - Present",
      description:
        "Lead designer for major brand campaigns. Manage a team of junior designers and oversee project timelines and deliverables.",
      skills: ["Brand Identity", "Marketing Materials", "Team Leadership"],
    },
    {
      position: "UI/UX Designer",
      company: "TechStart Inc.",
      period: "2020 - 2022",
      description:
        "Designed user interfaces for web and mobile applications. Conducted user research and created wireframes, prototypes, and final designs.",
      skills: ["Figma", "User Research", "Prototyping"],
    },
    {
      position: "Freelance Designer",
      company: "Self-employed",
      period: "2018 - 2020",
      description:
        "Worked with various clients on logo design, branding, and marketing materials. Built a diverse portfolio across multiple industries.",
      skills: ["Logo Design", "Branding", "Client Management"],
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white font-manrope">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Work Experience
        </span>
      </h2>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <ScrollReveal key={index} delay={index * 0.2}>
            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-purple-500/50 transition-all"
              whileHover={{ y: -5 }}
            >
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                <span className="text-purple-400 font-medium text-sm px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                  {exp.period}
                </span>
              </div>
              <h4 className="text-lg text-gray-300 mb-3">{exp.company}</h4>
              <p className="text-gray-400 mb-4">{exp.description}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {exp.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
