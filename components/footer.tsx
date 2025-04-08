"use client"

import Link from "next/link"
import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react"
import { OmnigoLogoWhite } from "./omnigo-logo-white"

export function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          {/* Logo */}
          <OmnigoLogoWhite className="flex justify-end" />

          {/* Main content */}
          <div className="mb-16">
            <h2 className="text-5xl font-bold mb-24">
              Suivez le <span className="text-[#7DF9FF]">meilleur</span>
              <br />
              chemin...
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold uppercase mb-2">Téléphone</h3>
                <p className="text-white/80">(514) 447-9277</p>
              </div>

              <div>
                <h3 className="font-bold uppercase mb-2">Adresse</h3>
                <p className="text-white/80">
                  3 Place Ville Marie, Suite 400
                  <br />
                  Québec, QC, H3B 2E3, Canada
                </p>
              </div>

              <div>
                <h3 className="font-bold uppercase mb-2">Contact</h3>
                <p className="text-white/80">bonjour@omnigo.ca</p>
              </div>
            </div>
          </div>

          {/* Social media */}
          <div className="mb-16">
            <h3 className="font-bold uppercase mb-4">Suivez-nous</h3>
            <div className="flex space-x-6">
              <Link href="#" className="text-white hover:text-[#7DF9FF] transition-colors">
                <Instagram size={28} />
              </Link>
              <Link href="#" className="text-white hover:text-[#7DF9FF] transition-colors">
                <Facebook size={28} />
              </Link>
              <Link href="#" className="text-white hover:text-[#7DF9FF] transition-colors">
                <Linkedin size={28} />
              </Link>
              <Link href="#" className="text-white hover:text-[#7DF9FF] transition-colors">
                <Youtube size={28} />
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="mb-24">
            <p className="text-white/60 text-sm">
              © Tous droits réservés, Omnigo.ca Inc, 2019-{new Date().getFullYear()}
            </p>
          </div>

          {/* Arrow up */}
          <div className="flex justify-center">
            <Link
              href="#top"
              className="text-[#7DF9FF] hover:text-[#7DF9FF]/80 transition-colors"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            >
              <svg width="173" height="153" viewBox="0 0 173 153" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M86.2599 0.0987086L172.023 152.648L86.382 105.911L0.176137 152.846L86.2599 0.0987086Z" fill="#7FF9FF"/>
              </svg>

            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
