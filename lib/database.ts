import { PrismaClient } from "@prisma/client"

// Declare a global variable for PrismaClient to prevent multiple instances in development
declare global {
  var prisma: PrismaClient | undefined
}

const prisma: PrismaClient =
  process.env.NODE_ENV === "production" ? new PrismaClient() : (global.prisma ??= new PrismaClient())

export default prisma

// Mock data and dbService (if still needed, otherwise remove)
// This part was not explicitly requested to be removed, so keeping it for now.
// If these are not used, they can be safely deleted.

export const products = [
  {
    id: "1",
    name: "Akıllı Priz",
    slug: "akilli-priz",
    description: "Akıllı ev sistemleri için uzaktan kontrol edilebilir priz.",
    price: 150.0,
    image: "/placeholder.svg",
    category: "Akıllı Ev",
    stock: 50,
    featured: true,
  },
  {
    id: "2",
    name: "LED Ampul",
    slug: "led-ampul",
    description: "Enerji tasarruflu ve uzun ömürlü LED ampul.",
    price: 25.0,
    image: "/placeholder.svg",
    category: "Aydınlatma",
    stock: 200,
    featured: false,
  },
  {
    id: "3",
    name: "Güvenlik Kamerası",
    slug: "guvenlik-kamerasi",
    description: "Yüksek çözünürlüklü dış mekan güvenlik kamerası.",
    price: 750.0,
    image: "/placeholder.svg",
    category: "Güvenlik",
    stock: 30,
    featured: true,
  },
]

export const services = [
  {
    id: "1",
    name: "Elektrik Tesisat Kurulumu",
    slug: "elektrik-tesisat-kurulumu",
    description: "Ev ve iş yerleri için profesyonel elektrik tesisat kurulumu.",
    price: 1200.0,
    image: "/placeholder.svg",
    category: "Tesisat",
    featured: true,
  },
  {
    id: "2",
    name: "Uydu Anten Montajı",
    slug: "uydu-anten-montaji",
    description: "Her türlü uydu anteni için hızlı ve güvenilir montaj hizmeti.",
    price: 300.0,
    image: "/placeholder.svg",
    category: "Uydu",
    featured: false,
  },
  {
    id: "3",
    name: "Kamera Sistemleri Kurulumu",
    slug: "kamera-sistemleri-kurulumu",
    description: "Güvenlik kamera sistemleri için anahtar teslim kurulum.",
    price: 2500.0,
    image: "/placeholder.svg",
    category: "Güvenlik",
    featured: true,
  },
]

export const dbService = {
  getProducts: async () => products,
  getProductBySlug: async (slug: string) => products.find((p) => p.slug === slug),
  getServices: async () => services,
  getServiceBySlug: async (slug: string) => services.find((s) => s.slug === slug),
  getStats: async () => ({
    totalProducts: products.length,
    totalServices: services.length,
    totalOrders: 0, // Placeholder, as orders are not mocked here
    totalUsers: 0, // Placeholder, as users are not mocked here
  }),
}
