"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (cart.length === 0) {
      toast({
        title: "Sepetiniz Boş",
        description: "Ödeme yapmadan önce lütfen sepetinize ürün ekleyin.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/izico/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          totalAmount: getTotalPrice(),
          cartItems: cart,
          // paymentToken: "mock_izico_token", // Gerçek entegrasyonda Izico'dan alınacak token
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast({
          title: "Siparişiniz Alındı!",
          description: "Ödeme başarılı. Siparişiniz işleniyor.",
        })
        clearCart()
        router.push(data.redirectUrl || "/payment/success")
      } else {
        throw new Error(data.message || "Ödeme işlemi başarısız oldu.")
      }
    } catch (error: any) {
      console.error("Checkout error:", error)
      toast({
        title: "Ödeme Hatası",
        description: error.message || "Bir sorun oluştu, lütfen tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Ödeme Sayfası</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Teslimat Bilgileri</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Adınız Soyadınız</Label>
                  <Input id="customerName" value={formData.customerName} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerEmail">E-posta Adresiniz</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerPhone">Telefon Numaranız</Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerAddress">Adresiniz</Label>
                <Textarea
                  id="customerAddress"
                  value={formData.customerAddress}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-lg py-3" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  `Siparişi Tamamla (${getTotalPrice().toFixed(2)} TL)`
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Sipariş Özeti</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-gray-700">
                  {item.name} (x{item.quantity})
                </span>
                <span className="font-medium">{(item.price * item.quantity).toFixed(2)} TL</span>
              </div>
            ))}
            <div className="border-t pt-4 mt-4 space-y-2">
              <div className="flex justify-between text-lg font-medium">
                <span>Ara Toplam:</span>
                <span>{getTotalPrice().toFixed(2)} TL</span>
              </div>
              <div className="flex justify-between text-lg font-medium">
                <span>Kargo:</span>
                <span>Ücretsiz</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-red-600">
                <span>Toplam:</span>
                <span>{getTotalPrice().toFixed(2)} TL</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
