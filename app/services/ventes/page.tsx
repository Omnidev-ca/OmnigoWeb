"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ShoppingCart, Users, MessageSquare, Brain, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import Link from "next/link"

const features = [
  {
    title: "Prospection B2B (LinkedIn & Email)",
    description: "Stratégies de prospection professionnelle pour générer des leads qualifiés.",
    icon: MessageSquare,
    details: [
      "Campagnes LinkedIn personnalisées",
      "Séquences d'emails automatisées",
      "Qualification des leads",
      "Suivi des prospects"
    ]
  },
  {
    title: "Création & Formation d'un département de vente",
    description: "Mise en place d'une équipe commerciale performante et autonome.",
    icon: Users,
    details: [
      "Recrutement de commerciaux",
      "Formation aux techniques de vente",
      "Mise en place de processus",
      "Définition des objectifs"
    ]
  },
  {
    title: "Intégration CRM",
    description: "Mise en place et optimisation d'un système de gestion de la relation client.",
    icon: BarChart,
    details: [
      "Choix de la solution CRM",
      "Configuration personnalisée",
      "Formation des équipes",
      "Automatisation des processus"
    ]
  },
  {
    title: "Intelligence Artificielle (ChatGPT)",
    description: "Utilisation de l'IA pour optimiser vos processus de vente et de service client.",
    icon: Brain,
    details: [
      "Automatisation des réponses",
      "Analyse des conversations",
      "Personnalisation des messages",
      "Optimisation des performances"
    ]
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

export default function VentesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <Link href="/services" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux services
            </Link>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              Ventes & <span className="text-[#FF6B6B]">E-commerce</span>
            </h1>
            <p className="text-xl text-gray-500">
              Des solutions e-commerce et stratégies de vente pour maximiser vos revenus et développer votre entreprise.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 md:grid-cols-2"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="mb-6">
                  <feature.icon className="h-12 w-12 text-[#FF6B6B]" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-500 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.details.map((detail, detailIndex) => (
                    <motion.li
                      key={detailIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: detailIndex * 0.1 }}
                      className="flex items-center text-gray-600"
                    >
                      <span className="flex h-2 w-2 rounded-full bg-[#FF6B6B] mr-2"></span>
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
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
              Prêt à booster vos ventes ?
            </h2>
            <p className="mt-4 max-w-[700px] text-gray-500 md:text-xl mb-8">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins en vente et e-commerce.
            </p>
            <Button className="bg-[#FF6B6B] text-white hover:bg-[#FF6B6B]/90">
              Prendre rendez-vous
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 