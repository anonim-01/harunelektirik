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
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ message: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  // This endpoint is typically for creating orders from the frontend (e.g., after checkout)
  // Admin panel might not use POST for orders directly, but for completeness:
  const authResult = verifyAdmin(req)
  if (!authResult.authorized) {
    // If this POST is from frontend, remove authResult check or use a different auth method
    // For now, assuming admin-only POST for consistency with other admin APIs
    return NextResponse.json({ message: authResult.message }, { status: 401 })
  }

  try {
    const { customerName, customerEmail, customerPhone, customerAddress, totalAmount, items } = await req.json()
    const newOrder = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        totalAmount,
        items, // Ensure this matches your Prisma schema type (e.g., Json or String)
        status: "PENDING", // Default status
      },
    })
    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ message: "Failed to create order" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const authResult = verifyAdmin(req)
  if (!authResult.authorized) {
    return NextResponse.json({ message: authResult.message }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ message: "Order ID is required" }, { status: 400 })
  }

  try {
    const { status } = await req.json() // Only allowing status update for now
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    })
    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ message: "Failed to update order" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const authResult = verifyAdmin(req)
  if (!authResult.authorized) {
    return NextResponse.json({ message: authResult.message }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ message: "Order ID is required" }, { status: 400 })
  }

  try {
    await prisma.order.delete({
      where: { id },
    })
    return NextResponse.json({ message: "Order deleted successfully" })
  } catch (error) {
    console.error("Error deleting order:", error)
    return NextResponse.json({ message: "Failed to delete order" }, { status: 500 })
  }
}
