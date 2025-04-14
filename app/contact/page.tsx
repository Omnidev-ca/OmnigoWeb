import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20">
      <div className="absolute inset-0 bg-[url('/interconnected-nodes.png')] bg-cover bg-center bg-no-repeat opacity-20" />
      <div className="relative z-10">
        <ContactForm />
      </div>
    </div>
  )
} 