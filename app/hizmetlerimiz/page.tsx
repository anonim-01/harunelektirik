import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import prisma from "@/lib/database"

export const dynamic = "force-dynamic"

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
        <Image
          src="/images/services-hero.jpg"
          alt="Hizmetlerimiz"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">Hizmetlerimiz</h1>
        </div>
      </section>

      <main className="flex-1 py-12 md:py-20 px-4 md:px-6">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
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
                  <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
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
      </main>
    </div>
  )
}
