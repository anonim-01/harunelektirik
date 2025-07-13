"use client"

import { MessageCircle } from "lucide-react"
import Link from "next/link"

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
}

export default function WhatsAppButton({
  phoneNumber,
  message = "Merhaba! HARUN ELEKTRİK hakkında bilgi almak istiyorum.",
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
      aria-label="WhatsApp Destek"
    >
      <MessageCircle className="h-6 w-6" />
    </Link>
  )
}
