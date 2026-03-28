# ✅ AccessiNote — Geliştirme Görev Listesi (tasks.md)

> Her görevi tamamladıkça `[ ]` → `[x]` olarak işaretle.  
> Sırayla git — her aşama bir sonrakinin temeli.

---

## 🏁 AŞAMA 1 — Backend Tamamlama (MVP Çekirdeği)

> Hedef: Kullanıcı link verince notlar ekrana gelsin.

### 1.1 — `/api/notes` Endpoint'i Yaz
- [ ] `app/api/notes/route.ts` dosyasını oluştur
- [ ] Gemini'ye ham transkripsiyon metni gönder
- [ ] Prompt yaz: başlıklar, alt başlıklar, kalın kavramlar, zaman damgaları
- [ ] Markdown formatında yapılandırılmış not döndür
- [ ] Hata yönetimi ekle (try/catch, anlamlı hata mesajları)

### 1.2 — API Akışını Birleştir
- [ ] Frontend'de 3 API çağrısını sırayla yap: `process` → `transcribe` → `notes`
- [ ] Her adımın çıktısını bir sonrakine geçir
- [ ] Tüm akış tek bir "Notları Oluştur" butonuna bağlı olsun

### 1.3 — Temp Dosya Temizliği
- [ ] İşlem bittikten sonra `.mp3` dosyası otomatik silinsin
- [ ] `/public/temp/` klasörü birikmiş dosyalardan korunsun
- [ ] Hata durumunda da dosya temizlensin (finally bloğu)

---

## 🎨 AŞAMA 2 — Frontend: 3 Ekranı Yap

> Hedef: Kullanıcı deneyimi akışkan ve erişilebilir olsun.

### 2.1 — Ekran 1: Ana Sayfa (Landing)
- [ ] Uygulama adı ve tek cümlelik açıklama
- [ ] Büyük, belirgin URL giriş kutusu
- [ ] "Notları Oluştur" butonu
- [ ] "Linki yapıştır → Bekle → Notlarını al" 3 adım açıklaması
- [ ] URL validasyonu: boş / geçersiz / YouTube dışı için hata mesajları
- [ ] Enter tuşuyla da form submit olsun

### 2.2 — Ekran 2: Yükleme Ekranı (Loading)
- [ ] Animasyonlu yükleme göstergesi (spinner veya progress bar)
- [ ] Adım adım durum mesajları:
  - `⏳ Video bilgileri alınıyor...`
  - `🎵 Ses ayıklanıyor...`
  - `🧠 Yapay zeka dinliyor...`
  - `📝 Notlar oluşturuluyor...`
- [ ] Her API çağrısı tamamlandığında mesaj otomatik güncellensin
- [ ] `aria-live="polite"` ile ekran okuyucuya bildir

### 2.3 — Ekran 3: Sonuç Ekranı (Notlar)
- [ ] Sol panel: video başlığı, kanal adı, süre, thumbnail
- [ ] Sağ/Ana panel: markdown formatındaki notları render et
- [ ] H1, H2, H3 başlıkları görsel hiyerarşiyle göster
- [ ] Kalın kavramlar, madde işaretleri düzgün görünsün
- [ ] Zaman damgaları tıklanabilir olsun (ileride YouTube'a yönlendir)
- [ ] "Kopyala" butonu — tüm notu panoya kopyala
- [ ] "Yeni Video" butonu — ana sayfaya dön, state sıfırlansın

---

## ♿ AŞAMA 3 — Erişilebilirlik

> Hedef: Görme engelli ve disleksik kullanıcılar rahatça kullanabilsin.

### 3.1 — Ekran Okuyucu Uyumu
- [ ] Tüm butonlara `aria-label` ekle
- [ ] Giriş kutusuna `aria-describedby` ile açıklama bağla
- [ ] Yükleme ekranına `aria-live="polite"` ekle
- [ ] Hata mesajları `role="alert"` ile tanımla
- [ ] Odak sırası (tab order) mantıklı olsun

### 3.2 — Klavye Navigasyonu
- [ ] Tab ile tüm etkileşimli elemanlara ulaşılabilsin
- [ ] Butonlar Enter ve Space ile tetiklensin
- [ ] Odak göstergesi (focus ring) görünür olsun, gizlenmesin

### 3.3 — Görsel Erişilebilirlik
- [ ] Metin/arka plan renk kontrastı WCAG AA (4.5:1) karşılasın
- [ ] Font boyutu minimum 16px
- [ ] Satır aralığı minimum 1.6
- [ ] Hata mesajları sadece renkle değil ikonla da belirtilsin

### 3.4 — "Metni Dinle" Özelliği
- [ ] Web Speech API ile notları sesli oku
- [ ] "Dinle / Durdur" toggle butonu
- [ ] Okuma hızı ayarı (0.5x — 2x)
- [ ] Okunan bölüm highlight ile takip edilsin (opsiyonel)

---

## 🛡️ AŞAMA 4 — Hata Yönetimi & Edge Case'ler

> Hedef: Uygulama hiç çökmeden akıllıca hata versin.

- [ ] Video bulunamadı → "Bu video erişilebilir değil veya silinmiş"
- [ ] Video 90 dakikadan uzun → "Maksimum 90 dakikalık videolar destekleniyor"
- [ ] Özel/gizli video → "Bu video herkese açık değil"
- [ ] İnternet bağlantısı kesildi → "Bağlantı hatası, lütfen tekrar deneyin"
- [ ] Gemini API kotası doldu → "Şu an yoğun talep var, biraz sonra deneyin"
- [ ] Tüm hata mesajları Türkçe ve anlaşılır olsun
- [ ] Hata sonrası kullanıcı tekrar deneyebilsin (retry butonu)

---

## 📱 AŞAMA 5 — Mobil Uyumluluk

> Hedef: Telefonda da düzgün çalışsın.

- [ ] Responsive layout — 320px'den başlayan ekranlar
- [ ] URL giriş kutusu mobilde büyük ve kolay tıklanabilir
- [ ] Sonuç ekranı tek kolon olarak yeniden düzenlensin (mobilde sol panel üste)
- [ ] Touch target boyutları minimum 44x44px
- [ ] Mobil klavye açıldığında layout bozulmasın

---

## 🚀 AŞAMA 6 — v1.5 Özellikleri

> Hedef: MVP'yi tamamla, ilk kullanıcılara sun.

### 6.1 — PDF Export
- [ ] `react-to-pdf` veya `jsPDF` kütüphanesi ekle
- [ ] Notları PDF olarak indir butonu
- [ ] PDF'de logo, video adı ve tarih başlıkta görünsün

### 6.2 — Video Metadata
- [ ] YouTube oEmbed API ile video başlığı ve thumbnail çek
- [ ] Sonuç ekranında video bilgilerini göster
- [ ] Kanal adı ve video süresi de görünsün

### 6.3 — UX İyileştirmeleri
- [ ] Son kullanılan 3 videoyu local storage'da tut
- [ ] "Son videolarım" kısmı ana sayfada göster
- [ ] Notları local storage'a kaydet (sayfa yenilenmesine karşı)

---

## 🧪 AŞAMA 7 — Test & Kalite

> Hedef: Güvenilir bir ürün çıkar.

- [ ] Farklı uzunluklarda videolar test et (5dk, 20dk, 60dk, 90dk)
- [ ] Farklı içerik türleri test et (matematik, tarih, dil, fen)
- [ ] Yavaş internet bağlantısında test et
- [ ] Mobil cihazlarda test et (iOS Safari, Android Chrome)
- [ ] Ekran okuyucuyla test et (VoiceOver / NVDA)
- [ ] Hatalı URL'lerle test et
- [ ] Aynı anda 2 sekme açık test et

---

## ☁️ AŞAMA 8 — Yayına Alma (Deploy)

> Hedef: Herkes erişebilsin.

- [ ] Vercel hesabı aç
- [ ] GitHub reposunu Vercel'e bağla
- [ ] Environment variable'ları Vercel'e ekle (`GOOGLE_GENERATIVE_AI_API_KEY`)
- [ ] `vercel.json` ile API timeout'u 60 saniyeye çıkar
- [ ] Deploy sonrası tüm akışı canlıda test et
- [ ] Custom domain bağla (opsiyonel)
- [ ] `robots.txt` ve `sitemap.xml` ekle

---

## 📊 Özet İlerleme

| Aşama | Durum | Tahmini Süre |
|-------|-------|-------------|
| Aşama 1 — Backend | 🔄 Devam ediyor | 1-2 gün |
| Aşama 2 — Frontend | ⏳ Bekliyor | 2-3 gün |
| Aşama 3 — Erişilebilirlik | ⏳ Bekliyor | 1-2 gün |
| Aşama 4 — Hata Yönetimi | ⏳ Bekliyor | 1 gün |
| Aşama 5 — Mobil | ⏳ Bekliyor | 1 gün |
| Aşama 6 — v1.5 | ⏳ Bekliyor | 2-3 gün |
| Aşama 7 — Test | ⏳ Bekliyor | 1-2 gün |
| Aşama 8 — Deploy | ⏳ Bekliyor | 1 gün |

**Tahmini toplam MVP süresi: ~10-15 gün**

---

## 🎯 Şu An Yapılacak İlk Görev

```
→ Aşama 1.1: app/api/notes/route.ts dosyasını yaz
```

Bu dosya olmadan frontend'e geçmek anlamsız.  
Önce backend biter, sonra ekranlar gelir.

---

*Son güncelleme: Mart 2026*
