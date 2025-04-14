"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"

interface Testimonial {
  quote: string
  author: string
  company: string
  rating: number
  avatar?: string
}

export function TestimonialCarousel() {
  const testimonials: Testimonial[] = [
    {
      quote:
        "The guidance we received transformed our business. We've seen a 200% increase in conversions since implementing their roadmap strategy.",
      author: "Sarah Johnson",
      company: "TechStart Inc.",
      rating: 5,
      avatar: "/confident-leader.png",
    },
    {
      quote:
        "Finally, a partner that understands our vision and knows how to get us there. Their GPS approach to business strategy is revolutionary.",
      author: "Michael Chen",
      company: "Global Solutions",
      rating: 5,
      avatar: "/confident-leader.png",
    },
    {
      quote:
        "Their roadmap approach simplified our complex challenges into manageable steps. We're now navigating our industry with confidence.",
      author: "Emma Rodriguez",
      company: "Innovate Labs",
      rating: 4,
      avatar: "/confident-leader.png",
    },
    {
      quote:
        "The journey mapping process helped us identify blind spots we never knew existed. Now we're on the fast track to success.",
      author: "David Kim",
      company: "Nexus Ventures",
      rating: 5,
      avatar: "/confident-leader.png",
    },
  ]

  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      next()
    }, 5000)

    return () => clearInterval(interval)
  }, [current, autoplay])

  return (
    <div className="relative mx-auto max-w-5xl overflow-hidden py-10">
      <div
        className="absolute left-0 right-0 top-0 h-40 bg-gradient-to-b from-[#7DF9FF]/10 to-transparent"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 70%)",
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-xl"
        >
          <div className="absolute -left-3 -top-3 h-12 w-12 rounded-full bg-[#7DF9FF] shadow-lg" />
          <div className="absolute -bottom-3 -right-3 h-8 w-8 rounded-full bg-[#7DF9FF] shadow-lg" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-6 flex justify-center">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#7DF9FF] text-[#7DF9FF]" />
              ))}
            </div>

            <p className="mb-6 text-lg italic text-gray-700 md:text-xl">"{testimonials[current].quote}"</p>

            <div className="flex flex-col items-center">
              {testimonials[current].avatar && (
                <div className="mb-3 h-16 w-16 overflow-hidden rounded-full border-2 border-[#7DF9FF]">
                  <img
                    src={testimonials[current].avatar || "/placeholder.svg"}
                    alt={testimonials[current].author}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <p className="font-bold">{testimonials[current].author}</p>
              <p className="text-sm text-gray-500">{testimonials[current].company}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={prev}
          className="rounded-full border-[#7DF9FF] hover:bg-[#7DF9FF]/10"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous</span>
        </Button>

        <div className="flex items-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                index === current ? "bg-[#7DF9FF] w-6" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={next}
          className="rounded-full border-[#7DF9FF] hover:bg-[#7DF9FF]/10"
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  )
}
