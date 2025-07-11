"use client"

import type React from "react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart()

  const handleQuantityChange = (id: number, type: "product" | "service", e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Number.parseInt(e.target.value)
    if (!isNaN(quantity)) {
      updateQuantity(id, type, quantity)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Sepetim</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-6">Sepetinizde henüz ürün veya hizmet bulunmamaktadır.</p>
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-4">
              <Link href="/urunler">Ürünleri Keşfet</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sepet İçeriği</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Görsel</TableHead>
                        <TableHead>Ürün/Hizmet</TableHead>
                        <TableHead>Fiyat</TableHead>
                        <TableHead className="w-[120px]">Miktar</TableHead>
                        <TableHead>Toplam</TableHead>
                        <TableHead className="w-[80px]">Sil</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={`${item.type}-${item.id}`}>
                          <TableCell>
                            <Image
                              src={item.imageUrl || "/placeholder.svg?height=64&width=64"}
                              alt={item.name}
                              width={64}
                              height={64}
                              objectFit="cover"
                              className="rounded-md"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>₺{item.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, item.type, e)}
                              className="w-20"
                            />
                          </TableCell>
                          <TableCell>₺{(item.price * item.quantity).toFixed(2)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id, item.type)}>
                              <Trash2 className="h-5 w-5 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Sipariş Özeti</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Ara Toplam:</span>
                    <span>₺{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>KDV (%18):</span>
                    <span>₺{(getTotalPrice() * 0.18).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kargo:</span>
                    <span>₺0.00</span> {/* Şimdilik sabit */}
                  </div>
                  <div className="border-t pt-4 flex justify-between font-bold text-xl">
                    <span>Toplam:</span>
                    <span>₺{(getTotalPrice() * 1.18).toFixed(2)}</span>
                  </div>
                  <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6">
                    <Link href="/checkout">Ödeme Yap</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
