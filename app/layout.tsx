import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/cart-context" // CartProvider'ı import edin

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HARUN ELEKTRİK - Profesyonel Elektrik Hizmetleri",
  description:
    "İstanbul genelinde 7/24 elektrik hizmetleri. Elektrik arıza, avize montajı, elektrik tesisatı ve daha fazlası.",
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
        <CartProvider>{children}</CartProvider> {/* CartProvider ile sarmalayın */}
      </body>
    </html>
  )
}
