import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { dbService } from "@/lib/database"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { PhoneCall, ShoppingBag, Zap, Shield, Clock } from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const featuredServices = await dbService.getFeaturedServices()
  const featuredProducts = await dbService.getFeaturedProducts()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section with Slider */}
        <section className="relative w-full h-[500px] md:h-[650px] overflow-hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full h-full"
          >
            <CarouselContent className="h-full">
              <CarouselItem className="relative h-full">
                <Image
                  src="/images/hero-elektrik-1.jpg"
                  alt="Elektrik Arıza Tamiri"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  className="z-0"
                />
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-center z-10 p-4">
                  <div className="max-w-4xl space-y-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
                      7/24 Elektrik Arıza <span className="text-red-500">Tamiri</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 drop-shadow-md">
                      Acil elektrik arızalarınızda hızlı ve güvenilir çözümler sunuyoruz.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Link href="/hizmetlerimiz">
                        <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                          Hemen Ara
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="relative h-full">
                <Image
                  src="/images/hero-avize-montaj.jpg"
                  alt="Avize Montajı"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  className="z-0"
                />
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-center z-10 p-4">
                  <div className="max-w-4xl space-y-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
                      Profesyonel <span className="text-red-500">Avize Montajı</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 drop-shadow-md">
                      Her türlü avize ve aydınlatma armatürünün güvenli montajı.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Link href="/hizmetlerimiz">
                        <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                          Hizmetlerimizi Keşfedin
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="relative h-full">
                <Image
                  src="/images/hero-elektrik-tesisat.jpg"
                  alt="Elektrik Tesisatı"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  className="z-0"
                />
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-center z-10 p-4">
                  <div className="max-w-4xl space-y-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
                      Modern <span className="text-red-500">Elektrik Tesisatı</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 drop-shadow-md">
                      Güvenli ve standartlara uygun elektrik tesisatı kurulumu.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Link href="/hizmetlerimiz">
                        <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                          Teklif Al
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30 z-20" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/30 z-20" />
          </Carousel>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Neden HARUN ELEKTRİK?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="flex flex-col items-center text-center p-0">
                  <div className="bg-red-100 p-4 rounded-full mb-4">
                    <Clock className="h-12 w-12 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">7/24 Acil Destek</h3>
                  <p className="text-gray-600">Elektrik arızalarında günün her saati hızlı ve güvenilir çözümler.</p>
                </CardContent>
              </Card>
              <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="flex flex-col items-center text-center p-0">
                  <div className="bg-red-100 p-4 rounded-full mb-4">
                    <Shield className="h-12 w-12 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Uzman Kadro</h3>
                  <p className="text-gray-600">Alanında deneyimli ve sertifikalı elektrik teknisyenleri.</p>
                </CardContent>
              </Card>
              <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="flex flex-col items-center text-center p-0">
                  <div className="bg-red-100 p-4 rounded-full mb-4">
                    <Zap className="h-12 w-12 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Kaliteli Malzeme</h3>
                  <p className="text-gray-600">Dayanıklı ve güvenli elektrik malzemeleri ile uzun ömürlü çözümler.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Services Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Öne Çıkan Hizmetlerimiz</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service) => (
                <Card
                  key={service.id}
                  className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white hover:scale-105"
                >
                  <Link href={`/hizmetlerimiz/${service.slug}`}>
                    <div className="relative w-full h-48">
                      <Image
                        src={service.imageUrl || "/placeholder.svg?height=300&width=400"}
                        alt={service.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-lg font-semibold">{service.name}</h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">{service.description}</p>
                      {service.price && (
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-red-600">
                            {service.price.toFixed(0)} TL'den başlayan fiyatlarla
                          </span>
                        </div>
                      )}
                      <Button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white">Detayları Gör</Button>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/hizmetlerimiz">
                <Button
                  variant="outline"
                  className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 text-lg rounded-full transition-all duration-300 bg-transparent"
                >
                  Tüm Hizmetlerimizi Gör
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products Section (Carousel) */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Öne Çıkan Ürünlerimiz</h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-4">
                {featuredProducts.map((product) => (
                  <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white hover:scale-105">
                        <Link href={`/urunler/${product.slug}`}>
                          <div className="relative w-full h-48">
                            <Image
                              src={product.imageUrl || "/placeholder.svg?height=300&width=400"}
                              alt={product.name}
                              layout="fill"
                              objectFit="cover"
                              className="transition-transform duration-300"
                            />
                            <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                              Öne Çıkan
                            </div>
                          </div>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-red-600">{product.price.toFixed(2)} TL</span>
                              <Button className="bg-red-600 hover:bg-red-700 text-white">
                                <ShoppingBag className="h-4 w-4 mr-2" /> İncele
                              </Button>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200" />
              <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200" />
            </Carousel>
            <div className="text-center mt-12">
              <Link href="/urunler">
                <Button
                  variant="outline"
                  className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-3 text-lg rounded-full transition-all duration-300 bg-transparent"
                >
                  Tüm Ürünlerimizi Gör
                </Button>
              </Link>
            </div>
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
                  <PhoneCall className="h-6 w-6 mr-3" /> Hemen Ara: +90 554 500 00 61
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
