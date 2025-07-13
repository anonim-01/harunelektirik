"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, PhoneCall, ArrowLeft } from "lucide-react"
import type { Product } from "@prisma/client"

interface ProductDetailPageClientProps {
  product: Product
}

export default function ProductDetailPageClient({ product }: ProductDetailPageClientProps) {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    // Implement add to cart logic here
    console.log(`Added ${quantity} of ${product.name} to cart.`)
    // You might want to use a global state management (like Context API or Zustand)
    // or a server action to handle this.
  }

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0 brightness-[0.6]"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center text-center p-4 bg-black/30">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">{product.name}</h1>
        </div>
      </section>

      {/* Product Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                layout="fill"
                objectFit="contain"
                className="bg-gray-100 p-4"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{product.description}</p>
              {product.details && (
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ürün Detayları</h3>
                  <p>{product.details}</p>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-red-600">{product.price.toFixed(2)} TL</span>
                {product.stock && product.stock > 0 ? (
                  <span className="text-green-600 text-lg font-medium">Stokta: {product.stock} adet</span>
                ) : (
                  <span className="text-red-600 text-lg font-medium">Stokta Yok</span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-red-600 hover:bg-red-700 text-white flex-1" onClick={handleAddToCart}>
                  <ShoppingBag className="h-5 w-5 mr-2" /> Sepete Ekle
                </Button>
                <Link href="tel:+905545000061" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    <PhoneCall className="h-5 w-5 mr-2" /> Bilgi Al
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link href="/urunler">
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" /> Tüm Ürünlere Geri Dön
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
