import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { dbService } from "@/lib/database"
import Image from "next/image"
import Link from "next/link"
import { PhoneCall, Wrench, Zap, Camera, Tv, Wifi } from "lucide-react"

export default async function ServicesPage() {
  const services = await dbService.getAllServices()
  const serviceCategories = await dbService.getServiceCategories()

  const categoryIcons = {
    "canak-anten-servisi": Tv,
    "merkezi-uydu-sistemi": Zap,
    "guvenlik-kamera-sistemi": Camera,
    "televizyon-tamiri": Tv,
    "network-internet-servisi": Wifi,
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[400px] overflow-hidden">
          <Image
            src="/images/services-hero.jpg"
            alt="HARUN ELEKTRİK Hizmetleri"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-0"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center z-10 p-4">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                Profesyonel Elektrik Hizmetleri
              </h1>
              <p className="text-lg md:text-xl text-gray-200 drop-shadow-md">
                İstanbul genelinde güvenilir ve kaliteli çözümler
              </p>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Hizmet Kategorilerimiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceCategories.map((category) => {
                const IconComponent = categoryIcons[category.slug as keyof typeof categoryIcons] || Wrench
                return (
                  <Card
                    key={category.id}
                    className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white hover:scale-105"
                  >
                    <div className="relative w-full h-48">
                      <Image
                        src={category.imageUrl || "/placeholder.svg?height=300&width=400"}
                        alt={category.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <IconComponent className="h-8 w-8 mb-2" />
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                      <div className="space-y-2">
                        {category.services.slice(0, 3).map((service) => (
                          <Link
                            key={service.id}
                            href={`/hizmetlerimiz/${service.slug}`}
                            className="block text-sm text-gray-700 hover:text-red-600 transition-colors duration-200"
                          >
                            • {service.name}
                          </Link>
                        ))}
                        {category.services.length > 3 && (
                          <p className="text-sm text-gray-500">+{category.services.length - 3} daha fazla hizmet</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* All Services */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Tüm Hizmetlerimiz</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service) => (
                <Card
                  key={service.id}
                  className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white hover:scale-105"
                >
                  <Link href={`/hizmetlerimiz/${service.slug}`}>
                    <div className="relative w-full h-40">
                      <Image
                        src={service.imageUrl || "/placeholder.svg?height=200&width=300"}
                        alt={service.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{service.name}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">{service.description}</p>
                      {service.price && (
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-bold text-red-600">{service.price.toFixed(0)} TL'den</span>
                        </div>
                      )}
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm">Detayları Gör</Button>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Elektrik Sorununuz mu Var?</h2>
            <p className="text-lg md:text-xl mb-8">Uzman ekibimizle hemen çözüm bulalım!</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="tel:+905545000061">
                <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <PhoneCall className="h-5 w-5 mr-2" /> Hemen Ara: +90 554 500 00 61
                </Button>
              </Link>
              <Link href="https://wa.me/905545000061">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
                >
                  WhatsApp Destek
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
