# 📋 prd.md — AccessiNote Product Requirements Document

**Versiyon:** 1.0  
**Tarih:** Mart 2026  
**Durum:** Taslak  
**Hazırlayan:** AccessiNote Ekibi

---

## 1. Ürün Özeti

AccessiNote, ders videolarını takip etmekte zorlanan (özellikle görme engelli ve disleksik) öğrenciler için geliştirilmiş yapay zeka destekli bir web uygulamasıdır. Uzun ve karmaşık ders videolarını saniyeler içinde temiz, düzenli, hiyerarşik ve sesli okunabilir metin notlarına dönüştürür.

**Kısa tanım:** *Video URL'si gir → Akıllı not al*

---

## 2. Problem & Fırsat

### 2.1 Problem

Türkiye'de yaklaşık 1,2 milyon engelli öğrenci (kaynak: TÜİK 2024) eğitim materyallerine eşit biçimde erişemiyor. Ders videoları bu erişim açığının en büyük kaynağı haline geliyor:

- Görme engelli öğrenciler tahta ve slayt içeriklerinden yoksun kalıyor.
- Disleksik öğrenciler uzun, yapılandırılmamış videoları not alarak takip edemiyor.
- Tüm öğrenciler için 60 dakikalık videodan bilgi çıkarmak ortalama **3.5 saat** sürüyor.

### 2.2 Fırsat

Yapay zekanın konuşma tanıma, görsel anlama ve metin özetleme alanlarındaki gelişimi bu problemi teknik olarak çözülebilir kılıyor. Piyasada bu üç teknolojiyi erişilebilirlik odağıyla bir araya getiren bir ürün henüz bulunmuyor.

---

## 3. Hedef Kullanıcılar

### Birincil Kullanıcı — Engelli Öğrenci
- **Yaş:** 15–30
- **Bağlam:** Görme engelli veya disleksi tanısı almış lise/üniversite öğrencisi
- **Araç:** Ekran okuyucu kullanan, yüksek kontrast temaya ihtiyaç duyan
- **Hedefi:** Ders videosundan bağımsız olarak not çıkarabilmek

### İkincil Kullanıcı — Zaman Kısıtlı Öğrenci
- **Yaş:** 18–35
- **Bağlam:** Sınav döneminde yoğun olan, tekrar için zaman ayıramayan
- **Araç:** Standart masaüstü / mobil tarayıcı
- **Hedefi:** Videoyu izlemeden içeriğe hâkim olmak

---

## 4. Başarı Metrikleri

| Metrik | Hedef (İlk 6 ay) |
|---|---|
| Aylık aktif kullanıcı (MAU) | 5.000 |
| Ortalama not üretim süresi | < 45 saniye (60 dk video için) |
| Kullanıcı memnuniyeti (CSAT) | ≥ 4.2 / 5.0 |
| Engelli kullanıcı oranı | ≥ %30 |
| Haftalık geri dönen kullanıcı | ≥ %40 |
| WCAG 2.1 AA uyum skoru | %100 |

---

## 5. Özellikler & Gereksinimler

### 5.1 MVP (Minimum Viable Product)

#### F-01 — Video URL Girişi
- **Açıklama:** Kullanıcı YouTube, Vimeo veya doğrudan MP4 URL'si girebilir.
- **Kabul kriteri:** Geçersiz URL'de anlaşılır hata mesajı gösterilir. 3 saat altındaki videolar desteklenir.
- **Öncelik:** 🔴 Kritik

#### F-02 — Otomatik Transkripsiyon
- **Açıklama:** Whisper ASR ile video sesi metne dönüştürülür. Zaman damgaları korunur.
- **Kabul kriteri:** Türkçe ve İngilizce için WER (Word Error Rate) ≤ %10.
- **Öncelik:** 🔴 Kritik

#### F-03 — Görsel İçerik Tanıma
- **Açıklama:** Her 5 saniyede bir video karesi örneklenerek tahta/slayt içeriği OCR ile çıkarılır.
- **Kabul kriteri:** En az %80 karakter doğruluğu. Türkçe karakter setini destekler.
- **Öncelik:** 🔴 Kritik

#### F-04 — Akıllı Not Üretimi
- **Açıklama:** Transkript ve görsel betimlemeler Claude API'ye gönderilir. Hiyerarşik not çıktısı alınır.
- **Kabul kriteri:** Çıktı Ana Başlık / Alt Başlık / Madde / Vurgulu Blok yapısına sahip olmalı.
- **Öncelik:** 🔴 Kritik

#### F-05 — Sesli Okuma (TTS)
- **Açıklama:** Notlar Web Speech API ile sesli okunur. Oynat/durdur/hız kontrolü mevcut.
- **Kabul kriteri:** Tüm modern tarayıcılarda çalışır. Hız 0.5x–2x arasında ayarlanabilir.
- **Öncelik:** 🔴 Kritik

#### F-06 — Not Dışa Aktarma
- **Açıklama:** PDF ve Markdown formatında indirme.
- **Kabul kriteri:** Çıktı dosyası indirme linki < 3 saniyede oluşur.
- **Öncelik:** 🟡 Yüksek

#### F-07 — Erişilebilirlik Modu
- **Açıklama:** Yüksek kontrast tema, büyük yazı tipi seçeneği, klavye navigasyonu.
- **Kabul kriteri:** WCAG 2.1 AA standartlarını karşılar. axe ile %0 kritik hata.
- **Öncelik:** 🔴 Kritik

---

### 5.2 V2 Özellikleri *(MVP sonrası)*

| Özellik | Açıklama |
|---|---|
| Kullanıcı hesabı | Not kütüphanesi, tarih bazlı arşiv |
| DOCX dışa aktarma | Microsoft Word uyumlu not çıktısı |
| Çoklu dil | Arapça, Almanca, İspanyolca transkripsiyon |
| Quiz üretici | Notlardan otomatik soru-cevap seti oluşturma |
| Paylaşım | Notları arkadaşlarla paylaşma linki |
| Mobil uygulama | React Native ile iOS & Android |
| Braille çıktı | BRF formatında not dışa aktarma |

---

## 6. Teknik Gereksinimler

### 6.1 Performans
- Sayfa ilk yüklenme süresi (LCP): **< 2.5 saniye**
- 60 dakikalık video için not üretim süresi: **< 60 saniye**
- API yanıt süresi (p95): **< 3 saniye**
- Uptime: **≥ %99.5**

### 6.2 Erişilebilirlik
- WCAG 2.1 AA tam uyum
- NVDA, JAWS ve VoiceOver ekran okuyucularıyla uyumlu test edilmiş
- Tüm etkileşimler klavye ile erişilebilir
- Renk kontrast oranı: ≥ 4.5:1 (normal metin), ≥ 3:1 (büyük metin)

### 6.3 Güvenlik
- Tüm API anahtarları sunucu taraflı; frontend'e asla sızdırılmaz
- Video/ses dosyaları işlendikten sonra 1 saat içinde silinir
- Kullanıcı verileri KVKK uyumlu şekilde işlenir
- HTTPS zorunlu; HTTP istekleri 301 ile yönlendirilir

### 6.4 Tarayıcı Desteği
- Chrome ≥ 110, Firefox ≥ 115, Safari ≥ 16, Edge ≥ 110
- Mobil: Chrome for Android, Safari for iOS

---

## 7. Kullanıcı Hikayeleri

```
US-01: Görme engelli öğrenci olarak, bir YouTube dersi linkini yapıştırıp
       tahta yazılarının betimlendiği, sesli okunabilir notlar almak istiyorum.
       → Başarı: Tüm görsel içerik metne dönüşmüş ve TTS çalışıyor.

US-02: Disleksik öğrenci olarak, 90 dakikalık bir videoyu izlemek yerine
       önemli noktaları maddeler halinde görmek istiyorum.
       → Başarı: Notlar hiyerarşik yapıda, gereksiz tekrar yok.

US-03: Sınava hazırlanan öğrenci olarak, notlarımı PDF olarak
       indirip çevrimdışı çalışmak istiyorum.
       → Başarı: PDF 3 saniye içinde indirildi.

US-04: Öğrenci olarak, belirli bir konuya geri dönmek istediğimde
       videodaki ilgili zamana atlayabilmek istiyorum.
       → Başarı: Her not başlığında video zaman damgası linki var.
```

---

## 8. Kısıtlamalar & Riskler

| Risk | Olasılık | Etki | Azaltma Stratejisi |
|---|---|---|---|
| API maliyetleri yüksek | Orta | Yüksek | Ücretsiz kullanım limiti; ücretli plan |
| Telif haklı video içerikleri | Yüksek | Orta | Kullanım koşullarında sorumluluk reddi |
| Ses kalitesi düşük videolar | Orta | Orta | Manuel transkript yükleme seçeneği |
| Desteklenmeyen video platformu | Düşük | Düşük | MP4 direkt yükleme fallback |
| KVKK uyumsuzluğu | Düşük | Yüksek | Hukuk danışmanlığı, veri minimizasyonu |

---

## 9. Yol Haritası

```
Mart 2026      → Proje başlangıcı, MVP geliştirme
Nisan 2026     → Alpha test (20 engelli öğrenci)
Mayıs 2026     → Beta yayını (kapalı kayıt)
Haziran 2026   → Açık yayın (public launch)
Ağustos 2026   → V2 özellikleri (hesap sistemi, DOCX)
Kasım 2026     → Mobil uygulama beta
```

---

## 10. Ekler

- **Tasarım:** `features/ui/` klasöründeki Figma dışa aktarımları
- **API Dökümanı:** `features/api/README.md`
- **Test Planı:** `features/tests/test-plan.md`
- **KVKK Politikası:** `features/legal/privacy.md`
