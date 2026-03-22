# 💡 idea.md — AccessiNote

## Problem Tanımı

Üniversite ve lise öğrencilerinin büyük bir kısmı, eğitim içeriklerini video formatında tüketmek zorunda kalıyor. Ancak bu içeriklere **eşit erişim** mümkün değil:

- **Görme engelli öğrenciler**, videodaki tahta yazılarını, slaytları, grafikleri ve görsel açıklamaları takip edemiyor.
- **Disleksik öğrenciler**, uzun videoları izlerken dikkatlerini sürdürmekte ve not çıkarmakta ciddi güçlük yaşıyor.
- **Zaman kısıtı olan öğrenciler**, 60 dakikalık bir videodan kritik bilgileri süzmek için saatler harcıyor.

Bu üç problem birbirinden bağımsız görünse de ortak bir köke sahip: **Ders videoları, farklı öğrenme ihtiyaçlarına göre tasarlanmıyor.**

---

## Hedef Kullanıcılar

| Kullanıcı Segmenti | Temel Zorluk | AccessiNote'tan Beklenti |
|---|---|---|
| Görme engelli öğrenciler | Görsel içeriğe erişim yok | Tüm görsellerin metin betimlemesi |
| Disleksik öğrenciler | Odak & not çıkarma güçlüğü | Yapılandırılmış, kısa, vurgulu notlar |
| Yoğun öğrenciler | Zaman kısıtı | Dakikalarca videoyu saniyede özetle |
| Genel kullanıcılar | Tekrar & ezber kolaylığı | İndirilebilir, düzenlenebilir notlar |

---

## Yapay Zekanın Rolü

AccessiNote'ta AI üç temel görev üstlenir:

### 1. 🎙️ Konuşma Transkripsiyonu (ASR)
- Video ses kanalı Whisper modeline gönderilir.
- Türkçe & İngilizce başta olmak üzere çok dilli transkript üretilir.
- Konuşmacı bölümleme (diarization) ile "kim ne zaman konuştu" ayrıştırılır.

### 2. 👁️ Görsel İçerik Anlama (Vision AI)
- Video kareleri belirli aralıklarla örneklenir (frame sampling).
- Google Vision API ile tahta yazıları, slayt metni ve grafikler OCR ile çıkarılır.
- Claude Vision ile görseller doğal dil betimlemesine dönüştürülür: *"Slayt 3'te bir çizgi grafiği gösterilmektedir. X ekseni yıl (2000–2024), Y ekseni küresel sıcaklık artışı (°C)."*

### 3. 🧠 Akıllı Not Üretimi (LLM)
- Transkript + görsel betimlemeler Claude API'ye bağlam olarak verilir.
- AI, gereksiz tekrar ve dolgu cümlelerini ayıklar.
- Çıktı hiyerarşik bir yapıda sunulur:
  - **Ana Başlık** → Konu
  - **Alt Başlık** → Kavram / Teori
  - **Madde** → Açıklama / Örnek
  - **🔑 Formül / Tanım** → Vurgulu blok
  - **📌 Önemli Not** → Sınav odaklı

---

## Vizyon

> *"Her öğrenci, hangi engeli ya da kısıtı olursa olsun, bir ders videosundan aynı kalitede bilgiye aynı sürede ulaşabilmelidir."*

AccessiNote, erişilebilirliği bir **eklenti** değil **temel tasarım ilkesi** olarak benimseyen ilk yapay zeka destekli not alma platformu olmayı hedefliyor.
