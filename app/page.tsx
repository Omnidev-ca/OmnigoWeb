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
import { InteractiveProcess } from "@/components/interactive-process"

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

      {/* Interactive Process Section */}
      <InteractiveProcess steps={steps} />

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
