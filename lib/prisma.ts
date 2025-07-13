import { PrismaClient } from "@prisma/client"

// add prisma to the NodeJS global type
declare global {
  var prismaGlobal: PrismaClient | undefined
}

const globalForPrisma = globalThis as unknown as {
  prismaGlobal: PrismaClient | undefined
}

const prisma = globalForPrisma.prismaGlobal ?? new PrismaClient()

if (process.env.NODE_ENV === "development") globalForPrisma.prismaGlobal = prisma

export default prisma
