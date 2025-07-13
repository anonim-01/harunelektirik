import { prisma } from "./prisma"

export const dbService = {
  // Services
  async getFeaturedServices() {
    return await prisma.service.findMany({
      where: { isFeatured: true },
      take: 6,
      orderBy: { createdAt: "desc" },
    })
  },

  async getAllServices() {
    return await prisma.service.findMany({
      orderBy: { name: "asc" },
    })
  },

  async getServiceBySlug(slug: string) {
    return await prisma.service.findUnique({
      where: { slug },
    })
  },

  async getServiceCategories() {
    return await prisma.serviceCategory.findMany({
      include: {
        services: true,
      },
      orderBy: { sortOrder: "asc" },
    })
  },

  // Products
  async getFeaturedProducts() {
    return await prisma.product.findMany({
      where: { isFeatured: true },
      take: 6,
      orderBy: { createdAt: "desc" },
    })
  },

  async getAllProducts() {
    return await prisma.product.findMany({
      include: { category: true },
      orderBy: { name: "asc" },
    })
  },

  async getProductBySlug(slug: string) {
    return await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    })
  },

  async getProductCategories() {
    return await prisma.category.findMany({
      include: {
        products: true,
      },
      orderBy: { sortOrder: "asc" },
    })
  },

  // Pages
  async getPageBySlug(slug: string) {
    return await prisma.page.findUnique({
      where: { slug },
    })
  },

  async getPageContent(pageName: string) {
    return await prisma.pageContent.findUnique({
      where: { pageName },
    })
  },

  // Settings
  async getSetting(key: string) {
    const setting = await prisma.setting.findUnique({
      where: { key },
    })
    return setting?.value || null
  },

  async getSettings() {
    const settings = await prisma.setting.findMany()
    return settings.reduce(
      (acc, setting) => {
        acc[setting.key] = setting.value
        return acc
      },
      {} as Record<string, string>,
    )
  },

  // Orders
  async createOrder(orderData: any) {
    return await prisma.order.create({
      data: orderData,
      include: {
        items: true,
      },
    })
  },

  async getOrderById(id: string) {
    return await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })
  },

  // Dashboard / statistics
  async getStats() {
    const [totalServices, totalProducts, totalOrders] = await Promise.all([
      prisma.service.count(),
      prisma.product.count(),
      prisma.order.count(),
    ])
    return { totalServices, totalProducts, totalOrders }
  },
}
