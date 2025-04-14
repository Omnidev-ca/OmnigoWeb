"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { MapPin, Navigation, Compass, Users, BarChart, Zap } from "lucide-react"

export function ParallaxSection({ id }: { id: string }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Different vertical movements for each element
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 200])

  // Shared opacity animation
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  // Mobile carousel state
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)
  const [autoplayPaused, setAutoplayPaused] = useState(false)
  const mobileContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll functionality
  useEffect(() => {
    // Only run autoplay if not paused
    if (autoplayPaused) return

    const interval = setInterval(() => {
      setMobileActiveIndex((current) => (current + 1) % 3)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [autoplayPaused])

  // Pause autoplay when user interacts
  const pauseAutoplay = () => setAutoplayPaused(true)
  const resumeAutoplay = () => setAutoplayPaused(false)

  // Manual navigation
  const goToSlide = (index: number) => {
    setMobileActiveIndex(index)
    pauseAutoplay()
    // Resume autoplay after 8 seconds of inactivity
    setTimeout(resumeAutoplay, 6000)
  }

  // Also detect scroll position for additional context
  useEffect(() => {
    const handleScroll = () => {
      if (!mobileContainerRef.current || autoplayPaused) return

      const container = mobileContainerRef.current
      const containerRect = container.getBoundingClientRect()

      // Only update based on scroll if the element is in view
      if (containerRect.top < window.innerHeight && containerRect.bottom > 0) {
        const scrollProgress = (window.innerHeight - containerRect.top) / (containerRect.height + window.innerHeight)

        // Determine which item to show based on scroll progress
        if (scrollProgress < 0.3) {
          setMobileActiveIndex(0)
        } else if (scrollProgress < 0.6) {
          setMobileActiveIndex(1)
        } else {
          setMobileActiveIndex(2)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [autoplayPaused])

  const items = [
    {
      icon: <BarChart className="h-16 w-16 text-[#7DF9FF]" />,
      title: "Marketing",
      description: "Développez votre visibilité et attirez de nouveaux clients",
    },
    {
      icon: <Users className="h-16 w-16 text-[#7DF9FF]" />,
      title: "Ventes",
      description: "Optimisez votre processus commercial et augmentez vos revenus",
    },
    {
      icon: <Zap className="h-16 w-16 text-[#7DF9FF]" />,
      title: "Tech",
      description: "Transformez votre entreprise avec des solutions technologiques innovantes",
    },
  ]

  return (
    <div ref={ref} id={id}  className="relative h-[70vh] overflow-hidden bg-gradient-to-b from-black to-gray-900">
      <div className="absolute inset-0 bg-[url('/interconnected-nodes.png')] bg-cover bg-center bg-no-repeat opacity-20" />

      {/* Desktop view - grid layout */}
      <div className="relative hidden h-full md:grid md:grid-cols-3">
        {/* First element - left */}
        <motion.div className="flex items-center justify-center p-6" style={{ y: y1, opacity }}>
          <div className="flex flex-col items-center text-center text-white">
            {items[0].icon}
            <h2 className="mt-4 text-4xl font-bold">{items[0].title}</h2>
            <p className="mt-2 max-w-md text-gray-400">{items[0].description}</p>
          </div>
        </motion.div>

        {/* Second element - center */}
        <motion.div className="flex items-center justify-center p-6" style={{ y: y2, opacity }}>
          <div className="flex flex-col items-center text-center text-white">
            {items[1].icon}
            <h2 className="mt-4 text-4xl font-bold">{items[1].title}</h2>
            <p className="mt-2 max-w-md text-gray-400">{items[1].description}</p>
          </div>
        </motion.div>

        {/* Third element - right */}
        <motion.div className="flex items-center justify-center p-6" style={{ y: y3, opacity }}>
          <div className="flex flex-col items-center text-center text-white">
            {items[2].icon}
            <h2 className="mt-4 text-4xl font-bold">{items[2].title}</h2>
            <p className="mt-2 max-w-md text-gray-400">{items[2].description}</p>
          </div>
        </motion.div>
      </div>

      {/* Mobile view - auto-scrolling carousel */}
      <div
        ref={mobileContainerRef}
        className="md:hidden relative flex h-full flex-col items-center justify-center"
        onTouchStart={pauseAutoplay}
        onMouseEnter={pauseAutoplay}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileActiveIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -100) {
                  setMobileActiveIndex((current) => (current + 1) % items.length);
                } else if (swipe > 100) {
                  setMobileActiveIndex((current) => (current - 1 + items.length) % items.length);
                }
              }}
              className="flex flex-col items-center text-center text-white w-full touch-pan-x"
            >
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                {items[mobileActiveIndex].icon}
              </motion.div>
              <h2 className="mt-4 text-4xl font-bold">{items[mobileActiveIndex].title}</h2>
              <p className="mt-2 max-w-md text-gray-400">{items[mobileActiveIndex].description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile carousel indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === mobileActiveIndex ? "w-8 bg-[#7DF9FF]" : "w-2 bg-white/30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-scroll indicator */}
        {!autoplayPaused && (
          <div className="absolute bottom-16 left-0 right-0 flex justify-center">
            <div className="h-0.5 w-16 bg-white/20 overflow-hidden">
              <motion.div
                className="h-full bg-[#7DF9FF]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}
