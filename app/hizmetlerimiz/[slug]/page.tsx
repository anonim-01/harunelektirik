import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { dbService } from "@/lib/database"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Star } from "lucide-react"
import Link from "next/link"

export async function generateStaticParams() {
  // If DATABASE_URL isn’t defined (e.g. during a first-time Vercel build),
  // skip DB access so the build doesn’t fail.
  if (!process.env.DATABASE_URL) {
    return []
  }

  try {
    const services = await dbService.getAllServices()
    return services.map((service) => ({ slug: service.slug }))
  } catch {
    // On any DB error return no params to avoid breaking the build
    return []
  }
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const service = await dbService.getServiceBySlug(slug)

  if (!service) {
    notFound() // Hizmet bulunamazsa 404 sayfası göster
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={service.imageUrl || "/placeholder.svg?height=500&width=500"}
              alt={service.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">{service.name}</h1>
            <div className="flex items-center space-x-2 text-yellow-500">
              <Star className="h-6 w-6 fill-current" />
              <Star className="h-6 w-6 fill-current" />
              <Star className="h-6 w-6 fill-current" />
              <Star className="h-6 w-6 fill-current" />
              <Star className="h-6 w-6" />
              <span className="text-lg text-gray-600 ml-2">(4.5 / 5 Puan)</span>
            </div>
            {service.price && (
              <p className="text-3xl font-bold text-red-600">Başlangıç Fiyatı: ₺{service.price.toFixed(2)}</p>
            )}
            <div
              className="prose prose-lg text-gray-700"
              dangerouslySetInnerHTML={{ __html: service.description || "" }}
            />

            <Button
              asChild
              className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 flex items-center space-x-2"
            >
              <Link href="/iletisim">
                <Phone className="h-5 w-5" />
                <span>Hizmet Almak İçin Bize Ulaşın</span>
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
