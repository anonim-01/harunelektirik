import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export const dbService = {
  // Services
  async getAllServices() {
    return await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    })
  },

  async getFeaturedServices() {
    return await prisma.service.findMany({
      where: { featured: true },
      take: 6,
      orderBy: { createdAt: "desc" },
    })
  },

  async getServiceBySlug(slug: string) {
    return await prisma.service.findUnique({
      where: { slug },
    })
  },

  // Products
  async getAllProducts() {
    return await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    })
  },

  async getFeaturedProducts() {
    return await prisma.product.findMany({
      where: { featured: true },
      take: 6,
      orderBy: { createdAt: "desc" },
    })
  },

  async getProductBySlug(slug: string) {
    return await prisma.product.findUnique({
      where: { slug },
    })
  },

  // Page Content
  async getPageContent(pageSlug: string) {
    return await prisma.pageContent.findUnique({
      where: { pageSlug },
    })
  },

  // Orders
  async createOrder(orderData: any) {
    return await prisma.order.create({
      data: orderData,
    })
  },

  async getAllOrders() {
    return await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    })
  },

  // Settings
  async getSettings() {
    return await prisma.settings.findFirst()
  },

  async updateSettings(data: any) {
    const existingSettings = await prisma.settings.findFirst()
    if (existingSettings) {
      return await prisma.settings.update({
        where: { id: existingSettings.id },
        data,
      })
    } else {
      return await prisma.settings.create({
        data,
      })
    }
  },

  // Stats - Fixed function
  async getStats() {
    const [totalOrders, totalProducts, totalServices, recentOrders] = await Promise.all([
      prisma.order.count(),
      prisma.product.count(),
      prisma.service.count(),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ])

    const totalRevenue = await prisma.order.aggregate({
      _sum: {
        total: true,
      },
    })

    return {
      totalOrders,
      totalProducts,
      totalServices,
      totalRevenue: totalRevenue._sum.total || 0,
      recentOrders,
    }
  },
}
