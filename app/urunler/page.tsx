import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { dbService } from "@/lib/database"
import { ShoppingBag, PhoneCall } from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"

export const dynamic = "force-dynamic"

export default async function ProductsPage() {
  const products = await dbService.getAllProducts()

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[400px] overflow-hidden">
          <Image
            src="/images/products-hero.jpg"
            alt="Ürünlerimiz"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-0"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center z-10">
            <div className="max-w-4xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Ürünlerimiz</h1>
              <p className="text-xl text-gray-200">Kaliteli Elektrik Malzemeleri ve Ekipmanları</p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tüm Ürünlerimiz</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Elektrik projeleriniz için ihtiyacınız olan tüm kaliteli malzemeler ve ekipmanlar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
                  <div className="relative w-full h-48">
                    <Image
                      src={product.imageUrl || "/placeholder.svg?height=300&width=400"}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                    {product.featured && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Öne Çıkan
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-red-600">{product.price.toFixed(2)} TL</span>
                      {product.stock && product.stock > 0 ? (
                        <span className="text-green-600 text-sm font-medium">Stokta</span>
                      ) : (
                        <span className="text-red-600 text-sm font-medium">Tükendi</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/urunler/${product.slug}`} className="flex-1">
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm">
                          <ShoppingBag className="h-4 w-4 mr-1" />
                          İncele
                        </Button>
                      </Link>
                      <Link href="tel:+905545000061">
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-transparent"
                        >
                          <PhoneCall className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-red-600 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Aradığınız Ürünü Bulamadınız mı?</h2>
            <p className="text-lg md:text-xl mb-8">
              Geniş ürün yelpazemiz için bize ulaşın, size en uygun çözümü bulalım!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="tel:+905545000061">
                <Button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                  <PhoneCall className="h-5 w-5 mr-2" />
                  Hemen Ara: +90 554 500 00 61
                </Button>
              </Link>
              <Link href="https://wa.me/905545000061">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 text-lg font-semibold bg-transparent"
                >
                  WhatsApp ile İletişim
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton phoneNumber="+905545000061" />
    </div>
  )
}
