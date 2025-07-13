import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { verify } from "jsonwebtoken"

const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"

// Middleware to verify admin token
const verifyAdmin = (req: Request) => {
  const authHeader = req.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { authorized: false, message: "Authorization token is missing or invalid." }
  }
  const token = authHeader.split(" ")[1]
  try {
    verify(token, JWT_SECRET)
    return { authorized: true }
  } catch (error) {
    return { authorized: false, message: "Invalid or expired token." }
  }
}

export async function GET(req: Request) {
  const authResult = verifyAdmin(req)
  if (!authResult.authorized) {
    return NextResponse.json({ message: authResult.message }, { status: 401 })
  }

  try {
    const totalServices = await prisma.service.count()
    const totalProducts = await prisma.product.count()
    const totalOrders = await prisma.order.count()

    return NextResponse.json({
      totalServices,
      totalProducts,
      totalOrders,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ message: "Failed to fetch stats" }, { status: 500 })
  }
}
