import Link from "next/link"
import { Button } from "@/components/ui/button"
import { OmnigoLogo } from "@/components/omnigo-logo"
import { MapPin, Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <OmnigoLogo />
        </Link>

        {/* Menu burger pour mobile */}
        <div className="flex items-center gap-4">
          
          
          <button
            className="md:hidden z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-black" />
            ) : (
              <Menu className="h-6 w-6 text-black" />
            )}
          </button>
        </div>

        {/* Menu mobile */}
        <div
          className={`fixed md:hidden inset-0 bg-white/95 backdrop-blur-sm transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ top: '0', height: '100vh' }}
        >
          <nav className="flex flex-col items-center justify-center min-h-screen py-20 space-y-12">
            <Link
              href="#"
              className="text-black hover:text-gray-600 text-xl font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="#"
              className="text-black hover:text-gray-600 text-xl font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Nos services
            </Link>
            <Link
              href="#"
              className="text-black hover:text-gray-600 text-xl font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Nous joindre
            </Link>

            <Button className="bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/80 text-lg px-6 py-3 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>Prendre rendez-vous</span>
            </Button>
          </nav>

          
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center space-x-20">
          <Link href="#" className="text-black hover:underline font-medium transition-colors">
            Accueil
          </Link>
          <Link href="#" className="text-black hover:underline font-medium transition-colors">
            Nos services
          </Link>
          <Link href="#" className="text-black hover:underline font-medium transition-colors">
            Nous joindre
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button className="bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/80 text-lg px-6 py-3 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Prendre rendez-vous
          </Button>
        </div>
      </div>
    </header>
  )
}
