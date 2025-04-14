"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ServiceDetailPopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
}

export function ServiceDetailPopup({ isOpen, onClose, title, content }: ServiceDetailPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className="text-gray-600">{content}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 