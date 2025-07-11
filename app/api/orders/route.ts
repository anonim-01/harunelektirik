import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/database"
import { OrderStatus, PaymentStatus } from "@prisma/client" // Prisma enum'larını import edin

export async function GET() {
  try {
    const orders = await dbService.getAllOrders()
    return NextResponse.json(orders)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderItems, ...orderData } = body // orderItems'ı ayırın

    // Generate order number
    const orderNumber = "HE-" + Date.now()

    const newOrderData = {
      ...orderData,
      orderNumber,
      status: OrderStatus.PENDING, // Enum kullanın
      paymentStatus: PaymentStatus.PENDING, // Enum kullanın
      orderItems: orderItems, // orderItems'ı doğrudan geçirin
    }

    const order = await dbService.createOrder(newOrderData)
    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Failed to create order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
