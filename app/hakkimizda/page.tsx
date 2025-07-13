import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { dbService } from "@/lib/database"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Award, Clock } from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"

export const dynamic = "force-dynamic"

export default async function AboutPage() {
  const pageContent = await dbService.getPageContent("hakkimizda")

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[400px] overflow-hidden">
          <Image
            src="/images/about-us-hero.jpg"
            alt="Hakkımızda"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-0"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center z-10">
            <div className="max-w-4xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Hakkımızda</h1>
              <p className="text-xl text-gray-200">HARUN ELEKTRİK - Güvenilir ve Profesyonel Elektrik Çözümleri</p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">HARUN ELEKTRİK Kimdir?</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {pageContent?.content ||
                    `
                    HARUN ELEKTRİK olarak, İstanbul genelinde 15 yılı aşkın deneyimimizle 
                    elektrik sektöründe güvenilir ve kaliteli hizmet sunmaktayız. 
                    Müşteri memnuniyetini ön planda tutarak, 7/24 acil servis hizmeti 
                    vermekteyiz.
                  `}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Misyonumuz</h3>
                  <p className="text-gray-600 mb-6">
                    Elektrik sektöründe güvenilir, kaliteli ve hızlı çözümler sunarak müşterilerimizin hayatını
                    kolaylaştırmak ve güvenli yaşam alanları oluşturmalarına katkıda bulunmak.
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Vizyonumuz</h3>
                  <p className="text-gray-600">
                    İstanbul'un en güvenilir elektrik hizmet sağlayıcısı olmak ve sektörde öncü konumumuzu sürdürerek
                    müşteri memnuniyetinde standartları yükseltmek.
                  </p>
                </div>
                <div className="relative">
                  <Image
                    src="/images/harun-elektrik-team.jpg"
                    alt="HARUN ELEKTRİK Ekibi"
                    width={500}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Neden Bizi Tercih Etmelisiniz?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">15+ Yıl Deneyim</h3>
                  <p className="text-gray-600">Elektrik sektöründe 15 yılı aşkın deneyimimizle güvenilir hizmet</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">7/24 Hizmet</h3>
                  <p className="text-gray-600">Acil durumlar için günün her saati ulaşılabilir hızlı müdahale</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Uzman Ekip</h3>
                  <p className="text-gray-600">Sertifikalı ve deneyimli elektrik teknisyenleri ile kaliteli hizmet</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Kalite Garantisi</h3>
                  <p className="text-gray-600">Kullandığımız malzemeler ve işçilik için kalite garantisi</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Hizmet Alanlarımız</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Elektrik Hizmetleri</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Elektrik arıza tamiri</li>
                    <li>• Elektrik tesisatı kurulumu</li>
                    <li>• Avize ve aydınlatma montajı</li>
                    <li>• Priz ve anahtar değişimi</li>
                    <li>• Elektrik panosu revizyonu</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Teknik Hizmetler</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Çanak anten kurulumu</li>
                    <li>• Merkezi uydu sistemleri</li>
                    <li>• Güvenlik kamera sistemleri</li>
                    <li>• Network ve internet altyapısı</li>
                    <li>• Televizyon tamiri</li>
                  </ul>
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
