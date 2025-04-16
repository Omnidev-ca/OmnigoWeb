import { ContactForm } from "@/components/contact-form"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* <NavigationHeader /> */}
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Contactez-nous
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Nous sommes là pour vous aider à atteindre vos objectifs. Remplissez le formulaire ci-dessous et nous vous contacterons dans les plus brefs délais.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Nos coordonnées</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">
                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Email</h3>
                        <p className="text-gray-600">contact@omnigo.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">
                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Téléphone</h3>
                        <p className="text-gray-600">+33 1 23 45 67 89</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">
                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Adresse</h3>
                        <p className="text-gray-600">123 Rue de l'Innovation<br />75000 Paris, France</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Horaires d'ouverture</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lundi - Vendredi</span>
                      <span className="text-gray-900">9h00 - 18h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Samedi</span>
                      <span className="text-gray-900">10h00 - 14h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dimanche</span>
                      <span className="text-gray-900">Fermé</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 