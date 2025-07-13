import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { dbService } from "@/lib/database"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PhoneCall, Clock, CheckCircle, ArrowLeft } from "lucide-react"

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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
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
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center z-10 p-4">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                {service.name}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 drop-shadow-md">Profesyonel ve güvenilir hizmet</p>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <Link href="/hizmetlerimiz">
                <Button variant="outline" className="mb-6 bg-transparent">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Hizmetlere Geri Dön
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Card className="p-8 shadow-lg border border-gray-200 bg-white">
                  <CardContent className="p-0">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Hizmet Detayları</h2>
                    <div className="prose prose-lg text-gray-700 space-y-4">
                      <p>{service.description}</p>

                      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Hizmet Özellikleri</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          Profesyonel ve deneyimli ekip
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          Kaliteli malzeme kullanımı
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          Güvenlik standartlarına uygunluk
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          Hızlı ve etkili çözümler
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          İş sonrası temizlik
                        </li>
                      </ul>

                      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Çalışma Süreci</h3>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>İlk görüşme ve ihtiyaç analizi</li>
                        <li>Keşif ve teknik değerlendirme</li>
                        <li>Fiyat teklifi sunumu</li>
                        <li>Randevu planlaması</li>
                        <li>Profesyonel uygulama</li>
                        <li>Test ve kontrol</li>
                        <li>Teslim ve garanti belgesi</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Price Card */}
                {service.price && (
                  <Card className="p-6 shadow-lg border border-gray-200 bg-white">
                    <CardContent className="p-0 text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Fiyat Bilgisi</h3>
                      <div className="text-3xl font-bold text-red-600 mb-4">
                        {service.price.toFixed(0)} TL'den başlayan fiyatlarla
                      </div>
                      <p className="text-sm text-gray-600 mb-6">
                        * Fiyatlar işin kapsamına göre değişiklik gösterebilir
                      </p>
                      <Link href="tel:+905545000061">
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white mb-3">
                          <PhoneCall className="h-4 w-4 mr-2" /> Hemen Ara
                        </Button>
                      </Link>
                      <Link href="https://wa.me/905545000061">
                        <Button
                          variant="outline"
                          className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                        >
                          WhatsApp Destek
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}

                {/* Contact Card */}
                <Card className="p-6 shadow-lg border border-gray-200 bg-white">
                  <CardContent className="p-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">İletişim</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <PhoneCall className="h-5 w-5 text-red-600 mr-3" />
                        <span className="text-gray-700">+90 554 500 00 61</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-red-600 mr-3" />
                        <span className="text-gray-700">7/24 Hizmet</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Features Card */}
                <Card className="p-6 shadow-lg border border-gray-200 bg-white">
                  <CardContent className="p-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Avantajlarımız</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Ücretsiz keşif
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Garanti belgesi
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Hızlı randevu
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Temiz çalışma
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bu Hizmeti Almak İstiyorsunuz?</h2>
            <p className="text-lg md:text-xl mb-8">Hemen bize ulaşın, ücretsiz keşif yapalım!</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="tel:+905545000061">
                <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <PhoneCall className="h-5 w-5 mr-2" /> Hemen Ara: +90 554 500 00 61
                </Button>
              </Link>
              <Link href="https://wa.me/905545000061">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
                >
                  WhatsApp Destek
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
