import { PrismaClient } from "@prisma/client"

/* -----------------------------------------------------------------------------
   PRISMA SINGLETON – geliştirmede bağlantı limitini aşmamak için
----------------------------------------------------------------------------- */
declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined
}

const prisma =
  global.prismaGlobal ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma
}

/* -----------------------------------------------------------------------------
   MOCK / PLACEHOLDER VERİLER – gerçek tablolar hazır olana kadar
----------------------------------------------------------------------------- */

export const getServices = async () => [
  {
    id: "1",
    name: "Elektrik Arıza",
    slug: "elektrik-ariza",
    image: "/images/hero-elektrik-1.jpg",
    description: "Acil elektrik arızaları için hızlı ve güvenilir çözümler sunuyoruz.",
    price: 250,
  },
  {
    id: "2",
    name: "Avize Montajı",
    slug: "avize-montaji",
    image: "/images/hero-avize-montaj.jpg",
    description: "Her türlü avize ve aydınlatma armatürünün güvenli montajı.",
    price: 100,
  },
  {
    id: "3",
    name: "Tesisat Yenileme",
    slug: "tesisat-yenileme",
    image: "/images/hero-elektrik-tesisat.jpg",
    description: "Güvenli ve standartlara uygun elektrik tesisatı kurulumu ve yenileme.",
    price: 500,
  },
]

export const getProducts = async () => [
  {
    id: "p1",
    name: "Kaliteli Elektrik Kabloları",
    slug: "kaliteli-elektrik-kablolari",
    image: "/images/kablo.jpg",
    description: "Güvenli ve uzun ömürlü elektrik tesisatları için yüksek kaliteli kablolar.",
    price: 25.0,
  },
  {
    id: "p2",
    name: "Akıllı Priz Sistemleri",
    slug: "akilli-priz-sistemleri",
    image: "/placeholder.svg?height=300&width=400",
    description: "Evinizi akıllandırın, enerji verimliliği sağlayın.",
    price: 120.0,
  },
]

export const getAboutUsContent = async () => ({
  title: "Harun Elektrik: Güvenilir ve Yenilikçi Çözümler",
  description:
    "20 yılı aşkın süredir elektrik ve uydu sistemleri alanında güvenilir ve kaliteli hizmetler sunmaktayız. Müşteri memnuniyetini her zaman ön planda tutarak, sektördeki yenilikleri yakından takip ediyor ve en güncel teknolojileri projelerimize entegre ediyoruz. Uzman ekibimizle birlikte, ev ve iş yerleriniz için anahtar teslim çözümler sunuyoruz.",
  image: "/images/harun-elektrik-team.jpg",
  features: [
    "Deneyimli ve Uzman Kadro",
    "Geniş Hizmet Yelpazesi",
    "Müşteri Odaklı Yaklaşım",
    "Hızlı ve Güvenilir Çözümler",
  ],
})

export const getStats = async () => ({
  customers: 1500,
  projects: 800,
  years: 20,
})

export const getServiceBySlug = async (slug: string) => {
  const services = await getServices()
  return services.find((s) => s.slug === slug)
}

export const getProductBySlug = async (slug: string) => {
  const products = await getProducts()
  return products.find((p) => p.slug === slug)
}

/* -----------------------------------------------------------------------------
   TOPLU EXPORT
----------------------------------------------------------------------------- */
export const dbService = {
  prisma,
  getServices,
  getServiceBySlug,
  getProducts,
  getProductBySlug,
  getAboutUsContent,
  getStats,
}

export default prisma
