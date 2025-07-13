"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, Zap } from "lucide-react"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Hizmetlerimiz", href: "/hizmetlerimiz" },
    { name: "Ürünlerimiz", href: "/urunler" },
    { name: "İletişim", href: "/iletisim" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-red-600 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-gray-900">HARUN</span>
              <span className="text-sm text-red-600 font-semibold -mt-1">ELEKTRİK</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Call Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="tel:+905545000061">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Phone className="h-4 w-4 mr-2" />
                Hemen Ara
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menüyü aç</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-gray-700 hover:text-red-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  <Link href="tel:+905545000061" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                      <Phone className="h-4 w-4 mr-2" />
                      +90 554 500 00 61
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
