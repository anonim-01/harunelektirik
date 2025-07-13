import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { dbService } from "@/lib/database"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import WhatsAppButton from "@/components/whatsapp-button"

export default async function ServicesPage() {
  const services = await dbService.getAllServices()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Hizmetlerimiz</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            >
              <Link href={`/hizmetlerimiz/${service.slug}`}>
                <div className="relative w-full h-48">
                  <Image
                    src={service.imageUrl || "/placeholder.svg?height=300&width=400"}
                    alt={service.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6 bg-white">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{service.description}</p>
                  <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white">Detayları Gör</Button>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </main>
      <SiteFooter />
      <WhatsAppButton phoneNumber="+905545000061" />
    </div>
  )
}
