import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HARUN ELEKTRİK - Güvenilir Elektrik Hizmetleri",
  description:
    "İstanbul genelinde 7/24 elektrik arıza tamiri, elektrik tesisatı, avize montajı ve teknik hizmetler. Profesyonel ekip, kaliteli malzeme, uygun fiyat.",
  keywords:
    "elektrik, elektrikçi, arıza tamiri, elektrik tesisatı, avize montajı, İstanbul elektrikçi, acil elektrik servisi",
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
