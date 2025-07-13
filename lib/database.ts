import { PrismaClient } from "@prisma/client"

/* -----------------------------------------------------------------------------
   PRISMA SINGLETON  – prevents exhausting DB connections in development
 ----------------------------------------------------------------------------- */
declare global {
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined
}

const prisma = globalThis.__prisma__ ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma__ = prisma
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

export async function getServices() {
  try {
    return prisma.service.findMany({ orderBy: { createdAt: "desc" } })
  } catch (err) {
    console.error("[db] getServices", err)
    return []
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    return prisma.service.findUnique({ where: { slug } })
  } catch (err) {
    console.error("[db] getServiceBySlug", err)
    return null
  }
}

/* ------------  PRODUCTS  ------------ */

export async function getProducts() {
  try {
    return prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    })
  } catch (err) {
    console.error("[db] getProducts", err)
    return []
  }
}

export async function getProductBySlug(slug: string) {
  try {
    return prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    })
  } catch (err) {
    console.error("[db] getProductBySlug", err)
    return null
  }
}

/* ------------  PAGE CONTENT  ------------ */

export async function getAboutUsContent() {
  try {
    return prisma.pageContent.findUnique({ where: { pageName: "hakkimizda" } })
  } catch (err) {
    console.error("[db] getAboutUsContent", err)
    return null
  }
}

/* ------------  STATS  ------------ */

export async function getStats() {
  try {
    const [services, products] = await Promise.all([prisma.service.count(), prisma.product.count()])

    const revenueAgg = await prisma.order.aggregate({ _sum: { total: true } })

    return {
      services,
      products,
      totalRevenue: revenueAgg._sum.total ?? 0,
    }
  } catch (err) {
    console.error("[db] getStats", err)
    return { services: 0, products: 0, totalRevenue: 0 }
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
