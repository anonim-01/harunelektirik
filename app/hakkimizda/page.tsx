import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { dbService } from "@/lib/database"
import { notFound } from "next/navigation"

export default async function AboutUsPage() {
  const aboutPage = await dbService.getPageBySlug("hakkimizda")

  if (!aboutPage || !aboutPage.content) {
    notFound() // Sayfa bulunamazsa veya içeriği yoksa 404 göster
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">{aboutPage.title}</h1>
        <div className="prose prose-lg mx-auto text-gray-700" dangerouslySetInnerHTML={{ __html: aboutPage.content }} />
      </main>
      <SiteFooter />
    </div>
  )
}
