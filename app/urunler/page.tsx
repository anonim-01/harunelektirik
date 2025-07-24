import Image from "next/image"
import Link from "next/link"
import { dbService } from "@/lib/database"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export default async function UrunlerPage() {
  const products = await dbService.getProducts()

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <Image
          src="/images/products-hero.jpg"
          alt="Ürünlerimiz Hero"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-50 px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Ürünlerimiz</h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl">
            En kaliteli elektrik ve elektronik ürünlerini en uygun fiyatlarla Harun Elektrik güvencesiyle keşfedin.
          </p>
        </div>
      </section>

      <main className="flex-1 py-12 md:py-16 lg:py-20 px-4 md:px-6">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full h-48">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-md"
                />
              </div>
              <CardHeader className="flex-grow">
                <CardTitle className="text-xl font-bold line-clamp-2">{product.name}</CardTitle>
                <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">{product.price.toFixed(2)} TL</span>
                  {product.stock > 0 ? (
                    <span className="text-sm text-green-600">Stokta: {product.stock}</span>
                  ) : (
                    <span className="text-sm text-red-600">Stokta Yok</span>
                  )}
                </div>
                <Link href={`/urunler/${product.slug}`} passHref>
                  <Button className="w-full" disabled={product.stock === 0}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    İncele
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
