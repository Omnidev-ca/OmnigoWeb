"use client"

import { useEffect, useRef, useState } from "react"

interface Bubble {
  id: number
  x: number
  y: number
  radius: number
  maxRadius: number
  growthRate: number
  color: string
  opacity: number
  fadeRate: number
}

export default function BubbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const bubblesRef = useRef<Bubble[]>([])
  const requestIdRef = useRef<number>(0)
  const bubbleIdCounterRef = useRef(0)

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== "undefined") {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  // Create new bubbles periodically
  useEffect(() => {
    const createBubble = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const maxRadius = 20 + Math.random() * 60
      const growthRate = 0.2 + Math.random() * 0.5
      const color = Math.random() > 0.5 ? "#3b82f6" : "#000000" // Blue or Black

      const bubble: Bubble = {
        id: bubbleIdCounterRef.current++,
        x,
        y,
        radius: 0,
        maxRadius,
        growthRate,
        color,
        opacity: 0.7,
        fadeRate: 0.005 + Math.random() * 0.01,
      }

      bubblesRef.current.push(bubble)
    }

    const interval = setInterval(() => {
      if (bubblesRef.current.length < 30) {
        createBubble()
      }
    }, 500)

    return () => clearInterval(interval)
  }, [dimensions])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current) return

    const render = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw bubbles
      bubblesRef.current = bubblesRef.current.filter((bubble) => {
        // Grow bubble
        if (bubble.radius < bubble.maxRadius) {
          bubble.radius += bubble.growthRate
        } else {
          // Start fading when max size is reached
          bubble.opacity -= bubble.fadeRate
        }

        // Remove bubble if completely faded
        if (bubble.opacity <= 0) {
          return false
        }

        // Draw bubble
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2)
        ctx.fillStyle =
          bubble.color +
          Math.floor(bubble.opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()

        return true
      })

      requestIdRef.current = requestAnimationFrame(render)
    }

    requestIdRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(requestIdRef.current)
    }
  }, [dimensions])

  return (
    <div className="fixed inset-0 bg-white -z-10">
      <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} className="block" />
    </div>
  )
}
