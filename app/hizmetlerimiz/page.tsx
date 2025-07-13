import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { dbService } from "@/lib/database"
import { PhoneCall } from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"

export const dynamic = "force-dynamic"

export default async function ServicesPage() {
  const services = await dbService.getAllServices()

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[400px] overflow-hidden">
          <Image
            src="/images/services-hero.jpg"
            alt="Hizmetlerimiz"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-0"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center z-10">
            <div className="max-w-4xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Hizmetlerimiz</h1>
              <p className="text-xl text-gray-200">Elektrik ve Teknik Hizmetlerde Profesyonel Çözümler</p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tüm Hizmetlerimiz</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                HARUN ELEKTRİK olarak geniş hizmet yelpazemizle tüm elektrik ve teknik ihtiyaçlarınıza çözüm sunuyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
                  <div className="relative w-full h-48">
                    <Image
                      src={service.imageUrl || "/placeholder.svg?height=300&width=400"}
                      alt={service.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.description}</p>
                    {service.price && (
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-red-600">{service.price.toFixed(0)} TL</span>
                        <span className="text-gray-500 text-sm ml-1">başlangıç fiyatı</span>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Link href={`/hizmetlerimiz/${service.slug}`} className="flex-1">
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Detayları Gör</Button>
                      </Link>
                      <Link href="tel:+905545000061">
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-transparent"
                        >
                          <PhoneCall className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-red-600 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hizmetlerimiz Hakkında Bilgi Almak İster misiniz?</h2>
            <p className="text-lg md:text-xl mb-8">Uzman ekibimizden ücretsiz keşif ve teklif alın!</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="tel:+905545000061">
                <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                  <PhoneCall className="h-5 w-5 mr-2" />
                  Hemen Ara: +90 554 500 00 61
                </Button>
              </Link>
              <Link href="https://wa.me/905545000061">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 text-lg font-semibold bg-transparent"
                >
                  WhatsApp ile İletişim
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
