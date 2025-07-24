"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Lightbulb, Wrench, ShieldCheck, Wifi, Tv, Cable } from "lucide-react"

export default function HomePage() {
  const services = [
    {
      name: "Elektrik Tesisat",
      description: "Ev ve iş yerleri için güvenli ve modern elektrik tesisat çözümleri.",
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      image: "/images/hero-elektrik-tesisat.jpg",
      link: "/hizmetlerimiz/elektrik-tesisat-kurulumu",
    },
    {
      name: "Uydu Sistemleri",
      description: "Merkezi ve bireysel uydu sistemleri kurulumu ve bakımı.",
      icon: <Tv className="h-8 w-8 text-primary" />,
      image: "/images/merkezi-uydu.jpg",
      link: "/hizmetlerimiz/uydu-anten-montaji",
    },
    {
      name: "Güvenlik Kamera",
      description: "Ev ve iş yerleri için gelişmiş güvenlik kamera sistemleri.",
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      image: "/images/guvenlik-kamera.jpg",
      link: "/hizmetlerimiz/kamera-sistemleri-kurulumu",
    },
    {
      name: "Aydınlatma Çözümleri",
      description: "İç ve dış mekanlar için estetik ve enerji verimli aydınlatma.",
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      image: "/images/aydinlatma.jpg",
      link: "/hizmetlerimiz",
    },
    {
      name: "Network ve İnternet",
      description: "Kesintisiz internet ve ağ altyapısı kurulumu.",
      icon: <Wifi className="h-8 w-8 text-primary" />,
      image: "/images/network-internet.jpg",
      link: "/hizmetlerimiz",
    },
    {
      name: "Kablo ve Altyapı",
      description: "Yapısal kablolama ve altyapı çözümleri.",
      icon: <Cable className="h-8 w-8 text-primary" />,
      image: "/images/kablo.jpg",
      link: "/hizmetlerimiz",
    },
  ]

  const heroSlides = [
    {
      image: "/images/hero-elektrik-1.jpg",
      alt: "Elektrik Tesisatı",
      text: "Harun Elektrik Kurumsal Çözüm Ortağınız",
    },
    {
      image: "/images/hero-avize-montaj.jpg",
      alt: "Avize Montajı",
      text: "Harun Elektrik Kurumsal Çözüm Ortağınız",
    },
    {
      image: "/images/hero-elektrik-tesisat.jpg",
      alt: "Elektrik Tesisat",
      text: "Harun Elektrik Kurumsal Çözüm Ortağınız",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
        <Carousel
          className="w-full h-full"
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent className="h-full">
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.alt}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 z-0"
                    priority={index === 0} // Prioritize loading the first image
                  />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-50 px-4">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-lg">{slide.text}</h1>
                    <p className="text-lg md:text-xl lg:text-2xl max-w-3xl drop-shadow-md">
                      Güvenilir ve profesyonel elektrik çözümleri için doğru adres.
                    </p>
                    <Link href="/hizmetlerimiz" passHref>
                      <Button className="mt-8 px-8 py-3 text-lg">Hizmetlerimizi Keşfedin</Button>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20" />
        </Carousel>
      </section>

      <main className="flex-1 py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <section className="container mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Hizmetlerimiz</h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Harun Elektrik olarak geniş bir yelpazede profesyonel elektrik ve elektronik hizmetleri sunuyoruz.
            İhtiyaçlarınıza özel çözümler için bize ulaşın.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader>
                  {service.icon}
                  <CardTitle className="mt-4 text-xl font-semibold">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Link href={service.link} passHref>
                    <Button variant="outline">Detayları Gör</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Neden Harun Elektrik?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Yılların deneyimi, uzman kadromuz ve müşteri odaklı hizmet anlayışımızla elektrik ve elektronik alanında
            güvenilir çözüm ortağınızız.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 shadow-md">
              <CardHeader>
                <Lightbulb className="h-10 w-10 text-primary mx-auto" />
                <CardTitle className="mt-4 text-xl font-semibold">Uzmanlık</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Alanında uzmanlaşmış, deneyimli teknisyenler.</p>
              </CardContent>
            </Card>
            <Card className="p-6 shadow-md">
              <CardHeader>
                <Wrench className="h-10 w-10 text-primary mx-auto" />
                <CardTitle className="mt-4 text-xl font-semibold">Kalite</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">En kaliteli malzeme ve işçilik garantisi.</p>
              </CardContent>
            </Card>
            <Card className="p-6 shadow-md">
              <CardHeader>
                <ShieldCheck className="h-10 w-10 text-primary mx-auto" />
                <CardTitle className="mt-4 text-xl font-semibold">Güven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Müşteri memnuniyeti odaklı, güvenilir hizmet.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bize Ulaşın</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Elektrik ve elektronik ihtiyaçlarınız için bize ulaşmaktan çekinmeyin. Profesyonel ekibimiz size yardımcı
            olmaktan mutluluk duyacaktır.
          </p>
          <Link href="/iletisim" passHref>
            <Button size="lg">İletişim Sayfasına Git</Button>
          </Link>
        </section>
      </main>
    </div>
  )
}
