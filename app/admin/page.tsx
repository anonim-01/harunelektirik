"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  FileText,
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Eye,
  Zap,
  CreditCard,
  Globe,
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [services, setServices] = useState([])
  const [pages, setPages] = useState([])
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch data from Prisma API endpoints
        const [productsRes, ordersRes, servicesRes, statsRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/orders"),
          fetch("/api/services"),
          fetch("/api/stats"),
        ])

        const [productsData, ordersData, servicesData, statsData] = await Promise.all([
          productsRes.json(),
          ordersRes.json(),
          servicesRes.json(),
          statsRes.json(),
        ])

        setProducts(productsData)
        setOrders(ordersData)
        setServices(servicesData)
        setStats(statsData)
      } catch (error) {
        console.error("API error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Zap className="h-12 w-12 text-red-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Zap className="h-8 w-8 text-red-600" />
            <h1 className="text-2xl font-bold text-gray-900">HARUN ELEKTRİK</h1>
            <Badge variant="secondary">Admin Panel</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Globe className="h-4 w-4 mr-2" />
              Siteyi Görüntüle
            </Button>
            <Button variant="outline" size="sm">
              Çıkış Yap
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              <Button
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("dashboard")}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === "products" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("products")}
              >
                <Package className="h-4 w-4 mr-2" />
                Ürün Yönetimi
              </Button>
              <Button
                variant={activeTab === "orders" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("orders")}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Sipariş Yönetimi
              </Button>
              <Button
                variant={activeTab === "services" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("services")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Hizmet Yönetimi
              </Button>
              <Button
                variant={activeTab === "pages" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("pages")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Sayfa Yönetimi
              </Button>
              <Button
                variant={activeTab === "integrations" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("integrations")}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Entegrasyonlar
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Dashboard</h2>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Toplam Sipariş</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalOrders}</div>
                    <p className="text-xs text-muted-foreground">+20.1% geçen aydan</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₺{stats.totalRevenue.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">+15.3% geçen aydan</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Aktif Ürünler</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalProducts}</div>
                    <p className="text-xs text-muted-foreground">+5 yeni ürün</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Müşteri Sayısı</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalCustomers}</div>
                    <p className="text-xs text-muted-foreground">+12 yeni müşteri</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Son Siparişler</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sipariş No</TableHead>
                        <TableHead>Müşteri</TableHead>
                        <TableHead>Tutar</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead>Tarih</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.slice(0, 5).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>#{order.orderNumber}</TableCell>
                          <TableCell>{order.customerName}</TableCell>
                          <TableCell>₺{order.totalAmount}</TableCell>
                          <TableCell>
                            <Badge variant={order.status === "COMPLETED" ? "default" : "secondary"}>
                              {order.status === "COMPLETED"
                                ? "Tamamlandı"
                                : order.status === "PENDING"
                                  ? "Bekliyor"
                                  : "İşleniyor"}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(order.createdAt).toLocaleDateString("tr-TR")}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Ürün Yönetimi</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Yeni Ürün Ekle
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Yeni Ürün Ekle</DialogTitle>
                      <DialogDescription>Yeni bir ürün eklemek için aşağıdaki formu doldurun.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="product-name">Ürün Adı</Label>
                          <Input id="product-name" placeholder="Ürün adını girin" />
                        </div>
                        <div>
                          <Label htmlFor="product-price">Fiyat (₺)</Label>
                          <Input id="product-price" type="number" placeholder="0.00" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="product-category">Kategori</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Kategori seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="elektrik">Elektrik Malzemeleri</SelectItem>
                              <SelectItem value="aydinlatma">Aydınlatma</SelectItem>
                              <SelectItem value="guvenlik">Güvenlik</SelectItem>
                              <SelectItem value="kablo">Kablo ve Aksesuarlar</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="product-stock">Stok Adedi</Label>
                          <Input id="product-stock" type="number" placeholder="0" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="product-description">Ürün Açıklaması</Label>
                        <Textarea id="product-description" placeholder="Ürün açıklamasını girin" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Ürünü Kaydet</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ürün Adı</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Fiyat</TableHead>
                        <TableHead>Stok</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead>İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category?.name || "Kategori Yok"}</TableCell>
                          <TableCell>₺{product.price}</TableCell>
                          <TableCell>{product.stockQuantity}</TableCell>
                          <TableCell>
                            <Badge variant={product.isActive ? "default" : "secondary"}>
                              {product.isActive ? "Aktif" : "Pasif"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Hizmet Yönetimi</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Yeni Hizmet Ekle
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Yeni Hizmet Ekle</DialogTitle>
                      <DialogDescription>Yeni bir hizmet eklemek için aşağıdaki formu doldurun.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <Label htmlFor="service-name">Hizmet Adı</Label>
                        <Input id="service-name" placeholder="Hizmet adını girin" />
                      </div>
                      <div>
                        <Label htmlFor="service-description">Hizmet Açıklaması</Label>
                        <Textarea id="service-description" placeholder="Hizmet açıklamasını girin" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="service-price">Başlangıç Fiyatı (₺)</Label>
                          <Input id="service-price" type="number" placeholder="0.00" />
                        </div>
                        <div>
                          <Label htmlFor="service-duration">Tahmini Süre (saat)</Label>
                          <Input id="service-duration" type="number" placeholder="1" />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Hizmeti Kaydet</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Hizmet Adı</TableHead>
                        <TableHead>Açıklama</TableHead>
                        <TableHead>Başlangıç Fiyatı</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead>İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {services.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell className="font-medium">{service.name}</TableCell>
                          <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                          <TableCell>₺{service.price}</TableCell>
                          <TableCell>
                            <Badge variant={service.isActive ? "default" : "secondary"}>
                              {service.isActive ? "Aktif" : "Pasif"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "integrations" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Entegrasyonlar</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* iZico Payment Integration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      iZico Ödeme Sistemi
                    </CardTitle>
                    <CardDescription>iZico ödeme sistemi API entegrasyonu</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="izico-api-key">API Anahtarı</Label>
                      <Input id="izico-api-key" type="password" placeholder="iZico API anahtarınızı girin" />
                    </div>
                    <div>
                      <Label htmlFor="izico-secret-key">Gizli Anahtar</Label>
                      <Input id="izico-secret-key" type="password" placeholder="iZico gizli anahtarınızı girin" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="izico-test-mode" />
                      <Label htmlFor="izico-test-mode">Test Modu</Label>
                    </div>
                    <Button className="w-full">Ayarları Kaydet</Button>
                  </CardContent>
                </Card>

                {/* WhatsApp Integration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      WhatsApp Canlı Destek
                    </CardTitle>
                    <CardDescription>WhatsApp canlı destek entegrasyonu</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="whatsapp-number">WhatsApp Numarası</Label>
                      <Input id="whatsapp-number" placeholder="+90 555 123 45 67" />
                    </div>
                    <div>
                      <Label htmlFor="whatsapp-message">Varsayılan Mesaj</Label>
                      <Textarea
                        id="whatsapp-message"
                        placeholder="Merhaba! HARUN ELEKTRİK hakkında bilgi almak istiyorum."
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="whatsapp-enabled" />
                      <Label htmlFor="whatsapp-enabled">WhatsApp Desteği Aktif</Label>
                    </div>
                    <Button className="w-full">Ayarları Kaydet</Button>
                  </CardContent>
                </Card>
              </div>

              {/* API Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>API Ayarları</CardTitle>
                  <CardDescription>Sistem API ayarları ve webhook konfigürasyonları</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="webhook-url">Webhook URL</Label>
                      <Input id="webhook-url" placeholder="https://yourdomain.com/webhook" />
                    </div>
                    <div>
                      <Label htmlFor="api-timeout">API Timeout (saniye)</Label>
                      <Input id="api-timeout" type="number" placeholder="30" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="api-logging" />
                    <Label htmlFor="api-logging">API Loglarını Kaydet</Label>
                  </div>
                  <Button>API Ayarlarını Kaydet</Button>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
