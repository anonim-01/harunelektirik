import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HARUN ELEKTRİK - Profesyonel Elektrik Hizmetleri",
  description:
    "İstanbul genelinde 7/24 elektrik arıza tamiri, avize montajı, elektrik tesisatı ve teknik hizmetler. Güvenilir ve hızlı çözümler için HARUN ELEKTRİK.",
  keywords: "elektrik, elektrikçi, arıza tamiri, avize montajı, elektrik tesisatı, İstanbul, acil elektrik servisi",
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
        </CartProvider>
      </body>
    </html>
  )
}
