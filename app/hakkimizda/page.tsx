import Image from "next/image"
import { getAboutUsContent, getStats } from "@/lib/database"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CheckCircle } from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button" // Declare the WhatsAppButton variable

export const dynamic = "force-dynamic"

export default async function AboutUsPage() {
  const aboutUsContent = await getAboutUsContent()
  const stats = await getStats()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden flex items-center justify-center text-center">
          <Image
            src="/images/about-us-hero.jpg" // Use a relevant hero image
            alt="Hakkımızda Hero"
            layout="fill"
            objectFit="cover"
            className="brightness-[0.6]"
            priority
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg animate-fade-in-up">
              Hakkımızda
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200 drop-shadow-md animate-fade-in-up animation-delay-200">
              HARUN ELEKTRİK - Güvenilir ve Profesyonel Elektrik Çözümleri
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{aboutUsContent.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{aboutUsContent.description}</p>
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl mt-8">
                <Image
                  src={aboutUsContent.image || "/placeholder.svg"}
                  alt="Harun Elektrik Ekibi"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 rounded-lg shadow-md bg-gray-100">
                <h3 className="text-5xl font-bold text-red-600">{stats.years}+</h3>
                <p className="mt-2 text-xl font-semibold text-gray-800">Yıllık Deneyim</p>
              </div>
              <div className="p-6 rounded-lg shadow-md bg-gray-100">
                <h3 className="text-5xl font-bold text-red-600">{stats.customers}+</h3>
                <p className="mt-2 text-xl font-semibold text-gray-800">Mutlu Müşteri</p>
              </div>
              <div className="p-6 rounded-lg shadow-md bg-gray-100">
                <h3 className="text-5xl font-bold text-red-600">{stats.projects}+</h3>
                <p className="mt-2 text-xl font-semibold text-gray-800">Tamamlanan Proje</p>
              </div>
            </div>

            <div className="mt-16 max-w-4xl mx-auto space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6">Değerlerimiz</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">Güvenilirlik</h4>
                    <p className="text-base">Müşterilerimize karşı her zaman dürüst ve şeffaf olmayı taahhüt ederiz.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">Kalite</h4>
                    <p className="text-base">
                      Hizmetlerimizde ve kullandığımız malzemelerde en yüksek kaliteyi hedefleriz.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">Müşteri Memnuniyeti</h4>
                    <p className="text-base">
                      Müşterilerimizin beklentilerini aşmak ve uzun süreli ilişkiler kurmak önceliğimizdir.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">Yenilikçilik</h4>
                    <p className="text-base">
                      Sektördeki teknolojik gelişmeleri yakından takip ederek modern çözümler sunarız.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton phoneNumber="+905545000061" />
    </div>
  )
}
