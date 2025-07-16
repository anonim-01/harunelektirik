import Image from "next/image"
import { CheckCircle } from "lucide-react"
import prisma from "@/lib/database"

export const dynamic = "force-dynamic"

export default async function AboutUsPage() {
  const aboutUsContent = await prisma.pageContent.findUnique({
    where: { slug: "hakkimizda" },
  })

  const features = aboutUsContent?.features || [
    "Yılların Deneyimi",
    "Uzman Kadro",
    "Müşteri Memnuniyeti",
    "Geniş Hizmet Ağı",
    "Kaliteli Malzeme Kullanımı",
    "Hızlı ve Güvenilir Çözümler",
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
        <Image
          src={aboutUsContent?.image || "/images/about-us-hero.jpg"}
          alt={aboutUsContent?.title || "Hakkımızda"}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
            {aboutUsContent?.title || "Hakkımızda"}
          </h1>
        </div>
      </section>

      <main className="flex-1 py-12 md:py-20 px-4 md:px-6">
        <section className="container mx-auto max-w-4xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            {aboutUsContent?.description || "Harun Elektrik Hakkında"}
          </h2>
          <div className="prose prose-lg mx-auto text-gray-700 dark:text-gray-300">
            <p>
              {aboutUsContent?.content ||
                `Harun Elektrik olarak, yıllardır elektrik ve elektronik sektöründe güvenilir ve kaliteli hizmetler sunmaktayız. Müşteri memnuniyetini her zaman ön planda tutarak, uzman kadromuz ve geniş hizmet ağımızla sizlere en iyi çözümleri sunmayı hedefliyoruz. Evlerinizden iş yerlerinize, küçük onarımlardan büyük projelere kadar her türlü elektrik ihtiyacınızda yanınızdayız.`}
            </p>
            <p>
              {`Teknolojiyi yakından takip eden ve sürekli kendini geliştiren bir ekiple çalışıyoruz. Güvenlik, kalite ve zamanında teslimat prensiplerimizle sektörde fark yaratıyoruz. Harun Elektrik, sadece bir hizmet sağlayıcı değil, aynı zamanda güvenilir bir çözüm ortağıdır.`}
            </p>
          </div>
        </section>

        <section className="container mx-auto max-w-4xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Neden Bizi Seçmelisiniz?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary-500 flex-shrink-0" />
                <p className="text-lg text-gray-700 dark:text-gray-300">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Ekibimiz</h2>
          <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/harun-elektrik-team.jpg"
              alt="Harun Elektrik Ekibi"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <p className="text-2xl md:text-3xl font-semibold text-white text-center">
                Deneyimli ve Güler Yüzlü Ekibimizle Hizmetinizdeyiz
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
