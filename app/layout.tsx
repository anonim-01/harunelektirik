import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/context/cart-context"
import WhatsAppButton from "@/components/whatsapp-button" // WhatsAppButton'ı import et

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HARUN ELEKTRİK - Profesyonel Elektrik Hizmetleri ve Malzemeleri",
  description:
    "İstanbul genelinde 7/24 elektrik arıza, tesisat kurulumu, avize montajı, topraklama hattı çekimi, elektrik panosu kurulumu ve güvenlik kamera sistemleri hizmetleri. Kaliteli elektrik malzemeleri.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            {children}
            <Toaster />
            {/* WhatsAppButton'ı burada render ediyoruz, böylece tüm sayfalarda görünür */}
            <WhatsAppButton phoneNumber="+905545000061" />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
