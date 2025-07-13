import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getServices, getProducts } from "@/lib/database"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { ArrowRight, CheckCircle } from "lucide-react"
import AutoScroll from "embla-carousel-autoplay"
import WhatsAppButton from "@/components/whatsapp-button"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const services = await getServices()
  const products = await getProducts()

  const heroImages = [
    { src: "/images/hero-elektrik-1.jpg", alt: "Elektrik Tesisatı" },
    { src: "/images/hero-avize-montaj.jpg", alt: "Avize Montajı" },
    { src: "/images/hero-elektrik-tesisat.jpg", alt: "Elektrik Tesisat Yenileme" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section with Carousel */}
        <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
          <Carousel
            className="w-full h-full"
            opts={{ loop: true }}
            plugins={[
              AutoScroll({
                delay: 4000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
          >
            <CarouselContent className="h-full">
              {heroImages.map((image, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="relative h-full w-full">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      layout="fill"
                      objectFit="cover"
                      className="brightness-[0.6]"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black/30">
                      <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 animate-fade-in-up">
                        Harun Elektrik
                      </h1>
                      <p className="text-2xl md:text-4xl text-white font-semibold drop-shadow-md mb-8 animate-fade-in-up animation-delay-200">
                        Kurumsal Çözüm Ortağınız
                      </p>
                      <Link href="/hizmetlerimiz">
                        <Button className="bg-red-600 hover:bg-red-700 text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 animate-fade-in-up animation-delay-400">
                          Hizmetlerimizi Keşfedin
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Harun Elektrik: Güvenilir ve Yenilikçi Çözümler
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                20 yılı aşkın süredir elektrik ve uydu sistemleri alanında güvenilir ve kaliteli hizmetler sunmaktayız.
                Müşteri memnuniyetini her zaman ön planda tutarak, sektördeki yenilikleri yakından takip ediyor ve en
                güncel teknolojileri projelerimize entegre ediyoruz. Uzman ekibimizle birlikte, ev ve iş yerleriniz için
                anahtar teslim çözümler sunuyoruz.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-red-600" />
                  <span>Deneyimli ve Uzman Kadro</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-red-600" />
                  <span>Geniş Hizmet Yelpazesi</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-red-600" />
                  <span>Müşteri Odaklı Yaklaşım</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-red-600" />
                  <span>Hızlı ve Güvenilir Çözümler</span>
                </li>
              </ul>
              <Link href="/hakkimizda">
                <Button className="bg-red-600 hover:bg-red-700 mt-6 px-6 py-3 text-lg">
                  Daha Fazla Bilgi <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/harun-elektrik-team.jpg"
                alt="Harun Elektrik Ekibi"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </section>

        {/* Featured Services Section */}
        <section id="services" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Öne Çıkan Hizmetlerimiz</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              Elektrik ve uydu sistemleri alanında sunduğumuz geniş hizmet yelpazemizle, ihtiyaçlarınıza özel çözümler
              üretiyoruz.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 6).map((service) => (
                <Card
                  key={service.id}
                  className="group flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-1">{service.description.substring(0, 100)}...</p>
                    <Link href={`/hizmetlerimiz/${service.slug}`} className="mt-auto">
                      <Button
                        variant="outline"
                        className="w-full text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                      >
                        Detayları Gör <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Link href="/hizmetlerimiz">
              <Button className="bg-red-600 hover:bg-red-700 mt-12 px-8 py-4 text-lg">
                Tüm Hizmetlerimizi Gör <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Featured Products Section */}
        <section id="products" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Öne Çıkan Ürünlerimiz</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              Kaliteli ve güvenilir elektrik ve uydu sistemleri ürünleriyle, projelerinize değer katıyoruz.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 6).map((product) => (
                <Card
                  key={product.id}
                  className="group flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-1">{product.description.substring(0, 100)}...</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-2xl font-bold text-red-600">{product.price.toFixed(2)} TL</span>
                      <Link href={`/urunler/${product.slug}`}>
                        <Button
                          variant="outline"
                          className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                        >
                          İncele <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Link href="/urunler">
              <Button className="bg-red-600 hover:bg-red-700 mt-12 px-8 py-4 text-lg">
                Tüm Ürünlerimizi Gör <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Acil Elektrik Arızası mı Var?</h2>
            <p className="text-lg md:text-xl mb-8">7/24 Hızlı ve Güvenilir Çözümler İçin Bize Ulaşın!</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="tel:+905545000061">
                <Button className="bg-white text-red-600 hover:bg-gray-100 px-10 py-4 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  Hemen Ara: +90 554 500 00 61
                </Button>
              </Link>
              <Link href="https://wa.me/905545000061">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-10 py-4 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
                >
                  WhatsApp Destek
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton phoneNumber="+905545000061" />
    </div>
  )
}
