import { PrismaClient } from "@prisma/client"

/**
 * If DATABASE_URL is not defined during the build (for example on
 * Vercel when the env-var hasn’t been added yet) we skip creating
 * Prisma Client.  All dbService methods will fall back to stubs and
 * return empty results so the build can finish.
 */
const hasDbUrl = !!process.env.DATABASE_URL

const globalForPrisma = global as unknown as { prisma?: PrismaClient }

export const prisma: PrismaClient | undefined = hasDbUrl ? (globalForPrisma.prisma ?? new PrismaClient()) : undefined

// Re-use the same instance in development
if (hasDbUrl && process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
