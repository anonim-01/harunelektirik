import prisma from "./prisma"

export const dbService = {
  // Services
  async getAllServices() {
    try {
      return await prisma.service.findMany({
        orderBy: { createdAt: "desc" },
      })
    } catch (error) {
      console.error("Database error in getAllServices:", error)
      return []
    }
  },

  async getFeaturedServices() {
    try {
      return await prisma.service.findMany({
        where: { isFeatured: true },
        take: 6,
        orderBy: { createdAt: "desc" },
      })
    } catch (error) {
      console.error("Database error in getFeaturedServices:", error)
      return []
    }
  },

  async getServiceBySlug(slug: string) {
    try {
      return await prisma.service.findUnique({
        where: { slug },
      })
    } catch (error) {
      console.error("Database error in getServiceBySlug:", error)
      return null
    }
  },

  async getServiceCategories() {
    try {
      return await prisma.serviceCategory.findMany({
        include: {
          services: true,
        },
        orderBy: { name: "asc" },
      })
    } catch (error) {
      console.error("Database error in getServiceCategories:", error)
      return []
    }
  },

  // Products
  async getAllProducts() {
    try {
      return await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
      })
    } catch (error) {
      console.error("Database error in getAllProducts:", error)
      return []
    }
  },

  async getFeaturedProducts() {
    try {
      return await prisma.product.findMany({
        where: { isFeatured: true },
        take: 6,
        orderBy: { createdAt: "desc" },
      })
    } catch (error) {
      console.error("Database error in getFeaturedProducts:", error)
      return []
    }
  },

  async getProductBySlug(slug: string) {
    try {
      return await prisma.product.findUnique({
        where: { slug },
        include: { category: true },
      })
    } catch (error) {
      console.error("Database error in getProductBySlug:", error)
      return null
    }
  },

  async getProductCategories() {
    try {
      return await prisma.productCategory.findMany({
        include: {
          products: true,
        },
        orderBy: { name: "asc" },
      })
    } catch (error) {
      console.error("Database error in getProductCategories:", error)
      return []
    }
  },

  // Page Content
  async getPageContent(pageName: string) {
    try {
      return await prisma.pageContent.findUnique({
        where: { pageName },
      })
    } catch (error) {
      console.error("Database error in getPageContent:", error)
      return null
    }
  },

  // Orders
  async createOrder(orderData: any) {
    try {
      return await prisma.order.create({
        data: orderData,
      })
    } catch (error) {
      console.error("Database error in createOrder:", error)
      throw error
    }
  },

  async getAllOrders() {
    try {
      return await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
      })
    } catch (error) {
      console.error("Database error in getAllOrders:", error)
      return []
    }
  },

  // Settings
  async getSettings() {
    try {
      return await prisma.setting.findMany()
    } catch (error) {
      console.error("Database error in getSettings:", error)
      return []
    }
  },

  async getSetting(key: string) {
    try {
      const setting = await prisma.setting.findUnique({
        where: { key },
      })
      return setting?.value || null
    } catch (error) {
      console.error("Database error in getSetting:", error)
      return null
    }
  },

  // Stats - Fixed function
  async getStats() {
    try {
      const [totalOrders, totalProducts, totalServices] = await Promise.all([
        prisma.order.count(),
        prisma.product.count(),
        prisma.service.count(),
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
      }
    } catch (error) {
      console.error("Database error in getStats:", error)
      return {
        totalOrders: 0,
        totalProducts: 0,
        totalServices: 0,
        totalRevenue: 0,
      }
    }
  },
}
