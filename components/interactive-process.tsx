"use client"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Step {
  number: string
  title: string
  description: string
}

interface InteractiveProcessProps {
  steps: Step[]
}

export function InteractiveProcess({ steps }: InteractiveProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length)
  }

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextStep()
    }, 4000)

    return () => clearInterval(interval)
  }, [autoplay, steps.length])

  useEffect(() => {
    if (!containerRef.current || !cardsRef.current) return

    const container = containerRef.current
    const cards = cardsRef.current

    // Animation des cartes
    gsap.fromTo(
      cards.children,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      }
    )

    // Animation des éléments de fond
    const backgroundElements = container.querySelectorAll(".background-element")
    backgroundElements.forEach((element, index) => {
      gsap.fromTo(
        element,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 0.1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="relative py-20 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Notre <span className="text-[#7DF9FF]">Approche</span> Unique
          </h2>
          <p className="mt-4 max-w-[700px] text-gray-500 md:text-xl">
            Une expérience immersive qui transforme votre vision en réalité
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* Éléments de fond animés */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-[#7DF9FF] blur-3xl background-element"></div>
            <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-[#00BFFF] blur-3xl background-element"></div>
            <div className="absolute top-1/2 left-1/2 h-60 w-60 rounded-full bg-[#7DF9FF] blur-3xl background-element opacity-50"></div>
          </div>

          {/* Version mobile (carousel) */}
          <div className="lg:hidden">
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="group relative"
                  onHoverStart={() => setAutoplay(false)}
                  onHoverEnd={() => setAutoplay(true)}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe < -100) {
                      nextStep();
                    } else if (swipe > 100) {
                      prevStep();
                    }
                  }}
                >
                  <div className="relative z-10 h-full rounded-2xl bg-white p-8 shadow-xl">
                    <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-black flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                      {steps[currentStep].number}
                    </div>
                    <div className="mt-8">
                      <h3 className="mb-4 text-2xl font-bold group-hover:text-[#7DF9FF] transition-colors duration-300">
                        {steps[currentStep].title}
                      </h3>
                      <p className="text-gray-600">{steps[currentStep].description}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#7DF9FF] to-[#00BFFF] opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={prevStep}
                  className="rounded-full bg-black/10 p-2 hover:bg-black/20"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <div className="flex items-center gap-2">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentStep ? "bg-[#7DF9FF] w-6" : "bg-gray-300 w-2"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextStep}
                  className="rounded-full bg-black/10 p-2 hover:bg-black/20"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Version desktop (grille) */}
          <div ref={cardsRef} className="hidden lg:grid grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="group relative"
              >
                <div className="relative z-10 h-full rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-black flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    {step.number}
                  </div>
                  <div className="mt-8">
                    <h3 className="mb-4 text-2xl font-bold group-hover:text-[#7DF9FF] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#7DF9FF] to-[#00BFFF] opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
              </motion.div>
            ))}
          </div>

          {/* Bouton d'action */}
          <div className="mt-16 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-4 rounded-full bg-[#7DF9FF] px-8 py-4 text-black shadow-lg cursor-pointer"
            >
              <span className="text-lg font-semibold">Découvrir notre processus</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}