"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/context/cart-context"
import { ArrowLeft, ShoppingBag, Star, Plus, Minus, PhoneCall, CheckCircle } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string | null
  slug: string
  category?: {
    id: string
    name: string
  }
  isFeatured?: boolean
}

interface ProductDetailPageClientProps {
  product: Product
}

export function ProductDetailPageClient({ product }: ProductDetailPageClientProps) {
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

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  return (
    <main className="flex-1">
      {/* Product Detail */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link href="/urunler">
              <Button variant="outline" className="mb-6 bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" /> Ürünlere Geri Dön
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <Card className="overflow-hidden shadow-lg border border-gray-200">
                <div className="relative w-full h-96">
                  <Image
                    src={product.imageUrl || "/placeholder.svg?height=400&width=400"}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                  {product.isFeatured && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Öne Çıkan
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                {product.category && <p className="text-sm text-gray-600 mb-4">Kategori: {product.category.name}</p>}
                <div className="flex items-center mb-4">
                  <div className="flex items-center text-yellow-500 mr-4">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5" />
                    <span className="ml-2 text-gray-600 text-sm">(4.5) - 24 değerlendirme</span>
                  </div>
                </div>
                <div className="text-4xl font-bold text-red-600 mb-6">{product.price.toFixed(2)} TL</div>
              </div>

              <Card className="p-6 shadow-lg border border-gray-200 bg-white">
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ürün Açıklaması</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </CardContent>
              </Card>

              <Card className="p-6 shadow-lg border border-gray-200 bg-white">
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ürün Özellikleri</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      Yüksek kalite standartları
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      Uzun ömürlü kullanım
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      Güvenlik sertifikaları
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      Üretici garantisi
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Quantity and Add to Cart */}
              <Card className="p-6 shadow-lg border border-gray-200 bg-white">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-semibold text-gray-900">Adet:</span>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <Button variant="ghost" size="sm" onClick={decreaseQuantity} className="px-3 py-2">
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-4 py-2 text-lg font-semibold">{quantity}</span>
                        <Button variant="ghost" size="sm" onClick={increaseQuantity} className="px-3 py-2">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-red-600">{(product.price * quantity).toFixed(2)} TL</div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={handleAddToCart}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 text-lg"
                    >
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Sepete Ekle
                    </Button>
                    <Link href="tel:+905545000061">
                      <Button
                        variant="outline"
                        className="flex-1 border-red-600 text-red-600 hover:bg-red-50 py-3 text-lg bg-transparent"
                      >
                        <PhoneCall className="h-5 w-5 mr-2" />
                        Hemen Ara
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="p-6 shadow-lg border border-gray-200 bg-white">
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Destek ve Bilgi</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <PhoneCall className="h-5 w-5 text-red-600 mr-3" />
                      <span className="text-gray-700">+90 554 500 00 61</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Ürün hakkında detaylı bilgi almak veya teknik destek için bize ulaşabilirsiniz.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bu Ürünü Satın Almak İstiyorsunuz?</h2>
          <p className="text-lg md:text-xl mb-8">Hemen bize ulaşın, size yardımcı olalım!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="tel:+905545000061">
              <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <PhoneCall className="h-5 w-5 mr-2" /> Hemen Ara: +90 554 500 00 61
              </Button>
            </Link>
            <Link href="https://wa.me/905545000061">
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
              >
                WhatsApp Destek
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
