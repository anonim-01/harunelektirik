"use client" // Bu bileşenin client component olduğunu belirtin

import Link from "next/link"
import { Zap, Phone, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCart } from "@/context/cart-context" // useCart hook'unu import edin

export function SiteHeader() {
  const { getTotalItems } = useCart() // Sepet bilgilerini alın

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Zap className="h-8 w-8 text-red-600" />
          <span className="text-2xl font-bold text-gray-900">HARUN ELEKTRİK</span>
        </Link>

        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link href="/" className="hover:text-red-600">
            ANASAYFA
          </Link>
          <Link href="/hakkimizda" className="hover:text-red-600">
            HAKKIMIZDA
          </Link>
          <Link href="/hizmetlerimiz" className="hover:text-red-600">
            HİZMETLERİMİZ
          </Link>
          <Link href="/urunler" className="hover:text-red-600">
            ÜRÜNLER
          </Link>
          <Link href="/iletisim" className="hover:text-red-600">
            İLETİŞİM
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Input type="search" placeholder="Ürün veya hizmet ara..." className="hidden lg:block w-48" />
          <Button variant="ghost" size="icon" className="md:hidden">
            <Zap className="h-5 w-5" />
            <span className="sr-only">Ara</span>
          </Button>

          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {getTotalItems()}
                </span>
              )}
              <span className="sr-only">Sepet</span>
            </Button>
          </Link>

          <Button className="hidden md:flex bg-red-600 hover:bg-red-700">
            <Phone className="h-4 w-4 mr-2" />
            Hemen Ara
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Zap className="h-5 w-5" />
                <span className="sr-only">Menü</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/" className="w-full">
                  ANASAYFA
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/hakkimizda" className="w-full">
                  HAKKIMIZDA
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/hizmetlerimiz" className="w-full">
                  HİZMETLERİMİZ
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/urunler" className="w-full">
                  ÜRÜNLER
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/iletisim" className="w-full">
                  İLETİŞİM
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Hemen Ara
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
