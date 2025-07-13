import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getServices } from "@/lib/database"
import { ArrowRight } from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"
import PhoneCall from "lucide-react" // Declare the PhoneCall variable

export const dynamic = "force-dynamic"

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden flex items-center justify-center text-center">
          <Image
            src="/images/services-hero.jpg" // Use a relevant hero image for services
            alt="Hizmetlerimiz Hero"
            layout="fill"
            objectFit="cover"
            className="brightness-[0.6]"
            priority
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg animate-fade-in-up">
              Hizmetlerimiz
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200 drop-shadow-md animate-fade-in-up animation-delay-200">
              Elektrik ve Teknik Hizmetlerde Profesyonel Çözümler
            </p>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Tüm Hizmetlerimiz</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
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
                    <p className="text-gray-600 text-sm mb-4 flex-1">{service.description}</p>
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
          </div>
        </section>

        {/* Call to Action Section - Kept for consistency */}
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
