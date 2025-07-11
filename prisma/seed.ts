import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 HARUN ELEKTRİK veritabanı seed işlemi başlıyor...")

  // İlk admin kullanıcısı
  const hashedPassword = await bcrypt.hash("admin123", 10)

  const admin = await prisma.user.upsert({
    where: { email: "admin@harunelektrik.com" },
    update: {},
    create: {
      email: "admin@harunelektrik.com",
      password: hashedPassword,
      name: "Admin",
      role: "ADMIN",
    },
  })

  // Kategoriler (Ürünler için)
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "elektrik-malzemeleri" },
      update: {},
      create: {
        name: "Elektrik Malzemeleri",
        slug: "elektrik-malzemeleri",
        description: "Elektrik tesisatı için gerekli malzemeler",
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: "aydinlatma" },
      update: {},
      create: {
        name: "Aydınlatma",
        slug: "aydinlatma",
        description: "Avize, aplik ve aydınlatma ürünleri",
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: "guvenlik-sistemleri" },
      update: {},
      create: {
        name: "Güvenlik Sistemleri",
        slug: "guvenlik-sistemleri",
        description: "Güvenlik kameraları ve alarm sistemleri",
        sortOrder: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: "kablo-aksesuarlar" },
      update: {},
      create: {
        name: "Kablo ve Aksesuarlar",
        slug: "kablo-aksesuarlar",
        description: "Elektrik kabloları ve aksesuarları",
        sortOrder: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: "elektrikli-arac-sarj" },
      update: {},
      create: {
        name: "Elektrikli Araç Şarj",
        slug: "elektrikli-arac-sarj",
        description: "Elektrikli araç şarj istasyonları",
        sortOrder: 5,
      },
    }),
  ])

  // Hizmet Kategorileri (Yeni)
  const serviceCategories = await Promise.all([
    prisma.serviceCategory.upsert({
      where: { slug: "canak-anten-servisi" },
      update: {},
      create: { name: "ÇANAK ANTEN SERVİSİ", slug: "canak-anten-servisi", sortOrder: 1 },
    }),
    prisma.serviceCategory.upsert({
      where: { slug: "merkezi-uydu-sistemi" },
      update: {},
      create: { name: "MERKEZİ UYDU SİSTEMİ", slug: "merkezi-uydu-sistemi", sortOrder: 2 },
    }),
    prisma.serviceCategory.upsert({
      where: { slug: "guvenlik-kamera-sistemi" },
      update: {},
      create: { name: "GÜVENLİK KAMERA SİSTEMİ", slug: "guvenlik-kamera-sistemi", sortOrder: 3 },
    }),
    prisma.serviceCategory.upsert({
      where: { slug: "televizyon-tamiri" },
      update: {},
      create: { name: "TELEVİZYON TAMİRİ", slug: "televizyon-tamiri", sortOrder: 4 },
    }),
    prisma.serviceCategory.upsert({
      where: { slug: "network-internet-servisi" },
      update: {},
      create: { name: "NETWORK İNTERNET SERVİSİ", slug: "network-internet-servisi", sortOrder: 5 },
    }),
  ])

  // Hizmetler (Mevcut ve Yeni Eklenenler)
  const servicesData = [
    // ÇANAK ANTEN SERVİSİ
    {
      name: "Anten Kurulumu",
      slug: "anten-kurulumu",
      description: "Profesyonel anten kurulum hizmetleri.",
      serviceCategoryId: serviceCategories[0].id,
    },
    {
      name: "Çanak Anten Kurulumu",
      slug: "canak-anten-kurulumu",
      description: "Yeni çanak anten kurulumu ve ayarı.",
      serviceCategoryId: serviceCategories[0].id,
    },
    {
      name: "Uydu Servisi Uyducu",
      slug: "uydu-servisi-uyducu",
      description: "Uydu sistemleri için genel servis ve bakım.",
      serviceCategoryId: serviceCategories[0].id,
    },
    // MERKEZİ UYDU SİSTEMİ
    {
      name: "Anten Kablosu Çekme",
      slug: "anten-kablosu-cekme",
      description: "Yeni anten kablosu çekimi ve tesisatı.",
      serviceCategoryId: serviceCategories[1].id,
    },
    {
      name: "Çift LNB Bağlama",
      slug: "cift-lnb-baglama",
      description: "Çift LNB kurulumu ile daha fazla kanal seçeneği.",
      serviceCategoryId: serviceCategories[1].id,
    },
    {
      name: "D-Smart Arızaları",
      slug: "d-smart-arizalari",
      description: "D-Smart uydu alıcısı arızalarının giderilmesi.",
      serviceCategoryId: serviceCategories[1].id,
    },
    {
      name: "Dijiturk Arızaları",
      slug: "dijiturk-arizalari",
      description: "Digitürk uydu alıcısı arızalarının giderilmesi.",
      serviceCategoryId: serviceCategories[1].id,
    },
    {
      name: "IP TV Kurulumu",
      slug: "ip-tv-kurulumu",
      description: "IP TV sistemlerinin kurulumu ve yapılandırması.",
      serviceCategoryId: serviceCategories[1].id,
    },
    {
      name: "LNB Kurulumu",
      slug: "lnb-kurulumu",
      description: "LNB değişimi ve kurulumu.",
      serviceCategoryId: serviceCategories[1].id,
    },
    {
      name: "TV Kanal Ayarlama",
      slug: "tv-kanal-ayarlama",
      description: "Televizyon kanal ayarı ve sıralaması.",
      serviceCategoryId: serviceCategories[1].id,
    },
    {
      name: "Uydu Kablosu Uzatma",
      slug: "uydu-kablosu-uzatma",
      description: "Uydu kablosu uzatma ve ekleme hizmetleri.",
      serviceCategoryId: serviceCategories[1].id,
    },
    {
      name: "Uydu Kurulumu",
      slug: "uydu-kurulumu",
      description: "Uydu sistemlerinin genel kurulumu.",
      serviceCategoryId: serviceCategories[1].id,
    },
    {
      name: "Uydu Servisi",
      slug: "uydu-servisi",
      description: "Uydu sistemleri için genel servis hizmeti.",
      serviceCategoryId: serviceCategories[1].id,
    },
    {
      name: "Yan Odaya Uydu Hattı Çekme",
      slug: "yan-odaya-uydu-hatti-cekme",
      description: "Ek odalara uydu hattı çekimi.",
      serviceCategoryId: serviceCategories[1].id,
    },
    // GÜVENLİK KAMERA SİSTEMİ
    {
      name: "Apartman Kamera Sistemleri Kurulumu",
      slug: "apartman-kamera-sistemleri-kurulumu",
      description: "Apartmanlar için güvenlik kamera sistemleri kurulumu.",
      serviceCategoryId: serviceCategories[2].id,
    },
    {
      name: "Bebek Veya Bakıcı Kamera Sistemleri",
      slug: "bebek-bakici-kamera-sistemleri",
      description: "Bebek ve bakıcı izleme kamera sistemleri.",
      serviceCategoryId: serviceCategories[2].id,
    },
    {
      name: "Ev Kamera Sistemleri Kurulumu",
      slug: "ev-kamera-sistemleri-kurulumu",
      description: "Evler için güvenlik kamera sistemleri kurulumu.",
      serviceCategoryId: serviceCategories[2].id,
    },
    {
      name: "Güvenlik Kamerası Değişimi",
      slug: "guvenlik-kamerasi-degisimi",
      description: "Mevcut güvenlik kamerasının değişimi.",
      serviceCategoryId: serviceCategories[2].id,
    },
    {
      name: "Güvenlik Kamerası Kablo Arıza Tespiti",
      slug: "guvenlik-kamerasi-kablo-ariza-tespiti",
      description: "Güvenlik kamerası kablo arızalarının tespiti.",
      serviceCategoryId: serviceCategories[2].id,
    },
    {
      name: "Güvenlik Kamerası Kurulumu",
      slug: "guvenlik-kamerasi-kurulumu",
      description: "Yeni güvenlik kamerası kurulumu.",
      serviceCategoryId: serviceCategories[2].id,
    },
    {
      name: "Güvenlik Kamerası Montajı",
      slug: "guvenlik-kamerasi-montaji",
      description: "Güvenlik kamerasının montajı.",
      serviceCategoryId: serviceCategories[2].id,
    },
    {
      name: "IP Kamera Sistemleri Kurulumu",
      slug: "ip-kamera-sistemleri-kurulumu",
      description: "IP tabanlı kamera sistemlerinin kurulumu.",
      serviceCategoryId: serviceCategories[2].id,
    },
    {
      name: "İşyeri Ve Ofis Kamera Sistemleri Kurulumu",
      slug: "isyeri-ofis-kamera-sistemleri-kurulumu",
      description: "İşyerleri ve ofisler için kamera sistemleri kurulumu.",
      serviceCategoryId: serviceCategories[2].id,
    },
    {
      name: "Kamera Sistemleri Bakımı",
      slug: "kamera-sistemleri-bakimi",
      description: "Kamera sistemlerinin periyodik bakımı.",
      serviceCategoryId: serviceCategories[2].id,
    },
    // TELEVİZYON TAMİRİ
    {
      name: "LCD TV Montajı",
      slug: "lcd-tv-montaji",
      description: "LCD televizyon montaj hizmetleri.",
      serviceCategoryId: serviceCategories[3].id,
    },
    {
      name: "Smart TV Arızaları",
      slug: "smart-tv-arizalari",
      description: "Smart TV'lerdeki yazılımsal ve donanımsal arızaların giderilmesi.",
      serviceCategoryId: serviceCategories[3].id,
    },
    {
      name: "Televizyon (TV) Kurulumu",
      slug: "televizyon-tv-kurulumu",
      description: "Televizyon kurulumu ve ilk ayarları.",
      serviceCategoryId: serviceCategories[3].id,
    },
    {
      name: "Televizyon Ana Kart Arızası Tamiri",
      slug: "televizyon-ana-kart-arizasi-tamiri",
      description: "Televizyon ana kart arızalarının tamiri.",
      serviceCategoryId: serviceCategories[3].id,
    },
    {
      name: "Televizyon Besleme Kablosu Yenileme",
      slug: "televizyon-besleme-kablosu-yenileme",
      description: "Televizyon besleme kablosunun yenilenmesi.",
      serviceCategoryId: serviceCategories[3].id,
    },
    {
      name: "Televizyon Duvar Montajı",
      slug: "televizyon-duvar-montaji",
      description: "Televizyonun duvara monte edilmesi.",
      serviceCategoryId: serviceCategories[3].id,
    },
    {
      name: "Televizyon Ekran Değişimi",
      slug: "televizyon-ekran-degisimi",
      description: "Televizyon ekranının değişimi.",
      serviceCategoryId: serviceCategories[3].id,
    },
    {
      name: "Televizyon Ekran Koruyucu Takma",
      slug: "televizyon-ekran-koruyucu-takma",
      description: "Televizyon ekranına koruyucu takma hizmeti.",
      serviceCategoryId: serviceCategories[3].id,
    },
    {
      name: "Televizyon Format Atma",
      slug: "televizyon-format-atma",
      description: "Televizyona format atma ve sıfırlama.",
      serviceCategoryId: serviceCategories[3].id,
    },
    {
      name: "Televizyon Kanal Yükleme",
      slug: "televizyon-kanal-yukleme",
      description: "Televizyona kanal yükleme ve güncelleme.",
      serviceCategoryId: serviceCategories[3].id,
    },
    {
      name: "Televizyon LED Panel Değişimi",
      slug: "televizyon-led-panel-degisimi",
      description: "Televizyon LED panel değişimi.",
      serviceCategoryId: serviceCategories[3].id,
    },
    {
      name: "Televizyon Ses Sorunları Tamiri",
      slug: "televizyon-ses-sorunlari-tamiri",
      description: "Televizyon ses sorunlarının tamiri.",
      serviceCategoryId: serviceCategories[3].id,
    },
    {
      name: "Televizyon Sinyal Tuner Aşırı Yüklenme Sorunları Tamiri",
      slug: "televizyon-sinyal-tuner-asiri-yuklenme-tamiri",
      description: "Televizyon sinyal ve tuner aşırı yüklenme sorunlarının tamiri.",
      serviceCategoryId: serviceCategories[3].id,
    },
    {
      name: "Televizyon Tuner Arızası Tamiri",
      slug: "televizyon-tuner-arizasi-tamiri",
      description: "Televizyon tuner arızalarının tamiri.",
      serviceCategoryId: serviceCategories[3].id,
    },
    {
      name: "Televizyon Uydu Cihazı Bağlama",
      slug: "televizyon-uydu-cihazi-baglama",
      description: "Televizyona uydu cihazı bağlama.",
      serviceCategoryId: serviceCategories[3].id,
    },
    {
      name: "Televizyon Uydu Format Atma",
      slug: "televizyon-uydu-format-atma",
      description: "Televizyon uydu ayarlarını sıfırlama.",
      serviceCategoryId: serviceCategories[3].id,
    },
    {
      name: "Televizyona Telefondan Görüntü Yansıtıcı Bağlama",
      slug: "televizyona-telefon-goruntu-yansitici-baglama",
      description: "Telefondan televizyona görüntü yansıtıcı bağlama.",
      serviceCategoryId: serviceCategories[3].id,
    },
    // NETWORK İNTERNET SERVİSİ
    {
      name: "Bina İçin İnternet Tesisatı",
      slug: "bina-icin-internet-tesisati",
      description: "Bina içi internet kablolama ve tesisat hizmetleri.",
      serviceCategoryId: serviceCategories[4].id,
    },
    {
      name: "İnternet Ana Hat Onarımı",
      slug: "internet-ana-hat-onarimi",
      description: "İnternet ana hat arızalarının onarımı.",
      serviceCategoryId: serviceCategories[4].id,
    },
    {
      name: "Modem Satışı",
      slug: "modem-satisi",
      description: "Çeşitli modemlerin satışı ve kurulumu.",
      serviceCategoryId: serviceCategories[4].id,
    },
    {
      name: "VDSL ve ADSL Modem Arızası Çözümü",
      slug: "vdsl-adsl-modem-arizasi-cozumu",
      description: "VDSL ve ADSL modem arızalarının giderilmesi.",
      serviceCategoryId: serviceCategories[4].id,
    },
    // Önceki hizmetler (kategorilere atanmış)
    {
      name: "Elektrik Sigorta Arızaları",
      slug: "elektrik-sigorta-arizalari",
      description:
        "Elektrik sigortası arızaları çoğu zaman elektrikle çalışan eşyalarımıza zarar verebilecek duruma gelebilir. Düşük gerilim ve yüksek gerilim sebebi neticesinde sigortalar atabilmektedir.",
      price: 200,
      isFeatured: true,
      imageUrl: "/images/sigorta-arizasi.jpg",
      serviceCategoryId: serviceCategories[0].id, // Örnek atama
    },
    {
      name: "Avize Montajı",
      slug: "avize-montaji",
      description:
        "Avizeler yaşadığımız her alanı günışığı gibi aydınlatmak için kullanılan modern tasarımlara ve zevklere göre üretilen aksesuar tarzında aydınlatma gereçleridir.",
      price: 150,
      isFeatured: true,
      imageUrl: "/images/avize-montaji.jpg",
      serviceCategoryId: serviceCategories[0].id, // Örnek atama
    },
    {
      name: "Elektrik Tesisatı Bakım & Yenileme",
      slug: "elektrik-tesisati-bakim-yenileme",
      description:
        "Elektrik tesisatları göz önünde olmayabilir. Taşıdığı riskten dolayı yetkisiz müdahaleler sonucu istenmeyen kazalara sebebiyet vermesi ile biliriz.",
      price: 500,
      isFeatured: true,
      imageUrl: "/images/elektrik-tesisati.jpg",
      serviceCategoryId: serviceCategories[0].id, // Örnek atama
    },
    {
      name: "Telefon Santral Kurulumu",
      slug: "telefon-santral-kurulumu",
      description:
        "Telefon santrallerinin kurulumları tarafımızdan profesyonelce yapılmaktadır. Karel santral kurulumu, Multitek santral kurulumu, Telesis santral kurulumu.",
      price: 800,
      isFeatured: false,
      imageUrl: "/images/santral-kurulumu.jpg",
      serviceCategoryId: serviceCategories[2].id, // Örnek atama
    },
    {
      name: "Topraklama Hattı Çekimi",
      slug: "topraklama-hatti-cekimi",
      description:
        "Topraklama hattı, prizlerde bulunabilecek herhangi bir kaçak olması durumunda elektrikli cihazlara bu durumu yansıtmamak için koruma işlemi yapar.",
      price: 300,
      isFeatured: false,
      imageUrl: "/images/topraklama.jpg",
      serviceCategoryId: serviceCategories[0].id, // Örnek atama
    },
    {
      name: "Elektrik Panosu Kurulumu",
      slug: "elektrik-panosu-kurulumu",
      description:
        "Elektrik panosu kurulumları riskli ve zor bir işlemdir. Bir yapının en önemli bağlantısı elektrik panosudur.",
      price: 600,
      isFeatured: true,
      imageUrl: "/images/pano-kurulumu.jpg",
      serviceCategoryId: serviceCategories[0].id, // Örnek atama
    },
  ]

  for (const service of servicesData) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    })
  }

  // Ürünler
  const products = [
    {
      name: "Elektrik Panosu 12 Devre",
      slug: "elektrik-panosu-12-devre",
      description: "Kaliteli 12 devre elektrik panosu, güvenlik sigortaları dahil",
      price: 1500,
      stockQuantity: 25,
      categoryId: categories[0].id,
      imageUrl: "/images/elektrik-panosu.jpg",
      isFeatured: true,
    },
    {
      name: "LED Avize Modern Tasarım",
      slug: "led-avize-modern",
      description: "Modern tasarım LED avize, uzaktan kumandalı",
      price: 350,
      stockQuantity: 12,
      categoryId: categories[1].id,
      imageUrl: "/images/led-avize.jpg",
      isFeatured: true,
    },
    {
      name: "IP Güvenlik Kamerası 4MP",
      slug: "ip-guvenlik-kamerasi-4mp",
      description: "Yüksek çözünürlüklü IP güvenlik kamerası, gece görüş özellikli",
      price: 800,
      stockQuantity: 8,
      categoryId: categories[2].id,
      imageUrl: "/images/guvenlik-kamerasi.jpg",
      isFeatured: true,
    },
    {
      name: "NYM Kablo 3x2.5",
      slug: "nym-kablo-3x2-5",
      description: "Kaliteli NYM elektrik kablosu 3x2.5mm",
      price: 25,
      stockQuantity: 100,
      categoryId: categories[3].id,
      imageUrl: "/images/elektrik-kablo.jpg",
      isFeatured: false,
    },
    {
      name: "Elektrikli Araç Şarj İstasyonu",
      slug: "elektrikli-arac-sarj-istasyonu",
      description: "22kW hızlı şarj istasyonu, akıllı ödeme sistemi",
      price: 15000,
      stockQuantity: 3,
      categoryId: categories[4].id,
      imageUrl: "/images/sarj-istasyonu.jpg",
      isFeatured: true,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }

  // Sayfalar
  const pages = [
    {
      title: "Ana Sayfa",
      slug: "ana-sayfa",
      content: "<h1>HARUN ELEKTRİK</h1><p>Profesyonel elektrik hizmetleri</p>",
      status: "PUBLISHED" as const,
      metaTitle: "HARUN ELEKTRİK - Profesyonel Elektrik Hizmetleri",
      metaDescription:
        "İstanbul genelinde 7/24 elektrik hizmetleri. Elektrik arıza, avize montajı, elektrik tesisatı ve daha fazlası.",
    },
    {
      title: "Hakkımızda",
      slug: "hakkimizda",
      content:
        "<h1>Hakkımızda</h1><p>Elektrikçilik günümüzde popüler olmak ile birlikte tecrübe gereken işlerin başında gelir. Uzun yılların verdiği tecrübe ve gelişmiş ekipmanlarımız ile profesyonel hizmet sunuyoruz.</p>",
      status: "PUBLISHED" as const,
      metaTitle: "Hakkımızda - HARUN ELEKTRİK",
      metaDescription: "HARUN ELEKTRİK hakkında bilgi edinin. Tecrübeli ekibimiz ve kaliteli hizmetimiz.",
    },
    {
      title: "İletişim",
      slug: "iletisim",
      content: "<h1>İletişim</h1><p>Bize ulaşın</p>",
      status: "PUBLISHED" as const,
      metaTitle: "İletişim - HARUN ELEKTRİK",
      metaDescription: "HARUN ELEKTRİK ile iletişime geçin. Telefon, WhatsApp ve e-posta iletişim bilgileri.",
    },
  ]

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: page,
    })
  }

  // Ayarlar
  const settings = [
    { key: "site_title", value: "HARUN ELEKTRİK", groupName: "general" },
    { key: "site_description", value: "Profesyonel Elektrik Hizmetleri", groupName: "general" },
    { key: "contact_phone", value: "0534 519 9055", groupName: "contact" },
    { key: "contact_email", value: "info@harunelektrik.com", groupName: "contact" },
    {
      key: "contact_address",
      value: "3 Farklı Elektrik Şubemiz İle Tüm İstanbul Geneline Profesyonel Hizmet Veriyoruz",
      groupName: "contact",
    },
    { key: "whatsapp_number", value: "905345199055", groupName: "integrations" },
    {
      key: "whatsapp_message",
      value: "Merhaba! HARUN ELEKTRİK hakkında bilgi almak istiyorum.",
      groupName: "integrations",
    },
    { key: "izico_api_key", value: "", groupName: "payment" },
    { key: "izico_secret_key", value: "", groupName: "payment" },
    { key: "izico_test_mode", value: "1", groupName: "payment" },
  ]

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }

  console.log("✅ Seed işlemi tamamlandı!")
  console.log(`👤 Admin kullanıcısı: ${admin.email}`)
  console.log(`📦 ${categories.length} ürün kategorisi oluşturuldu`)
  console.log(`🛠️ ${serviceCategories.length} hizmet kategorisi oluşturuldu`)
  console.log(`🛠️ ${servicesData.length} hizmet eklendi/güncellendi`)
  console.log(`📱 ${products.length} ürün eklendi`)
  console.log(`📄 ${pages.length} sayfa oluşturuldu`)
  console.log(`⚙️ ${settings.length} ayar yapılandırıldı`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
