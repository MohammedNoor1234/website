"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface PolygonConnectionsProps {
  density?: number
  className?: string
  opacity?: number
}

export function PolygonConnections({ density = 15, className = "", opacity = 0.3 }: PolygonConnectionsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationFrameRef = useRef<number>(0)
  const nodesRef = useRef<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      connections: number[]
    }>
  >([])

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        const width = rect.width
        const height = rect.height

        canvas.width = width * window.devicePixelRatio
        canvas.height = height * window.devicePixelRatio

        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
        }

        setDimensions({ width, height })

        // Create nodes
        const nodes = []
        const nodeCount = Math.floor((width * height) / (density * 1000))

        for (let i = 0; i < nodeCount; i++) {
          nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            connections: [],
          })
        }

        // Calculate connections
        nodes.forEach((node, i) => {
          nodes.forEach((otherNode, j) => {
            if (i !== j) {
              const distance = Math.sqrt(Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2))
              if (distance < 120 && node.connections.length < 3) {
                node.connections.push(j)
              }
            }
          })
        })

        nodesRef.current = nodes
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [density])

  useEffect(() => {
    const animate = () => {
      if (canvasRef.current && dimensions.width > 0) {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.clearRect(0, 0, dimensions.width, dimensions.height)

        // Update and draw nodes
        nodesRef.current.forEach((node, i) => {
          // Move nodes
          node.x += node.vx
          node.y += node.vy

          // Bounce off edges
          if (node.x <= 0 || node.x >= dimensions.width) node.vx *= -1
          if (node.y <= 0 || node.y >= dimensions.height) node.vy *= -1

          // Keep within bounds
          node.x = Math.max(0, Math.min(dimensions.width, node.x))
          node.y = Math.max(0, Math.min(dimensions.height, node.y))

          // Draw node
          ctx.beginPath()
          ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(157, 78, 221, ${opacity * 0.6})`
          ctx.fill()

          // Draw connections
          node.connections.forEach((connectionIndex) => {
            const connectedNode = nodesRef.current[connectionIndex]
            if (connectedNode) {
              const distance = Math.sqrt(Math.pow(node.x - connectedNode.x, 2) + Math.pow(node.y - connectedNode.y, 2))

              if (distance < 120) {
                ctx.beginPath()
                ctx.moveTo(node.x, node.y)
                ctx.lineTo(connectedNode.x, connectedNode.y)
                ctx.strokeStyle = `rgba(157, 78, 221, ${opacity * (1 - distance / 120) * 0.4})`
                ctx.lineWidth = 1
                ctx.stroke()
              }
            }
          })
        })
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [dimensions, opacity])

  return (
    <motion.canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  )
}
