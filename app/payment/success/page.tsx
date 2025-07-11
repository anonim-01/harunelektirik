import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage({ searchParams }: { searchParams: { orderId?: string } }) {
  const orderId = searchParams.orderId

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-16 text-center">
        <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Ödeme Başarılı!</h1>
        <p className="text-lg text-gray-600 mb-8">Siparişiniz başarıyla alındı. Teşekkür ederiz!</p>
        {orderId && (
          <p className="text-md text-gray-700 mb-8">
            Sipariş Numaranız: <span className="font-semibold">#{orderId}</span>
          </p>
        )}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-4">
            <Link href="/">Ana Sayfaya Dön</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent text-lg px-8 py-4"
          >
            <Link href="/hizmetlerimiz">Hizmetlerimizi Keşfet</Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
