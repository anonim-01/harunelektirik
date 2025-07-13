import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { dbService } from "@/lib/database"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Star, Package } from "lucide-react"

export default async function ProductsPage() {
  const products = await dbService.getAllProducts()
  const productCategories = await dbService.getProductCategories()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[400px] overflow-hidden">
          <Image
            src="/images/products-hero.jpg"
            alt="HARUN ELEKTRİK Ürünleri"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-0"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center z-10 p-4">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                Kaliteli Elektrik Ürünleri
              </h1>
              <p className="text-lg md:text-xl text-gray-200 drop-shadow-md">Güvenilir markalardan seçkin ürünler</p>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Ürün Kategorilerimiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productCategories.map((category) => (
                <Card
                  key={category.id}
                  className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white hover:scale-105"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={category.imageUrl || "/placeholder.svg?height=300&width=400"}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <Package className="h-8 w-8 mb-2" />
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{category.products.length} ürün</span>
                      <Button className="bg-red-600 hover:bg-red-700 text-white">Ürünleri Gör</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* All Products */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Tüm Ürünlerimiz</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white hover:scale-105"
                >
                  <Link href={`/urunler/${product.slug}`}>
                    <div className="relative w-full h-48">
                      <Image
                        src={product.imageUrl || "/placeholder.svg?height=300&width=400"}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300"
                      />
                      {product.isFeatured && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Öne Çıkan
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">{product.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold text-red-600">{product.price.toFixed(2)} TL</span>
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4" />
                          <span className="ml-1 text-gray-600 text-xs">(4.5)</span>
                        </div>
                      </div>
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                        <ShoppingBag className="h-4 w-4 mr-2" /> İncele
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ürün Danışmanlığı İçin Bize Ulaşın</h2>
            <p className="text-lg md:text-xl mb-8">Size en uygun ürünleri seçmenizde yardımcı olalım!</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="tel:+905545000061">
                <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  Hemen Ara: +90 554 500 00 61
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
      <SiteFooter />
    </div>
  )
}
