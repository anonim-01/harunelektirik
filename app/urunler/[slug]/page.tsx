import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { dbService } from "@/lib/database"
import { notFound } from "next/navigation"
import ProductDetailPageClient from "./ProductDetailPageClient"
import WhatsAppButton from "@/components/whatsapp-button"

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await dbService.getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <ProductDetailPageClient product={product} />
        </div>
      </main>
      <SiteFooter />
      <WhatsAppButton phoneNumber="+905545000061" />
    </div>
  )
}
