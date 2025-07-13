import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { dbService } from "@/lib/database"
import { ArrowLeft, Star, Truck, Shield, PhoneCall } from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"

export const dynamic = "force-dynamic"

interface ProductDetailPageProps {
  params: {
    slug: string
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await dbService.getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Product Details */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <Link href="/urunler" className="inline-flex items-center text-red-600 hover:text-red-700 mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Tüm Ürünlere Dön
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Image */}
                <div>
                  <div className="relative w-full h-96 mb-4">
                    <Image
                      src={product.imageUrl || "/placeholder.svg?height=400&width=400"}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                    {product.isFeatured && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Öne Çıkan
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center text-yellow-500 mr-4">
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5" />
                      <span className="ml-2 text-gray-600">(4.5)</span>
                    </div>
                    {product.category && (
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {product.category.name}
                      </span>
                    )}
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-red-600">{product.price.toFixed(2)} TL</span>
                    <span className="text-gray-500 text-lg ml-2">KDV Dahil</span>
                  </div>

                  <div className="prose prose-lg text-gray-700 mb-8">
                    <p>{product.description}</p>
                  </div>

                  {/* Stock Status */}
                  <div className="mb-6">
                    {product.stock && product.stock > 0 ? (
                      <div className="flex items-center text-green-600">
                        <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                        <span className="font-medium">Stokta ({product.stock} adet)</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                        <span className="font-medium">Stokta Yok</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4 mb-8">
                    <div className="flex gap-4">
                      <Link href="tel:+905545000061" className="flex-1">
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-3">
                          <PhoneCall className="h-5 w-5 mr-2" />
                          Sipariş Ver
                        </Button>
                      </Link>
                      <Link href="https://wa.me/905545000061">
                        <Button
                          variant="outline"
                          className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-3 bg-transparent"
                        >
                          WhatsApp
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <Truck className="h-6 w-6 text-red-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-900">Hızlı Teslimat</div>
                        <div className="text-sm text-gray-600">Aynı gün kargo</div>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <Shield className="h-6 w-6 text-red-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-900">Garanti</div>
                        <div className="text-sm text-gray-600">2 yıl garanti</div>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <PhoneCall className="h-6 w-6 text-red-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-900">Destek</div>
                        <div className="text-sm text-gray-600">7/24 teknik destek</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Specifications */}
              <div className="mt-16">
                <Card className="p-8">
                  <CardContent className="p-0">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Ürün Özellikleri</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Teknik Özellikler</h3>
                        <ul className="space-y-2 text-gray-700">
                          <li>
                            <strong>Marka:</strong> Kaliteli marka
                          </li>
                          <li>
                            <strong>Model:</strong> {product.name}
                          </li>
                          <li>
                            <strong>Garanti:</strong> 2 yıl
                          </li>
                          <li>
                            <strong>Sertifika:</strong> CE, TSE
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Paket İçeriği</h3>
                        <ul className="space-y-2 text-gray-700">
                          <li>• 1 adet {product.name}</li>
                          <li>• Montaj aksesuarları</li>
                          <li>• Kullanım kılavuzu</li>
                          <li>• Garanti belgesi</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton phoneNumber="+905545000061" />
    </div>
  )
}
