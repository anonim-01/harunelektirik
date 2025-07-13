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
  // Services can be fetched by anyone, so no admin check here
  try {
    const services = await prisma.service.findMany()
    return NextResponse.json(services)
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ message: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const authResult = verifyAdmin(req)
  if (!authResult.authorized) {
    return NextResponse.json({ message: authResult.message }, { status: 401 })
  }

  try {
    const { name, description, image, slug } = await req.json()
    const newService = await prisma.service.create({
      data: { name, description, image, slug },
    })
    return NextResponse.json(newService, { status: 201 })
  } catch (error) {
    console.error("Error creating service:", error)
    return NextResponse.json({ message: "Failed to create service" }, { status: 500 })
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
    return NextResponse.json({ message: "Service ID is required" }, { status: 400 })
  }

  try {
    const { name, description, image, slug } = await req.json()
    const updatedService = await prisma.service.update({
      where: { id },
      data: { name, description, image, slug },
    })
    return NextResponse.json(updatedService)
  } catch (error) {
    console.error("Error updating service:", error)
    return NextResponse.json({ message: "Failed to update service" }, { status: 500 })
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
    return NextResponse.json({ message: "Service ID is required" }, { status: 400 })
  }

  try {
    await prisma.service.delete({
      where: { id },
    })
    return NextResponse.json({ message: "Service deleted successfully" })
  } catch (error) {
    console.error("Error deleting service:", error)
    return NextResponse.json({ message: "Failed to delete service" }, { status: 500 })
  }
}
