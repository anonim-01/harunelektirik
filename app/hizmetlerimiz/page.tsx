import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { dbService } from "@/lib/database"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default async function ServicesPage() {
  const serviceCategories = await dbService.getAllServiceCategories()

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Hizmetlerimiz</h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Elektrik arızalarından tesisat yenilemeye, aydınlatma çözümlerinden güvenlik sistemlerine kadar geniş bir
          yelpazede profesyonel elektrik hizmetleri sunuyoruz.
        </p>

        {serviceCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-6">Şu anda görüntülenecek hizmet kategorisi bulunmamaktadır.</p>
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-4">
              <Link href="/">Ana Sayfaya Dön</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {serviceCategories.map((category) => (
              <Card key={category.id} className="shadow-lg h-full flex flex-col">
                <CardHeader className="bg-red-600 text-white py-4 rounded-t-lg">
                  <CardTitle className="text-xl font-bold text-center">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  {category.services.length === 0 ? (
                    <p className="text-gray-600 text-center py-4">Bu kategoride hizmet bulunmamaktadır.</p>
                  ) : (
                    <ul className="space-y-2">
                      {category.services.map((service) => (
                        <li key={service.id}>
                          <Link
                            href={`/hizmetlerimiz/${service.slug}`}
                            className="block text-gray-700 hover:text-red-600 hover:underline transition-colors"
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
                {category.services.length > 0 && (
                  <div className="p-4 border-t">
                    <Button asChild variant="link" className="text-red-600 hover:text-red-700 p-0 h-auto">
                      <Link href={`/hizmetlerimiz/${category.slug}`}>
                        Tümünü Gör <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
