import { NextResponse } from "next/server"
import { dbService } from "@/lib/database"

export async function GET() {
  try {
    const stats = await dbService.getStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}
