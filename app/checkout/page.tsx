"use client"

import Link from "next/link"

import type React from "react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const subtotal = getTotalPrice()
  const tax = subtotal * 0.18
  const shipping = 0 // Şimdilik sabit
  const total = subtotal + tax + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (cartItems.length === 0) {
      setError("Sepetiniz boş. Lütfen ürün ekleyin.")
      setLoading(false)
      return
    }

    try {
      // 1. Siparişi veritabanına kaydet
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerAddress: formData.address,
          subtotal: subtotal,
          taxAmount: tax,
          shippingAmount: shipping,
          totalAmount: total,
          notes: formData.notes,
          orderItems: cartItems.map((item) => ({
            productId: item.type === "product" ? item.id : null,
            serviceId: item.type === "service" ? item.id : null,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity,
          })),
        }),
      })

      const orderData = await orderResponse.json()

      if (!orderResponse.ok) {
        throw new Error(orderData.error || "Sipariş oluşturulamadı.")
      }

      // 2. iZico ödeme isteğini gönder
      const paymentResponse = await fetch("/api/izico/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderData.id, // Oluşturulan siparişin ID'si
          amount: total,
          customerInfo: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
          },
        }),
      })

      const paymentData = await paymentResponse.json()

      if (!paymentResponse.ok || paymentData.status !== "success") {
        throw new Error(paymentData.error || "Ödeme başlatılamadı.")
      }

      // 3. Ödeme sayfasına yönlendir (iZico mock URL'si)
      clearCart() // Sepeti temizle
      router.push(paymentData.paymentUrl)
    } catch (err: any) {
      console.error("Checkout error:", err)
      setError(err.message || "Ödeme sırasında bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0 && !loading && !error) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 container mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Ödeme Sayfası</h1>
          <p className="text-lg text-gray-600 mb-6">Ödeme yapmak için sepetinizde ürün bulunmamaktadır.</p>
          <Button asChild className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-4">
            <Link href="/urunler">Ürünleri Keşfet</Link>
          </Button>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Ödeme Sayfası</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Teslimat Bilgileri</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Ad Soyad</Label>
                      <Input id="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="email">E-posta</Label>
                      <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefon Numarası</Label>
                    <Input id="phone" value={formData.phone} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="address">Adres</Label>
                    <Textarea id="address" value={formData.address} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="notes">Sipariş Notları (Opsiyonel)</Label>
                    <Textarea id="notes" value={formData.notes} onChange={handleInputChange} />
                  </div>
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6"
                    disabled={loading}
                  >
                    {loading ? "Ödeme Yönlendiriliyor..." : "Siparişi Tamamla ve Ödeme Yap"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Sipariş Özeti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.type}-${item.id}`} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={item.imageUrl || "/placeholder.svg?height=32&width=32"}
                        alt={item.name}
                        width={32}
                        height={32}
                        objectFit="cover"
                        className="rounded-sm"
                      />
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                    </div>
                    <span>₺{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Ara Toplam:</span>
                    <span>₺{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>KDV (%18):</span>
                    <span>₺{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kargo:</span>
                    <span>₺{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl">
                    <span>Toplam:</span>
                    <span>₺{total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
