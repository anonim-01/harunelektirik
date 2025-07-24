import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function AboutUsPage() {
  const features = [
    {
      title: "Uzman Kadro",
      description: "Alanında deneyimli ve sertifikalı elektrik teknisyenleri.",
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
    },
    {
      title: "Hızlı ve Güvenilir Hizmet",
      description: "Acil durumlarda anında müdahale, planlı işlerde zamanında teslimat.",
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
    },
    {
      title: "Müşteri Memnuniyeti",
      description: "Her zaman müşteri odaklı yaklaşım ve çözüm garantisi.",
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
    },
    {
      title: "Geniş Hizmet Yelpazesi",
      description: "Elektrik tesisatından güvenlik sistemlerine kadar geniş hizmet ağı.",
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
    },
    {
      title: "Uygun Fiyat Garantisi",
      description: "Kaliteli hizmeti en uygun fiyatlarla sunma taahhüdü.",
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
    },
    {
      title: "Teknolojik Çözümler",
      description: "En yeni teknolojileri kullanarak modern ve verimli çözümler.",
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <Image
          src="/images/about-us-hero.jpg"
          alt="Hakkımızda Hero"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-50 px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Hakkımızda</h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl">
            Harun Elektrik olarak 20 yılı aşkın süredir elektrik ve elektronik sektöründe güvenilir çözümler sunuyoruz.
          </p>
        </div>
      </section>

      <main className="flex-1 py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <section className="container mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Biz Kimiz?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-4">
                Harun Elektrik, 2000 yılından bu yana elektrik ve elektronik sektöründe faaliyet gösteren köklü bir
                firmadır. Müşteri memnuniyetini her zaman ön planda tutarak, kaliteli ve güvenilir hizmet anlayışıyla
                sektörde lider konumda yer almayı hedefliyoruz.
              </p>
              <p className="text-lg text-muted-foreground">
                Uzman kadromuz, modern ekipmanlarımız ve yenilikçi çözümlerimizle, evlerden iş yerlerine, küçük
                projelerden büyük sanayi tesislerine kadar geniş bir yelpazede hizmet sunmaktayız. Amacımız, elektrik ve
                elektronik alanındaki tüm ihtiyaçlarınıza tek elden, hızlı ve ekonomik çözümler üretmektir.
              </p>
            </div>
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image src="/images/harun-elektrik-team.jpg" alt="Harun Elektrik Ekibi" layout="fill" objectFit="cover" />
            </div>
          </div>
        </section>

        <section className="container mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Neden Bizi Seçmelisiniz?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="flex flex-col items-center text-center p-6 shadow-md">
                <CardHeader>
                  {feature.icon}
                  <CardTitle className="mt-4 text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
