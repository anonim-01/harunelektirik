import Image from "next/image"
import Link from "next/link"
import { dbService } from "@/lib/database"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react" // Corrected import for ArrowRight

export default async function HizmetlerimizPage() {
  const services = await dbService.getServices()

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <Image
          src="/images/services-hero.jpg"
          alt="Hizmetlerimiz Hero"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-50 px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Hizmetlerimiz</h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl">
            Harun Elektrik olarak sunduğumuz geniş hizmet yelpazesiyle her türlü elektrik ve elektronik ihtiyacınıza
            profesyonel çözümler sunuyoruz.
          </p>
        </div>
      </section>

      <main className="flex-1 py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full h-48">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-md"
                />
              </div>
              <CardHeader className="flex-grow">
                <CardTitle className="text-2xl font-bold">{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-muted-foreground mb-4 line-clamp-3">{service.description}</p>
                <Link href={`/hizmetlerimiz/${service.slug}`} passHref>
                  <Button variant="outline" className="w-full bg-transparent">
                    Detayları Gör
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
