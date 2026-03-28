
# 📋 AccessiNote — Ürün Gereksinim Belgesi (PRD)

> **Versiyon**: 1.0  
> **Tarih**: Mart 2026  
> **Yazar**: AccessiNote Ekibi  
> **Durum**: Geliştirme Aşamasında

---

## 1. Ürün Nedir?

AccessiNote, bir YouTube video linkini yapıştıran öğrencinin önüne saniyeler içinde temiz, düzenli, sesli okunabilir ders notları çıkaran bir web uygulamasıdır.

Kullanıcı hiçbir şey yapmak zorunda değil. Link yapıştır, bekle, notlarını al.

Özellikle **görme engelli** ve **disleksik** öğrenciler için tasarlanmıştır. Ama aslında zamanı kısıtlı her öğrencinin işine yarar.

---

## 2. Neden Bu Ürün Var?

- 60 dakikalık bir videodan not çıkarmak ortalama **3.5 saat** alıyor.
- Görme engelli öğrenciler tahtadaki ve slayttaki içerikleri kaçırıyor.
- Disleksik öğrenciler uzun, yapılandırılmamış videoları takip edemiyor.
- YouTube'un otomatik altyazıları ham ve düzensiz — öğrenmeye uygun değil.
- Piyasada bu üç teknolojiyi (ses tanıma + özetleme + erişilebilirlik) bir arada sunan ürün yok.

---

## 3. Kullanıcı Kimdir?

### Birincil Kullanıcı
- Üniversite veya lise öğrencisi
- Görme engelli ya da disleksik
- Türkçe ders videoları izliyor
- Teknik bilgisi yok, sadece tarayıcı kullanıyor

### İkincil Kullanıcı
- Zamanı kısıtlı, hızlı özet isteyen her öğrenci
- Ders içeriğini taramak isteyen akademisyen

---

## 4. Kullanıcı Yolculuğu (Adım Adım)

```
Kullanıcı siteye girer
        ↓
YouTube video linkini yapıştırır
        ↓
"Notları Oluştur" butonuna tıklar
        ↓
[Arka planda]: Ses indirilir → Transkribe edilir → Notlar oluşturulur
        ↓
Ekranda yapılandırılmış notlar belirir
        ↓
Kullanıcı notları okur / dinler / indirir
```

Toplam bekleme süresi: **30–90 saniye** (video uzunluğuna göre)

---

## 5. Ekranlar ve İçerikleri

### Ekran 1 — Ana Sayfa (Landing)

**Kullanıcı ne görür?**
- Uygulamanın adı ve tek cümlelik açıklaması
- Büyük bir URL giriş kutusu
- "Notları Oluştur" butonu
- Kısa 3 adımlı açıklama: "Linki yapıştır → Bekle → Notlarını al"

**Kullanıcı ne yapar?**
- YouTube video linkini kutuya yapıştırır
- Butona tıklar

**Validasyon:**
- Boş link → "Lütfen bir YouTube linki girin"
- Geçersiz URL → "Geçerli bir YouTube linki girin"
- YouTube dışı link → "Sadece YouTube linkleri destekleniyor"

---

### Ekran 2 — İşlem Ekranı (Loading)

**Kullanıcı ne görür?**
- Animasyonlu yükleme göstergesi
- Hangi adımda olduğunu gösteren durum mesajları:
  - ⏳ "Video bilgileri alınıyor..."
  - 🎵 "Ses ayıklanıyor..."
  - 🧠 "Yapay zeka dinliyor..."
  - 📝 "Notlar oluşturuluyor..."
- Tahmini süre göstergesi

**Kullanıcı ne yapar?**
- Bekler. Başka bir şey yapmasına gerek yok.

**Hata durumları:**
- Video bulunamazsa → "Bu video erişilebilir değil"
- Video çok uzunsa → "Maksimum 90 dakikalık videolar destekleniyor"
- API hatası → "Bir sorun oluştu, lütfen tekrar deneyin"

---

### Ekran 3 — Sonuç Ekranı (Notlar)

**Kullanıcı ne görür?**

Sol panel — Video Bilgisi:
- Video başlığı
- Kanal adı
- Video süresi
- Küçük thumbnail

Sağ / Ana panel — Oluşturulan Notlar:
- Hiyerarşik başlıklar (H1, H2, H3)
- Madde işaretli alt notlar
- **Kalın** yazılmış önemli kavramlar
- Zaman damgaları (örn. [02:45] Bu kavram burada açıklandı)
- Temiz, bol boşluklu, okunabilir format

**Kullanıcı ne yapabilir?**
- Notları sayfada okur
- "Metni Dinle" butonu → tarayıcı TTS ile sesli okuma
- "Kopyala" butonu → panoya kopyalar
- "PDF İndir" butonu → PDF olarak indirir (v1.5)
- "Yeni Video" butonu → başa döner

---

## 6. AI Ne Yapar? (Teknik Olmayan Açıklama)

Kullanıcı butona tıkladığında arka planda şunlar olur:

### Adım 1 — Sesi İndir
`yt-dlp` adlı araç YouTube videosunun sesini bilgisayara indirir. Görüntü değil, sadece ses. Bu işlem video uzunluğuna göre 5–30 saniye sürer.

### Adım 2 — Sesi Metne Çevir
Google Gemini AI ses dosyasını dinler ve konuşulanları kelimesi kelimesine Türkçe metne döker. Bu bir "dikte makinesi" gibi çalışır ama çok daha akıllıdır — bağlamı anlar, noktalama koyar.

### Adım 3 — Notları Oluştur
Aynı AI ham transkripsiyon metnini alır ve şunu sorar kendine: "Bu bir ders notu olsaydı nasıl görünürdü?" Sonra başlıklar koyar, önemli kavramları vurgular, gereksiz tekrarları atar, öğrencinin anlayacağı temiz bir not haline getirir.

---

## 7. Teknik Mimari

```
[Kullanıcı Tarayıcısı]
        ↓ HTTP POST /api/process
[Next.js API Route — process]
        ↓ yt-dlp komutu
[yt-dlp + ffmpeg] → .mp3 dosyası
        ↓
[Next.js API Route — transcribe]
        ↓ Gemini File API (upload)
        ↓ Gemini 2.5 Flash (generateContent)
[Google Gemini AI]
        ↓ Transkripsiyon metni
[Next.js API Route — notes] (yakında)
        ↓ Gemini ile not formatla
[Kullanıcı Tarayıcısı] ← Yapılandırılmış notlar
```

### Teknoloji Seçimleri

| Katman | Teknoloji | Neden? |
|--------|-----------|--------|
| Frontend | Next.js 14 (App Router) | Hızlı, SEO dostu, API route'lar dahili |
| Stil | Tailwind CSS | Hızlı geliştirme |
| Ses indirme | yt-dlp + ffmpeg | En güvenilir YouTube ses aracı |
| AI | Google Gemini 2.5 Flash | Ses anlama + metin üretme bir arada |
| Dosya yükleme | Gemini File API | 13MB+ dosyalar için zorunlu |
| Deploy | Vercel (planlanan) | Next.js için en kolay |

---

## 8. API Endpoint'leri

### POST /api/process
**Görev**: YouTube URL'den sesi indir  
**Girdi**: `{ url: "https://youtube.com/watch?v=..." }`  
**Çıktı**: `{ fileName: "audio-123456.mp3" }`  
**Süre**: 5–30 saniye

### POST /api/transcribe
**Görev**: Ses dosyasını metne çevir  
**Girdi**: `{ fileName: "audio-123456.mp3" }`  
**Çıktı**: `{ text: "Ham transkripsiyon metni..." }`  
**Süre**: 15–60 saniye

### POST /api/notes *(yakında)*
**Görev**: Ham metni yapılandırılmış nota dönüştür  
**Girdi**: `{ text: "Ham transkripsiyon..." }`  
**Çıktı**: `{ notes: "# Başlık\n## Alt başlık\n..." }`  
**Süre**: 5–15 saniye

---

## 9. Kısıtlamalar (v1.0)

| Kısıt | Değer | Neden? |
|-------|-------|--------|
| Maksimum video süresi | 90 dakika | Gemini token limiti |
| Desteklenen dil | Türkçe | İlk MVP odağı |
| Desteklenen kaynak | Sadece YouTube | yt-dlp kısıtı |
| Kullanıcı hesabı | Yok | MVP basitliği |
| Not kaydetme | Yok | MVP basitliği |
| Eş zamanlı işlem | 1 video | Sunucu kapasitesi |

---

## 10. Erişilebilirlik Gereksinimleri

Bu ürünün DNA'sında erişilebilirlik var. Şunlar zorunlu:

- [ ] Tüm butonlar klavye ile kullanılabilir olmalı
- [ ] Ekran okuyucu (NVDA, VoiceOver) ile tam uyumlu ARIA etiketleri
- [ ] Renk kontrastı WCAG AA standardını karşılamalı
- [ ] Yükleme durumları ekran okuyucuya sesli bildirilmeli (`aria-live`)
- [ ] Font boyutu en az 16px, satır aralığı 1.6
- [ ] "Metni Dinle" özelliği (Web Speech API)
- [ ] Odak sırası mantıklı ve görünür olmalı

---

## 11. Başarı Metrikleri

| Metrik | Hedef (3 ay) |
|--------|-------------|
| Haftalık aktif kullanıcı | 500+ |
| Ortalama işlem süresi | < 90 saniye |
| Başarılı transkripsiyon oranı | > 90% |
| Kullanıcı memnuniyeti (anket) | 4/5+ |
| Engelli kullanıcı oranı | > 30% |

---

## 12. Yol Haritası

### v1.0 — MVP (Şu an)
- [x] YouTube URL doğrulama
- [x] Ses indirme (yt-dlp)
- [x] Transkripsiyon (Gemini File API)
- [ ] Not formatlaması (ikinci Gemini çağrısı)
- [ ] Temiz sonuç ekranı
- [ ] Temel erişilebilirlik

### v1.5 — İlk Geliştirme
- [ ] PDF / Word export
- [ ] "Metni Dinle" özelliği
- [ ] Hata mesajları iyileştirme
- [ ] Mobil uyumluluk

### v2.0 — Öğrenme Araçları
- [ ] Flashcard oluşturma
- [ ] Quiz oluşturma
- [ ] Not kaydetme (local storage)

### v2.5 — Hesap Sistemi
- [ ] Kullanıcı kaydı / girişi
- [ ] Not arşivi
- [ ] Freemium model

### v3.0 — Görsel Anlama
- [ ] Slayt ve tahta OCR
- [ ] Görsel içeriği nota ekleme
- [ ] Çoklu dil desteği

---

## 13. Riskler ve Çözümler

| Risk | Olasılık | Çözüm |
|------|----------|-------|
| YouTube API değişiklikleri yt-dlp'yi bozar | Orta | yt-dlp düzenli güncelleme |
| Gemini API maliyeti artar | Düşük | Kullanım limitleri ekle |
| Uzun videolarda zaman aşımı | Yüksek | Webhook / kuyruk sistemi |
| Telif hakkı sorunları | Orta | Sadece kişisel kullanım, kayıt yok |
| Türkçe dışı videolarda kalite | Yüksek | v1.0'da sadece Türkçe destekle |

---

*Bu belge yaşayan bir dokümandır. Geliştirme sürecinde güncellenmeye devam edecektir.*
