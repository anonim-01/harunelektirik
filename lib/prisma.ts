import { PrismaClient } from "@prisma/client"

/**
 * If DATABASE_URL is not defined during the build (for example on
 * Vercel when the env-var hasn’t been added yet) we skip creating
 * Prisma Client.  All dbService methods will fall back to stubs and
 * return empty results so the build can finish.
 */
const hasDbUrl = !!process.env.DATABASE_URL

// add prisma to the NodeJS global type
declare global {
  var prismaGlobal: PrismaClient | undefined
}

const globalForPrisma = global as unknown as { prismaGlobal?: PrismaClient }

const prisma =
  globalForPrisma.prismaGlobal ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  })

// Prevent multiple instances of Prisma Client in development
if (hasDbUrl && process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaGlobal = prisma
}

export default prisma
