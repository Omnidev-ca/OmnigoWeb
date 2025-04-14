"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Target, BarChart, TrendingUp, Users, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ServiceDetailPopup } from "@/components/service-detail-popup"

const features = [
  {
    title: "Plannification & Étude de marché",
    description: "Analyse approfondie de votre marché cible et développement d'une stratégie marketing sur mesure.",
    icon: Target,
    details: [
      {
        name: "Persona",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      {
        name: "Compétition",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        name: "Mots clé",
        content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
      },
      {
        name: "Présence en ligne",
        content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
      },
      {
        name: "Prix & Promotion",
        content: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
      }
    ]
  },
  {
    title: "Installation d'outils d'analyse de données",
    description: "Mise en place d'outils d'analyse performants pour suivre et optimiser vos campagnes marketing.",
    icon: BarChart,
    details: [
      {
        name: "Analytics",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        name: "Clarity",
        content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      {
        name: "Pixel",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      },
      {
        name: "SEO",
        content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    ]
  },
  {
    title: "Achats de média",
    description: "Gestion optimisée de vos campagnes publicitaires sur différents canaux.",
    icon: TrendingUp,
    details: [
      {
        name: "Tiktok",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        name: "Meta",
        content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      {
        name: "Google",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      },
      {
        name: "DOOH",
        content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        name: "Geofencing",
        content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
      }
    ]
  },
  {
    title: "Optimisation",
    description: "Amélioration continue de vos performances marketing grâce à l'analyse des données.",
    icon: Settings,
    details: [
      {
        name: "Analyse de données",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        name: "Optimisation Ads + Site web + Présence en ligne",
        content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      }
    ]
  },
  {
    title: "Direction marketing",
    description: "Accompagnement stratégique pour la mise en place et le développement de votre département marketing.",
    icon: Users,
    details: []
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
  const [selectedDetail, setSelectedDetail] = useState<{ title: string; content: string } | null>(null)

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
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow flex flex-col h-full"
              >
                <div className="mb-6">
                  <feature.icon className="h-12 w-12 text-[#7DF9FF]" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-500 mb-6">{feature.description}</p>
                <ul className="space-y-3 mb-6 flex-grow">
                  {feature.details.map((detail, detailIndex) => (
                    <motion.li
                      key={detailIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: detailIndex * 0.1 }}
                      className="flex items-center text-gray-600 cursor-pointer hover:text-[#7DF9FF] transition-colors"
                      onClick={() => setSelectedDetail({ title: detail.name, content: detail.content })}
                    >
                      <span className="flex h-2 w-2 rounded-full bg-[#7DF9FF] mr-2"></span>
                      {detail.name}
                    </motion.li>
                  ))}
                </ul>
                <Button className="w-full bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/90">
                  En savoir plus
                </Button>
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

      <ServiceDetailPopup
        isOpen={selectedDetail !== null}
        onClose={() => setSelectedDetail(null)}
        title={selectedDetail?.title || ""}
        content={selectedDetail?.content || ""}
      />
    </div>
  )
}