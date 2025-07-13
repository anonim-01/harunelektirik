import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.service.deleteMany()
  await prisma.settings.deleteMany()

  // Create default settings
  await prisma.settings.create({
    data: {
      siteName: "Harun Elektrik",
      siteDescription: "Elektrik ve uydu sistemleri çözümlerinizde kurumsal ortağınız.",
      contactEmail: "info@harunelektrik.com",
      contactPhone: "+90 555 123 45 67",
      address: "Örnek Mah. Örnek Cad. No:123, Örnek İlçe, Örnek İl",
      whatsappNumber: "905551234567", // WhatsApp numarası uluslararası formatta
    },
  })

  // Create services
  await prisma.service.createMany({
    data: [
      {
        name: "Çanak Anten Kurulumu ve Ayarı",
        description:
          "Uydu sistemleri için profesyonel çanak anten kurulumu ve hassas ayar hizmetleri. Kesintisiz yayın keyfi için doğru adres.",
        image: "/images/canak-anten.jpg",
        slug: "canak-anten-kurulumu-ve-ayari",
      },
      {
        name: "Merkezi Uydu Sistemleri",
        description:
          "Bina ve siteler için merkezi uydu sistemleri kurulumu, bakımı ve onarımı. Tüm dairelere tek merkezden yayın imkanı.",
        image: "/images/merkezi-uydu.jpg",
        slug: "merkezi-uydu-sistemleri",
      },
      {
        name: "Güvenlik Kamera Sistemleri",
        description:
          "Ev ve iş yerleri için yüksek çözünürlüklü güvenlik kamera sistemleri kurulumu. Uzaktan izleme ve kayıt imkanı.",
        image: "/images/guvenlik-kamera.jpg",
        slug: "guvenlik-kamera-sistemleri",
      },
      {
        name: "Televizyon Tamiri ve Montajı",
        description:
          "Her marka ve model televizyonun tamiri, duvara montajı ve kanal ayarlamaları. Hızlı ve güvenilir servis.",
        image: "/images/televizyon-tamiri.jpg",
        slug: "televizyon-tamiri-ve-montaji",
      },
      {
        name: "Network ve İnternet Altyapısı",
        description:
          "Ev ve ofisler için kablolu/kablosuz network kurulumu, internet altyapısı çözümleri ve modem kurulumu.",
        image: "/images/network-internet.jpg",
        slug: "network-ve-internet-altyapisi",
      },
      {
        name: "Aydınlatma Sistemleri Kurulumu",
        description:
          "İç ve dış mekanlar için modern aydınlatma sistemleri tasarımı ve kurulumu. Enerji verimli ve estetik çözümler.",
        image: "/images/aydinlatma.jpg",
        slug: "aydinlatma-sistemleri-kurulumu",
      },
      {
        name: "Elektrik Tesisatı Yenileme",
        description:
          "Eski ve yıpranmış elektrik tesisatlarının modern standartlara uygun olarak yenilenmesi. Güvenli ve sorunsuz elektrik altyapısı.",
        image: "/images/hero-elektrik-tesisat.jpg",
        slug: "elektrik-tesisati-yenileme",
      },
      {
        name: "Avize ve Montaj Hizmetleri",
        description:
          "Her türlü avize, aplik ve aydınlatma armatürlerinin profesyonel montajı ve elektrik bağlantıları.",
        image: "/images/hero-avize-montaj.jpg",
        slug: "avize-ve-montaj-hizmetleri",
      },
    ],
  })

  // Create products
  await prisma.product.createMany({
    data: [
      {
        name: "HDMI Kablo (5 Metre)",
        description: "Yüksek kaliteli 5 metre HDMI kablo. Full HD ve 4K çözünürlük desteği.",
        price: 75.0,
        image: "/images/kablo.jpg",
        slug: "hdmi-kablo-5-metre",
        category: "Kablolar",
      },
      {
        name: "Uydu Alıcısı (Full HD)",
        description: "Full HD çözünürlük destekli uydu alıcısı. Kolay kurulum ve kullanım.",
        price: 450.0,
        image: "/placeholder.svg?height=400&width=400",
        slug: "uydu-alicisi-full-hd",
        category: "Uydu Ekipmanları",
      },
      {
        name: "LED Ampul (9W, Beyaz)",
        description: "Enerji tasarruflu 9W LED ampul. Beyaz ışık, uzun ömürlü.",
        price: 35.0,
        image: "/placeholder.svg?height=400&width=400",
        slug: "led-ampul-9w-beyaz",
        category: "Aydınlatma",
      },
      {
        name: "Akıllı Priz",
        description: "Wi-Fi kontrollü akıllı priz. Uzaktan açma/kapama ve zamanlama özellikleri.",
        price: 120.0,
        image: "/placeholder.svg?height=400&width=400",
        slug: "akilli-priz",
        category: "Akıllı Ev",
      },
      {
        name: "Ethernet Kablosu (10 Metre)",
        description: "Cat6 standartlarında 10 metre ethernet kablosu. Yüksek hızlı internet bağlantısı için ideal.",
        price: 60.0,
        image: "/images/network-internet.jpg",
        slug: "ethernet-kablosu-10-metre",
        category: "Kablolar",
      },
      {
        name: "Dış Mekan Güvenlik Kamerası",
        description: "Su geçirmez, gece görüşlü dış mekan güvenlik kamerası. Full HD kayıt.",
        price: 800.0,
        image: "/images/guvenlik-kamera.jpg",
        slug: "dis-mekan-guvenlik-kamerasi",
        category: "Güvenlik Sistemleri",
      },
    ],
  })

  // Create About Us and Contact page content
  // This data will be fetched by the respective pages
  // For "Hakkımızda" page
  await prisma.service.create({
    data: {
      name: "Hakkımızda Sayfası İçeriği",
      description: `Harun Elektrik olarak, 20 yılı aşkın süredir elektrik ve uydu sistemleri alanında güvenilir ve kaliteli hizmetler sunmaktayız. Müşteri memnuniyetini her zaman ön planda tutarak, sektördeki yenilikleri yakından takip ediyor ve en güncel teknolojileri projelerimize entegre ediyoruz. Uzman ekibimizle birlikte, ev ve iş yerleriniz için anahtar teslim çözümler sunuyoruz.

Misyonumuz, elektrik ve uydu sistemleri alanında güvenli, verimli ve sürdürülebilir çözümler sunarak müşterilerimizin hayatını kolaylaştırmaktır. Vizyonumuz ise sektörde lider bir konuma gelerek, teknolojik gelişmeleri öncü bir şekilde uygulayan ve müşteri odaklı hizmet anlayışıyla fark yaratan bir marka olmaktır.

Değerlerimiz arasında dürüstlük, şeffaflık, kalite, güvenilirlik ve sürekli gelişim bulunmaktadır. Her projede bu değerlere bağlı kalarak, müşterilerimize en iyi deneyimi sunmayı hedefliyoruz.`,
      image: "/images/harun-elektrik-team.jpg",
      slug: "hakkimizda-icerik", // Özel bir slug ile işaretliyoruz
    },
  })

  // For "İletişim" page (will be created later)
  await prisma.service.create({
    data: {
      name: "İletişim Sayfası İçeriği",
      description: `Bizimle iletişime geçmekten çekinmeyin! Harun Elektrik olarak tüm elektrik ve uydu sistemleri ihtiyaçlarınızda yanınızdayız. Sorularınız, talepleriniz veya randevu almak için aşağıdaki iletişim bilgilerini kullanabilir veya formu doldurabilirsiniz.

Adres: Örnek Mah. Örnek Cad. No:123, Örnek İlçe, Örnek İl
Telefon: +90 555 123 45 67
E-posta: info@harunelektrik.com

Çalışma Saatleri:
Pazartesi - Cuma: 09:00 - 18:00
Cumartesi: 09:00 - 14:00
Pazar: Kapalı`,
      image: "/placeholder.svg?height=400&width=600", // Placeholder for contact image
      slug: "iletisim-icerik", // Özel bir slug ile işaretliyoruz
    },
  })

  console.log("Seed data created successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
