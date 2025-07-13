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
  // Products can be fetched by anyone, so no admin check here
  try {
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const authResult = verifyAdmin(req)
  if (!authResult.authorized) {
    return NextResponse.json({ message: authResult.message }, { status: 401 })
  }

  try {
    const { name, description, price, image, slug, category } = await req.json()
    const newProduct = await prisma.product.create({
      data: { name, description, price, image, slug, category },
    })
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ message: "Failed to create product" }, { status: 500 })
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
    return NextResponse.json({ message: "Product ID is required" }, { status: 400 })
  }

  try {
    const { name, description, price, image, slug, category } = await req.json()
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, description, price, image, slug, category },
    })
    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ message: "Failed to update product" }, { status: 500 })
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
    return NextResponse.json({ message: "Product ID is required" }, { status: 400 })
  }

  try {
    await prisma.product.delete({
      where: { id },
    })
    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ message: "Failed to delete product" }, { status: 500 })
  }
}
