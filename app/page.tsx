"use client"
import { useState } from "react"
import { MapPin, ChevronRight, ChevronLeft, Users, BarChart, ArrowRight, Compass, Target, Zap, ShoppingCart, Globe, Palette } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { AnimatedPath } from "@/components/animated-path"
import { NavigationHeader } from "@/components/navigation-header"
import { FeatureCard } from "@/components/feature-card"
import { Footer } from "@/components/footer"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { FeaturesCarousel } from "@/components/features-carousel"
import { FloatingElements } from "@/components/floating-elements"
import { AnimatedRoad } from "@/components/animated-road"
import { ParallaxSection } from "@/components/parallax-section"
import { features } from "@/components/features-data"

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = [
    {
      number: "01",
      title: "Discover Your Destination",
      description: "We help you define clear, achievable business objectives.",
    },
    {
      number: "02",
      title: "Map Your Route",
      description: "Develop a customized strategy tailored to your specific needs.",
    },
    {
      number: "03",
      title: "Navigate Obstacles",
      description: "Identify potential challenges and create contingency plans.",
    },
    {
      number: "04",
      title: "Reach Your Destination",
      description: "Execute your plan with our ongoing support and guidance.",
    },
  ]

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length)
  }

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length)
  }

  const handleScrollToFeatures = () => {
    // On récupère la section cible
    const featuresSection = document.getElementById("features-section");
    // On déclenche le scroll avec une animation smooth
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="flex min-h-screen flex-col">
      <FloatingElements />
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden py-20 md:py-32 h-[90vh]">
        <AnimatedPath className="absolute top-50 left-0 right-0 z-0 w-full" />
        <div className="container relative z-10 px-4 text-center md:px-6">
          <div className="mx-auto max-w-3xl space-y-4">
            <div className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-sm font-medium shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#7DF9FF]"></span>
              <span className="ml-2">Votre projet commence ici</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Votre projet mérite d'avoir de <span className="text-[#7DF9FF]">l'impact </span> !
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Notre mission, contribuer au succès des PME et des OBNL. 
            </p>
            <div className="flex flex-col justify-center gap-2 min-[400px]:flex-row">
              <Button className="bg-black text-white hover:bg-black/90">
                <MapPin className="h-5 w-5" /> Prendre rendez-vous
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-black/20">
                À propos
              </Button>
            </div>
          </div>
        </div>

        

        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 transform">
          {/* Remplacez <a> par un <div> ou <button> pour pouvoir intercepter l'événement en React */}
          <div
            onClick={handleScrollToFeatures}
            className="flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-[#7DF9FF] shadow-lg cursor-pointer"
          >
            <ChevronRight className="h-6 w-6 rotate-90 text-black" />
          </div>
        </div>
      </section>

      {/* Animated Road Section */}
      {/* <section className="py-16">
        <div>
          <div className="mb-8 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              La route vers <span className="text-[#7DF9FF]">Excellence</span>
            </h2>
            <p className="mt-4 max-w-[700px] text-gray-500 md:text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <AnimatedRoad className="w-full" />
        </div>
      </section> */}

      {/* Parallax Section */}
      <ParallaxSection id="features-section" />

      {/* Features Section */}
      <section className=" bg-black py-20">
        <div className="container px-4 md:px-6">
          <div className="mb-12 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              Nos réalisations
            </h2>
            <p className="mt-4 max-w-[700px] text-gray-400 md:text-xl">
              Nous sommes fiers de nos projets créatifs et innovants, qui sont conçus sur mesure pour répondre aux besoins de nos clients.
            </p>
          </div>

          {/* Mobile Carousel */}
          <FeaturesCarousel />

          {/* Desktop Grid */}
          <div className="container mx-auto px-4">
            <div className={`hidden lg:grid gap-6 ${features.length % 3 === 0 ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-20">
        <div className="container px-4 md:px-6">
          <div className="mb-12 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Your Roadmap to Success</h2>
            <p className="mt-4 max-w-[700px] text-gray-500 md:text-xl">
              Follow our proven path to achieve your business goals.
            </p>
          </div>

          {/* Desktop version */}
          <div className="relative mx-auto max-w-4xl hidden md:block">
            <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 transform bg-[#7DF9FF]"></div>
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className={`relative flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
                  <div className="relative w-full max-w-md rounded-lg border border-black/10 bg-white p-6 shadow-lg md:w-2/3">
                    <div className="absolute left-1/2 top-0 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#7DF9FF] text-black">
                      <span className="font-bold">{step.number}</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                    <p className="text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile version */}
          <div className="md:hidden">
            <div className="relative mx-auto max-w-sm">
              <motion.div
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
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-xl border border-black/10 bg-white p-8 shadow-lg min-h-[200px]"
                  >
                    <div className="absolute -top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#7DF9FF] text-black shadow-md">
                      <span className="font-bold text-lg">{steps[currentStep].number}</span>
                    </div>
                    <div className="mt-4">
                      <h3 className="mb-3 text-2xl font-bold">{steps[currentStep].title}</h3>
                      <p className="text-gray-500 text-lg">{steps[currentStep].description}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevStep}
                  className="rounded-full border-black/10 bg-white shadow-md hover:bg-gray-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Previous step</span>
                </Button>

                <div className="flex gap-2">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentStep ? "w-8 bg-[#7DF9FF]" : "w-2 bg-gray-200"
                      }`}
                      aria-label={`Go to step ${index + 1}`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextStep}
                  className="rounded-full border-black/10 bg-white shadow-md hover:bg-gray-50"
                >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Next step</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="mb-8 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ils nous font confiance</h2>
            <p className="mt-4 max-w-[700px] text-gray-500 md:text-xl">
              Nous avons établi des relations solides avec nos clients. Devenez notre nouveau client et n'attendez rien de moins que le meilleur de l'industrie. 
            </p>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-20 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Prêt à trouver votre chemin ?</h2>
            <p className="mt-4 max-w-[700px] text-gray-400 md:text-xl">
              Commencez votre parcours avec nous aujourd'hui et naviguez vers le succès.
            </p>
            <Button className="mt-8 bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/90">
              Prendre rendez-vous
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
