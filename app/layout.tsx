import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"
import { Toaster } from "@/components/ui/toaster"
import WhatsAppButton from "@/components/whatsapp-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HARUN ELEKTRİK - Profesyonel Elektrik Hizmetleri",
  description:
    "İstanbul genelinde 7/24 elektrik arıza, tesisat, avize montajı ve güvenlik kamera sistemleri hizmetleri.",
  keywords: "elektrikçi, elektrik arıza, avize montajı, elektrik tesisatı, güvenlik kamerası, İstanbul",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <CartProvider>
          {children}
          <Toaster />
          <WhatsAppButton phoneNumber="+905545000061" />
        </CartProvider>
      </body>
    </html>
  )
}
