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
              autoRotate: true,
            },
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "-5% top",
              end: "bottom bottom",
              scrub: 1,
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
            <h2 className="text-4xl font-bold mb-4">NOS SERVICES</h2>
            <ul className="text-lg mb-6 text-[#4d4d4f] space-y-2">
              <li>Planification stratégique</li>
              <li>Marketing numérique</li>
              <li>Programmation</li>
              <li>Performances publicitaires</li>
            </ul>
            <Button className="bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/80">Découvrir</Button>
          </section>

          <section className="section absolute top-[315vh] right-[10vw] max-w-md z-10 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
            <h2 className="text-4xl font-bold mb-4">Engagement écologique</h2>
            <p className="text-lg mb-6 text-[#4d4d4f]">
              Nous réduisons l'empreinte carbone avec notre flotte de véhicules écologiques.
            </p>
            <Button className="bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/80">Notre impact</Button>
          </section>

          <section className="section absolute top-[415vh] left-1/2 transform -translate-x-1/2 z-10 bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-md max-w-3xl w-[90%] md:left-[10vw] md:transform-none">
            <h2 className="text-4xl font-bold mb-6 text-center">Ils nous font confiance</h2>
            <p className="text-lg text-[#4d4d4f] text-center mb-8">Nous avons établi des relations solides avec nos clients. Devenez notre nouveau client et n'attendez rien de moins que le meilleur de l'industrie.</p>
            
            {/* Version desktop */}
            <div className="hidden md:block w-full overflow-hidden relative p-4 bg-white/50 rounded-lg">
              <div className="flex animate-carousel space-x-8 hover:[animation-play-state:paused]">
                {/* Premier groupe de logos */}
                <div className="flex space-x-8 min-w-max">
                  <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/logo_entreprises/Akisens-300x134.png" alt="Logo client 1" className="max-h-16 max-w-28 object-contain" />
                  </div>
                  <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/logo_entreprises/Arts-et-Ville-300x126.png" alt="Logo client 2" className="max-h-16 max-w-28 object-contain" />
                  </div>
                  <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/logo_entreprises/Berkayly-300x59.png" alt="Logo client 3" className="max-h-16 max-w-28 object-contain" />
                  </div>
                  <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/logo_entreprises/Pacte-de-rue-300x78.png" alt="Logo client 4" className="max-h-16 max-w-28 object-contain" />
                  </div>
                  <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/logo_entreprises/SKAL-300x133.png" alt="Logo client 5" className="max-h-16 max-w-28 object-contain" />
                  </div>
                  <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/logo_entreprises/Visibilite-360.png" alt="Logo client 6" className="max-h-16 max-w-28 object-contain" />
                  </div>
                  <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/logo_entreprises/HappieRH.png" alt="Logo client 7" className="max-h-16 max-w-28 object-contain" />
                  </div>
                  <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/logo_entreprises/La-Station-300x74.jpeg" alt="Logo client 8" className="max-h-16 max-w-28 object-contain" />
                  </div>
                </div>
                {/* Duplication du groupe pour l'effet de boucle infinie */}
                <div className="flex space-x-8 min-w-max">
                  <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/logo_entreprises/Akisens-300x134.png" alt="Logo client 1" className="max-h-16 max-w-28 object-contain" />
                  </div>
                  <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/logo_entreprises/Arts-et-Ville-300x126.png" alt="Logo client 2" className="max-h-16 max-w-28 object-contain" />
                  </div>
                  <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/logo_entreprises/Berkayly-300x59.png" alt="Logo client 3" className="max-h-16 max-w-28 object-contain" />
                  </div>
                  <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/logo_entreprises/Pacte-de-rue-300x78.png" alt="Logo client 4" className="max-h-16 max-w-28 object-contain" />
                  </div>
                  <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/logo_entreprises/SKAL-300x133.png" alt="Logo client 5" className="max-h-16 max-w-28 object-contain" />
                  </div>
                  <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/logo_entreprises/Visibilite-360.png" alt="Logo client 6" className="max-h-16 max-w-28 object-contain" />
                  </div>
                  <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/logo_entreprises/HappieRH.png" alt="Logo client 7" className="max-h-16 max-w-28 object-contain" />
                  </div>
                  <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src="/logo_entreprises/La-Station-300x74.jpeg" alt="Logo client 8" className="max-h-16 max-w-28 object-contain" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Version mobile */}
            <div className="md:hidden w-full overflow-hidden relative p-4 bg-white/50 rounded-lg">
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg flex items-center justify-center p-3 shadow-sm">
                    <img src="/logo_entreprises/Akisens-300x134.png" alt="Logo client 1" className="max-h-12 w-auto object-contain" />
                  </div>
                  <div className="bg-white rounded-lg flex items-center justify-center p-3 shadow-sm">
                    <img src="/logo_entreprises/Arts-et-Ville-300x126.png" alt="Logo client 2" className="max-h-12 w-auto object-contain" />
                  </div>
                  <div className="bg-white rounded-lg flex items-center justify-center p-3 shadow-sm">
                    <img src="/logo_entreprises/Berkayly-300x59.png" alt="Logo client 3" className="max-h-12 w-auto object-contain" />
                  </div>
                  <div className="bg-white rounded-lg flex items-center justify-center p-3 shadow-sm">
                    <img src="/logo_entreprises/Pacte-de-rue-300x78.png" alt="Logo client 4" className="max-h-12 w-auto object-contain" />
                  </div>
                </div>
                
                {/* Bouton pour voir plus de logos */}
                <button className="mx-auto mt-2 px-4 py-2 bg-[#7DF9FF] text-black rounded-md text-sm font-medium hover:bg-[#7DF9FF]/80 transition-colors">
                  Voir tous nos clients
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
