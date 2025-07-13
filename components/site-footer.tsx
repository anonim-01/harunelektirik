import Link from "next/link"
import { Zap, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, PhoneIcon as Whatsapp } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <Link href="/" className="flex items-center space-x-2 mb-4">
            <Zap className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-white">HARUN ELEKTRİK</span>
          </Link>
          <p className="text-sm">
            Profesyonel elektrik hizmetleri ve kaliteli elektrik malzemeleri ile İstanbul genelinde 7/24 yanınızdayız.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-red-600 transition-colors duration-200">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-red-600 transition-colors duration-200">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-red-600 transition-colors duration-200">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" aria-label="Youtube" className="hover:text-red-600 transition-colors duration-200">
              <Youtube className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Hızlı Linkler</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/hakkimizda" className="hover:text-red-600 transition-colors duration-200">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/hizmetlerimiz" className="hover:text-red-600 transition-colors duration-200">
                Hizmetlerimiz
              </Link>
            </li>
            <li>
              <Link href="/urunler" className="hover:text-red-600 transition-colors duration-200">
                Ürünler
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-red-600 transition-colors duration-200">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/iletisim" className="hover:text-red-600 transition-colors duration-200">
                İletişim
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Hizmetlerimiz</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/hizmetlerimiz/elektrik-ariza" className="hover:text-red-600 transition-colors duration-200">
                Elektrik Arıza
              </Link>
            </li>
            <li>
              <Link href="/hizmetlerimiz/avize-montaji" className="hover:text-red-600 transition-colors duration-200">
                Avize Montajı
              </Link>
            </li>
            <li>
              <Link
                href="/hizmetlerimiz/elektrik-tesisati"
                className="hover:text-red-600 transition-colors duration-200"
              >
                Elektrik Tesisatı
              </Link>
            </li>
            <li>
              <Link
                href="/hizmetlerimiz/topraklama-hatti"
                className="hover:text-red-600 transition-colors duration-200"
              >
                Topraklama Hattı
              </Link>
            </li>
            <li>
              <Link href="/hizmetlerimiz/elektrik-panosu" className="hover:text-red-600 transition-colors duration-200">
                Elektrik Panosu Kurulumu
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">İletişim</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-red-600" />
              <span>0554 500 00 61</span>
            </li>
            <li className="flex items-center">
              <Whatsapp className="h-5 w-5 mr-2 text-red-600" />
              <a
                href="https://wa.me/905545000061"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-600 transition-colors duration-200"
              >
                WhatsApp Destek
              </a>
            </li>
            <li className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-red-600" />
              <span>info@harunelektrik.com</span>
            </li>
            <li className="flex items-start">
              <MapPin className="h-5 w-5 mr-2 text-red-600 shrink-0 mt-1" />
              <span>3 Farklı Elektrik Şubemiz İle Tüm İstanbul Geneline Profesyonel Hizmet Veriyoruz</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HARUN ELEKTRİK. Tüm Hakları Saklıdır.
      </div>
    </footer>
  )
}
