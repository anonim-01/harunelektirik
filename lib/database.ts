import prisma from "./prisma"
import type { Prisma } from "@prisma/client"

export const dbService = {
  // AdminUser operations
  async getAdminUserByUsername(username: string) {
    return prisma.adminUser.findUnique({ where: { username } })
  },

  // Setting operations
  async getSetting(key: string) {
    return prisma.setting.findUnique({ where: { key } })
  },
  async updateSetting(key: string, value: string) {
    return prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
  },

  // ServiceCategory operations
  async getAllServiceCategories() {
    return prisma.serviceCategory.findMany({
      include: {
        services: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
          orderBy: { name: "asc" },
        },
      },
      orderBy: { name: "asc" },
    })
  },
  async getServiceCategoryBySlug(slug: string) {
    return prisma.serviceCategory.findUnique({
      where: { slug },
      include: { services: true },
    })
  },

  // Service operations
  async getAllServices() {
    return prisma.service.findMany({
      include: { category: true },
      orderBy: { name: "asc" },
    })
  },
  async getServiceBySlug(slug: string) {
    return prisma.service.findUnique({
      where: { slug },
      include: { category: true },
    })
  },
  async getFeaturedServices() {
    return prisma.service.findMany({
      where: { isFeatured: true },
      take: 3, // Ana sayfada 3 öne çıkan hizmet göster
      orderBy: { createdAt: "desc" },
    })
  },

  // ProductCategory operations
  async getAllProductCategories() {
    return prisma.productCategory.findMany({
      include: { products: true },
      orderBy: { name: "asc" },
    })
  },
  async getProductCategoryBySlug(slug: string) {
    return prisma.productCategory.findUnique({
      where: { slug },
      include: { products: true },
    })
  },

  // Product operations
  async getAllProducts() {
    return prisma.product.findMany({
      include: { category: true },
      orderBy: { name: "asc" },
    })
  },
  async getProductBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    })
  },
  async getFeaturedProducts() {
    return prisma.product.findMany({
      where: { isFeatured: true },
      take: 6, // Ana sayfada 6 öne çıkan ürün göster
      orderBy: { createdAt: "desc" },
    })
  },

  // Order operations
  async createOrder(data: Prisma.OrderCreateInput) {
    return prisma.order.create({ data })
  },
  async updateOrder(id: string, data: Prisma.OrderUpdateInput) {
    return prisma.order.update({ where: { id }, data })
  },
  async getOrderById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } } },
    })
  },

  // OrderItem operations
  async createOrderItem(data: Prisma.OrderItemCreateInput) {
    return prisma.orderItem.create({ data })
  },

  // PageContent operations
  async getPageContent(pageName: string) {
    return prisma.pageContent.findUnique({ where: { pageName } })
  },
  async updatePageContent(pageName: string, content: string) {
    return prisma.pageContent.upsert({
      where: { pageName },
      update: { content },
      create: { pageName, content },
    })
  },
}
