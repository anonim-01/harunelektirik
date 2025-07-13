import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getSettings() {
  try {
    const settings = await prisma.setting.findMany()
    return settings.reduce(
      (acc, setting) => {
        acc[setting.key] = setting.value
        return acc
      },
      {} as Record<string, string>,
    )
  } catch (error) {
    console.error("Error fetching settings:", error)
    return {}
  }
}

export async function getServices() {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        createdAt: "asc",
      },
    })
    return services
  } catch (error) {
    console.error("Error fetching services:", error)
    return []
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    const service = await prisma.service.findUnique({
      where: { slug },
    })
    return service
  } catch (error) {
    console.error(`Error fetching service with slug ${slug}:`, error)
    return null
  }
}

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "asc",
      },
    })
    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
    })
    return product
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error)
    return null
  }
}

export async function getAboutUsContent() {
  try {
    const aboutUs = await prisma.pageContent.findUnique({
      where: { slug: "hakkimizda" },
    })
    return aboutUs
  } catch (error) {
    console.error("Error fetching about us content:", error)
    return null
  }
}

export async function getContactContent() {
  try {
    const contact = await prisma.pageContent.findUnique({
      where: { slug: "iletisim" },
    })
    return contact
  } catch (error) {
    console.error("Error fetching contact content:", error)
    return null
  }
}

export async function getStats() {
  try {
    const stats = await prisma.stat.findMany({
      orderBy: {
        order: "asc",
      },
    })
    return stats
  } catch (error) {
    console.error("Error fetching stats:", error)
    return []
  }
}

export const dbService = {
  getSettings,
  getServices,
  getServiceBySlug,
  getProducts,
  getProductBySlug,
  getAboutUsContent,
  getContactContent,
  getStats,
}
