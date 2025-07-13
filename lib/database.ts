import { PrismaClient } from "@prisma/client"

/* -----------------------------------------------------------------------------
   PRISMA SINGLETON  – prevents exhausting DB connections in development
 ----------------------------------------------------------------------------- */
let prisma: PrismaClient

declare global {
  var prisma: PrismaClient | undefined
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

/* -----------------------------------------------------------------------------
   DOMAIN HELPERS
 ----------------------------------------------------------------------------- */

export async function getSettings() {
  try {
    const settings = await prisma.setting.findMany()
    return settings.reduce(
      (acc, { key, value }) => {
        acc[key] = value
        return acc
      },
      {} as Record<string, string>,
    )
  } catch (err) {
    console.error("[db] getSettings", err)
    return {}
  }
}

/* ------------  SERVICES  ------------ */

export const getServices = async () => {
  // Replace with actual Prisma call if a service table exists
  return [
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
    {
      id: "4",
      name: "Merkezi Uydu Sistemleri",
      slug: "merkezi-uydu-sistemleri",
      image: "/images/merkezi-uydu.jpg",
      description: "Toplu yaşam alanları için modern ve kesintisiz uydu çözümleri.",
      price: 750,
    },
    {
      id: "5",
      name: "Güvenlik Kamera Kurulumu",
      slug: "guvenlik-kamera-kurulumu",
      image: "/images/guvenlik-kamera.jpg",
      description: "Ev ve iş yerleriniz için gelişmiş güvenlik kamera sistemleri.",
      price: 1200,
    },
    {
      id: "6",
      name: "Televizyon Tamiri",
      slug: "televizyon-tamiri",
      image: "/images/televizyon-tamiri.jpg",
      description: "Deneyimli kadromuzla hızlı ve kaliteli televizyon tamir hizmetleri.",
      price: 150,
    },
    {
      id: "7",
      name: "Network ve İnternet Altyapısı",
      slug: "network-internet-altyapisi",
      image: "/images/network-internet.jpg",
      description: "Güçlü ve kesintisiz internet için profesyonel ağ çözümleri.",
      price: 400,
    },
    {
      id: "8",
      name: "Aydınlatma Sistemleri",
      slug: "aydinlatma-sistemleri",
      image: "/images/aydinlatma.jpg",
      description: "İç ve dış mekanlar için estetik ve enerji verimli aydınlatma çözümleri.",
      price: 300,
    },
  ]
}

export const getServiceBySlug = async (slug: string) => {
  const services = await getServices()
  return services.find((service) => service.slug === slug)
}

/* ------------  PRODUCTS  ------------ */

export const getProducts = async () => {
  // Replace with actual Prisma call if a product table exists
  return [
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
    {
      id: "p3",
      name: "Enerji Tasarruflu Ampuller",
      slug: "enerji-tasarruflu-ampuller",
      image: "/images/aydinlatma.jpg",
      description: "Daha az enerji tüketimiyle daha fazla aydınlatma.",
      price: 15.0,
    },
    {
      id: "p4",
      name: "HD Uydu Alıcıları",
      slug: "hd-uydu-alicilari",
      image: "/placeholder.svg?height=300&width=400",
      description: "Yüksek çözünürlüklü yayınlar için gelişmiş uydu alıcıları.",
      price: 300.0,
    },
    {
      id: "p5",
      name: "Profesyonel Alarm Sistemleri",
      slug: "profesyonel-alarm-sistemleri",
      image: "/images/guvenlik-kamera.jpg",
      description: "Ev ve iş yeriniz için üst düzey güvenlik.",
      price: 800.0,
    },
    {
      id: "p6",
      name: "TV Askı Aparatları",
      slug: "tv-aski-aparatlari",
      image: "/placeholder.svg?height=300&width=400",
      description: "Her boyutta televizyon için sağlam ve şık askı aparatları.",
      price: 75.0,
    },
  ]
}

export const getProductBySlug = async (slug: string) => {
  const products = await getProducts()
  return products.find((product) => product.slug === slug)
}

/* ------------  PAGE CONTENT  ------------ */

export const getAboutUsContent = async () => {
  return {
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
  }
}

/* ------------  STATS  ------------ */

export const getStats = async () => {
  return {
    customers: 1500,
    projects: 800,
    years: 20,
  }
}

/* -----------------------------------------------------------------------------
   CONVENIENT OBJECT EXPORT
 ----------------------------------------------------------------------------- */
export const dbService = {
  prisma,
  getSettings,
  getServices,
  getServiceBySlug,
  getProducts,
  getProductBySlug,
  getAboutUsContent,
  getStats,
}

export default prisma
