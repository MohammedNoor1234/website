"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface DoorTransitionProps {
  isOpen: boolean
  onComplete?: () => void
  targetRoute?: string
}

export function DoorTransition({ isOpen, onComplete, targetRoute }: DoorTransitionProps) {
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      // Navigate immediately without animation
      const navigationTimer = setTimeout(() => {
        if (targetRoute) {
          router.push(targetRoute)
        }
        if (onComplete) {
          onComplete()
        }
      }, 100)

      return () => {
        clearTimeout(navigationTimer)
      }
    }
  }, [isOpen, onComplete, targetRoute, router])

  // Return null to remove the door animation completely
  return null
}
