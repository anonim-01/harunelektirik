"use client"

import Link from "next/link"
import { PhoneIcon as Whatsapp } from "lucide-react"

interface WhatsAppButtonProps {
  phoneNumber: string
}

export default function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\s/g, "")}`

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-50 flex items-center justify-center"
      aria-label="WhatsApp Destek"
    >
      <Whatsapp className="h-8 w-8" />
    </Link>
  )
}
