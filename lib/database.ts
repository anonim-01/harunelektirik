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

export class DatabaseService {
  // Ürün işlemleri
  async getAllProducts(): Promise<ProductWithCategory[]> {
    return prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }

  async getProductById(id: number): Promise<ProductWithCategory | null> {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    })
  }

  async getProductBySlug(slug: string): Promise<ProductWithCategory | null> {
    return prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    })
  }

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return prisma.product.create({
      data,
    })
  }

  async updateProduct(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
    return prisma.product.update({
      where: { id },
      data,
    })
  }

  async deleteProduct(id: number): Promise<Product> {
    return prisma.product.delete({
      where: { id },
    })
  }

  // Hizmet işlemleri
  async getAllServices(): Promise<ServiceWithCategory[]> {
    return prisma.service.findMany({
      include: {
        serviceCategory: true, // Kategori bilgisini dahil et
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }

  async getServiceById(id: number): Promise<ServiceWithCategory | null> {
    return prisma.service.findUnique({
      where: { id },
      include: {
        serviceCategory: true,
      },
    })
  }

  async getServiceBySlug(slug: string): Promise<ServiceWithCategory | null> {
    return prisma.service.findUnique({
      where: { slug },
      include: {
        serviceCategory: true,
      },
    })
  }

  async createService(data: Prisma.ServiceCreateInput): Promise<Service> {
    return prisma.service.create({
      data,
    })
  }

  async updateService(id: number, data: Prisma.ServiceUpdateInput): Promise<Service> {
    return prisma.service.update({
      where: { id },
      data,
    })
  }

  async deleteService(id: number): Promise<Service> {
    return prisma.service.delete({
      where: { id },
    })
  }

  // Hizmet Kategorileri işlemleri
  async getAllServiceCategories(): Promise<ServiceCategory[]> {
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
  }

  async getServiceCategoryBySlug(slug: string): Promise<ServiceCategory | null> {
    return prisma.serviceCategory.findUnique({
      where: { slug },
      include: {
        services: {
          where: { isActive: true },
          orderBy: { name: "asc" },
        },
      },
    })
  }

  // Sipariş işlemleri
  async getAllOrders(): Promise<OrderWithItems[]> {
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
  }

  async getOrderById(id: number): Promise<OrderWithItems | null> {
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
  }

  async getOrderByNumber(orderNumber: string): Promise<OrderWithItems | null> {
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
  }

  async createOrder(
    data: Prisma.OrderCreateInput & { orderItems?: Prisma.OrderItemCreateManyOrderInput[] },
  ): Promise<Order> {
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
  }

  async updateOrder(id: number, data: Prisma.OrderUpdateInput): Promise<Order> {
    return prisma.order.update({
      where: { id },
      data,
    })
  }

  // Kategori işlemleri
  async getAllCategories(): Promise<Category[]> {
    return prisma.category.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    })
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { id },
    })
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { slug },
    })
  }

  // Sayfa işlemleri
  async getAllPages(): Promise<Page[]> {
    return prisma.page.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    })
  }

  async getPageById(id: number): Promise<Page | null> {
    return prisma.page.findUnique({
      where: { id },
    })
  }

  async getPageBySlug(slug: string): Promise<Page | null> {
    return prisma.page.findUnique({
      where: { slug },
    })
  }

  async createPage(data: Prisma.PageCreateInput): Promise<Page> {
    return prisma.page.create({
      data,
    })
  }

  async updatePage(id: number, data: Prisma.PageUpdateInput): Promise<Page> {
    return prisma.page.update({
      where: { id },
      data,
    })
  }

  async deletePage(id: number): Promise<Page> {
    return prisma.page.delete({
      where: { id },
    })
  }

  // Ayar işlemleri
  async getSetting(key: string): Promise<Setting | null> {
    return prisma.setting.findUnique({
      where: { key },
    })
  }

  async getSettingsByGroup(groupName: string): Promise<Setting[]> {
    return prisma.setting.findMany({
      where: { groupName },
    })
  }

  async setSetting(key: string, value: string, type = "text", groupName = "general"): Promise<Setting> {
    return prisma.setting.upsert({
      where: { key },
      update: { value, type, groupName },
      create: { key, value, type, groupName },
    })
  }

  // Kullanıcı işlemleri
  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    })
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data,
    })
  }

  // İstatistik işlemleri
  async getStats() {
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
  }

  // Arama işlemleri
  async searchProducts(query: string): Promise<ProductWithCategory[]> {
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
  }

  async searchServices(query: string): Promise<ServiceWithCategory[]> {
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
  }

  // Öne çıkan ürün ve hizmetler
  async getFeaturedProducts(): Promise<ProductWithCategory[]> {
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
  }

  async getFeaturedServices(): Promise<ServiceWithCategory[]> {
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
  }
}

// Singleton instance
export const dbService = new DatabaseService()
