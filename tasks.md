# ✅ tasks.md — AccessiNote Görev Listesi

**Güncelleme:** Mart 2026  
**Sprint:** MVP (v1.0)

---

## 🔴 Kritik — Temel Altyapı

- [ ] Proje repo yapısı oluşturulacak (`features/`, `app/`, `components/`, `lib/`)
- [ ] Next.js 14 projesi kurulacak (App Router)
- [ ] Tailwind CSS yapılandırılacak
- [ ] Supabase projesi oluşturulacak; bağlantı test edilecek
- [ ] `.env.local` şablonu hazırlanacak (`.env.example`)
- [ ] Vercel'e ilk deployment yapılacak

---

## 🔴 Kritik — Video İşleme

- [ ] YouTube URL doğrulama fonksiyonu yazılacak (`features/video/validate.ts`)
- [ ] `yt-dlp` ile video/ses indirme modülü kurulacak (`features/video/download.ts`)
- [ ] Video formatı kontrolü eklenecek (MP4, WebM, MOV)
- [ ] 3 saatten uzun videolar için kullanıcı uyarısı geliştirilecek
- [ ] Frame örnekleme modülü yazılacak (her 5 saniyede 1 kare) (`features/video/frames.ts`)

---

## 🔴 Kritik — Transkripsiyon (ASR)

- [ ] Whisper API entegrasyonu kurulacak (`features/asr/whisper.ts`)
- [ ] Türkçe dil desteği test edilecek
- [ ] Zaman damgalı (timestamp) transkript çıktısı sağlanacak
- [ ] Uzun ses dosyaları için segment bölme mantığı eklenecek
- [ ] Transkripsiyon hata yönetimi yazılacak (düşük ses kalitesi vb.)

---

## 🔴 Kritik — Görsel İçerik Tanıma (Vision AI)

- [ ] Google Vision API entegrasyonu kurulacak (`features/vision/ocr.ts`)
- [ ] Frame → Vision API pipeline'ı bağlanacak
- [ ] Türkçe karakter seti (ş, ğ, ü, ö, ç, ı) doğruluğu test edilecek
- [ ] Görsel betimlemelerin transkriptle birleştirilmesi sağlanacak
- [ ] Düşük kaliteli/okunamaz frame'ler için fallback yazılacak

---

## 🔴 Kritik — Akıllı Not Üretimi (Claude API)

- [ ] Anthropic SDK entegrasyonu kurulacak (`features/notes/generate.ts`)
- [ ] Sistem promptu yazılacak (hiyerarşik not yapısı için)
- [ ] Transkript + görsel betimlemelerin API'ye gönderilmesi sağlanacak
- [ ] JSON formatında çıktı şeması tanımlanacak
- [ ] Uzun transkriptler için context penceresi yönetimi yapılacak
- [ ] API hata yönetimi ve retry mantığı eklenecek

---

## 🔴 Kritik — Kullanıcı Arayüzü

- [ ] Ana sayfa tasarlanacak (URL giriş kutusu + açıklama)
- [ ] Yükleme/işleme ekranı geliştirilecek (progress bar + durum mesajları)
- [ ] Not görüntüleme sayfası yapılacak (hiyerarşik ağaç görünümü)
- [ ] Mobil uyumlu (responsive) layout yazılacak
- [ ] Hata sayfaları tasarlanacak (404, 500, API hatası)

---

## 🟡 Yüksek — Sesli Okuma (TTS)

- [ ] Web Speech API entegrasyonu yapılacak (`features/tts/speak.ts`)
- [ ] Oynat / Durdur / Devam ettir kontrolleri eklenecek
- [ ] Hız ayarı (0.5x – 2x) geliştirilecek
- [ ] Aktif okunan satırın vurgulanması sağlanacak
- [ ] Tarayıcı uyumluluğu test edilecek (Chrome, Firefox, Safari)

---

## 🟡 Yüksek — Dışa Aktarma

- [ ] PDF dışa aktarma modülü yazılacak (`features/export/pdf.ts`)
- [ ] Markdown dışa aktarma modülü yazılacak (`features/export/markdown.ts`)
- [ ] İndirme butonu UI bileşeni geliştirilecek
- [ ] Dışa aktarılan dosyada başlık, tarih ve video kaynağı bilgisi yer alacak

---

## 🟡 Yüksek — Erişilebilirlik

- [ ] Tüm bileşenlere ARIA etiketleri eklenecek
- [ ] Klavye navigasyonu test edilecek (Tab, Enter, Escape)
- [ ] Yüksek kontrast tema eklenecek
- [ ] Renk kontrast oranları WCAG 2.1 AA standartına göre kontrol edilecek
- [ ] NVDA ve VoiceOver ile uyumluluk test edilecek
- [ ] `axe-core` ile otomatik erişilebilirlik taraması yapılacak

---

## 🟡 Yüksek — API & Güvenlik

- [ ] Tüm API anahtarları sunucu taraflı tutulacak (client'a sızdırılmayacak)
- [ ] Rate limiting middleware yazılacak
- [ ] Video/ses dosyaları işlendikten 1 saat sonra silinecek (cron job)
- [ ] Input sanitization eklenecek (URL enjeksiyon saldırılarına karşı)
- [ ] HTTPS zorlaması yapılacak

---

## 🟢 Normal — Kullanıcı Deneyimi

- [ ] Erişilebilirlik tercihleri paneli (yan menü veya modal) geliştirilecek
- [ ] Tercihler localStorage'a kaydedilecek (oturum bağımsız)
- [ ] Video zaman damgası linkleri not başlıklarına eklenecek
- [ ] Not editörü (inline düzenleme + vurgulama) geliştirilecek
- [ ] Autosave özelliği eklenecek (3 saniyede bir)
- [ ] Paylaşım linki oluşturma özelliği eklenecek

---

## 🟢 Normal — Test & Kalite

- [ ] Unit testler yazılacak (Vitest / Jest)
- [ ] API route'ları için integration testleri yazılacak
- [ ] Farklı video türleriyle (ders, seminer, podcast) uçtan uca test yapılacak
- [ ] Yük testi yapılacak (eş zamanlı 100 kullanıcı senaryosu)
- [ ] Lighthouse ile performans ve erişilebilirlik skoru ölçülecek (hedef: ≥ 90)

---

## 🔵 Backlog — V2 Özellikleri

- [ ] Kullanıcı hesabı ve not kütüphanesi
- [ ] DOCX formatında dışa aktarma
- [ ] Arapça, Almanca, İspanyolca dil desteği
- [ ] Notlardan otomatik quiz üretici
- [ ] React Native ile mobil uygulama (iOS & Android)
- [ ] Braille (BRF) formatında çıktı desteği

---

## 📊 İlerleme Özeti

| Kategori | Toplam | Tamamlanan | Oran |
|---|---|---|---|
| Temel Altyapı | 6 | 0 | %0 |
| Video İşleme | 5 | 0 | %0 |
| Transkripsiyon | 5 | 0 | %0 |
| Vision AI | 5 | 0 | %0 |
| Not Üretimi | 6 | 0 | %0 |
| Arayüz | 5 | 0 | %0 |
| TTS | 5 | 0 | %0 |
| Dışa Aktarma | 4 | 0 | %0 |
| Erişilebilirlik | 6 | 0 | %0 |
| API & Güvenlik | 5 | 0 | %0 |
| **Toplam MVP** | **52** | **0** | **%0** |
