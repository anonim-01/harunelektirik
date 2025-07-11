import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/database"

export async function GET() {
  try {
    const services = await dbService.getAllServices()
    return NextResponse.json(services)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const service = await dbService.createService(body)
    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error("Failed to create service:", error)
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}
