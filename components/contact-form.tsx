"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type ClientType = "Entreprise" | "OBNL" | "Individuel"
type ServiceType = "Marketing" | "Ventes" | "Tech"
type IndividualType = "PreEntrepreneur" | "Influenceur"

export function ContactForm() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company: "",
    phone: "",
    clientType: "Entreprise" as ClientType,
    serviceType: "Marketing" as ServiceType,
    individualType: "PreEntrepreneur" as IndividualType
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // TODO: Implement actual form submission
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      setSubmitStatus("success")
      setFormData({ 
        email: "", 
        name: "", 
        company: "", 
        phone: "", 
        clientType: "Entreprise",
        serviceType: "Marketing",
        individualType: "PreEntrepreneur"
      })
      setCurrentStep(1)
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    setCurrentStep(prev => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  const renderStep3 = () => {
    switch (formData.clientType) {
      case "Entreprise":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Quel service vous intéresse ?</h3>
            <div className="grid gap-4">
              {["Marketing", "Ventes", "Tech"].map((service) => (
                <label key={service} className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                  <input
                    type="radio"
                    name="serviceType"
                    value={service}
                    checked={formData.serviceType === service}
                    onChange={handleChange}
                    className="h-5 w-5 text-[#7DF9FF] focus:ring-[#7DF9FF]"
                  />
                  <span className="text-white">{service}</span>
                </label>
              ))}
            </div>
          </div>
        )
      case "OBNL":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Google Ads pour les OBNL</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300">
                Les OBNL peuvent bénéficier de Google Ads Grants, un programme qui offre jusqu'à 10 000$ par mois en publicités gratuites sur Google.
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-4">
                <li>Publicités gratuites jusqu'à 10 000$ par mois</li>
                <li>Visibilité accrue pour votre cause</li>
                <li>Atteignez plus de donateurs et bénévoles</li>
                <li>Campagnes optimisées pour votre mission</li>
              </ul>
            </div>
          </div>
        )
      case "Individuel":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Quel est votre profil ?</h3>
            <div className="grid gap-4">
              {[
                { value: "PreEntrepreneur", label: "Pré-entrepreneur" },
                { value: "Influenceur", label: "Influenceur" }
              ].map(({ value, label }) => (
                <label key={value} className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                  <input
                    type="radio"
                    name="individualType"
                    value={value}
                    checked={formData.individualType === value}
                    onChange={handleChange}
                    className="h-5 w-5 text-[#7DF9FF] focus:ring-[#7DF9FF]"
                  />
                  <span className="text-white">{label}</span>
                </label>
              ))}
            </div>
          </div>
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          {currentStep === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7DF9FF] focus:border-transparent transition-all"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7DF9FF] focus:border-transparent transition-all"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7DF9FF] focus:border-transparent transition-all"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={nextStep}
                className="w-full py-3 px-4 bg-[#7DF9FF] text-gray-900 font-semibold rounded-lg hover:bg-[#7DF9FF]/90 transition-colors"
              >
                Suivant
              </motion.button>
            </motion.div>
          ) : currentStep === 2 ? (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="clientType" className="block text-sm font-medium text-gray-300 mb-1">
                  Type de client *
                </label>
                <select
                  id="clientType"
                  name="clientType"
                  value={formData.clientType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7DF9FF] focus:border-transparent transition-all appearance-none"
                >
                  <option value="Entreprise">Entreprise</option>
                  <option value="OBNL">OBNL</option>
                  <option value="Individuel">Individuel</option>
                </select>
              </div>

              {formData.clientType !== "Individuel" && (
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                    {formData.clientType === "Entreprise" ? "Nom de l'entreprise" : "Nom de l'OBNL"} *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required={formData.clientType !== "Individuel"}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7DF9FF] focus:border-transparent transition-all"
                    placeholder={formData.clientType === "Entreprise" ? "Nom de votre entreprise" : "Nom de votre OBNL"}
                  />
                </div>
              )}

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-3 px-4 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Retour
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={nextStep}
                  className="flex-1 py-3 px-4 bg-[#7DF9FF] text-gray-900 font-semibold rounded-lg hover:bg-[#7DF9FF]/90 transition-colors"
                >
                  Suivant
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {renderStep3()}
              
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-3 px-4 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Retour
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 bg-[#7DF9FF] text-gray-900 font-semibold rounded-lg hover:bg-[#7DF9FF]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-400 text-center"
          >
            Message envoyé avec succès !
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-center"
          >
            Une erreur est survenue. Veuillez réessayer.
          </motion.div>
        )}
      </form>
    </motion.div>
  )
} 