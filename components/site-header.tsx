import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, PhoneCall } from "lucide-react"
import Image from "next/image"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/placeholder-logo.svg" alt="Harun Elektrik Logo" width={40} height={40} />
          <span className="text-xl font-bold text-gray-900">HARUN ELEKTRİK</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
            Anasayfa
          </Link>
          <Link href="/hakkimizda" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
            Hakkımızda
          </Link>
          <Link href="/hizmetlerimiz" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
            Hizmetlerimiz
          </Link>
          <Link href="/urunler" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
            Ürünlerimiz
          </Link>
          <Link href="/iletisim" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
            İletişim
          </Link>
          <Link href="tel:+905545000061">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full flex items-center gap-2">
              <PhoneCall className="h-4 w-4" />
              <span>Hemen Ara</span>
            </Button>
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 py-6">
              <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Anasayfa
              </Link>
              <Link href="/hakkimizda" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Hakkımızda
              </Link>
              <Link href="/hizmetlerimiz" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Hizmetlerimiz
              </Link>
              <Link href="/urunler" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Ürünlerimiz
              </Link>
              <Link href="/iletisim" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                İletişim
              </Link>
              <Link href="tel:+905545000061">
                <Button className="bg-red-600 hover:bg-red-700 text-white w-full flex items-center gap-2 mt-4">
                  <PhoneCall className="h-4 w-4" />
                  <span>Hemen Ara</span>
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
