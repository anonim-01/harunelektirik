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
  // Settings can be fetched by anyone for public display, but admin can also fetch
  try {
    const settings = await prisma.settings.findFirst()
    if (!settings) {
      // If no settings exist, create default ones
      const defaultSettings = await prisma.settings.create({
        data: {
          siteName: "Harun Elektrik",
          siteDescription: "Elektrik ve uydu sistemleri çözümlerinizde kurumsal ortağınız.",
          contactEmail: "info@harunelektrik.com",
          contactPhone: "+90 555 123 45 67",
          address: "Örnek Mah. Örnek Cad. No:123, Örnek İlçe, Örnek İl",
          whatsappNumber: "905551234567",
        },
      })
      return NextResponse.json(defaultSettings)
    }
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ message: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const authResult = verifyAdmin(req)
  if (!authResult.authorized) {
    return NextResponse.json({ message: authResult.message }, { status: 401 })
  }

  try {
    const { siteName, siteDescription, contactEmail, contactPhone, address, whatsappNumber } = await req.json()
    const updatedSettings = await prisma.settings.updateMany({
      where: {}, // Update the single settings entry
      data: { siteName, siteDescription, contactEmail, contactPhone, address, whatsappNumber },
    })

    // After updating, fetch the current settings to return the latest state
    const currentSettings = await prisma.settings.findFirst()
    return NextResponse.json(currentSettings)
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ message: "Failed to update settings" }, { status: 500 })
  }
}
