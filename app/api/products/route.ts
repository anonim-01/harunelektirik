import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/database"

export async function GET() {
  try {
    const products = await dbService.getAllProducts()
    return NextResponse.json(products)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const product = await dbService.createProduct(body)
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Failed to create product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
