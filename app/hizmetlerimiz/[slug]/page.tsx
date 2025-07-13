import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { dbService } from "@/lib/database"
import { PhoneCall, ArrowLeft, CheckCircle } from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"

export const dynamic = "force-dynamic"

interface ServiceDetailPageProps {
  params: {
    slug: string
  }
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = await dbService.getServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  const features = ["Profesyonel ekip", "Kaliteli malzeme", "Hızlı hizmet", "Uygun fiyat", "Garanti", "7/24 destek"]

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[400px] overflow-hidden">
          <Image
            src={service.imageUrl || "/placeholder.svg?height=400&width=800"}
            alt={service.name}
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-0"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center z-10">
            <div className="max-w-4xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{service.name}</h1>
              <p className="text-xl text-gray-200">Profesyonel ve Güvenilir Hizmet</p>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <Link href="/hizmetlerimiz" className="inline-flex items-center text-red-600 hover:text-red-700 mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Tüm Hizmetlere Dön
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="p-8 shadow-lg">
                    <CardContent className="p-0">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Hizmet Detayları</h2>
                      <div className="prose prose-lg text-gray-700 max-w-none">
                        <p>{service.description}</p>

                        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Hizmet Özellikleri</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {features.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Neden Bizi Seçmelisiniz?</h3>
                        <ul className="list-disc list-inside space-y-2">
                          <li>15+ yıllık sektör deneyimi</li>
                          <li>Sertifikalı ve uzman teknisyenler</li>
                          <li>En kaliteli malzemeler</li>
                          <li>Şeffaf ve uygun fiyatlandırma</li>
                          <li>İşçilik garantisi</li>
                          <li>Müşteri memnuniyeti odaklı hizmet</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="p-6 shadow-lg sticky top-8">
                    <CardContent className="p-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Hemen Teklif Alın</h3>
                      {service.price && (
                        <div className="mb-6">
                          <span className="text-3xl font-bold text-red-600">{service.price.toFixed(0)} TL</span>
                          <span className="text-gray-500 text-sm ml-2">başlangıç fiyatı</span>
                        </div>
                      )}

                      <div className="space-y-4">
                        <Link href="tel:+905545000061">
                          <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                            <PhoneCall className="h-4 w-4 mr-2" />
                            Hemen Ara: +90 554 500 00 61
                          </Button>
                        </Link>

                        <Link href="https://wa.me/905545000061">
                          <Button
                            variant="outline"
                            className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent"
                          >
                            WhatsApp ile İletişim
                          </Button>
                        </Link>
                      </div>

                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Hizmet Bilgileri</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Ücretsiz keşif</li>
                          <li>• Aynı gün hizmet</li>
                          <li>• İstanbul geneli</li>
                          <li>• 7/24 acil servis</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton phoneNumber="+905545000061" />
    </div>
  )
}
