"use client"
import type { dbService } from "@/lib/database"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Star, ShoppingCart, Plus, Minus } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useState } from "react"

// Client Component olarak ayrılan kısım
export default function ProductDetailContent({
  product,
}: { product: Awaited<ReturnType<typeof dbService.getProductBySlug>> }) {
  const { addToCart, updateQuantity, cartItems } = useCart()
  const [quantity, setQuantity] = useState(1)

  const currentCartItem = cartItems.find((item) => item.id === product?.id && item.type === "product")

  const handleAddToCart = () => {
    if (product) {
      addToCart(
        {
          id: product.id,
          name: product.name,
          price: product.price.toNumber(), // Decimal'ı number'a çevir
          imageUrl: product.imageUrl || "/placeholder.svg",
          type: "product",
        },
        quantity,
      )
    }
  }

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
        <Image
          src={product.imageUrl || "/placeholder.svg?height=500&width=500"}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
        <div className="flex items-center space-x-2 text-yellow-500">
          <Star className="h-6 w-6 fill-current" />
          <Star className="h-6 w-6 fill-current" />
          <Star className="h-6 w-6 fill-current" />
          <Star className="h-6 w-6 fill-current" />
          <Star className="h-6 w-6" />
          <span className="text-lg text-gray-600 ml-2">(4.5 / 5 Puan)</span>
        </div>
        <p className="text-3xl font-bold text-red-600">₺{product.price.toFixed(2)}</p>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>

        <div className="flex items-center space-x-4">
          <div className="flex items-center border rounded-md">
            <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
              <Minus className="h-5 w-5" />
            </Button>
            <span className="px-4 text-lg font-medium">{quantity}</span>
            <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)}>
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 flex items-center space-x-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Sepete Ekle</span>
          </Button>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Ürün Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Kategori:</span> {product.category?.name || "Belirtilmemiş"}
            </p>
            <p>
              <span className="font-semibold">Stok Durumu:</span>{" "}
              {product.stockQuantity > 0 ? `${product.stockQuantity} Adet Stokta` : "Stokta Yok"}
            </p>
            {product.sku && (
              <p>
                <span className="font-semibold">SKU:</span> {product.sku}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
