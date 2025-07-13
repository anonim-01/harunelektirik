import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-100 px-4 py-12">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader className="bg-green-500 text-white rounded-t-lg py-6">
          <CheckCircle className="mx-auto h-16 w-16 mb-4" />
          <CardTitle className="text-3xl font-bold">Ödeme Başarılı!</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <p className="text-lg text-gray-700">Siparişiniz başarıyla alınmıştır.</p>
          <p className="text-gray-600">En kısa sürede sizinle iletişime geçeceğiz.</p>
          <div className="flex flex-col gap-3 pt-4">
            <Link href="/" passHref>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-lg py-3">Ana Sayfaya Dön</Button>
            </Link>
            <Link href="/urunler" passHref>
              <Button variant="outline" className="w-full text-red-600 border-red-600 hover:bg-red-50 bg-transparent">
                Ürünlere Göz At
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
