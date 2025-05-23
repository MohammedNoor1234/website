"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useAnimation } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { TerminalText } from "@/components/terminal-text"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { ParticlesBackground } from "@/components/particles-background"
import { GlassmorphicButton } from "@/components/glassmorphic-button"
import { TypewriterText } from "@/components/typewriter-text"
import { AnimatedSvgIcon } from "@/components/animated-svg-icon"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SeeMoreButton } from "@/components/see-more-button"
import { ArrowRight, Sparkles, Palette, ImageIcon, Wand2, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { ContactFormSubmit } from "@/components/contact-form-submit"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const comingSoonRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [targetRoute, setTargetRoute] = useState("")
  const [showContactForm, setShowContactForm] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if contact form should be shown based on URL parameter
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const showContact = urlParams.get("contact") === "true"
      if (showContact) {
        setShowContactForm(true)
        setTimeout(() => {
          contactRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 500)
      }
    }

    // Set loaded state after initial animations
    const timeout = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    // Hero section animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
      },
    )

    // Projects section animation
    ScrollTrigger.create({
      trigger: projectsRef.current,
      start: "top 80%",
      onEnter: () => {
        controls.start("visible")
      },
    })

    // Coming soon section animation
    ScrollTrigger.create({
      trigger: comingSoonRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(comingSoonRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      clearTimeout(timeout)
    }
  }, [controls])

  const projects = [
    {
      id: 1,
      title: "Vector Logo Design",
      image: "/vector-logo.png",
      type: "Logo",
      icon: <Palette size={20} />,
      description: "Professional vector logo designs",
    },
    {
      id: 2,
      title: "Social Media Posts",
      image: "/post-image.png",
      type: "Post",
      icon: <ImageIcon size={20} />,
      description: "Engaging social media content",
    },
    {
      id: 3,
      title: "Image Manipulation",
      image: "/manipulation-image.png",
      type: "Manipulation",
      icon: <Wand2 size={20} />,
      description: "Advanced photo editing and effects",
    },
  ]

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  const handleSectionClick = (route: string) => {
    router.push(route)
  }

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm)
    if (!showContactForm) {
      // Update URL with contact parameter
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href)
        url.searchParams.set("contact", "true")
        window.history.pushState({}, "", url)
      }

      // Scroll to contact form
      setTimeout(() => {
        contactRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } else {
      // Remove contact parameter from URL
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href)
        url.searchParams.delete("contact")
        window.history.pushState({}, "", url)
      }
    }
  }

  return (
    <main className="min-h-screen flex flex-col relative">
      <Navbar onContactClick={toggleContactForm} />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] flex items-center justify-center px-4 overflow-hidden illuminated"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/blackhole.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Particle Effect */}
        <ParticlesBackground />

        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 backdrop-blur-[2px] z-1"></div>

        {/* Content */}
        <div className="text-center z-10 max-w-6xl mx-auto relative">
          <ScrollReveal delay={0.2} direction="down">
            <TypewriterText
              text="Welcome to"
              className="text-2xl md:text-3xl font-medium mb-8 tracking-wide text-white font-poppins"
              delay={500}
              speed={80}
            />
          </ScrollReveal>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-8">
            <ScrollReveal delay={0.4} direction="left">
              <motion.h1
                className="text-6xl md:text-8xl font-bold tracking-[0.1em] font-manrope nullif-glow"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <span className="blackhole-gradient-text font-extrabold">Nullif</span>
              </motion.h1>
            </ScrollReveal>

            <ScrollReveal delay={0.6} direction="right">
              <motion.h1
                className="text-6xl md:text-8xl font-bold tracking-[0.1em] font-manrope ai-glow"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <span className="ai-gradient-text font-extrabold">AI</span>
              </motion.h1>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.8} direction="up">
            <motion.p
              className="text-xl md:text-2xl text-white mb-12 font-manrope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Set Hustle To Null
            </motion.p>
          </ScrollReveal>

          <ScrollReveal delay={1.0}>
            <div className="flex flex-wrap justify-center gap-4">
              <GlassmorphicButton
                glowColor="rgba(255, 107, 53, 0.6)"
                className="group"
                onClick={() => handleSectionClick("/portfolio?tab=works")}
              >
                <span className="flex items-center gap-2">
                  Explore Projects
                  <AnimatedSvgIcon
                    icon={<ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />}
                    hoverColor="#ff6b35"
                  />
                </span>
              </GlassmorphicButton>

              <GlassmorphicButton glowColor="rgba(157, 78, 221, 0.6)" className="group" onClick={toggleContactForm}>
                <span className="flex items-center gap-2">
                  <AnimatedSvgIcon icon={<Sparkles className="transition-all duration-300" />} hoverColor="#9d4edd" />
                  Get in Touch
                </span>
              </GlassmorphicButton>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white"
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-20 px-4 relative z-10 bg-black">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Graphical Section */}
            <div className="w-full md:w-1/6 mb-8 md:mb-0">
              <motion.div
                className="bg-black border border-gray-700 rounded-lg p-4 sticky top-24 cursor-pointer hover:border-purple-500 transition-colors"
                onClick={() => handleSectionClick("/portfolio?tab=works")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="font-bold text-xl text-white font-manrope">Graphical</h3>
              </motion.div>
            </div>

            {/* Three Rectangular Sections */}
            <div className="w-full md:w-5/6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {projects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    custom={i}
                    initial="hidden"
                    animate={controls}
                    variants={cardVariants}
                    className="card-container"
                  >
                    <motion.div
                      className="card illuminated bg-black border border-gray-700 shadow-lg rounded-lg overflow-hidden transition-all duration-300 h-full cursor-pointer hover:border-purple-500"
                      onClick={() => handleSectionClick("/portfolio?tab=works")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-center text-white flex items-center justify-center gap-2">
                          <AnimatedSvgIcon icon={project.icon} color="#fff" hoverColor="#9d4edd" />
                          {project.type}
                        </h3>
                        <p className="text-gray-300 text-center text-sm">{project.description}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* See More Button */}
          <div className="flex justify-center mt-12">
            <SeeMoreButton targetRoute="/portfolio?tab=works" />
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section ref={comingSoonRef} className="py-16 px-4 relative z-10 opacity-0 transform translate-y-10 bg-black">
        <div className="container mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 flex justify-center items-center">
            <TerminalText text="More coming soon..." />
          </div>
        </div>
      </section>

      {/* Contact Form Section - Hidden by default */}
      {showContactForm && (
        <motion.section
          ref={contactRef}
          className="py-20 px-4 relative z-10 bg-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto relative">
            <button
              onClick={toggleContactForm}
              className="absolute top-0 right-0 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Close contact form"
            >
              <X size={24} />
            </button>
            <ContactFormSubmit />
          </div>
        </motion.section>
      )}

      {/* Footer */}
      <Footer onContactClick={toggleContactForm} />
    </main>
  )
}
