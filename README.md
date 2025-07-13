# Harun Elektrik Web Sitesi

Bu proje, Harun Elektrik için Next.js, Tailwind CSS ve Prisma kullanılarak geliştirilmiş kurumsal bir web sitesidir.

## Özellikler

-   **Ana Sayfa**: Tanıtım slider'ı, öne çıkan hizmetler ve ürünler.
-   **Hizmetlerimiz Sayfası**: Tüm hizmetlerin listesi ve detay sayfaları.
-   **Ürünlerimiz Sayfası**: Tüm ürünlerin listesi ve detay sayfaları, sepete ekleme özelliği.
-   **Hakkımızda Sayfası**: Şirket bilgileri, değerler ve istatistikler.
-   **İletişim Sayfası**: İletişim formu ve bilgileri.
-   **Sepet ve Ödeme Sistemi**: Ürünleri sepete ekleme, miktar güncelleme ve ödeme süreci (Izico entegrasyonu).
-   **Yönetim Paneli**: Hizmetleri, ürünleri, siparişleri ve site ayarlarını yönetme.
-   **Duyarlı Tasarım**: Tüm cihazlarda sorunsuz görüntüleme.
-   **WhatsApp Destek Butonu**: Hızlı iletişim için sabit WhatsApp butonu.

## Kurulum

### Önkoşullar

-   Node.js (v18 veya üzeri önerilir)
-   npm veya Yarn
-   PostgreSQL veritabanı (veya Prisma tarafından desteklenen herhangi bir veritabanı)

### Adımlar

1.  **Depoyu Klonlayın:**
    \`\`\`bash
    git clone <depo-url>
    cd harun-elektrik-web
    \`\`\`

2.  **Bağımlılıkları Yükleyin:**
    \`\`\`bash
    npm install
    # veya
    yarn install
    \`\`\`

3.  **Ortam Değişkenlerini Yapılandırın:**
    `.env.local` dosyasını oluşturun ve aşağıdaki değişkenleri ekleyin:

    \`\`\`env
    DATABASE_URL="postgresql://user:password@host:port/database"
    ADMIN_PASSWORD="your_admin_password" # Yönetim paneli için basit bir şifre, üretimde hashlenmelidir.
    IZICO_API_KEY="YOUR_IZICO_API_KEY"
    IZICO_SECRET_KEY="YOUR_IZICO_SECRET_KEY"
    NEXT_PUBLIC_BASE_URL="http://localhost:3000" # Geliştirme ortamı için
    \`\`\`
    `DATABASE_URL` değerini kendi PostgreSQL veritabanı bağlantı dizginizle değiştirin.

4.  **Prisma Veritabanını Kurun ve Verileri Tohumlayın:**
    \`\`\`bash
    npx prisma migrate dev --name init
    npx prisma db seed
    \`\`\`
    Bu komutlar veritabanı şemasını oluşturacak ve örnek verileri ekleyecektir.

5.  **Uygulamayı Çalıştırın:**
    \`\`\`bash
    npm run dev
    # veya
    yarn dev
    \`\`\`
    Uygulama `http://localhost:3000` adresinde çalışacaktır.

## Yönetim Paneli

Yönetim paneline `http://localhost:3000/admin/login` adresinden erişebilirsiniz.
Varsayılan kullanıcı adı: `admin`
Varsayılan şifre: `.env.local` dosyasında ayarladığınız `ADMIN_PASSWORD` (varsayılan olarak `adminpassword` olarak tohumlanır).

## Dağıtım (Vercel)

Vercel'e dağıtım yaparken, Vercel projenizin ortam değişkenlerine `DATABASE_URL`, `ADMIN_PASSWORD`, `IZICO_API_KEY`, `IZICO_SECRET_KEY` ve `NEXT_PUBLIC_BASE_URL` (canlı URL'nizle) eklediğinizden emin olun.

Prisma Client'ın Vercel derlemeleri sırasında güncel kalmasını sağlamak için `package.json` dosyanızdaki `postinstall` betiğine `prisma generate` eklemeniz önerilir:

\`\`\`json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
\`\`\`

## Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen bir pull request göndermeden önce kodlama standartlarına uyun.

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır.
\`\`\`

\`\`\`
