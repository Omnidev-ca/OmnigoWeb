"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { OmnigoLogo } from "./omnigo-logo"

export function NavigationHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/">
          <OmnigoLogo />
        </Link>

        <nav className="hidden gap-6 md:flex">
          <Link href="#" className="text-sm font-medium hover:text-[#7DF9FF]">
            Accueil
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-[#7DF9FF]">
            Nos services
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-[#7DF9FF]">
            Nous joindre
          </Link>
        </nav>

        <div className="hidden md:flex md:gap-2">
          <Button className="bg-[#7DF9FF] text-black"><MapPin className="h-5 w-5" /> Prendre rendez-vous</Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle className="text-lg font-bold mb-4">Menu</SheetTitle>
            <div className="flex flex-col gap-6 pt-6">
              <Link href="#" className="text-lg font-medium hover:text-[#7DF9FF]">
                Accueil
              </Link>
              <Link href="#" className="text-lg font-medium hover:text-[#7DF9FF]">
                Nos services
              </Link>
              <Link href="#" className="text-lg font-medium hover:text-[#7DF9FF]">
                Nous joindre
              </Link>
              <div className="flex flex-col gap-2 pt-4">
                <Button className="bg-[#7DF9FF] text-black"><MapPin className="h-5 w-5" /> Prendre rendez-vous</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
