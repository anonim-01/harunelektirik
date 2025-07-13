import { NextResponse } from "next/server"
import { sign } from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { username, password } = await req.json()

  // Basit bir admin kontrolü, üretimde daha güvenli bir kimlik doğrulama kullanılmalıdır.
  // Örneğin, veritabanından kullanıcı çekip şifreyi hashleyerek karşılaştırma.
  const adminPassword = process.env.ADMIN_PASSWORD || "adminpassword" // .env'den veya varsayılan

  if (username === "admin" && password === adminPassword) {
    const token = sign({ username: "admin" }, process.env.JWT_SECRET || "your_jwt_secret", { expiresIn: "1h" })
    return NextResponse.json({ success: true, token })
  } else {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
  }
}
