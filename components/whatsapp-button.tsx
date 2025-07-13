"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
}

export default function WhatsAppButton({
  phoneNumber,
  message = "Merhaba, elektrik hizmetleriniz hakkında bilgi almak istiyorum.",
}: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
      size="lg"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">WhatsApp ile iletişime geç</span>
    </Button>
  )
}
