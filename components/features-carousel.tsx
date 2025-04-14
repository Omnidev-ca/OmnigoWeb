"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { features } from "./features-data"

interface Feature {
  icon: React.ReactElement
  title: string
  description: string
}

export function FeaturesCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const next = () => {
    setCurrent((current + 1) % features.length)
  }

  const prev = () => {
    setCurrent((current - 1 + features.length) % features.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      next()
    }, 4000)

    return () => clearInterval(interval)
  }, [current, autoplay])

  return (
    <div className="relative mx-auto max-w-md overflow-hidden py-8 lg:hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="relative mx-auto h-64 w-full rounded-xl bg-white/5 p-6 text-center shadow-lg backdrop-blur-sm"
          onHoverStart={() => setAutoplay(false)}
          onHoverEnd={() => setAutoplay(true)}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = Math.abs(offset.x) * velocity.x;
            if (swipe < -100) {
              next();
            } else if (swipe > 100) {
              prev();
            }
          }}
        >
          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-[#7DF9FF]/20 backdrop-blur-md" />
          <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-[#7DF9FF]/10 backdrop-blur-md" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center touch-pan-x">
            <div className="mb-4 rounded-full bg-black p-3">{features[current].icon}</div>
            <h3 className="mb-2 text-xl font-bold text-white">{features[current].title}</h3>
            <p className="text-gray-400">{features[current].description}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={prev}
          className="rounded-full border-white/20 bg-black/50 text-white"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous</span>
        </Button>

        <div className="flex items-center gap-2">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all ${
                index === current ? "bg-[#7DF9FF] w-5" : "bg-white/30 w-2"
              }`}
              aria-label={`Go to feature ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={next}
          className="rounded-full border-white/20 bg-black/50 text-white"
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  )
}
