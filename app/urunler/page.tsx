import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { dbService } from "@/lib/database"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

export default async function ProductsPage() {
  const products = await dbService.getAllProducts()

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Ürün Kataloğu</h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Elektrik tesisatınız, aydınlatma ihtiyaçlarınız ve daha fazlası için geniş ürün yelpazemizi keşfedin.
        </p>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-6">Şu anda görüntülenecek ürün bulunmamaktadır.</p>
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-4">
              <Link href="/">Ana Sayfaya Dön</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={product.imageUrl || "/placeholder.svg?height=200&width=300"}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">{product.name}</CardTitle>
                  <CardDescription className="text-gray-600 line-clamp-2">
                    {product.shortDescription || product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-red-600">₺{product.price.toFixed(2)}</span>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5" />
                      <span className="ml-1 text-gray-600 text-sm">(4.5)</span>
                    </div>
                  </div>
                  <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <Link href={`/urunler/${product.slug}`}>Ürünü İncele</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
