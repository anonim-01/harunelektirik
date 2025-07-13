import { NextResponse } from "next/server"
import crypto from "crypto"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const {
    customerName,
    customerEmail,
    customerPhone,
    customerAddress,
    totalAmount,
    cartItems,
    paymentToken, // Izico'dan gelen ödeme token'ı
  } = await req.json()

  const IZICO_API_KEY = process.env.IZICO_API_KEY
  const IZICO_SECRET_KEY = process.env.IZICO_SECRET_KEY
  const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  if (!IZICO_API_KEY || !IZICO_SECRET_KEY || !NEXT_PUBLIC_BASE_URL) {
    return NextResponse.json({ message: "Izico API keys or Base URL are not configured." }, { status: 500 })
  }

  try {
    // Izico API'ye ödeme isteği gönderme simülasyonu
    // Gerçek entegrasyonda burada Izico'nun ödeme API'sine istek atılacak.
    // Bu örnekte sadece başarılı bir ödeme simülasyonu yapıyoruz.

    // Ödeme başarılı olursa siparişi veritabanına kaydet
    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        totalAmount,
        items: cartItems, // JSON olarak kaydedilecek
        status: "COMPLETED", // Ödeme başarılı olduğu için direkt tamamlandı
      },
    })

    return NextResponse.json({
      success: true,
      orderId: order.id,
      redirectUrl: `${NEXT_PUBLIC_BASE_URL}/payment/success`,
    })
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json({ message: "Payment failed", error: (error as Error).message }, { status: 500 })
  }
}

// Helper function to generate Izico signature (example, adjust according to Izico docs)
function generateIzicoSignature(apiKey: string, secretKey: string, params: Record<string, any>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => params[key])
    .join("")
  const hash = crypto
    .createHmac("sha256", secretKey)
    .update(apiKey + sortedParams)
    .digest("hex")
  return hash
}
