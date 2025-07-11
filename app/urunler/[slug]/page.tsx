import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { dbService } from "@/lib/database"
import { notFound } from "next/navigation"
import ProductDetailContent from "./ProductDetailPageClient"

export async function generateStaticParams() {
  const products = await dbService.getAllProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const product = await dbService.getProductBySlug(slug)

  if (!product) {
    notFound() // Ürün bulunamazsa 404 sayfası göster
  }

  // Client Component'te useCart kullanabilmek için bu kısmı ayırıyoruz
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <ProductDetailContent product={product} />
      </main>
      <SiteFooter />
    </div>
  )
}
