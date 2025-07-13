import { prisma } from "./prisma"
import type {
  User,
  Product,
  Service,
  Order,
  Category,
  Page,
  Setting,
  OrderItem,
  ServiceCategory,
  Prisma,
} from "@prisma/client"

export type ProductWithCategory = Product & {
  category: Category | null
}

export type ServiceWithCategory = Service & {
  serviceCategory: ServiceCategory | null
}

export type OrderWithItems = Order & {
  orderItems: (OrderItem & {
    product: Product | null
    service: Service | null
  })[]
  user: User | null
}

export const dbService = {
  /* PRODUCTS --------------------------------------------------------- */
  async getAllProducts() {
    if (!prisma) return []
    return prisma.product.findMany({ where: { isActive: true } })
  },

  async getProductById(id: number): Promise<ProductWithCategory | null> {
    if (!prisma) return null
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    })
  },

  async getProductBySlug(slug: string) {
    if (!prisma) return null
    return prisma.product.findUnique({ where: { slug, isActive: true } })
  },

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    if (!prisma) throw new Error("Prisma is not initialized")
    return prisma.product.create({
      data,
    })
  },

  async updateProduct(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
    if (!prisma) throw new Error("Prisma is not initialized")
    return prisma.product.update({
      where: { id },
      data,
    })
  },

  async deleteProduct(id: number): Promise<Product> {
    if (!prisma) throw new Error("Prisma is not initialized")
    return prisma.product.delete({
      where: { id },
    })
  },

  /* SERVICES --------------------------------------------------------- */
  async getAllServices() {
    if (!prisma) return []
    return prisma.service.findMany({ where: { isActive: true } })
  },

  async getServiceById(id: number): Promise<ServiceWithCategory | null> {
    if (!prisma) return null
    return prisma.service.findUnique({
      where: { id },
      include: {
        serviceCategory: true,
      },
    })
  },

  async getServiceBySlug(slug: string) {
    if (!prisma) return null
    return prisma.service.findUnique({ where: { slug, isActive: true } })
  },

  async createService(data: Prisma.ServiceCreateInput): Promise<Service> {
    if (!prisma) throw new Error("Prisma is not initialized")
    return prisma.service.create({
      data,
    })
  },

  async updateService(id: number, data: Prisma.ServiceUpdateInput): Promise<Service> {
    if (!prisma) throw new Error("Prisma is not initialized")
    return prisma.service.update({
      where: { id },
      data,
    })
  },

  async deleteService(id: number): Promise<Service> {
    if (!prisma) throw new Error("Prisma is not initialized")
    return prisma.service.delete({
      where: { id },
    })
  },

  /* SERVICE CATEGORIES (if used) ------------------------------------- */
  async getAllServiceCategories(): Promise<ServiceCategory[]> {
    if (!prisma) return []
    return prisma.serviceCategory.findMany({
      orderBy: {
        sortOrder: "asc",
      },
      include: {
        services: {
          where: { isActive: true }, // Sadece aktif hizmetleri getir
          orderBy: { name: "asc" },
        },
      },
    })
  },

  async getServiceCategoryBySlug(slug: string): Promise<ServiceCategory | null> {
    if (!prisma) return null
    return prisma.serviceCategory.findUnique({
      where: { slug },
      include: {
        services: {
          where: { isActive: true },
          orderBy: { name: "asc" },
        },
      },
    })
  },

  /* ORDERS ----------------------------------------------------------- */
  async getAllOrders(): Promise<OrderWithItems[]> {
    if (!prisma) return []
    return prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true,
            service: true,
          },
        },
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  },

  async getOrderById(id: number): Promise<OrderWithItems | null> {
    if (!prisma) return null
    return prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            product: true,
            service: true,
          },
        },
        user: true,
      },
    })
  },

  async getOrderByNumber(orderNumber: string): Promise<OrderWithItems | null> {
    if (!prisma) return null
    return prisma.order.findUnique({
      where: { orderNumber },
      include: {
        orderItems: {
          include: {
            product: true,
            service: true,
          },
        },
        user: true,
      },
    })
  },

  async createOrder(
    data: Prisma.OrderCreateInput & { orderItems?: Prisma.OrderItemCreateManyOrderInput[] },
  ): Promise<Order> {
    if (!prisma) throw new Error("Prisma is not initialized")
    const { orderItems, ...orderData } = data
    return prisma.order.create({
      data: {
        ...orderData,
        orderItems: orderItems
          ? {
              createMany: {
                data: orderItems,
              },
            }
          : undefined,
      },
    })
  },

  async updateOrder(id: number, data: Prisma.OrderUpdateInput): Promise<Order> {
    if (!prisma) throw new Error("Prisma is not initialized")
    return prisma.order.update({
      where: { id },
      data,
    })
  },

  /* CATEGORIES ------------------------------------------------------- */
  async getAllCategories() {
    if (!prisma) return []
    return prisma.category.findMany({ where: { isActive: true } })
  },

  async getCategoryById(id: number): Promise<Category | null> {
    if (!prisma) return null
    return prisma.category.findUnique({
      where: { id },
    })
  },

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    if (!prisma) return null
    return prisma.category.findUnique({
      where: { slug },
    })
  },

  /* PAGES ---------------------------------------------------------- */
  async getAllPages(): Promise<Page[]> {
    if (!prisma) return []
    return prisma.page.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    })
  },

  async getPageById(id: number): Promise<Page | null> {
    if (!prisma) return null
    return prisma.page.findUnique({
      where: { id },
    })
  },

  async getPageBySlug(slug: string): Promise<Page | null> {
    if (!prisma) return null
    return prisma.page.findUnique({
      where: { slug },
    })
  },

  async createPage(data: Prisma.PageCreateInput): Promise<Page> {
    if (!prisma) throw new Error("Prisma is not initialized")
    return prisma.page.create({
      data,
    })
  },

  async updatePage(id: number, data: Prisma.PageUpdateInput): Promise<Page> {
    if (!prisma) throw new Error("Prisma is not initialized")
    return prisma.page.update({
      where: { id },
      data,
    })
  },

  async deletePage(id: number): Promise<Page> {
    if (!prisma) throw new Error("Prisma is not initialized")
    return prisma.page.delete({
      where: { id },
    })
  },

  /* SETTINGS --------------------------------------------------------- */
  async getSetting(key: string): Promise<Setting | null> {
    if (!prisma) return null
    return prisma.setting.findUnique({
      where: { key },
    })
  },

  async getSettingsByGroup(groupName: string): Promise<Setting[]> {
    if (!prisma) return []
    return prisma.setting.findMany({
      where: { groupName },
    })
  },

  async setSetting(key: string, value: string, type = "text", groupName = "general"): Promise<Setting> {
    if (!prisma) throw new Error("Prisma is not initialized")
    return prisma.setting.upsert({
      where: { key },
      update: { value, type, groupName },
      create: { key, value, type, groupName },
    })
  },

  /* USERS ---------------------------------------------------------- */
  async getUserByEmail(email: string): Promise<User | null> {
    if (!prisma) return null
    return prisma.user.findUnique({
      where: { email },
    })
  },

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    if (!prisma) throw new Error("Prisma is not initialized")
    return prisma.user.create({
      data,
    })
  },

  /* STATS ---------------------------------------------------------- */
  async getStats() {
    if (!prisma) return { totalProducts: 0, totalOrders: 0, totalRevenue: 0, totalCustomers: 0 }
    const [totalProducts, totalOrders, totalRevenue, totalCustomers] = await Promise.all([
      prisma.product.count({
        where: { isActive: true },
      }),
      prisma.order.count(),
      prisma.order.aggregate({
        where: { paymentStatus: "PAID" },
        _sum: { totalAmount: true },
      }),
      prisma.order.groupBy({
        by: ["customerEmail"],
        _count: true,
      }),
    ])

    return {
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenue._sum.totalAmount?.toNumber() || 0,
      totalCustomers: totalCustomers.length,
    }
  },

  /* SEARCH --------------------------------------------------------- */
  async searchProducts(query: string): Promise<ProductWithCategory[]> {
    if (!prisma) return []
    return prisma.product.findMany({
      where: {
        AND: [
          { isActive: true },
          {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
              { shortDescription: { contains: query, mode: "insensitive" } },
            ],
          },
        ],
      },
      include: {
        category: true,
      },
    })
  },

  async searchServices(query: string): Promise<ServiceWithCategory[]> {
    if (!prisma) return []
    return prisma.service.findMany({
      where: {
        AND: [
          { isActive: true },
          {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
              { shortDescription: { contains: query, mode: "insensitive" } },
            ],
          },
        ],
      },
      include: {
        serviceCategory: true,
      },
    })
  },

  /* FEATURED PRODUCTS AND SERVICES ----------------------------------- */
  async getFeaturedProducts(): Promise<ProductWithCategory[]> {
    if (!prisma) return []
    return prisma.product.findMany({
      where: {
        isActive: true,
        isFeatured: true,
      },
      include: {
        category: true,
      },
      take: 6,
    })
  },

  async getFeaturedServices(): Promise<ServiceWithCategory[]> {
    if (!prisma) return []
    return prisma.service.findMany({
      where: {
        isActive: true,
        isFeatured: true,
      },
      include: {
        serviceCategory: true,
      },
      take: 6,
    })
  },
}
