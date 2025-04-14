"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Navigation, Compass, Map } from "lucide-react"

export function FloatingElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const calculateMovement = (factor: number) => {
    if (!isClient) return { x: 0, y: 0 }
    const x = (mousePosition.x - window.innerWidth / 2) / factor
    const y = (mousePosition.y - window.innerHeight / 2) / factor
    return { x, y }
  }

  const elements = [
    {
      icon: <MapPin className="h-full w-full text-[#7DF9FF]" />,
      size: "h-10 w-10",
      position: "top-[15%] left-[10%]",
      factor: 20,
      delay: 0.1,
    },
    {
      icon: <Navigation className="h-full w-full text-[#7DF9FF]/70" />,
      size: "h-16 w-16",
      position: "top-[30%] right-[15%]",
      factor: 30,
      delay: 0.2,
    },
    {
      icon: <Compass className="h-full w-full text-[#7DF9FF]/50" />,
      size: "h-12 w-12",
      position: "bottom-[25%] left-[20%]",
      factor: 25,
      delay: 0.3,
    },
    {
      icon: <Map className="h-full w-full text-[#7DF9FF]/60" />,
      size: "h-14 w-14",
      position: "bottom-[15%] right-[10%]",
      factor: 15,
      delay: 0.4,
    },
  ]

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {elements.map((element, index) => {
        const movement = calculateMovement(element.factor)

        return (
          <motion.div
            key={index}
            className={`absolute ${element.position} ${element.size} opacity-30 blur-[1px]`}
            animate={{
              x: movement.x,
              y: movement.y,
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              x: { type: "spring", stiffness: 50, damping: 30 },
              y: { type: "spring", stiffness: 50, damping: 30 },
              rotate: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 10 + index * 2,
                ease: "linear",
              },
            }}
          >
            {element.icon}
          </motion.div>
        )
      })}
    </div>
  )
}
