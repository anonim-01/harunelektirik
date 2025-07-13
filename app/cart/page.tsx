"use client"

import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Minus, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart()

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Sepetim</h1>

      {cart.length === 0 ? (
        <Card className="max-w-2xl mx-auto text-center py-12">
          <CardTitle className="text-2xl font-semibold mb-4">Sepetiniz Boş</CardTitle>
          <CardContent>
            <p className="text-gray-600 mb-6">Henüz sepetinize ürün eklemediniz. Ürünlerimizi keşfetmeye başlayın!</p>
            <Link href="/urunler">
              <Button className="bg-red-600 hover:bg-red-700">Ürünlere Göz At</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Sepet İçeriği</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ürün</TableHead>
                      <TableHead className="text-center">Fiyat</TableHead>
                      <TableHead className="text-center">Miktar</TableHead>
                      <TableHead className="text-right">Toplam</TableHead>
                      <TableHead className="text-right">İşlem</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium flex items-center gap-3">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <span>{item.name}</span>
                        </TableCell>
                        <TableCell className="text-center">{item.price.toFixed(2)} TL</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{(item.price * item.quantity).toFixed(2)} TL</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
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
                <CardTitle className="text-2xl font-semibold">Sipariş Özeti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
              <CardFooter>
                <Link href="/checkout" className="w-full">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-lg py-3">
                    Ödeme Yap ({getTotalPrice().toFixed(2)} TL)
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
