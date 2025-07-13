"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Minus, Plus, PhoneCall } from "lucide-react"
import { useCart } from "@/context/cart-context"
import Link from "next/link"

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string | null
  category: string | null
  stock: number
  slug: string
}

interface ProductDetailPageClientProps {
  product: Product
}

export default function ProductDetailPageClient({ product }: ProductDetailPageClientProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: quantity,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div className="relative w-full h-80 md:h-[500px] rounded-lg overflow-hidden shadow-md">
        <Image
          src={product.imageUrl || "/placeholder.svg?height=600&width=800"}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-gray-600 text-lg">{product.category && `Kategori: ${product.category}`}</p>
        <p className="text-gray-700 text-xl leading-relaxed">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-5xl font-extrabold text-red-600">{product.price.toFixed(2)} TL</span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              <Minus className="h-5 w-5" />
            </Button>
            <span className="text-2xl font-semibold text-gray-900">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((prev) => prev + 1)}
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <Button
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-xl rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-6 w-6 mr-3" /> Sepete Ekle
        </Button>
        <Link href="tel:+905545000061">
          <Button
            variant="outline"
            className="w-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-3 text-xl rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mt-4 bg-transparent"
          >
            <PhoneCall className="h-6 w-6 mr-3" /> Telefonla Sipariş Ver
          </Button>
        </Link>
      </div>
    </div>
  )
}
