import { NextResponse } from "next/server"
import { dbService } from "@/lib/database"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "E-posta ve şifre gerekli." }, { status: 400 })
    }

    const user = await dbService.getUserByEmail(email)

    if (!user) {
      return NextResponse.json({ message: "Geçersiz e-posta veya şifre." }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Geçersiz e-posta veya şifre." }, { status: 401 })
    }

    // Başarılı giriş durumunda, burada bir oturum (session) oluşturulabilir.
    // Şimdilik sadece başarılı yanıt dönüyoruz.
    return NextResponse.json(
      { message: "Giriş başarılı!", user: { id: user.id, email: user.email, name: user.name, role: user.role } },
      { status: 200 },
    )
  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json({ message: "Giriş sırasında bir hata oluştu." }, { status: 500 })
  }
}
