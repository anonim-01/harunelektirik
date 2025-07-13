import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { dbService } from "@/lib/database"
import Image from "next/image"
import Link from "next/link"
import { PhoneCall, Mail, MapPin, Clock, Users, Award } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AboutPage() {
  const pageContent = await dbService.getPageContent("about-us")

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[400px] overflow-hidden">
          <Image
            src="/images/about-us-hero.jpg"
            alt="HARUN ELEKTRİK Hakkımızda"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-0"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center z-10 p-4">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                HARUN ELEKTRİK Hakkında
              </h1>
              <p className="text-lg md:text-xl text-gray-200 drop-shadow-md">
                Güvenilir ve profesyonel elektrik hizmetleri
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Card className="p-8 shadow-lg border border-gray-200 bg-white">
                  <CardContent className="p-0">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Kimiz?</h2>
                    <div className="prose prose-lg text-gray-700 space-y-4">
                      <p>
                        <strong>HARUN ELEKTRİK</strong> olarak, İstanbul genelinde elektrik arızaları, tesisat kurulumu,
                        avize montajı, topraklama hattı çekimi, elektrik panosu kurulumu ve güvenlik kamera sistemleri
                        gibi geniş bir yelpazede profesyonel hizmetler sunmaktayız.
                      </p>
                      <p>
                        Yılların verdiği tecrübe ve uzman ekibimizle, güvenli ve kaliteli çözümler üretmekteyiz. Müşteri
                        memnuniyetini her zaman ön planda tutarak, 7/24 kesintisiz hizmet anlayışıyla acil
                        durumlarınızda dahi yanınızdayız.
                      </p>
                      <p>
                        En son teknoloji ekipmanlarımız ve güncel bilgilerimizle, elektrikle ilgili tüm ihtiyaçlarınıza
                        hızlı ve etkili çözümler sunuyoruz.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="relative">
                <Image
                  src="/images/harun-elektrik-team.jpg"
                  alt="HARUN ELEKTRİK Ekibi"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Neden Bizi Tercih Etmelisiniz?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="flex flex-col items-center text-center p-0">
                  <div className="bg-red-100 p-4 rounded-full mb-4">
                    <Clock className="h-12 w-12 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">7/24 Hizmet</h3>
                  <p className="text-gray-600">Acil durumlarınızda günün her saati ulaşabilirsiniz.</p>
                </CardContent>
              </Card>
              <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="flex flex-col items-center text-center p-0">
                  <div className="bg-red-100 p-4 rounded-full mb-4">
                    <Users className="h-12 w-12 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Uzman Ekip</h3>
                  <p className="text-gray-600">Deneyimli ve sertifikalı elektrikçilerden oluşan ekibimiz.</p>
                </CardContent>
              </Card>
              <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="flex flex-col items-center text-center p-0">
                  <div className="bg-red-100 p-4 rounded-full mb-4">
                    <Award className="h-12 w-12 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Kalite Garantisi</h3>
                  <p className="text-gray-600">Tüm işlerimizde kalite ve güvenlik standartları.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">İletişim Bilgilerimiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 shadow-lg border border-gray-200 bg-white text-center">
                <CardContent className="p-0">
                  <div className="bg-red-100 p-4 rounded-full w-fit mx-auto mb-4">
                    <PhoneCall className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Telefon</h3>
                  <p className="text-gray-600">+90 554 500 00 61</p>
                  <Link href="tel:+905545000061">
                    <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white">Hemen Ara</Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="p-6 shadow-lg border border-gray-200 bg-white text-center">
                <CardContent className="p-0">
                  <div className="bg-red-100 p-4 rounded-full w-fit mx-auto mb-4">
                    <Mail className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">E-posta</h3>
                  <p className="text-gray-600">info@harunelektrik.com</p>
                  <Link href="mailto:info@harunelektrik.com">
                    <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white">E-posta Gönder</Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="p-6 shadow-lg border border-gray-200 bg-white text-center">
                <CardContent className="p-0">
                  <div className="bg-red-100 p-4 rounded-full w-fit mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Hizmet Alanı</h3>
                  <p className="text-gray-600">İstanbul Geneli</p>
                  <p className="text-sm text-gray-500 mt-2">3 Farklı Şubemizle Hizmetinizdeyiz</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Elektrik İhtiyaçlarınız İçin Bize Ulaşın</h2>
            <p className="text-lg md:text-xl mb-8">Profesyonel ekibimizle güvenli ve kaliteli çözümler sunuyoruz.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="tel:+905545000061">
                <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <PhoneCall className="h-5 w-5 mr-2" /> Hemen Ara
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
