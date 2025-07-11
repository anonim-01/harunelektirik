import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { dbService } from "@/lib/database"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Star } from "lucide-react"

export default async function HomePage() {
  const featuredServices = await dbService.getFeaturedServices()
  const featuredProducts = await dbService.getFeaturedProducts()

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative w-full h-[500px] md:h-[600px] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        >
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-4">
            <div className="max-w-3xl space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                İstanbul'un Her Yerine <span className="text-red-500">7/24 Elektrik Hizmeti</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200">
                Profesyonel ekibimizle elektrik arıza, tesisat, montaj ve daha fazlası için güvenilir çözümler
                sunuyoruz.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 rounded-full">
                  <Link href="/hizmetlerimiz">
                    Hizmetlerimizi Keşfet <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-red-600 text-lg px-8 py-6 rounded-full bg-transparent"
                >
                  <Link href="/iletisim">Bize Ulaşın</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Öne Çıkan Hizmetlerimiz</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Uzman ekibimizle sunduğumuz en popüler ve güvenilir elektrik hizmetleri.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service) => (
                <Card
                  key={service.id}
                  className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={service.imageUrl || "/placeholder.svg?height=200&width=300"}
                      alt={service.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">{service.name}</CardTitle>
                    <CardDescription className="text-gray-600 line-clamp-2">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                      {service.price && (
                        <span className="text-2xl font-bold text-red-600">₺{service.price.toFixed(2)}</span>
                      )}
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5" />
                        <span className="ml-1 text-gray-600 text-sm">(4.5)</span>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
                      <Link href={`/hizmetlerimiz/${service.slug}`}>Detayları Gör</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button
              asChild
              variant="outline"
              className="mt-12 text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
            >
              <Link href="/hizmetlerimiz">
                Tüm Hizmetlerimizi Görüntüle <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Neden Bizi Tercih Etmelisiniz?</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Müşteri memnuniyetini ön planda tutan, güvenilir ve kaliteli hizmet anlayışımızla fark yaratıyoruz.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md">
                <CheckCircle className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Uzman Kadro</h3>
                <p className="text-gray-700">Alanında uzman, sertifikalı ve deneyimli elektrikçilerle çalışıyoruz.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md">
                <CheckCircle className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">7/24 Destek</h3>
                <p className="text-gray-700">Acil durumlar için haftanın 7 günü 24 saat hizmetinizdeyiz.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md">
                <CheckCircle className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Uygun Fiyatlar</h3>
                <p className="text-gray-700">Kaliteli hizmeti en uygun fiyatlarla sunmayı hedefliyoruz.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünlerimiz</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Elektrik tesisatınız ve aydınlatma ihtiyaçlarınız için en kaliteli ürünler.
            </p>
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-4">
                {featuredProducts.map((product) => (
                  <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="relative w-full h-48">
                        <Image
                          src={product.imageUrl || "/placeholder.svg?height=200&width=300"}
                          alt={product.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-t-lg"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold text-gray-900">{product.name}</CardTitle>
                        <CardDescription className="text-gray-600 line-clamp-2">{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold text-red-600">₺{product.price.toFixed(2)}</span>
                          <div className="flex items-center text-yellow-500">
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5" />
                            <span className="ml-1 text-gray-600 text-sm">(4.5)</span>
                          </div>
                        </div>
                        <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
                          <Link href={`/urunler/${product.slug}`}>Ürünü İncele</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <Button
              asChild
              variant="outline"
              className="mt-12 text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
            >
              <Link href="/urunler">
                Tüm Ürünlerimizi Görüntüle <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-red-600 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Acil Elektrikçi Mi Arıyorsunuz?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Hemen bize ulaşın, uzman ekibimiz en kısa sürede yanınızda olsun!
            </p>
            <Button
              asChild
              variant="outline"
              className="text-red-600 bg-white hover:bg-gray-100 text-lg px-8 py-6 rounded-full"
            >
              <Link href="/iletisim">Şimdi Ara: 0534 519 9055</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
