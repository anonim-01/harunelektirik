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

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hizmetlerimiz</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/hizmetlerimiz" className="hover:text-white transition-colors">
                  Elektrik Arıza Tamiri
                </Link>
              </li>
              <li>
                <Link href="/hizmetlerimiz" className="hover:text-white transition-colors">
                  Avize Montajı
                </Link>
              </li>
              <li>
                <Link href="/hizmetlerimiz" className="hover:text-white transition-colors">
                  Elektrik Tesisatı
                </Link>
              </li>
              <li>
                <Link href="/hizmetlerimiz" className="hover:text-white transition-colors">
                  Güvenlik Kameraları
                </Link>
              </li>
              <li>
                <Link href="/hizmetlerimiz" className="hover:text-white transition-colors">
                  Çanak Anten Servisi
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="hover:text-white transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/hizmetlerimiz" className="hover:text-white transition-colors">
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link href="/urunler" className="hover:text-white transition-colors">
                  Ürünlerimiz
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-white transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-red-500" />
                <Link href="tel:+905545000061" className="hover:text-white transition-colors">
                  +90 554 500 00 61
                </Link>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-red-500" />
                <Link href="mailto:info@harunelektrik.com" className="hover:text-white transition-colors">
                  info@harunelektrik.com
                </Link>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-red-500" />
                <span>
                  İstanbul Geneli
                  <br />
                  Hizmet Veriyoruz
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 HARUN ELEKTRİK. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}
