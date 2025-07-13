import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { dbService } from "@/lib/database"
import { notFound } from "next/navigation"
import Image from "next/image"
import WhatsAppButton from "@/components/whatsapp-button"

export default async function AboutUsPage() {
  const aboutUsContent = await dbService.getPageContent("hakkimizda")

  if (!aboutUsContent) {
    notFound() // İçerik bulunamazsa 404 sayfası göster
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Hakkımızda</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/about-us-hero.jpg"
                alt="Hakkımızda"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="prose prose-lg text-gray-700 max-w-none">
              {/* Veritabanından gelen HTML içeriğini güvenli bir şekilde render et */}
              <div dangerouslySetInnerHTML={{ __html: aboutUsContent.content }} />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppButton phoneNumber="+905545000061" />
    </div>
  )
}
