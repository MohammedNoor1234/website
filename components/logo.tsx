"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

export function Logo() {
  return (
    <Link href="/">
      <motion.div
        className="flex-shrink-0 rounded-lg border-2 border-gray-200 p-2 hover:border-purple-500 transition-colors relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: "linear-gradient(135deg, #9d4edd, #4361ee, #4cc9f0, #4ade80)",
            backgroundSize: "200% 200%",
            animation: "gradientAnimation 8s ease infinite",
          }}
        ></div>
        <div className="relative z-10">
          <Image src="/main-logo.png" alt="NullifAI Logo" width={40} height={40} className="object-contain" />
        </div>
      </motion.div>
      <style jsx>{`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
    </Link>
  )
}
