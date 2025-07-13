import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">HARUN ELEKTRİK</h3>
          <p className="text-sm leading-relaxed">
            Elektrik ve uydu sistemleri alanında 20 yılı aşkın tecrübemizle, güvenilir ve kaliteli çözümler sunuyoruz.
            Müşteri memnuniyeti önceliğimizdir.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Hızlı Bağlantılar</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-red-500 transition-colors">
                Anasayfa
              </Link>
            </li>
            <li>
              <Link href="/hakkimizda" className="hover:text-red-500 transition-colors">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/hizmetlerimiz" className="hover:text-red-500 transition-colors">
                Hizmetlerimiz
              </Link>
            </li>
            <li>
              <Link href="/urunler" className="hover:text-red-500 transition-colors">
                Ürünlerimiz
              </Link>
            </li>
            <li>
              <Link href="/iletisim" className="hover:text-red-500 transition-colors">
                İletişim
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Hizmetlerimiz</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/hizmetlerimiz/elektrik-ariza-tamiri" className="hover:text-red-500 transition-colors">
                Elektrik Arıza Tamiri
              </Link>
            </li>
            <li>
              <Link href="/hizmetlerimiz/avize-montaji" className="hover:text-red-500 transition-colors">
                Avize Montajı
              </Link>
            </li>
            <li>
              <Link href="/hizmetlerimiz/merkezi-uydu-sistemleri" className="hover:text-red-500 transition-colors">
                Merkezi Uydu Sistemleri
              </Link>
            </li>
            <li>
              <Link href="/hizmetlerimiz/guvenlik-kamera-sistemleri" className="hover:text-red-500 transition-colors">
                Güvenlik Kamera Sistemleri
              </Link>
            </li>
            <li>
              <Link href="/hizmetlerimiz/network-internet-altyapisi" className="hover:text-red-500 transition-colors">
                Network & İnternet Altyapısı
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">İletişim</h3>
          <p className="text-sm mb-2">Adres: Örnek Mah. Örnek Cad. No: 123, İstanbul/Türkiye</p>
          <p className="text-sm mb-2">
            Telefon:{" "}
            <Link href="tel:+905545000061" className="hover:text-red-500 transition-colors">
              +90 554 500 00 61
            </Link>
          </p>
          <p className="text-sm mb-2">
            E-posta:{" "}
            <Link href="mailto:info@harunelektrik.com" className="hover:text-red-500 transition-colors">
              info@harunelektrik.com
            </Link>
          </p>
          <div className="flex space-x-4 mt-4">
            <Link href="#" aria-label="Facebook" className="hover:text-red-500 transition-colors">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="Twitter" className="hover:text-red-500 transition-colors">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="Instagram" className="hover:text-red-500 transition-colors">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="hover:text-red-500 transition-colors">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HARUN ELEKTRİK. Tüm Hakları Saklıdır.
      </div>
    </footer>
  )
}
