"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Target, BarChart, TrendingUp, Users, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import Link from "next/link"

const features = [
  {
    title: "Plannification & Étude de marché",
    description: "Analyse approfondie de votre marché cible et développement d'une stratégie marketing sur mesure.",
    icon: Target,
    details: [
      "Persona",
      "Compétition",
      "Mots clé",
      "Présence en ligne",
      "Prix & Promotion"
    ]
  },
  {
    title: "Installation d'outils d'analyse de données",
    description: "Mise en place d'outils d'analyse performants pour suivre et optimiser vos campagnes marketing.",
    icon: BarChart,
    details: [
      "Analytics",
      "Clarity",
      "Pixel",
      "SEO"
    ]
  },
  {
    title: "Achats de média",
    description: "Gestion optimisée de vos campagnes publicitaires sur différents canaux.",
    icon: TrendingUp,
    details: [
      "Tiktok",
      "Meta",
      "Google",
      "DOOH",
      "Geofencing"
    ]
  },
  {
    title: "Optimisation",
    description: "Amélioration continue de vos performances marketing grâce à l'analyse des données.",
    icon: Settings,
    details: [
      "Analyse de données",
      "Optimisation Ads + Site web + Présence en ligne",
    ]
  },
  {
    title: "Direction marketing",
    description: "Accompagnement stratégique pour la mise en place et le développement de votre département marketing.",
    icon: Users,
    details: [
      // "Recrutement d'experts marketing",
      // "Formation des équipes",
      // "Mise en place de processus",
      // "Suivi des performances"
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

export default function MarketingPage() {
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
              Marketing <span className="text-[#7DF9FF]">Digital</span>
            </h1>
            <p className="text-xl text-gray-500">
              Des stratégies digitales sur mesure pour augmenter votre visibilité en ligne et générer des leads qualifiés.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="mb-6">
                  <feature.icon className="h-12 w-12 text-[#7DF9FF]" />
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
                      <span className="flex h-2 w-2 rounded-full bg-[#7DF9FF] mr-2"></span>
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
              Prêt à booster votre marketing digital ?
            </h2>
            <p className="mt-4 max-w-[700px] text-gray-500 md:text-xl mb-8">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins en marketing digital.
            </p>
            <Button className="bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/90">
              Prendre rendez-vous
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 