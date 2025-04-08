"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { Car } from "@/components/car"
import { Road } from "@/components/road"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const carRef = useRef<HTMLDivElement>(null)
  const roadRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

    const ctx = gsap.context(() => {
      // Create the animation for the car following the road
      if (roadRef.current && carRef.current) {
        const roadPath = roadRef.current.querySelector("#roadPath") as SVGPathElement

        if (roadPath) {
          gsap.to(carRef.current, {
            motionPath: {
              path: roadPath,
              align: roadPath,
              alignOrigin: [0.5, 0.5],
              autoRotate: 180,
            },
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "-5% top", // Start animation before the container is in view
              end: "bottom bottom",
              scrub: 1,
              // Removed pin: true to allow scrolling through the page
            },
          })
        }
      }

      // Animate sections as they come into view
      gsap.utils.toArray<HTMLElement>(".section").forEach((section, i) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="relative overflow-hidden bg-white">
      <Header />

      <div ref={containerRef} className="relative mt-[130px]">
        {/* Road spans the entire page */}
        <div className="relative w-full" style={{ height: "500vh" }}>
          <Road ref={roadRef} />

          {/* Car that follows the road */}
          <div ref={carRef} className="absolute top-0 left-0 z-20">
            <Car />
          </div>

          {/* Content Sections positioned along the road */}
          <section className="section absolute top-[15vh] left-[10vw] max-w-md z-10 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
            {/* <h1 className="text-5xl font-black mb-4">Voyagez avec Omnigo</h1> */}
            <p className="text-xl mb-6 text-[#4d4d4f]">
              Notre mission, contribuer au succès des PME et des OBNL
            </p>
            <Button className="bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/80">Commencer</Button>
          </section>

          <section className="section absolute top-[115vh] right-[10vw] max-w-md z-10 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <img 
                src="image.png" 
                alt="Solutions sur mesure" 
                className="w-full h-auto rounded-lg mb-4"
              />
            </div>
            <Button className="bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/80">En savoir plus</Button>
          </section>

          <section className="section absolute top-[215vh] left-[10vw] max-w-md z-10 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
            <h2 className="text-4xl font-bold mb-4">Technologie avancée</h2>
            <p className="text-lg mb-6 text-[#4d4d4f]">
              Notre plateforme utilise les dernières technologies pour optimiser chaque trajet.
            </p>
            <Button className="bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/80">Découvrir</Button>
          </section>

          <section className="section absolute top-[315vh] right-[10vw] max-w-md z-10 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
            <h2 className="text-4xl font-bold mb-4">Engagement écologique</h2>
            <p className="text-lg mb-6 text-[#4d4d4f]">
              Nous réduisons l'empreinte carbone avec notre flotte de véhicules écologiques.
            </p>
            <Button className="bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/80">Notre impact</Button>
          </section>

          <section className="section absolute top-[415vh] left-[10vw] max-w-md z-10 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
            <h2 className="text-4xl font-bold mb-4">Contactez-nous</h2>
            <p className="text-lg mb-6 text-[#4d4d4f]">
              Prêt à transformer votre expérience de transport? Contactez notre équipe dès aujourd'hui.
            </p>
            <Button className="bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/80">Contact</Button>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
