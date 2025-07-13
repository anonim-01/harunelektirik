import { PrismaClient, type Prisma } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

const adminPassword = process.env.ADMIN_PASSWORD || "admin123" // Default password for local dev
const hashedPassword = bcrypt.hashSync(adminPassword, 10)

async function main() {
  console.log(`Start seeding ...`)

  // Create Admin User
  const adminUser = await prisma.adminUser.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
    },
  })
  console.log(`Created/Updated admin user with id: ${adminUser.id}`)

  // Create/Update Pages
  const pagesData: Prisma.PageCreateOrConnectArgs["create"][] = [
    {
      slug: "hakkimizda",
      title: "Hakkımızda",
      content: `
        <p><strong>HARUN ELEKTRİK</strong> olarak, İstanbul genelinde elektrik arızaları, tesisat kurulumu, avize montajı, topraklama hattı çekimi, elektrik panosu kurulumu ve güvenlik kamera sistemleri gibi geniş bir yelpazede profesyonel hizmetler sunmaktayız. Yılların verdiği tecrübe ve uzman ekibimizle, güvenli ve kaliteli çözümler üretmekteyiz.</p>
        <p>Müşteri memnuniyetini her zaman ön planda tutarak, 7/24 kesintisiz hizmet anlayışıyla acil durumlarınızda dahi yanınızdayız. En son teknoloji ekipmanlarımız ve güncel bilgilerimizle, elektrikle ilgili tüm ihtiyaçlarınıza hızlı ve etkili çözümler sunuyoruz.</p>
        <p>Bize ulaşmak için: <strong>+90 554 500 00 61</strong> numaralı telefondan arayabilir veya WhatsApp üzerinden canlı destek alabilirsiniz. Elektrik işlerinizde güvenilir ve profesyonel bir partner arıyorsanız, HARUN ELEKTRİK doğru adres!</p>
        <p>Hizmetlerimiz hakkında daha fazla bilgi almak veya randevu oluşturmak için web sitemizi ziyaret edebilir veya doğrudan bizimle iletişime geçebilirsiniz.</p>
      `,
    },
    {
      slug: "iletisim",
      title: "İletişim",
      content: `
        <p>Bize ulaşmak için aşağıdaki iletişim bilgilerini kullanabilirsiniz:</p>
        <ul>
          <li><strong>Telefon:</strong> +90 554 500 00 61</li>
          <li><strong>E-posta:</strong> info@harunelektrik.com</li>
          <li><strong>Adres:</strong> 3 Farklı Elektrik Şubemiz İle Tüm İstanbul Geneline Profesyonel Hizmet Veriyoruz</li>
          <li><strong>WhatsApp Destek:</strong> <a href="https://wa.me/905545000061" target="_blank" rel="noopener noreferrer">+90 554 500 00 61</a></li>
        </ul>
        <p>Sorularınız, talepleriniz veya acil durumlarınız için bize dilediğiniz zaman ulaşabilirsiniz. Ekibimiz en kısa sürede size geri dönüş yapacaktır.</p>
      `,
    },
    // Add other pages if necessary, e.g., 'blog'
  ]

  for (const pageData of pagesData) {
    await prisma.page.upsert({
      where: { slug: pageData.slug },
      update: { content: pageData.content, title: pageData.title },
      create: pageData,
    })
    console.log(`Created/Updated page: ${pageData.title}`)
  }

  // Page Content
  await prisma.pageContent.upsert({
    where: { pageName: "about-us" },
    update: {
      content: `
        <h2 class="text-3xl font-bold text-gray-900 mb-6">HARUN ELEKTRİK Hakkında</h2>
        <p class="text-lg text-gray-700 mb-4">
          Harun Elektrik olarak, İstanbul genelinde elektrik sektöründe uzun yıllardır hizmet vermekteyiz.
          Müşteri memnuniyetini her zaman ön planda tutarak, kaliteli ve güvenilir çözümler sunmayı
          ilke edindik. Uzman ekibimiz ve geniş hizmet ağımızla, elektrik arızalarından tesisat
          yenilemeye, aydınlatma çözümlerinden güvenlik sistemlerine kadar geniş bir yelpazede
          profesyonel destek sağlıyoruz.
        </p>
        <p class="text-lg text-gray-700 mb-4">
          Teknolojiyi yakından takip eden ve sürekli kendini geliştiren bir anlayışla, en güncel
          ekipmanları ve yöntemleri kullanarak hızlı ve etkili çözümler üretiyoruz. Acil durumlar için
          7/24 ulaşılabilir olmamız, müşterilerimizin her an güvende hissetmesini sağlamaktadır.
        </p>
        <p class="text-lg text-gray-700">
          Harun Elektrik olarak amacımız, sadece elektrik sorunlarını çözmek değil, aynı zamanda
          güvenli, verimli ve sürdürülebilir elektrik sistemleri kurarak yaşam kalitenizi artırmaktır.
          Bize güvenin, elektrik işlerinizi profesyonellere bırakın.
        </p>
      `,
    },
    create: {
      pageName: "about-us",
      content: `
        <h2 class="text-3xl font-bold text-gray-900 mb-6">HARUN ELEKTRİK Hakkında</h2>
        <p class="text-lg text-gray-700 mb-4">
          Harun Elektrik olarak, İstanbul genelinde elektrik sektöründe uzun yıllardır hizmet vermekteyiz.
          Müşteri memnuniyetini her zaman ön planda tutarak, kaliteli ve güvenilir çözümler sunmayı
          ilke edindik. Uzman ekibimiz ve geniş hizmet ağımızla, elektrik arızalarından tesisat
          yenilemeye, aydınlatma çözümlerinden güvenlik sistemlerine kadar geniş bir yelpazede
          profesyonel destek sağlıyoruz.
        </p>
        <p class="text-lg text-gray-700 mb-4">
          Teknolojiyi yakından takip eden ve sürekli kendini geliştiren bir anlayışla, en güncel
          ekipmanları ve yöntemleri kullanarak hızlı ve etkili çözümler üretiyoruz. Acil durumlar için
          7/24 ulaşılabilir olmamız, müşterilerimizin her an güvende hissetmesini sağlamaktadır.
        </p>
        <p class="text-lg text-gray-700">
          Harun Elektrik olarak amacımız, sadece elektrik sorunlarını çözmek değil, aynı zamanda
          güvenli, verimli ve sürdürülebilir elektrik sistemleri kurarak yaşam kalitenizi artırmaktır.
          Bize güvenin, elektrik işlerinizi profesyonellere bırakın.
        </p>
      `,
    },
  })
  console.log("Page content seeded.")

  // Settings
  await prisma.setting.upsert({
    where: { key: "siteName" },
    update: { value: "HARUN ELEKTRİK" },
    create: { key: "siteName", value: "HARUN ELEKTRİK" },
  })
  await prisma.setting.upsert({
    where: { key: "contactPhone" },
    update: { value: "0534 519 9055" },
    create: { key: "contactPhone", value: "0534 519 9055" },
  })
  await prisma.setting.upsert({
    where: { key: "contactEmail" },
    update: { value: "info@harunelektrik.com" },
    create: { key: "contactEmail", value: "info@harunelektrik.com" },
  })
  await prisma.setting.upsert({
    where: { key: "contactAddress" },
    update: { value: "3 Farklı Elektrik Şubemiz İle Tüm İstanbul Geneline Profesyonel Hizmet Veriyoruz" },
    create: {
      key: "contactAddress",
      value: "3 Farklı Elektrik Şubemiz İle Tüm İstanbul Geneline Profesyonel Hizmet Veriyoruz",
    },
  })
  console.log("Settings seeded.")

  // Service Categories
  const canakAnten = await prisma.serviceCategory.upsert({
    where: { slug: "canak-anten-servisi" },
    update: {},
    create: {
      name: "ÇANAK ANTEN SERVİSİ",
      slug: "canak-anten-servisi",
      description: "Çanak anten kurulumu ve tamiri hizmetleri.",
      imageUrl: "/images/canak-anten.jpg",
    },
  })

  const merkeziUydu = await prisma.serviceCategory.upsert({
    where: { slug: "merkezi-uydu-sistemi" },
    update: {},
    create: {
      name: "MERKEZİ UYDU SİSTEMİ",
      slug: "merkezi-uydu-sistemi",
      description: "Merkezi uydu sistemleri kurulumu ve arıza giderme.",
      imageUrl: "/images/merkezi-uydu.jpg",
    },
  })

  const guvenlikKamera = await prisma.serviceCategory.upsert({
    where: { slug: "guvenlik-kamera-sistemi" },
    update: {},
    create: {
      name: "GÜVENLİK KAMERA SİSTEMİ",
      slug: "guvenlik-kamera-sistemi",
      description: "Güvenlik kamera sistemleri kurulumu ve bakımı.",
      imageUrl: "/images/guvenlik-kamera.jpg",
    },
  })

  const televizyonTamiri = await prisma.serviceCategory.upsert({
    where: { slug: "televizyon-tamiri" },
    update: {},
    create: {
      name: "TELEVİZYON TAMİRİ",
      slug: "televizyon-tamiri",
      description: "Televizyon tamiri ve montaj hizmetleri.",
      imageUrl: "/images/televizyon-tamiri.jpg",
    },
  })

  const networkInternet = await prisma.serviceCategory.upsert({
    where: { slug: "network-internet-servisi" },
    update: {},
    create: {
      name: "NETWORK İNTERNET SERVİSİ",
      slug: "network-internet-servisi",
      description: "Network ve internet altyapı hizmetleri.",
      imageUrl: "/images/network-internet.jpg",
    },
  })
  console.log("Service categories seeded.")

  // Services
  const servicesData: Prisma.ServiceCreateInput[] = [
    {
      name: "Elektrik Arıza Tespiti ve Onarımı",
      description: "Ev ve iş yerlerindeki elektrik arızalarının hızlı ve güvenli tespiti ve onarımı.",
      imageUrl: "/images/elektrik-ariza.jpg",
      slug: "elektrik-ariza",
    },
    {
      name: "Avize Montajı ve Demontajı",
      description: "Her türlü avize ve aydınlatma armatürünün profesyonel montaj ve demontaj hizmetleri.",
      imageUrl: "/images/avize-montaji.jpg",
      slug: "avize-montaji",
    },
    {
      name: "Yeni Elektrik Tesisatı Kurulumu",
      description: "Sıfırdan elektrik tesisatı çekimi ve mevcut tesisatın yenilenmesi.",
      imageUrl: "/images/elektrik-tesisati.jpg",
      slug: "elektrik-tesisati",
    },
    {
      name: "Topraklama Hattı Çekimi",
      description: "Elektrik güvenliği için topraklama hattı kurulumu ve kontrolü.",
      imageUrl: "/images/topraklama-hatti.jpg",
      slug: "topraklama-hatti",
    },
    {
      name: "Elektrik Panosu Kurulumu ve Bakımı",
      description: "Modern ve güvenli elektrik panolarının kurulumu, bakımı ve revizyonu.",
      imageUrl: "/images/elektrik-panosu.jpg",
      slug: "elektrik-panosu",
    },
    {
      name: "Çanak Anten Kurulumu ve Ayarı",
      description: "Uydu sistemleri için çanak anten kurulumu, ayarı ve sinyal optimizasyonu.",
      imageUrl: "/images/canak-anten.jpg",
      slug: "canak-anten",
    },
    {
      name: "Merkezi Uydu Sistemleri",
      description: "Bina ve siteler için merkezi uydu sistemleri kurulumu ve bakımı.",
      imageUrl: "/images/merkezi-uydu.jpg",
      slug: "merkezi-uydu",
    },
    {
      name: "Güvenlik Kamera Sistemleri",
      description: "Ev ve iş yerleri için IP ve Analog güvenlik kamera sistemleri kurulumu.",
      imageUrl: "/images/guvenlik-kamera.jpg",
      slug: "guvenlik-kamera",
    },
    {
      name: "Televizyon Tamiri ve Montajı",
      description: "Her marka ve model televizyonun tamiri ve duvara montaj hizmetleri.",
      imageUrl: "/images/televizyon-tamiri.jpg",
      slug: "televizyon-tamiri",
    },
    {
      name: "Network ve İnternet Altyapısı",
      description: "Ev ve ofisler için kablolu/kablosuz network altyapısı kurulumu ve sorun giderme.",
      imageUrl: "/images/network-internet.jpg",
      slug: "network-internet",
    },
  ]

  for (const serviceData of servicesData) {
    await prisma.service.upsert({
      where: { slug: serviceData.slug },
      update: { ...serviceData },
      create: serviceData,
    })
    console.log(`Created/Updated service: ${serviceData.name}`)
  }

  console.log("Services seeded.")

  // Product Categories
  const aydinlatma = await prisma.productCategory.upsert({
    where: { slug: "aydinlatma" },
    update: {},
    create: {
      name: "Aydınlatma Ürünleri",
      slug: "aydinlatma",
      description: "Ev ve iş yerleri için modern aydınlatma çözümleri.",
      imageUrl: "/images/aydinlatma.jpg",
    },
  })

  const kablo = await prisma.productCategory.upsert({
    where: { slug: "kablo-ve-iletkenler" },
    update: {},
    create: {
      name: "Kablo ve İletkenler",
      slug: "kablo-ve-iletkenler",
      description: "Elektrik tesisatında kullanılan çeşitli kablo ve iletkenler.",
      imageUrl: "/images/kablo.jpg",
    },
  })
  console.log("Product categories seeded.")

  // Products
  const productsData: Prisma.ProductCreateInput[] = [
    {
      name: "LED Ampul E27 9W",
      description: "Yüksek verimli, uzun ömürlü LED ampul. E27 duy, 9W güç tüketimi.",
      price: 49.9,
      imageUrl: "/images/aydinlatma.jpg",
      category: "Aydınlatma",
      stock: 150,
    },
    {
      name: "Bakır Elektrik Kablosu (100m)",
      description: "Yüksek kaliteli, dayanıklı bakır elektrik kablosu. 100 metre rulo.",
      price: 299.5,
      imageUrl: "/images/kablo.jpg",
      category: "Kablolar",
      stock: 80,
    },
    {
      name: "Akıllı Priz",
      description: "Uzaktan kontrol edilebilir, enerji tüketimi izlenebilir akıllı priz.",
      price: 129.0,
      imageUrl: "/placeholder.svg?height=400&width=400",
      category: "Akıllı Ev",
      stock: 75,
    },
    {
      name: "Hareket Sensörlü Lamba",
      description: "Otomatik açılıp kapanan, enerji tasarruflu hareket sensörlü lamba.",
      price: 89.9,
      imageUrl: "/placeholder.svg?height=400&width=400",
      category: "Aydınlatma",
      stock: 120,
    },
    {
      name: "Topraklı Uzatma Kablosu (5m)",
      description: "Güvenli kullanım için topraklı, 5 metre uzunluğunda uzatma kablosu.",
      price: 59.9,
      imageUrl: "/placeholder.svg?height=400&width=400",
      category: "Kablolar",
      stock: 200,
    },
  ]

  for (const productData of productsData) {
    await prisma.product.upsert({
      where: { name: productData.name },
      update: { ...productData },
      create: productData,
    })
    console.log(`Created/Updated product: ${productData.name}`)
  }

  console.log("Products seeded.")

  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
