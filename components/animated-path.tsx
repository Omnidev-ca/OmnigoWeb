"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface AnimatedPathProps {
  className?: string
}

export function AnimatedPath({ className }: AnimatedPathProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const container = containerRef.current
    const path = pathRef.current
    const dot = dotRef.current

    if (!container || !path || !dot) return

    // Create a timeline for the animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 50%", // Animation starts when the top of the element is 90% from the top of the viewport
        end: "bottom 20%", // Animation ends when the bottom of the element leaves the top of the viewport
        scrub: 1, // Smooth scrubbing effect with 1 second lag
        markers: false, // Set to true for debugging
      },
    })

    // Set initial states
    gsap.set(path, { strokeDasharray: path.getTotalLength(), strokeDashoffset: path.getTotalLength() })
    gsap.set(dot, { autoAlpha: 0 })

    // Add animations to the timeline
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 1,
      ease: "power2.inOut",
    })
      .to(
        dot,
        {
          autoAlpha: 1,
          duration: 0.3,
        },
        0.3,
      ) // Start slightly after the path begins drawing
      .to(
        dot,
        {
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
          },
          duration: 1,
          ease: "none",
        },
        0.3,
      )

    // Clean up
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill()
      }
      tl.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className={className}>
      <svg viewBox="0 0 1200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <path
          ref={pathRef}
          d="M0,100 C300,180 600,20 900,100 C1050,140 1150,80 1200,100"
          stroke="#7DF9FF"
          strokeWidth="8"
          strokeLinecap="round"
        />

        <circle ref={dotRef} cx="0" cy="0" r="12" fill="#ffffff" />
      </svg>
    </div>
  )
}
