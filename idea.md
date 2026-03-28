# 💡 AccessiNote — Fikir Belgesi (idea.md)

## 🎯 Tek Cümlelik Fikir
AccessiNote, ders videolarını takip etmekte zorlanan engelli ve dezavantajlı öğrenciler için YouTube videolarını saniyeler içinde temiz, hiyerarşik ve sesli okunabilir notlara dönüştüren yapay zeka destekli bir web uygulamasıdır.

---

## 😣 Problem

### Kimler Etkileniyor?
- **Görme engelli öğrenciler**: Tahta yazıları, slaytlar, görseller — bunların hiçbirini alamıyorlar. Sadece sesi duyuyorlar ama görsel içerik dersin büyük bir bölümünü oluşturuyor.
- **Disleksik öğrenciler**: Uzun, yapılandırılmamış video içeriklerini not alarak takip etmek neredeyse imkânsız. Okuma hızları farklı, dikkat dağınıklığı yüksek.
- **Tüm öğrenciler**: 60 dakikalık bir videodan çalışma notu çıkarmak ortalama **3.5 saat** sürüyor. Bu inanılmaz bir verimlilik kaybı.

### Mevcut Çözümlerin Eksiklikleri
| Araç | Sorun |
|------|-------|
| YouTube otomatik altyazı | Ham, düzensiz, noktalama işareti yok |
| Otter.ai / Whisper | Sadece transkripsiyon, not formatlaması yok |
| Genel özet araçları | Erişilebilirlik odağı yok, görsel içeriği anlamıyor |
| Manuel not alma | Çok zaman alıyor, engelli kullanıcılar için yetersiz |

**Piyasada bu üç teknolojiyi (konuşma tanıma + görsel anlama + metin özetleme) erişilebilirlik odağıyla bir araya getiren bir ürün henüz bulunmuyor.**

---

## ✨ Çözüm

AccessiNote şu adımları otomatik olarak gerçekleştirir:

1. **YouTube URL al** → Kullanıcı sadece video linkini yapıştırır
2. **Sesi ayıkla** → `yt-dlp` ile video sesini indirir
3. **Transkribe et** → Gemini AI ile konuşmaları metne döker
4. **Notları yapılandır** → Başlıklar, alt başlıklar, vurgular, önemli kavramlar
5. **Erişilebilir sun** → Ekran okuyucuyla uyumlu, sesli okunabilir format

---

## 👥 Hedef Kullanıcılar

### Birincil
- Görme engelli üniversite / lise öğrencileri
- Disleksik öğrenciler
- İşitme kaybı olmayan ama görsel öğrenme güçlüğü yaşayan bireyler

### İkincil
- Zaman baskısı altındaki tüm öğrenciler
- Online ders izleyen yetişkin öğrenciler
- Ders içeriğini hızlıca taramak isteyen akademisyenler

---

## 🔑 Temel Değer Önerisi

> "60 dakikalık dersi 60 saniyede okunabilir nota dönüştür."

- ⚡ **Hız**: Dakikalar içinde hazır
- ♿ **Erişilebilirlik**: Ekran okuyucu uyumlu, temiz HTML çıktısı
- 🧠 **Zeka**: Sadece transkripsiyon değil, yapılandırılmış öğrenme notu
- 🎯 **Odak**: Öğrenciler için özel tasarım, genel amaçlı değil

---

## 🛠️ Teknik Temel (Mevcut Durum)

- **Frontend**: Next.js (App Router)
- **Ses indirme**: yt-dlp + ffmpeg
- **AI**: Google Gemini 2.5 Flash (ses transkripsiyon + not oluşturma)
- **Dosya işleme**: Gemini File API (büyük ses dosyaları için)

---

## 🚀 Gelecek Vizyon

| Aşama | Özellik |
|-------|---------|
| v1.0 | YouTube → Transkripsiyon → Yapılandırılmış Not |
| v1.5 | PDF / Word export, not kaydetme |
| v2.0 | Flashcard ve quiz oluşturma |
| v2.5 | Kullanıcı hesabı, not arşivi |
| v3.0 | Görsel içerik anlama (tahta, slayt OCR) |
| v3.5 | Çoklu dil desteği |

---

## 💰 İş Modeli (İlk Düşünceler)

- **Freemium**: Ayda 5 video ücretsiz
- **Pro plan**: Sınırsız video, export özellikleri, öncelikli işlem
- **Kurumsal**: Üniversiteler ve erişilebilirlik merkezleri için toplu lisans

---

## 🏆 Rekabet Avantajı

AccessiNote'u benzersiz kılan **üç şeyin kesişimi**:
1. Erişilebilirlik öncelikli tasarım
2. Not alma zekası (sadece transkripsiyon değil)
3. Sıfır kurulum — tarayıcıda çalışır, link yapıştır yeter

---

*Son güncelleme: Mart 2026*
