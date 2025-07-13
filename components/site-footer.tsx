import Link from "next/link"
import { PhoneCall, Mail, MapPin, MessageCircle } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-red-500">HARUN ELEKTRİK</h3>
            <p className="text-gray-300 text-sm">
              İstanbul genelinde güvenilir ve profesyonel elektrik hizmetleri sunuyoruz.
            </p>
            <div className="flex space-x-4">
              <Link href="https://wa.me/905545000061" className="text-green-500 hover:text-green-400">
                <MessageCircle className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Hızlı Linkler</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="text-gray-300 hover:text-white transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/hizmetlerimiz" className="text-gray-300 hover:text-white transition-colors">
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link href="/urunler" className="text-gray-300 hover:text-white transition-colors">
                  Ürünlerimiz
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Hizmetlerimiz</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/hizmetlerimiz" className="text-gray-300 hover:text-white transition-colors">
                  Elektrik Arıza Tamiri
                </Link>
              </li>
              <li>
                <Link href="/hizmetlerimiz" className="text-gray-300 hover:text-white transition-colors">
                  Avize Montajı
                </Link>
              </li>
              <li>
                <Link href="/hizmetlerimiz" className="text-gray-300 hover:text-white transition-colors">
                  Elektrik Tesisatı
                </Link>
              </li>
              <li>
                <Link href="/hizmetlerimiz" className="text-gray-300 hover:text-white transition-colors">
                  Güvenlik Kameraları
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">İletişim</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <PhoneCall className="h-5 w-5 text-red-500" />
                <span className="text-gray-300">+90 554 500 00 61</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-500" />
                <span className="text-gray-300">info@harunelektrik.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-500 mt-1" />
                <span className="text-gray-300 text-sm">
                  İstanbul Geneli
                  <br />3 Farklı Şubemizle Hizmetinizdeyiz
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2024 HARUN ELEKTRİK. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}
