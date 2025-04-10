"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { Car } from "@/components/car"
import { Road } from "@/components/road"
import { Road as RoadPhone } from "@/components/roadPhone"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import TechWallpaper from "@/components/tech-wallpaper"

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const carRef = useRef<HTMLDivElement>(null)
  const roadRef = useRef<SVGSVGElement>(null)
  const roadPhoneRef = useRef<SVGSVGElement>(null)
  const [language, setLanguage] = useState<"fr" | "en">("fr")
  const [isMobile, setIsMobile] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1367 || window.innerHeight < 724)
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) {
      // Calculate total height of all sections including margins
      const sections = document.querySelectorAll('.section')
      let totalHeight = 0
      
      sections.forEach((section, index) => {
        const sectionHeight = section.getBoundingClientRect().height
        const sectionStyle = window.getComputedStyle(section)
        const marginTop = parseFloat(sectionStyle.marginTop)
        const marginBottom = parseFloat(sectionStyle.marginBottom)
        
        // Add section height and its margins
        totalHeight += sectionHeight + marginTop + marginBottom
      })
      
      // Add some extra space for the road to end naturally
      totalHeight += 200
      setContentHeight(totalHeight)
    }
  }, [isMobile])

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

    const ctx = gsap.context(() => {
      // Create the animation for the car following the road
      if (carRef.current) {
        if (isMobile && roadPhoneRef.current) {
          // Animation for mobile road
          const roadPath = roadPhoneRef.current.querySelector("#roadPath") as SVGPathElement

          if (roadPath) {
            // Kill any existing animation first
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
            
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
                start: "-10% top",
                end: isMobile ? `+=${contentHeight}px` : "bottom bottom",
                scrub: 2,
                invalidateOnRefresh: true,
                refreshPriority: 1
              },
            })
          }
        } else if (!isMobile && roadRef.current) {
          // Animation for desktop road
          const roadPath = roadRef.current.querySelector("#roadPath") as SVGPathElement

          if (roadPath) {
            // Kill any existing animation first
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
            
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
                start: "top top",
                end: "bottom bottom",
                scrub: 2,
                invalidateOnRefresh: true,
                refreshPriority: 1
              },
            })
          }
        }
      }

      // Animate sections as they come into view
      if (isMobile) {
        // Mobile animations
        gsap.utils.toArray<HTMLElement>(".section").forEach((section, i) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          )
        })
      } else {
        // Desktop animations (keep existing)
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
      }
    }, containerRef)

    return () => ctx.revert()
  }, [isMobile, contentHeight])

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr")
  }

  return (
    <main className="relative overflow-hidden bg-white">
      <Header />
      {/* <BubbleBackground /> */}
      <TechWallpaper />
      {/* Language Switcher */}
      <div className="fixed top-20 left-4 z-50">
        <button
          onClick={toggleLanguage}
          className="flex items-center justify-center w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          aria-label={language === "fr" ? "Switch to English" : "Passer au français"}
        >
          {language === "fr" ? (
            <span className="text-sm font-bold">🇫🇷</span>
          ) : (
            <span className="text-sm font-bold">🇬🇧</span>
          )}
        </button>
      </div>

      <div ref={containerRef} className="relative mt-[130px]">
        {/* Road spans the entire page */}
        <div className="relative w-full" style={{ height: isMobile ? `${contentHeight}px` : "500vh" }}>
          <div className="absolute top-0 left-0 w-full h-full z-40">
            {isMobile ? <RoadPhone ref={roadPhoneRef} /> : <Road ref={roadRef} />}
          </div>

          {/* Car that follows the road */}
          <div ref={carRef} className="absolute top-0 left-0 z-50">
            <Car />
          </div>

          <h1 className="text-6xl font-bold mb-4 text-center p-20 ">
            Votre projet mérite d'avoir de <span className="text-[#7DF9FF]">l'impact</span> !
          </h1>

          {isMobile && (
            <div className="relative w-full">
              {/* First section */}
              <section className="section w-[90%] mx-auto my-24 z-10 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
                <p className="text-xl mb-6 text-[#4d4d4f]">Notre mission, contribuer au succès des PME et des OBNL</p>
                <Button className="bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/80">Commencer</Button>
              </section>

              {/* Second section */}
              <section className="section w-[90%] mx-auto my-24 z-10 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
                <div className="mb-6">
                  <img src="image.png" alt="Solutions sur mesure" className="w-full h-auto rounded-lg mb-4" />
                </div>
                <Button className="bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/80">En savoir plus</Button>
              </section>

              {/* Third section */}
              <section className="section w-[90%] mx-auto my-24 z-10 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
                <h2 className="text-4xl font-bold mb-4">NOS SERVICES</h2>
                <ul className="text-lg mb-6 text-[#4d4d4f] space-y-2">
                  <li>Planification stratégique</li>
                  <li>Marketing numérique</li>
                  <li>Programmation</li>
                  <li>Performances publicitaires</li>
                </ul>
                <Button className="bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/80">Découvrir</Button>
              </section>

              {/* Fourth section */}
              <section className="section w-[90%] mx-auto my-24 z-10 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
                <p className="text-lg text-[#4d4d4f] text-center mb-8">
                  Nous offrons une présence numérique forte et multicanale à des prix honnêtes grâce à notre équipe
                  multidisciplinaire. Notre service est transparent, rapide et flexible, afin de vous aider à atteindre
                  vos objectifs et à réussir sur le marché en ligne.
                </p>
                <Button className="bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/80">Notre impact</Button>
              </section>

              {/* Clients section */}
              <section className="section w-[90%] mx-auto my-24 z-10 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
                <h2 className="text-4xl font-bold mb-6 text-center">Ils nous font confiance</h2>
                <p className="text-lg text-[#4d4d4f] text-center mb-8">
                  Nous avons établi des relations solides avec nos clients. Devenez notre nouveau client et n'attendez
                  rien de moins que le meilleur de l'industrie.
                </p>

                <div className="w-full overflow-hidden relative p-4">
                  <div className="flex flex-col space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg flex items-center justify-center p-3 shadow-sm">
                        <img
                          src="/logo_entreprises/Akisens-300x134.png"
                          alt="Logo client 1"
                          className="max-h-12 w-auto object-contain"
                        />
                      </div>
                      <div className="bg-white rounded-lg flex items-center justify-center p-3 shadow-sm">
                        <img
                          src="/logo_entreprises/Arts-et-Ville-300x126.png"
                          alt="Logo client 2"
                          className="max-h-12 w-auto object-contain"
                        />
                      </div>
                      <div className="bg-white rounded-lg flex items-center justify-center p-3 shadow-sm">
                        <img
                          src="/logo_entreprises/Berkayly-300x59.png"
                          alt="Logo client 3"
                          className="max-h-12 w-auto object-contain"
                        />
                      </div>
                      <div className="bg-white rounded-lg flex items-center justify-center p-3 shadow-sm">
                        <img
                          src="/logo_entreprises/Pacte-de-rue-300x78.png"
                          alt="Logo client 4"
                          className="max-h-12 w-auto object-contain"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const modal = document.getElementById("clientsModal")
                        if (modal) modal.classList.remove("hidden")
                      }}
                      className="mx-auto mt-2 px-4 py-2 bg-[#7DF9FF] text-black rounded-md text-sm font-medium hover:bg-[#7DF9FF]/80 transition-colors"
                    >
                      Voir tous nos clients
                    </button>
                  </div>
                </div>
              </section>

              {/* Réalisations section */}
              <section className="section w-[90%] mx-auto my-24 z-10 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
                <h2 className="text-4xl font-bold mb-6 text-center">Nos Réalisations</h2>
                <p className="text-lg text-[#4d4d4f] text-center mb-8">
                  Nous sommes fiers de nos projets créatifs et innovants, qui sont conçus sur mesure pour répondre aux
                  besoins de nos clients.
                </p>

                <div className="w-full overflow-hidden relative p-4">
                  <div className="flex flex-col space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg flex items-center justify-center p-3 shadow-sm">
                        <img
                          src="/images_realisation/numerique.jpg"
                          alt="Réalisation 1"
                          className="max-h-12 w-auto object-contain"
                        />
                      </div>
                      <div className="bg-white rounded-lg flex items-center justify-center p-3 shadow-sm">
                        <img
                          src="/images_realisation/publicitaire.jpg"
                          alt="Réalisation 2"
                          className="max-h-12 w-auto object-contain"
                        />
                      </div>
                      <div className="bg-white rounded-lg flex items-center justify-center p-3 shadow-sm">
                        <img
                          src="/images_realisation/shopify.jpg"
                          alt="Réalisation 3"
                          className="max-h-12 w-auto object-contain"
                        />
                      </div>
                      <div className="bg-white rounded-lg flex items-center justify-center p-3 shadow-sm">
                        <img
                          src="/images_realisation/identite.jpg"
                          alt="Réalisation 4"
                          className="max-h-12 w-auto object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {!isMobile && (
            <>
              {/* Content Sections positioned along the road */}
              <section
                className={`section ${
                  isMobile
                    ? "absolute left-1/2 transform -translate-x-1/2 max-w-[90%] w-full"
                    : "absolute top-[45vh] right-[50vw] max-w-md"
                } z-10 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md`}
                style={isMobile ? { top: `${isMobile ? 50 : 0}vh` } : {}}
              >
                <p className="text-xl mb-6 text-[#4d4d4f]">Notre mission, contribuer au succès des PME et des OBNL</p>
                <Button className="bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/80">Commencer</Button>
              </section>

              <section
                className={`section ${
                  isMobile
                    ? "absolute left-1/2 transform -translate-x-1/2 max-w-[90%] w-full"
                    : "absolute top-[92vh] left-[50vw] max-w-md"
                } z-10 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md`}
                style={isMobile ? { top: `${isMobile ? 50 : 0}vh` } : {}}
              >
                <div className="mb-6">
                  <img src="image.png" alt="Solutions sur mesure" className="w-full h-auto rounded-lg mb-4" />
                </div>
                <Button className="bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/80">En savoir plus</Button>
              </section>

              <section
                className={`section ${
                  isMobile
                    ? "absolute left-1/2 transform -translate-x-1/2 max-w-[90%] w-full"
                    : "absolute top-[157vh] right-[50vw] max-w-md"
                } z-10 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md`}
                style={isMobile ? { top: `${isMobile ? 50 : 0}vh` } : {}}
              >
                <h2 className="text-4xl font-bold mb-4">NOS SERVICES</h2>
                <ul className="text-lg mb-6 text-[#4d4d4f] space-y-2">
                  <li>Planification stratégique</li>
                  <li>Marketing numérique</li>
                  <li>Programmation</li>
                  <li>Performances publicitaires</li>
                </ul>
                <Button className="bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/80">Découvrir</Button>
              </section>

              <section
                className={`section ${
                  isMobile
                    ? "absolute left-1/2 transform -translate-x-1/2 max-w-[90%] w-full"
                    : "absolute top-[217vh] left-[50vw] max-w-md"
                } z-10 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md`}
                style={isMobile ? { top: `${isMobile ? 50 : 0}vh` } : {}}
              >
                <p className="text-lg text-[#4d4d4f] text-center mb-8">
                  Nous offrons une présence numérique forte et multicanale à des prix honnêtes grâce à notre équipe
                  multidisciplinaire. Notre service est transparent, rapide et flexible, afin de vous aider à atteindre
                  vos objectifs et à réussir sur le marché en ligne.
                </p>
                <Button className="bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/80">Notre impact</Button>
              </section>

              <section
                className={`section ${
                  isMobile
                    ? "absolute left-1/2 transform -translate-x-1/2 max-w-[90%] w-full"
                    : "absolute top-[275vh] left-1/2 transform -translate-x-1/2 max-w-3xl w-[90%] md:left-[20vw] md:transform-none"
                } z-10 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md`}
                style={isMobile ? { top: `${isMobile ? 50 : 0}vh` } : {}}
              >
                <h2 className="text-4xl font-bold mb-6 text-center">Ils nous font confiance</h2>
                <p className="text-lg text-[#4d4d4f] text-center mb-8">
                  Nous avons établi des relations solides avec nos clients. Devenez notre nouveau client et n'attendez
                  rien de moins que le meilleur de l'industrie.
                </p>

                {/* Version desktop */}
                <div className="hidden md:block w-full overflow-hidden relative p-4">
                  <div className="flex animate-carousel space-x-8 hover:[animation-play-state:paused]">
                    {/* Premier groupe de logos */}
                    <div className="flex space-x-8 min-w-max">
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/logo_entreprises/Akisens-300x134.png"
                          alt="Logo client 1"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/logo_entreprises/Arts-et-Ville-300x126.png"
                          alt="Logo client 2"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/logo_entreprises/Berkayly-300x59.png"
                          alt="Logo client 3"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/logo_entreprises/Pacte-de-rue-300x78.png"
                          alt="Logo client 4"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/logo_entreprises/SKAL-300x133.png"
                          alt="Logo client 5"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/logo_entreprises/Visibilite-360.png"
                          alt="Logo client 6"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/logo_entreprises/HappieRH.png"
                          alt="Logo client 7"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/logo_entreprises/La-Station-300x74.jpeg"
                          alt="Logo client 8"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                    </div>
                    {/* Duplication du groupe pour l'effet de boucle infinie */}
                    <div className="flex space-x-8 min-w-max">
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/logo_entreprises/Akisens-300x134.png"
                          alt="Logo client 1"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/logo_entreprises/Arts-et-Ville-300x126.png"
                          alt="Logo client 2"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/logo_entreprises/Berkayly-300x59.png"
                          alt="Logo client 3"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/logo_entreprises/Pacte-de-rue-300x78.png"
                          alt="Logo client 4"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/logo_entreprises/SKAL-300x133.png"
                          alt="Logo client 5"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/logo_entreprises/Visibilite-360.png"
                          alt="Logo client 6"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/logo_entreprises/HappieRH.png"
                          alt="Logo client 7"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/logo_entreprises/La-Station-300x74.jpeg"
                          alt="Logo client 8"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Version mobile */}
                <div className="md:hidden w-full overflow-hidden relative p-4">
                  <div className="flex flex-col space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg flex items-center justify-center p-3 shadow-sm">
                        <img
                          src="/logo_entreprises/Akisens-300x134.png"
                          alt="Logo client 1"
                          className="max-h-12 w-auto object-contain"
                        />
                      </div>
                      <div className="bg-white rounded-lg flex items-center justify-center p-3 shadow-sm">
                        <img
                          src="/logo_entreprises/Arts-et-Ville-300x126.png"
                          alt="Logo client 2"
                          className="max-h-12 w-auto object-contain"
                        />
                      </div>
                      <div className="bg-white rounded-lg flex items-center justify-center p-3 shadow-sm">
                        <img
                          src="/logo_entreprises/Berkayly-300x59.png"
                          alt="Logo client 3"
                          className="max-h-12 w-auto object-contain"
                        />
                      </div>
                      <div className="bg-white rounded-lg flex items-center justify-center p-3 shadow-sm">
                        <img
                          src="/logo_entreprises/Pacte-de-rue-300x78.png"
                          alt="Logo client 4"
                          className="max-h-12 w-auto object-contain"
                        />
                      </div>
                    </div>

                    {/* Bouton pour voir plus de logos */}
                    <button
                      onClick={() => {
                        const modal = document.getElementById("clientsModal")
                        if (modal) modal.classList.remove("hidden")
                      }}
                      className="mx-auto mt-2 px-4 py-2 bg-[#7DF9FF] text-black rounded-md text-sm font-medium hover:bg-[#7DF9FF]/80 transition-colors"
                    >
                      Voir tous nos clients
                    </button>

                    {/* Modal popup pour afficher tous les logos */}
                    <div
                      id="clientsModal"
                      className="hidden fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                    >
                      <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-bold">Nos clients</h3>
                          <button
                            onClick={() => {
                              const modal = document.getElementById("clientsModal")
                              if (modal) modal.classList.add("hidden")
                            }}
                            className="text-gray-500 hover:text-black"
                          >
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
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          <div className="bg-white border rounded-lg flex items-center justify-center p-4 shadow-sm">
                            <img
                              src="/logo_entreprises/Akisens-300x134.png"
                              alt="Logo client 1"
                              className="max-h-16 w-auto object-contain"
                            />
                          </div>
                          <div className="bg-white border rounded-lg flex items-center justify-center p-4 shadow-sm">
                            <img
                              src="/logo_entreprises/Arts-et-Ville-300x126.png"
                              alt="Logo client 2"
                              className="max-h-16 w-auto object-contain"
                            />
                          </div>
                          <div className="bg-white border rounded-lg flex items-center justify-center p-4 shadow-sm">
                            <img
                              src="/logo_entreprises/Berkayly-300x59.png"
                              alt="Logo client 3"
                              className="max-h-16 w-auto object-contain"
                            />
                          </div>
                          <div className="bg-white border rounded-lg flex items-center justify-center p-4 shadow-sm">
                            <img
                              src="/logo_entreprises/Pacte-de-rue-300x78.png"
                              alt="Logo client 4"
                              className="max-h-16 w-auto object-contain"
                            />
                          </div>
                          <div className="bg-white border rounded-lg flex items-center justify-center p-4 shadow-sm">
                            <img
                              src="/logo_entreprises/SKAL-300x133.png"
                              alt="Logo client 5"
                              className="max-h-16 w-auto object-contain"
                            />
                          </div>
                          <div className="bg-white border rounded-lg flex items-center justify-center p-4 shadow-sm">
                            <img
                              src="/logo_entreprises/Visibilite-360.png"
                              alt="Logo client 6"
                              className="max-h-16 w-auto object-contain"
                            />
                          </div>
                          <div className="bg-white border rounded-lg flex items-center justify-center p-4 shadow-sm">
                            <img
                              src="/logo_entreprises/HappieRH.png"
                              alt="Logo client 7"
                              className="max-h-16 w-auto object-contain"
                            />
                          </div>
                          <div className="bg-white border rounded-lg flex items-center justify-center p-4 shadow-sm">
                            <img
                              src="/logo_entreprises/La-Station-300x74.jpeg"
                              alt="Logo client 8"
                              className="max-h-16 w-auto object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section
                className={`section ${
                  isMobile
                    ? "absolute left-1/2 transform -translate-x-1/2 max-w-[90%] w-full"
                    : "absolute top-[335vh] left-1/2 transform -translate-x-1/2 max-w-3xl w-[90%] md:left-auto md:right-[20vw] md:transform-none"
                } z-10 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md`}
                style={isMobile ? { top: `${isMobile ? 50 : 0}vh` } : {}}
              >
                <h2 className="text-4xl font-bold mb-6 text-center">Nos Réalisations</h2>
                <p className="text-lg text-[#4d4d4f] text-center mb-8">
                  Nous sommes fiers de nos projets créatifs et innovants, qui sont conçus sur mesure pour répondre aux
                  besoins de nos clients.
                </p>

                {/* Version desktop */}
                <div className="hidden md:block w-full overflow-hidden relative p-4">
                  <div className="flex animate-carousel space-x-8 hover:[animation-play-state:paused]">
                    {/* Premier groupe de logos */}
                    <div className="flex space-x-8 min-w-max">
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/images_realisation/numerique.jpg"
                          alt="Logo client 1"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/images_realisation/publicitaire.jpg"
                          alt="Logo client 2"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/images_realisation/shopify.jpg"
                          alt="Logo client 3"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/images_realisation/identite.jpg"
                          alt="Logo client 4"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                    </div>
                    {/* Duplication du groupe pour l'effet de boucle infinie */}
                    <div className="flex space-x-8 min-w-max">
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/images_realisation/numerique.jpg"
                          alt="Logo client 1"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/images_realisation/publicitaire.jpg"
                          alt="Logo client 2"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/images_realisation/shopify.jpg"
                          alt="Logo client 3"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/images_realisation/identite.jpg"
                          alt="Logo client 4"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Version mobile */}
                <div className="md:hidden w-full overflow-hidden relative p-4">
                  <div className="flex flex-col space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/images_realisation/numerique.jpg"
                          alt="Logo client 1"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/images_realisation/publicitaire.jpg"
                          alt="Logo client 2"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/images_realisation/shopify.jpg"
                          alt="Logo client 3"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                      <div className="w-36 h-24 bg-white rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                          src="/images_realisation/identite.jpg"
                          alt="Logo client 4"
                          className="max-h-16 max-w-28 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
