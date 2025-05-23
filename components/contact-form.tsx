"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"

interface ContactFormProps {
  email: string
}

export function ContactForm({ email }: ContactFormProps) {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")

    try {
      // This is a mock submission - in a real app, you would send this to your backend
      // For now, we'll simulate a successful submission after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real implementation, you would send an email to mahi00373@gmail.com
      console.log(`Sending email to ${email} with form data:`, formData)

      // Reset form
      setFormData({ name: "", email: "", message: "" })
      setFormState("success")

      // Reset success state after 5 seconds
      setTimeout(() => {
        setFormState("idle")
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormState("error")

      // Reset error state after 5 seconds
      setTimeout(() => {
        setFormState("idle")
      }, 5000)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white font-manrope">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Get in Touch
          </span>
        </h2>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to discuss a collaboration? Fill out the form below and I'll get back to you as
          soon as possible.
        </p>
      </ScrollReveal>

      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 shadow-xl">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <ScrollReveal delay={0.1}>
            <div>
              <label htmlFor="name" className="block text-white font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                placeholder="John Doe"
                disabled={formState === "submitting"}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div>
              <label htmlFor="email" className="block text-white font-medium mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                placeholder="john@example.com"
                disabled={formState === "submitting"}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div>
              <label htmlFor="message" className="block text-white font-medium mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white resize-none"
                placeholder="Tell me about your project or inquiry..."
                disabled={formState === "submitting"}
              ></textarea>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                {formState === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center text-green-400"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Message sent successfully!
                  </motion.div>
                )}
                {formState === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center text-red-400"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Error sending message. Please try again.
                  </motion.div>
                )}
              </div>

              <motion.button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={formState === "submitting"}
              >
                {formState === "submitting" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>
          </ScrollReveal>
        </form>
      </div>
    </div>
  )
}
