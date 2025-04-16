"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface AnimatedRoadProps {
  className?: string
}

export function AnimatedRoad({ className }: AnimatedRoadProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const roadBaseRef = useRef<SVGPathElement>(null)
  const roadMarkingsRef = useRef<SVGPathElement>(null)
  const carRef = useRef<SVGGElement>(null)
  const markersRef = useRef<SVGGElement>(null)
  const glowsRef = useRef<SVGGElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const container = containerRef.current
    const roadBase = roadBaseRef.current
    const roadMarkings = roadMarkingsRef.current
    const car = carRef.current
    const markers = markersRef.current
    const glows = glowsRef.current

    if (!container || !roadBase || !roadMarkings || !car || !markers || !glows) return

    // Create a timeline for the animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%", // Animation starts when the top of the element is 80% from the top of the viewport
        end: "bottom 20%", // Animation ends when the bottom of the element is 20% from the top of the viewport
        scrub: 1, // Smooth scrubbing effect with 1 second lag
        markers: false, // Set to true for debugging
      },
    })

    // Set initial states
    gsap.set(roadBase, { autoAlpha: 0 })
    gsap.set(roadMarkings, {
      strokeDasharray: roadMarkings.getTotalLength(),
      strokeDashoffset: roadMarkings.getTotalLength(),
    })
    gsap.set(car, { autoAlpha: 0 })
    gsap.set(markers, { autoAlpha: 0, scale: 0.5 })
    gsap.set(glows, { autoAlpha: 0 })

    // Add animations to the timeline
    tl.to(roadBase, {
      autoAlpha: 1,
      duration: 0.3,
      ease: "power1.inOut",
    })
      .to(
        roadMarkings,
        {
          strokeDashoffset: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        0.2,
      )
      .to(
        markers,
        {
          autoAlpha: 0.6,
          scale: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        0.3,
      )
      .to(
        glows,
        {
          autoAlpha: 0.3,
          duration: 0.5,
          ease: "power1.inOut",
        },
        0.5,
      )
      .to(
        car,
        {
          autoAlpha: 1,
          duration: 0.3,
        },
        0.6,
      )
      .to(
        car,
        {
          motionPath: {
            path: roadBase,
            align: roadBase,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          duration: 1,
          ease: "none",
        },
        0.6,
      )

    // Add a pulsing animation to the glows that continues regardless of scroll
    gsap.to(glows.children, {
      scale: 1.2,
      opacity: 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    })

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
      <svg viewBox="0 0 1200 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
        {/* Road base */}
        <path
          ref={roadBaseRef}
          d="M0,150 C200,50 400,250 600,150 C800,50 1000,250 1200,150"
          stroke="#333"
          strokeWidth="40"
          strokeLinecap="round"
        />

        {/* Road markings */}
        <path
          ref={roadMarkingsRef}
          d="M0,150 C200,50 400,250 600,150 C800,50 1000,250 1200,150"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="20 20"
        />
      </svg>
    </div>
  )
}
