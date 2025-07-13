"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Settings, Service, Product, Order } from "@prisma/client"
import {
  Loader2,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  LogOut,
  Home,
  Package,
  Wrench,
  SettingsIcon,
  ShoppingCart,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface Stats {
  totalServices: number
  totalProducts: number
  totalOrders: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<Stats | null>(null)
  const [settings, setSettings] = useState<Settings | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const [currentService, setCurrentService] = useState<Partial<Service> | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
    } else {
      setLoading(false)
      fetchData()
    }
  }, [router])

  const fetchData = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("adminToken")
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }

      const [statsRes, settingsRes, servicesRes, productsRes, ordersRes] = await Promise.all([
        fetch("/api/stats", { headers }),
        fetch("/api/settings", { headers }),
        fetch("/api/services", { headers }),
        fetch("/api/products", { headers }),
        fetch("/api/orders", { headers }),
      ])

      if (statsRes.ok) setStats(await statsRes.json())
      if (settingsRes.ok) setSettings(await settingsRes.json())
      if (servicesRes.ok) setServices(await servicesRes.json())
      if (productsRes.ok) setProducts(await productsRes.json())
      if (ordersRes.ok) setOrders(await ordersRes.json())
    } catch (error) {
      console.error("Failed to fetch admin data:", error)
      toast({
        title: "Hata",
        description: "Veriler yüklenirken bir sorun oluştu.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    router.push("/admin/login")
  }

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleSettingsSave = async () => {
    if (!settings) return
    setLoading(true)
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      })
      if (response.ok) {
        toast({ title: "Ayarlar Kaydedildi", description: "Site ayarları başarıyla güncellendi." })
      } else {
        throw new Error("Ayarlar kaydedilemedi.")
      }
    } catch (error: any) {
      toast({ title: "Hata", description: error.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  // Service Management
  const openServiceModal = (service?: Service) => {
    setCurrentService(service || { id: "", name: "", description: "", image: "", slug: "" })
    setIsServiceModalOpen(true)
  }

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentService((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const saveService = async () => {
    if (!currentService) return
    setLoading(true)
    try {
      const token = localStorage.getItem("adminToken")
      const method = currentService.id ? "PUT" : "POST"
      const url = currentService.id ? `/api/services?id=${currentService.id}` : "/api/services"
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentService),
      })
      if (response.ok) {
        toast({ title: "Hizmet Kaydedildi", description: "Hizmet başarıyla güncellendi/eklendi." })
        setIsServiceModalOpen(false)
        fetchData()
      } else {
        throw new Error("Hizmet kaydedilemedi.")
      }
    } catch (error: any) {
      toast({ title: "Hata", description: error.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const deleteService = async (id: string) => {
    if (!confirm("Bu hizmeti silmek istediğinizden emin misiniz?")) return
    setLoading(true)
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch(`/api/services?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        toast({ title: "Hizmet Silindi", description: "Hizmet başarıyla silindi." })
        fetchData()
      } else {
        throw new Error("Hizmet silinemedi.")
      }
    } catch (error: any) {
      toast({ title: "Hata", description: error.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  // Product Management
  const openProductModal = (product?: Product) => {
    setCurrentProduct(product || { id: "", name: "", description: "", image: "", price: 0, slug: "", category: "" })
    setIsProductModalOpen(true)
  }

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentProduct((prev) =>
      prev ? { ...prev, [name]: name === "price" ? Number.parseFloat(value) : value } : null,
    )
  }

  const saveProduct = async () => {
    if (!currentProduct) return
    setLoading(true)
    try {
      const token = localStorage.getItem("adminToken")
      const method = currentProduct.id ? "PUT" : "POST"
      const url = currentProduct.id ? `/api/products?id=${currentProduct.id}` : "/api/products"
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentProduct),
      })
      if (response.ok) {
        toast({ title: "Ürün Kaydedildi", description: "Ürün başarıyla güncellendi/eklendi." })
        setIsProductModalOpen(false)
        fetchData()
      } else {
        throw new Error("Ürün kaydedilemedi.")
      }
    } catch (error: any) {
      toast({ title: "Hata", description: error.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: string) => {
    if (!confirm("Bu ürünü silmek istediğinizden emin misiniz?")) return
    setLoading(true)
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        toast({ title: "Ürün Silindi", description: "Ürün başarıyla silindi." })
        fetchData()
      } else {
        throw new Error("Ürün silinemedi.")
      }
    } catch (error: any) {
      toast({ title: "Hata", description: error.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  // Order Management
  const openOrderModal = (order: Order) => {
    setCurrentOrder(order)
    setIsOrderModalOpen(true)
  }

  const handleOrderStatusChange = async (orderId: string, newStatus: string) => {
    setLoading(true)
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch(`/api/orders?id=${orderId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })
      if (response.ok) {
        toast({ title: "Sipariş Güncellendi", description: "Sipariş durumu başarıyla güncellendi." })
        fetchData()
        if (currentOrder && currentOrder.id === orderId) {
          setCurrentOrder((prev) => (prev ? { ...prev, status: newStatus } : null))
        }
      } else {
        throw new Error("Sipariş durumu güncellenemedi.")
      }
    } catch (error: any) {
      toast({ title: "Hata", description: error.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Loader2 className="h-12 w-12 animate-spin text-red-600" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-red-500">Harun Elektrik Admin</h2>
        <nav className="flex-grow">
          <ul>
            <li className="mb-4">
              <Button
                variant="ghost"
                className={`w-full justify-start text-lg ${activeTab === "dashboard" ? "bg-gray-700 text-red-400" : "text-gray-300 hover:bg-gray-700"}`}
                onClick={() => setActiveTab("dashboard")}
              >
                <Home className="mr-3 h-5 w-5" />
                Dashboard
              </Button>
            </li>
            <li className="mb-4">
              <Button
                variant="ghost"
                className={`w-full justify-start text-lg ${activeTab === "services" ? "bg-gray-700 text-red-400" : "text-gray-300 hover:bg-gray-700"}`}
                onClick={() => setActiveTab("services")}
              >
                <Wrench className="mr-3 h-5 w-5" />
                Hizmetler
              </Button>
            </li>
            <li className="mb-4">
              <Button
                variant="ghost"
                className={`w-full justify-start text-lg ${activeTab === "products" ? "bg-gray-700 text-red-400" : "text-gray-300 hover:bg-gray-700"}`}
                onClick={() => setActiveTab("products")}
              >
                <Package className="mr-3 h-5 w-5" />
                Ürünler
              </Button>
            </li>
            <li className="mb-4">
              <Button
                variant="ghost"
                className={`w-full justify-start text-lg ${activeTab === "orders" ? "bg-gray-700 text-red-400" : "text-gray-300 hover:bg-gray-700"}`}
                onClick={() => setActiveTab("orders")}
              >
                <ShoppingCart className="mr-3 h-5 w-5" />
                Siparişler
              </Button>
            </li>
            <li className="mb-4">
              <Button
                variant="ghost"
                className={`w-full justify-start text-lg ${activeTab === "settings" ? "bg-gray-700 text-red-400" : "text-gray-300 hover:bg-gray-700"}`}
                onClick={() => setActiveTab("settings")}
              >
                <SettingsIcon className="mr-3 h-5 w-5" />
                Ayarlar
              </Button>
            </li>
          </ul>
        </nav>
        <Button
          variant="ghost"
          className="w-full justify-start text-lg text-gray-300 hover:bg-gray-700"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Çıkış Yap
        </Button>
      </aside>

      <main className="flex-1 p-8">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-4xl font-bold mb-8 text-gray-900">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white shadow-lg rounded-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">Toplam Hizmetler</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-bold text-red-600">{stats?.totalServices}</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg rounded-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">Toplam Ürünler</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-bold text-red-600">{stats?.totalProducts}</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg rounded-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">Toplam Siparişler</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-bold text-red-600">{stats?.totalOrders}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900">Hizmet Yönetimi</h1>
              <Button className="bg-red-600 hover:bg-red-700" onClick={() => openServiceModal()}>
                <Plus className="mr-2 h-5 w-5" />
                Yeni Hizmet Ekle
              </Button>
            </div>
            <Card className="bg-white shadow-lg rounded-lg">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Adı</TableHead>
                      <TableHead>Açıklama</TableHead>
                      <TableHead>Görsel</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.name}</TableCell>
                        <TableCell className="text-gray-600">{service.description.substring(0, 50)}...</TableCell>
                        <TableCell>
                          <img
                            src={service.image || "/placeholder.svg"}
                            alt={service.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell>{service.slug}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => openServiceModal(service)}>
                            <Edit className="h-5 w-5 text-blue-500" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteService(service.id)}>
                            <Trash2 className="h-5 w-5 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Dialog open={isServiceModalOpen} onOpenChange={setIsServiceModalOpen}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{currentService?.id ? "Hizmeti Düzenle" : "Yeni Hizmet Ekle"}</DialogTitle>
                  <DialogDescription>Hizmet bilgilerini girin ve kaydedin.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="serviceName" className="text-right">
                      Adı
                    </Label>
                    <Input
                      id="serviceName"
                      name="name"
                      value={currentService?.name || ""}
                      onChange={handleServiceChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="serviceDescription" className="text-right">
                      Açıklama
                    </Label>
                    <Textarea
                      id="serviceDescription"
                      name="description"
                      value={currentService?.description || ""}
                      onChange={handleServiceChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="serviceImage" className="text-right">
                      Görsel URL
                    </Label>
                    <Input
                      id="serviceImage"
                      name="image"
                      value={currentService?.image || ""}
                      onChange={handleServiceChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="serviceSlug" className="text-right">
                      Slug
                    </Label>
                    <Input
                      id="serviceSlug"
                      name="slug"
                      value={currentService?.slug || ""}
                      onChange={handleServiceChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsServiceModalOpen(false)}>
                    <X className="mr-2 h-4 w-4" />
                    İptal
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700" onClick={saveService} disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Kaydet
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900">Ürün Yönetimi</h1>
              <Button className="bg-red-600 hover:bg-red-700" onClick={() => openProductModal()}>
                <Plus className="mr-2 h-5 w-5" />
                Yeni Ürün Ekle
              </Button>
            </div>
            <Card className="bg-white shadow-lg rounded-lg">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Adı</TableHead>
                      <TableHead>Açıklama</TableHead>
                      <TableHead>Fiyat</TableHead>
                      <TableHead>Görsel</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="text-gray-600">{product.description.substring(0, 50)}...</TableCell>
                        <TableCell>{product.price.toFixed(2)} TL</TableCell>
                        <TableCell>
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.slug}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => openProductModal(product)}>
                            <Edit className="h-5 w-5 text-blue-500" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteProduct(product.id)}>
                            <Trash2 className="h-5 w-5 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{currentProduct?.id ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</DialogTitle>
                  <DialogDescription>Ürün bilgilerini girin ve kaydedin.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productName" className="text-right">
                      Adı
                    </Label>
                    <Input
                      id="productName"
                      name="name"
                      value={currentProduct?.name || ""}
                      onChange={handleProductChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productDescription" className="text-right">
                      Açıklama
                    </Label>
                    <Textarea
                      id="productDescription"
                      name="description"
                      value={currentProduct?.description || ""}
                      onChange={handleProductChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productPrice" className="text-right">
                      Fiyat
                    </Label>
                    <Input
                      id="productPrice"
                      name="price"
                      type="number"
                      step="0.01"
                      value={currentProduct?.price || 0}
                      onChange={handleProductChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productImage" className="text-right">
                      Görsel URL
                    </Label>
                    <Input
                      id="productImage"
                      name="image"
                      value={currentProduct?.image || ""}
                      onChange={handleProductChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productCategory" className="text-right">
                      Kategori
                    </Label>
                    <Input
                      id="productCategory"
                      name="category"
                      value={currentProduct?.category || ""}
                      onChange={handleProductChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productSlug" className="text-right">
                      Slug
                    </Label>
                    <Input
                      id="productSlug"
                      name="slug"
                      value={currentProduct?.slug || ""}
                      onChange={handleProductChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsProductModalOpen(false)}>
                    <X className="mr-2 h-4 w-4" />
                    İptal
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700" onClick={saveProduct} disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Kaydet
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h1 className="text-4xl font-bold mb-8 text-gray-900">Sipariş Yönetimi</h1>
            <Card className="bg-white shadow-lg rounded-lg">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sipariş ID</TableHead>
                      <TableHead>Müşteri Adı</TableHead>
                      <TableHead>Toplam Tutar</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead>Tarih</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id.substring(0, 8)}...</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{order.totalAmount.toFixed(2)} TL</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              order.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "COMPLETED"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => openOrderModal(order)}>
                            <Edit className="h-5 w-5 text-blue-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Sipariş Detayları ve Durumu</DialogTitle>
                  <DialogDescription>Sipariş bilgilerini görüntüleyin ve durumunu güncelleyin.</DialogDescription>
                </DialogHeader>
                {currentOrder && (
                  <div className="grid gap-4 py-4">
                    <p>
                      <strong>Sipariş ID:</strong> {currentOrder.id}
                    </p>
                    <p>
                      <strong>Müşteri Adı:</strong> {currentOrder.customerName}
                    </p>
                    <p>
                      <strong>Müşteri E-posta:</strong> {currentOrder.customerEmail}
                    </p>
                    <p>
                      <strong>Adres:</strong> {currentOrder.customerAddress}
                    </p>
                    <p>
                      <strong>Telefon:</strong> {currentOrder.customerPhone}
                    </p>
                    <p>
                      <strong>Toplam Tutar:</strong> {currentOrder.totalAmount.toFixed(2)} TL
                    </p>
                    <p>
                      <strong>Sipariş Tarihi:</strong> {new Date(currentOrder.createdAt).toLocaleString()}
                    </p>
                    <div>
                      <strong>Ürünler:</strong>
                      <ul className="list-disc pl-5">
                        {Array.isArray(currentOrder.items) &&
                          currentOrder.items.map((item: any, index: number) => (
                            <li key={index}>
                              {item.name} (x{item.quantity}) - {item.price.toFixed(2)} TL
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="orderStatus" className="text-right">
                        Durum
                      </Label>
                      <select
                        id="orderStatus"
                        name="status"
                        value={currentOrder.status}
                        onChange={(e) => handleOrderStatusChange(currentOrder.id, e.target.value)}
                        className="col-span-3 p-2 border rounded-md"
                      >
                        <option value="PENDING">BEKLEMEDE</option>
                        <option value="COMPLETED">TAMAMLANDI</option>
                        <option value="CANCELLED">İPTAL EDİLDİ</option>
                      </select>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsOrderModalOpen(false)}>
                    <X className="mr-2 h-4 w-4" />
                    Kapat
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h1 className="text-4xl font-bold mb-8 text-gray-900">Site Ayarları</h1>
            <Card className="bg-white shadow-lg rounded-lg">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Adı</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={settings?.siteName || ""}
                    onChange={handleSettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Açıklaması</Label>
                  <Textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={settings?.siteDescription || ""}
                    onChange={handleSettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">İletişim E-postası</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={settings?.contactEmail || ""}
                    onChange={handleSettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">İletişim Telefonu</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    value={settings?.contactPhone || ""}
                    onChange={handleSettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adres</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={settings?.address || ""}
                    onChange={handleSettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsappNumber">WhatsApp Numarası</Label>
                  <Input
                    id="whatsappNumber"
                    name="whatsappNumber"
                    type="tel"
                    value={settings?.whatsappNumber || ""}
                    onChange={handleSettingsChange}
                  />
                </div>
                <Button className="bg-red-600 hover:bg-red-700" onClick={handleSettingsSave} disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Ayarları Kaydet
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
