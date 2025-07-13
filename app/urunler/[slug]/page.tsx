import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductDetailPageClient } from "./ProductDetailPageClient"
import { dbService } from "@/lib/database"
import { notFound } from "next/navigation"

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SiteHeader />
      <ProductDetailPageClient product={product} />
      <SiteFooter />
    </div>
  )
}
