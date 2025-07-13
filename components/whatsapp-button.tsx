"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import Link from "next/link"

interface WhatsAppButtonProps {
  phoneNumber: string
}

export default function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noopener noreferrer">
        <Button
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center"
          size="icon"
          aria-label="WhatsApp Destek"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  )
}
