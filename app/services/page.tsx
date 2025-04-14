"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles, Target, ShoppingCart, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { AnimatedRoad } from "@/components/animated-road"

const services = [
  {
    title: "Marketing Digital",
    icon: Target,
    description: "Stratégies digitales sur mesure pour augmenter votre visibilité en ligne.",
    features: [
      "Plannification & Étude de marché",
      "Installation d'outils d'analyse de données",
      "Achats de média",
      "Optimisation",
      "Direction marketing",
    ],
    color: "#7DF9FF",
    gradient: "from-blue-400 to-cyan-300"
  },
  {
    title: "Ventes & E-commerce",
    icon: ShoppingCart,
    description: "Solutions e-commerce et stratégies de vente pour maximiser vos revenus.",
    features: [
      "Prospection B2B (Linkdin & Email)",
      "Création & Formation d'un département de vente",
      "Intégration CRM",
      "Intéligence Artificielle (ChatGPT)",
    ],
    color: "#FF6B6B",
    gradient: "from-pink-400 to-red-300"
  },
  {
    title: "Solutions Tech",
    icon: Code,
    description: "Développement et intégration de solutions technologiques innovantes.",
    features: [
      "Programmation + Design Web",
      "Programmation d'application web et mobile",
      "Développement tech et custom",
      "Intégration logiciel ou software",
    ],
    color: "#4ECDC4",
    gradient: "from-green-400 to-teal-300"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

export default function Services() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      <NavigationHeader />

      {/* Services Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-sm font-medium shadow-sm mb-4">
              <Sparkles className="h-4 w-4 text-[#7DF9FF] mr-2" />
              <span>Nos services</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4">
              Des solutions <span className="text-[#7DF9FF]">innovantes</span> pour votre croissance
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Nous combinons expertise et créativité pour vous offrir des solutions digitales performantes.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 md:grid-cols-3"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setHoveredService(index)}
                onHoverEnd={() => setHoveredService(null)}
                className="relative overflow-hidden rounded-2xl bg-white shadow-lg"
              >
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-300`}
                  style={{ opacity: hoveredService === index ? 0.1 : 0 }}
                />
                <div className="relative p-8">
                  <div className="mb-6">
                    <service.icon className={`h-12 w-12 ${hoveredService === index ? 'text-white' : ''}`} style={{ color: service.color }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-500 mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="flex items-center text-gray-600"
                      >
                        <span className="flex h-2 w-2 rounded-full mr-2" style={{ backgroundColor: service.color }}></span>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full transition-all duration-300 ${hoveredService === index ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
                    onClick={() => {
                      const servicePaths: Record<string, string> = {
                        "Marketing Digital": "/services/marketing",
                        "Ventes & E-commerce": "/services/ventes",
                        "Solutions Tech": "/services/tech"
                      }
                      window.location.href = servicePaths[service.title]
                    }}
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <AnimatedRoad className="w-full" />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black text-white">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="p-6">
              <motion.h3 
                className="text-5xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                50+
              </motion.h3>
              <p className="text-gray-400">Projets réalisés</p>
            </div>
            <div className="p-6">
              <motion.h3 
                className="text-5xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                30+
              </motion.h3>
              <p className="text-gray-400">Clients satisfaits</p>
            </div>
            <div className="p-6">
              <motion.h3 
                className="text-5xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                5+
              </motion.h3>
              <p className="text-gray-400">Années d'expérience</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Prêt à transformer votre entreprise ?
            </h2>
            <p className="mt-4 max-w-[700px] text-gray-500 md:text-xl mb-8">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins et découvrir comment nous pouvons vous aider.
            </p>
            <Button className="bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/90">
              Prendre rendez-vous
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 