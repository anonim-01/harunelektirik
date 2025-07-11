import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const group = searchParams.get("group")

    if (group) {
      const settings = dbService.getSettingsByGroup(group)
      return NextResponse.json(settings)
    }

    return NextResponse.json({ error: "Group parameter required" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key, value, type = "text", group = "general" } = body

    dbService.setSetting(key, value, type, group)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save setting" }, { status: 500 })
  }
}
