import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  company: string
}

export function TestimonialCard({ quote, author, company }: TestimonialCardProps) {
  return (
    <div className="rounded-lg border border-black/10 bg-white p-6 shadow-lg transition-all hover:shadow-xl">
      <Quote className="mb-4 h-8 w-8 text-[#7DF9FF]" />
      <p className="mb-4 text-gray-700">{quote}</p>
      <div className="flex flex-col">
        <span className="font-bold">{author}</span>
        <span className="text-sm text-gray-500">{company}</span>
      </div>
    </div>
  )
}
