-- HARUN ELEKTRİK İlk Veriler

-- Kategoriler
INSERT INTO categories (name, slug, description, sort_order, is_active) VALUES 
('Elektrik Malzemeleri', 'elektrik-malzemeleri', 'Elektrik tesisatı için gerekli malzemeler', 1, true),
('Aydınlatma', 'aydinlatma', 'Avize, aplik ve aydınlatma ürünleri', 2, true),
('Güvenlik Sistemleri', 'guvenlik-sistemleri', 'Güvenlik kameraları ve alarm sistemleri', 3, true),
('Kablo ve Aksesuarlar', 'kablo-aksesuarlar', 'Elektrik kabloları ve aksesuarları', 4, true),
('Elektrikli Araç Şarj', 'elektrikli-arac-sarj', 'Elektrikli araç şarj istasyonları', 5, true);

-- Hizmetler (HTML içeriğinden alınan)
INSERT INTO services (name, slug, description, price, is_active, is_featured, image_url) VALUES 
('Elektrik Sigorta Arızaları', 'elektrik-sigorta-arizalari', 'Elektrik sigortası arızaları çoğu zaman elektrikle çalışan eşyalarımıza zarar verebilecek duruma gelebilir. Düşük gerilim ve yüksek gerilim sebebi neticesinde sigortalar atabilmektedir.', 200.00, true, true, '/images/sigorta-arizasi.jpg'),
('Avize Montajı', 'avize-montaji', 'Avizeler yaşadığımız her alanı günışığı gibi aydınlatmak için kullanılan modern tasarımlara ve zevklere göre üretilen aksesuar tarzında aydınlatma gereçleridir.', 150.00, true, true, '/images/avize-montaji.jpg'),
('Elektrik Tesisatı Bakım & Yenileme', 'elektrik-tesisati-bakim-yenileme', 'Elektrik tesisatları göz önünde olmayabilir. Taşıdığı riskten dolayı yetkisiz müdahaleler sonucu istenmeyen kazalara sebebiyet vermesi ile biliriz.', 500.00, true, true, '/images/elektrik-tesisati.jpg'),
('Telefon Santral Kurulumu', 'telefon-santral-kurulumu', 'Telefon santrallerinin kurulumları tarafımızdan profesyonelce yapılmaktadır. Karel santral kurulumu, Multitek santral kurulumu, Telesis santral kurulumu.', 800.00, true, false, '/images/santral-kurulumu.jpg'),
('Topraklama Hattı Çekimi', 'topraklama-hatti-cekimi', 'Topraklama hattı, prizlerde bulunabilecek herhangi bir kaçak olması durumunda elektrikli cihazlara bu durumu yansıtmamak için koruma işlemi yapar.', 300.00, true, false, '/images/topraklama.jpg'),
('İnternet Kablo Çekimi Ve Arızaları', 'internet-kablo-cekimi-arizalari', 'Günümüzde oldukça yoğun olarak kullanılan internet, her evde ve her işte yoğun olarak kullanılmaktadır. İnternet arızaları profesyonel çözüm gerektirir.', 250.00, true, false, '/images/internet-kablo.jpg'),
('Zil ve Diafon Arızaları Onarımı', 'zil-diafon-arizalari-onarimi', 'Diafonlar farklı çeşitlerde ve farklı alanlarda kullanılan cihazlardır. Temel amacı sesli veya görüntülü görüşmeler gerçekleştirmek içindir.', 180.00, true, false, '/images/diafon-onarim.jpg'),
('Aplik Montajı', 'aplik-montaji', 'Aplikler avizelerden farklı olarak dikey halde duvara monte edilmektedir. Avizelerin bir parçasıymış gibi dekorasyon amaçlı kullanılabilmektedir.', 120.00, true, false, '/images/aplik-montaji.jpg'),
('Çevre Aydınlatma Sistemleri', 'cevre-aydinlatma-sistemleri', 'Çevre aydınlatmaları günümüz koşullarında oldukça önemli yere sahiptir. Parkların, bahçelerin ve oyun alanlarının aydınlatılması güvenlik sağlar.', 1200.00, true, false, '/images/cevre-aydinlatma.jpg'),
('Elektrik Panosu Kurulumu', 'elektrik-panosu-kurulumu', 'Elektrik panosu kurulumları riskli ve zor bir işlemdir. Bir yapının en önemli bağlantısı elektrik panosudur.', 600.00, true, true, '/images/pano-kurulumu.jpg');

-- Örnek ürünler
INSERT INTO products (name, slug, description, price, stock_quantity, category_id, image_url, is_active, is_featured) VALUES 
('Elektrik Panosu 12 Devre', 'elektrik-panosu-12-devre', 'Kaliteli 12 devre elektrik panosu, güvenlik sigortaları dahil', 1500.00, 25, 1, '/images/elektrik-panosu.jpg', true, true),
('LED Avize Modern Tasarım', 'led-avize-modern', 'Modern tasarım LED avize, uzaktan kumandalı', 350.00, 12, 2, '/images/led-avize.jpg', true, true),
('IP Güvenlik Kamerası 4MP', 'ip-guvenlik-kamerasi-4mp', 'Yüksek çözünürlüklü IP güvenlik kamerası, gece görüş özellikli', 800.00, 8, 3, '/images/guvenlik-kamerasi.jpg', true, true),
('NYM Kablo 3x2.5', 'nym-kablo-3x2-5', 'Kaliteli NYM elektrik kablosu 3x2.5mm', 25.00, 100, 4, '/images/elektrik-kablo.jpg', true, false),
('Elektrikli Araç Şarj İstasyonu', 'elektrikli-arac-sarj-istasyonu', '22kW hızlı şarj istasyonu, akıllı ödeme sistemi', 15000.00, 3, 5, '/images/sarj-istasyonu.jpg', true, true);

-- Ana sayfalar
INSERT INTO pages (title, slug, content, status, meta_title, meta_description) VALUES 
('Ana Sayfa', 'ana-sayfa', '<h1>HARUN ELEKTRİK</h1><p>Profesyonel elektrik hizmetleri</p>', 'PUBLISHED', 'HARUN ELEKTRİK - Profesyonel Elektrik Hizmetleri', 'İstanbul genelinde 7/24 elektrik hizmetleri. Elektrik arıza, avize montajı, elektrik tesisatı ve daha fazlası.'),
('Hakkımızda', 'hakkimizda', '<h1>Hakkımızda</h1><p>Elektrikçilik günümüzde popüler olmak ile birlikte tecrübe gereken işlerin başında gelir. Uzun yılların verdiği tecrübe ve gelişmiş ekipmanlarımız ile profesyonel hizmet sunuyoruz.</p>', 'PUBLISHED', 'Hakkımızda - HARUN ELEKTRİK', 'HARUN ELEKTRİK hakkında bilgi edinin. Tecrübeli ekibimiz ve kaliteli hizmetimiz.'),
('İletişim', 'iletisim', '<h1>İletişim</h1><p>Bize ulaşın</p>', 'PUBLISHED', 'İletişim - HARUN ELEKTRİK', 'HARUN ELEKTRİK ile iletişime geçin. Telefon, WhatsApp ve e-posta iletişim bilgileri.');

-- Ana menü öğeleri
INSERT INTO menu_items (title, url, sort_order, is_active) VALUES 
('ANASAYFA', '/', 1, true),
('HAKKIMIZDA', '/hakkimizda', 2, true),
('HİZMETLERİMİZ', '/hizmetlerimiz', 3, true),
('ÜRÜNLER', '/urunler', 4, true),
('SERVİS BÖLGELERİMİZ', '/servis-bolgelerimiz', 5, true),
('KAMPANYALAR', '/kampanyalar', 6, true),
('GALERİ', '/galeri', 7, true),
('BLOG', '/blog', 8, true),
('İLETİŞİM', '/iletisim', 9, true),
('EKİBİMİZE KATIL', '/ekibimize-katil', 10, true);

-- Temel ayarlar
INSERT INTO settings (key, value, group_name) VALUES 
('site_title', 'HARUN ELEKTRİK', 'general'),
('site_description', 'Profesyonel Elektrik Hizmetleri', 'general'),
('contact_phone', '0534 519 9055', 'contact'),
('contact_email', 'info@harunelektrik.com', 'contact'),
('contact_address', '3 Farklı Elektrik Şubemiz İle Tüm İstanbul Geneline Profesyonel Hizmet Veriyoruz', 'contact'),
('whatsapp_number', '905345199055', 'integrations'),
('whatsapp_message', 'Merhaba! HARUN ELEKTRİK hakkında bilgi almak istiyorum.', 'integrations'),
('izico_api_key', '', 'payment'),
('izico_secret_key', '', 'payment'),
('izico_test_mode', '1', 'payment');

-- İlk admin kullanıcısı
INSERT INTO users (email, password, name, role) VALUES 
('admin@harunelektrik.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'ADMIN');
