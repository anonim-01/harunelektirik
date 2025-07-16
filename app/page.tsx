import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import prisma from "@/lib/database"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const featuredServices = await prisma.service.findMany({
    where: { featured: true },
    take: 3,
    orderBy: { createdAt: "desc" },
  })

  const featuredProducts = await prisma.product.findMany({
    where: { featured: true },
    take: 3,
    orderBy: { createdAt: "desc" },
  })

  const carouselImages = [
    { src: "/images/hero-elektrik-1.jpg", alt: "Elektrik Tesisatı" },
    { src: "/images/hero-avize-montaj.jpg", alt: "Avize Montajı" },
    { src: "/images/hero-elektrik-tesisat.jpg", alt: "Elektrik Tesisat Bakımı" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
        <Carousel
          className="w-full h-full"
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent className="h-full">
            {carouselImages.map((image, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 z-0"
                  />
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4 z-10">
                    <h1 className="text-4xl md:text-7xl font-extrabold text-white drop-shadow-lg leading-tight">
                      Harun Elektirik
                    </h1>
                    <p className="mt-4 text-2xl md:text-4xl font-semibold text-white drop-shadow-md">
                      Kurumsal Çözüm Ortağınız
                    </p>
                    <Link href="/hizmetlerimiz" passHref>
                      <Button className="mt-8 px-8 py-3 text-lg md:text-xl font-semibold bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg transition-transform transform hover:scale-105">
                        Hizmetlerimizi Keşfedin
                      </Button>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/30 hover:bg-black/50 rounded-full p-2" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/30 hover:bg-black/50 rounded-full p-2" />
        </Carousel>
      </section>

      <main className="flex-1">
        <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900 px-4 md:px-6">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">Hizmetlerimiz</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              Geniş yelpazedeki elektrik ve elektronik hizmetlerimizle her zaman yanınızdayız.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredServices.map((service) => (
                <Card
                  key={service.id}
                  className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col justify-between h-[calc(100%-12rem)]">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">{service.description}</p>
                    </div>
                    <div className="mt-4">
                      <Link href={`/hizmetlerimiz/${service.slug}`} passHref>
                        <Button variant="outline" className="w-full bg-transparent">
                          Detayları Gör
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Link href="/hizmetlerimiz" passHref>
              <Button className="mt-12 px-8 py-3 text-lg font-semibold">Tüm Hizmetlerimizi Gör</Button>
            </Link>
          </div>
        </section>

        <section className="py-12 md:py-20 px-4 md:px-6">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              En çok tercih edilen ve kaliteli ürünlerimizi keşfedin.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col justify-between h-[calc(100%-12rem)]">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">{product.description}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary-600">{product.price.toFixed(2)} TL</span>
                      <Link href={`/urunler/${product.slug}`} passHref>
                        <Button variant="outline">
                          Detayları Gör
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Link href="/urunler" passHref>
              <Button className="mt-12 px-8 py-3 text-lg font-semibold">Tüm Ürünlerimizi Gör</Button>
            </Link>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900 px-4 md:px-6">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image src="/images/harun-elektrik-team.jpg" alt="Hakkımızda" layout="fill" objectFit="cover" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">Hakkımızda</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Harun Elektrik olarak, yıllardır elektrik ve elektronik sektöründe güvenilir ve kaliteli hizmetler
                sunmaktayız. Müşteri memnuniyetini her zaman ön planda tutarak, uzman kadromuz ve geniş hizmet ağımızla
                sizlere en iyi çözümleri sunmayı hedefliyoruz.
              </p>
              <ul className="space-y-3 text-left inline-block md:block">
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" /> Yılların Deneyimi
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" /> Uzman Kadro
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" /> Müşteri Memnuniyeti
                </li>
              </ul>
              <Link href="/hakkimizda" passHref>
                <Button className="mt-8 px-8 py-3 text-lg font-semibold">Daha Fazla Bilgi Edinin</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
