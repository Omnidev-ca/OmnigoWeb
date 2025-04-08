import Link from "next/link"
import { Button } from "@/components/ui/button"
import { OmnigoLogo } from "@/components/omnigo-logo"
import { MapPin } from "lucide-react"

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <OmnigoLogo />
        </Link>

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
          {/* <Link href="#" className="text-black hover:underline font-medium transition-colors">
            Contact
          </Link> */}
        </nav>

        <div className="flex items-center space-x-4">
          
          <Button className="bg-[#7DF9FF] text-black hover:bg-[#7DF9FF]/80 text-lg px-6 py-3 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Prendre rendez-vous
          </Button>
        </div>
      </div>
    </header>
  )
}
