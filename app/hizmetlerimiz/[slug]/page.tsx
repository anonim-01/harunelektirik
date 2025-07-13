import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getServiceBySlug, getServices } from "@/lib/database"
import { PhoneCall, ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import WhatsAppButton from "@/components/whatsapp-button"

export const dynamic = "force-dynamic"

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
          <Image
            src={service.image || "/placeholder.svg"}
            alt={service.name}
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-0 brightness-[0.6]"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center text-center p-4 bg-black/30">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">{service.name}</h1>
          </div>
        </section>

        {/* Service Content */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
              <p>{service.description}</p>
              {service.details && (
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Hizmet Detayları</h2>
                  <p>{service.details}</p>
                </div>
              )}
            </div>

            {service.price && (
              <div className="mt-12 text-center">
                <span className="text-3xl font-bold text-red-600">
                  {service.price.toFixed(0)} TL'den başlayan fiyatlarla
                </span>
              </div>
            )}

            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/hizmetlerimiz">
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Tüm Hizmetlere Geri Dön
                </Button>
              </Link>
              <Link href="tel:+905545000061">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <PhoneCall className="h-4 w-4 mr-2" /> Hemen Teklif Al
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
