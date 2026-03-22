# 🔄 user-flow.md — AccessiNote

## Kullanıcı Akışı

---

## Akış Diyagramı (Metin Tabanlı)

```
[Kullanıcı Girişi]
       │
       ▼
[Ana Sayfa — URL Giriş Kutusu]
       │
       ├─── Video URL yapıştır (YouTube / Vimeo / MP4)
       │
       ▼
[Erişilebilirlik Tercihleri — Opsiyonel]
       │
       ├─── Yüksek kontrast mod?         □ Evet  □ Hayır
       ├─── Sesli okuma (TTS) aktif?     □ Evet  □ Hayır
       ├─── Not dili?                    □ TR  □ EN  □ Otomatik
       │
       ▼
[Analiz Başlat — "Notlarımı Oluştur" butonu]
       │
       ▼
┌─────────────────────────────────────┐
│        ARKA PLAN İŞLEMİ (AI)        │
│                                     │
│  1. Video indir / stream al         │
│  2. Ses → Whisper ASR → Transkript  │
│  3. Frame örnekleme → Vision AI     │
│  4. Transkript + Görseller → Claude │
│  5. Hiyerarşik not üret             │
└─────────────────────────────────────┘
       │
       ▼
[Sonuç Sayfası — Not Görüntüleyici]
       │
       ├─── Notları oku (ekranda hiyerarşik görünüm)
       ├─── 🔊 Sesli okuma başlat / durdur
       ├─── Bölüm atla (zaman damgalı linkler)
       ├─── Yorum & vurgulama ekle
       │
       ▼
[Dışa Aktarma]
       │
       ├─── PDF indir
       ├─── DOCX indir
       ├─── Markdown kopyala
       └─── Paylaşım linki oluştur
```

---

## Adım Adım Kullanıcı Yolculuğu

### Adım 1 — Karşılama & Giriş
**Ekran:** Ana sayfa  
**Kullanıcı eylemi:** Ders videosunun linkini giriş kutusuna yapıştırır.  
**Sistem:** URL'nin geçerliliğini kontrol eder; desteklenmeyen formatsa uyarı gösterir.

---

### Adım 2 — Tercih Ayarları *(Opsiyonel)*
**Ekran:** Erişilebilirlik paneli (yan menü veya modal)  
**Kullanıcı eylemi:** TTS aktif etme, font büyüklüğü, kontrast seçimi.  
**Sistem:** Tercihler localStorage'a kaydedilir; sonraki oturumlarda otomatik yüklenir.

---

### Adım 3 — İşleme
**Ekran:** Yükleme ekranı  
**Kullanıcı eylemi:** Bekler.  
**Sistem:**
- İlerleme çubuğu gösterilir: *"Ses analiz ediliyor… Görseller işleniyor… Notlar oluşturuluyor…"*
- Arka planda paralel işlem: ASR + Vision API eş zamanlı çalışır.
- Tahmini süre gösterilir (video uzunluğuna göre dinamik).

---

### Adım 4 — Not Görüntüleme
**Ekran:** Sonuç paneli (sol: not ağacı, sağ: detay görünümü)  
**Kullanıcı eylemi:**
- Başlıklara tıklayarak bölümler arası gezer.
- Her başlığın yanındaki ⏱️ ikonuna tıklayarak videodaki ilgili zamana atlar.
- 🔊 butonuna basarak sesli okuma başlatır.

---

### Adım 5 — Düzenleme & Kaydetme
**Ekran:** Not editörü (inline düzenleme)  
**Kullanıcı eylemi:** Notlara kendi yorumlarını ekler, önemli kısımları renkle işaretler.  
**Sistem:** Değişiklikler otomatik kaydedilir (autosave, 3 saniyede bir).

---

### Adım 6 — Dışa Aktarma
**Ekran:** Dışa aktarma modalı  
**Kullanıcı eylemi:** İstediği formatı seçer (PDF / DOCX / MD / Paylaşım linki).  
**Sistem:** Seçilen formatta dosya oluşturulur ve indirilir.

---

## Hata Durumları & Fallback'ler

| Hata Durumu | Kullanıcıya Gösterilen Mesaj | Aksiyon |
|---|---|---|
| Geçersiz URL | "Bu video formatı desteklenmiyor. YouTube veya MP4 linki deneyin." | Yeniden giriş |
| Video çok uzun (>3 saat) | "Video 3 saatten uzun. Bölüm belirterek devam edebilirsiniz." | Başlangıç/bitiş süresi gir |
| ASR başarısız | "Ses kalitesi düşük. Manuel transkript yükleyebilirsiniz." | Dosya yükleme seçeneği |
| Vision API hatası | "Görsel içerik okunamadı, metin notlar oluşturuldu." | Metin notlarla devam |
| İnternet yavaş | Akış bazlı yükleme (streaming), kısmi sonuç göster | — |
