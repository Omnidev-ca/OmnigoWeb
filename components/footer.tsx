import Link from "next/link"
import { OmnigoLogo } from "@/components/omnigo-logo"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <OmnigoLogo />
            <p className="text-[#4d4d4f] max-w-xs">
              Omnigo.ca transforme votre façon de vous déplacer avec des solutions innovantes.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#4d4d4f] hover:text-[#7DF9FF] transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#4d4d4f] hover:text-[#7DF9FF] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#4d4d4f] hover:text-[#7DF9FF] transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#4d4d4f] hover:text-[#7DF9FF] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#4d4d4f] hover:text-[#7DF9FF] transition-colors">
                  Transport urbain
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#4d4d4f] hover:text-[#7DF9FF] transition-colors">
                  Logistique
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#4d4d4f] hover:text-[#7DF9FF] transition-colors">
                  Solutions d'entreprise
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#4d4d4f] hover:text-[#7DF9FF] transition-colors">
                  Événements
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-[#4d4d4f]">info@omnigo.ca</li>
              <li className="text-[#4d4d4f]">+1 (123) 456-7890</li>
              <li className="text-[#4d4d4f]">Montréal, QC, Canada</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-[#4d4d4f]">© {new Date().getFullYear()} Omnigo.ca. Tous droits réservés.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-[#4d4d4f] hover:text-[#7DF9FF] transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="#" className="text-[#4d4d4f] hover:text-[#7DF9FF] transition-colors">
              Conditions d'utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
