import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { dbService } from "@/lib/database"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PhoneCall } from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await dbService.getServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">{service.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-md">
              <Image
                src={service.imageUrl || "/placeholder.svg?height=600&width=800"}
                alt={service.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">{service.description}</p>
              <p className="text-md leading-relaxed">
                Hizmetimiz hakkında daha fazla bilgi almak veya randevu oluşturmak için bizimle iletişime
                geçebilirsiniz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="tel:+905545000061">
                  <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                    <PhoneCall className="h-5 w-5 mr-2" /> Hemen Ara
                  </Button>
                </Link>
                <Link href="/iletisim">
                  <Button
                    variant="outline"
                    className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-6 py-3 text-lg rounded-full shadow-md hover:shadow-lg transition-all duration-300 bg-transparent"
                  >
                    İletişim Formu
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppButton phoneNumber="+905545000061" />
    </div>
  )
}
