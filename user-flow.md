# 🔄 AccessiNote — Kullanıcı Akışı (user-flow.md)

> "Kullanıcı uygulamayı açtığında ne görür, ne yapar, ne olur?"

---

## 🟢 ANA AKIŞ — Başarılı Senaryo

### Adım 1 — Uygulamayı Aç
**Kullanıcı ne yapar?** Tarayıcıda accessinote.com adresine girer.

**Kullanıcı ne görür?**
- Sayfanın ortasında büyük bir başlık: **"AccessiNote"**
- Altında tek cümle: *"YouTube ders videolarını saniyeler içinde okunabilir nota dönüştür."*
- Büyük bir URL giriş kutusu: `YouTube video linkini buraya yapıştır...`
- Mavi bir buton: **"Notları Oluştur"**
- Altta 3 adımlı kısa açıklama:
  - 📎 Linki yapıştır
  - ⏳ Bekle
  - 📝 Notlarını al

---

### Adım 2 — Linki Yapıştır
**Kullanıcı ne yapar?** YouTube'dan bir ders videosunun linkini kopyalar, giriş kutusuna yapıştırır.

**Kullanıcı ne görür?**
- Kutuda link belirir: `https://youtube.com/watch?v=...`
- Buton aktif hale gelir

---

### Adım 3 — Butona Tıkla
**Kullanıcı ne yapar?** "Notları Oluştur" butonuna tıklar (veya Enter'a basar).

**Kullanıcı ne görür?**
- Sayfa yükleme ekranına geçer
- Animasyonlu bir yükleme göstergesi belirir
- Adım adım durum mesajları ekranda sırayla güncellenir:

```
⏳ Video bilgileri alınıyor...
🎵 Ses ayıklanıyor...        ← ~10-30 saniye
🧠 Yapay zeka dinliyor...    ← ~20-60 saniye
📝 Notlar oluşturuluyor...   ← ~10-15 saniye
```

**Kullanıcı ne yapar?** Hiçbir şey. Sadece bekler.

---

### Adım 4 — Notlar Ekrana Gelir
**Kullanıcı ne görür?**

Sol panelde video bilgileri:
```
🎬 [Video Thumbnail]
📌 Başlık: Satırca Denk Matrisler
📺 Kanal: Matematik Hocam
⏱️ Süre: 6:24
```

Sağ/Ana panelde yapılandırılmış notlar:
```
# Satırca Denk Matrisler

## Tanım
Bir matrise elementer satır işlemleri uygulandığında
elde edilen yeni matris, orijinal matrisle **satırca denk**tir.

## Elementer Satır İşlemleri
- **İşlem 1**: Bir satırı sabit sayıyla çarp
  → Örnek: 2 × Satır1 = Yeni Satır1
- **İşlem 2**: İki satırı birbiriyle topla
- **İşlem 3**: İki satırın yerini değiştir

[00:26] Elementer işlemler detaylı açıklanıyor
[01:17] Örnek matris üzerinde uygulama
```

Sağ üstte butonlar:
- 🔊 **Metni Dinle** — notları sesli okur
- 📋 **Kopyala** — tüm notu panoya kopyalar
- 📄 **PDF İndir** — PDF olarak kaydeder
- 🔄 **Yeni Video** — başa döner

---

### Adım 5 — Notları Kullan
**Kullanıcı ne yapar?** İstediği şeyi seçer:

- Sayfada okur
- "Metni Dinle" ile sesli dinler
- "Kopyala" ile Word/Notion'a yapıştırır
- "PDF İndir" ile kaydeder
- "Yeni Video" ile başka bir video dener

---

## 🔴 HATA AKIŞLARI

### Hata 1 — Boş Link
```
Kullanıcı → Butona tıklar (kutu boş)
Sistem    → ❌ "Lütfen bir YouTube linki girin"
Kullanıcı → Linki yazıp tekrar tıklar
```

### Hata 2 — Geçersiz URL
```
Kullanıcı → "netflix.com/dizi" yapıştırır
Sistem    → ❌ "Sadece YouTube linkleri destekleniyor"
Kullanıcı → Doğru linki yapıştırır
```

### Hata 3 — Video Özel/Silinmiş
```
Kullanıcı → Özel bir video linki girer
Sistem    → ❌ "Bu video erişilebilir değil veya silinmiş"
Kullanıcı → Farklı bir video dener
```

### Hata 4 — Video Çok Uzun
```
Kullanıcı → 3 saatlik video linki girer
Sistem    → ❌ "Maksimum 90 dakikalık videolar destekleniyor"
Kullanıcı → Daha kısa bir video dener
```

### Hata 5 — Bağlantı Hatası
```
Kullanıcı → Butona tıklar, internet kesilir
Sistem    → ❌ "Bağlantı hatası. Lütfen tekrar deneyin."
           → 🔁 "Tekrar Dene" butonu belirir
Kullanıcı → Tekrar Dene'ye basar
```

---

## ♿ ENGELLİ KULLANICI AKIŞI

### Görme Engelli Kullanıcı (Ekran Okuyucu ile)
```
1. Sayfa açılır → Ekran okuyucu başlığı okur: "AccessiNote"
2. Tab tuşuyla URL kutusuna odaklanır
3. Linki yapıştırır
4. Tab → "Notları Oluştur" butonuna gelir → Enter basar
5. Yükleme sırasında ekran okuyucu her adımı sesli bildirir:
   → "Ses ayıklanıyor..." / "Yapay zeka dinliyor..."
6. Notlar gelince ekran okuyucu başlıktan itibaren okur
7. Tab ile "Metni Dinle" butonuna gelir → Enter basar
8. Notlar sesli okunur
```

### Disleksik Kullanıcı
```
1. Sayfayı açar, sade tasarım dikkatini dağıtmaz
2. Linki yapıştırır, butona tıklar
3. Beklerken adım mesajları durumu takip ettirir
4. Notlar gelince: büyük font, bol boşluk, hiyerarşik başlıklar
5. "Metni Dinle" ile dinleyerek takip eder
```

---

## 📊 AKIŞ ÖZETİ

```
[Kullanıcı]
    |
    | 1. Siteye girer
    ↓
[Ana Sayfa]
    |
    | 2. Link yapıştırır + Butona tıklar
    ↓
[Validasyon] ──── ❌ Hatalı link → Hata mesajı → Geri
    |
    | ✅ Geçerli link
    ↓
[Yükleme Ekranı]
    |
    | Ses indir → Transkribe et → Notları formatla
    ↓
[Sonuç Ekranı]
    |
    |── 🔊 Sesli dinle
    |── 📋 Kopyala
    |── 📄 PDF indir
    └── 🔄 Yeni video → [Ana Sayfa]
```

---

*Son güncelleme: Mart 2026*
