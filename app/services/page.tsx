"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ForkRoad } from "@/components/forkRoad"

export default function ServicesPage() {
  return (
    <main className="relative overflow-hidden bg-white mt-[130px]">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-6xl font-bold mb-12 text-center">Nos Services</h1>
        <div className="relative w-full h-[100vh]">
          <div className="justify-center items-center flex">
            <ForkRoad />
          </div>

          {/* Service 1 - Marketing */}
          <div className="absolute top-[35%] left-[6%] z-50 bg-white rounded-lg shadow-lg p-6 w-64">
            <h2 className="text-2xl font-bold mb-4">Marketing</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec velit eros, vestibulum ut diam ut, convallis sagittis eros. Vestibulum velit.
            </p>
          </div>

          {/* Service 2 - Ventes */}
          <div className="absolute top-[35%] right-[6%] z-50 bg-white rounded-lg shadow-lg p-6 w-64">
            <h2 className="text-2xl font-bold mb-4">Ventes</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec velit eros, vestibulum ut diam ut, convallis sagittis eros. Vestibulum velit.
            </p>
          </div>

          {/* Service 3 - Technologie */}
          <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-lg shadow-lg p-6 w-64">
            <h2 className="text-2xl font-bold mb-4">Technologie</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec velit eros, vestibulum ut diam ut, convallis sagittis eros. Vestibulum velit.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
} 