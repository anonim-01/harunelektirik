import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">HARUN ELEKTRİK</h3>
            <p className="text-gray-300 mb-4">
              İstanbul genelinde güvenilir ve profesyonel elektrik hizmetleri sunuyoruz.
            </p>
            <div className="flex items-center text-gray-300 mb-2">
              <Clock className="h-4 w-4 mr-2" />
              <span>7/24 Acil Servis</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hızlı Linkler</h3>
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
          <div>
            <h3 className="text-xl font-bold mb-4">Hizmetlerimiz</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Elektrik Arıza Tamiri</li>
              <li>Avize Montajı</li>
              <li>Elektrik Tesisatı</li>
              <li>Çanak Anten Kurulumu</li>
              <li>Güvenlik Kamera Sistemleri</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">İletişim</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                <Link href="tel:+905545000061" className="hover:text-white transition-colors">
                  +90 554 500 00 61
                </Link>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <Link href="mailto:info@harunelektrik.com" className="hover:text-white transition-colors">
                  info@harunelektrik.com
                </Link>
              </div>
              <div className="flex items-start text-gray-300">
                <MapPin className="h-4 w-4 mr-2 mt-1" />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 HARUN ELEKTRİK. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}
