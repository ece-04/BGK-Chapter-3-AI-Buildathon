# 🛠️ AccessiNote — Teknoloji Rehberi (tech-stack.md)

> Bu belge başlangıç seviyesindeki geliştiriciler için yazılmıştır.
> "Bu nedir? Neden kullanıyoruz? Nasıl kurulur?" sorularını yanıtlar.

---

## 🧠 Önce Büyük Resmi Görelim

AccessiNote'u bir fabrika gibi düşün:

```
[Kullanıcı] → YouTube linki verir
     ↓
[Next.js]   → Fabrika binası — her şeyi bir arada tutar
     ↓
[yt-dlp]    → Videodaki sesi ayıklar
     ↓
[ffmpeg]    → Sesi doğru formata çevirir
     ↓
[Gemini AI] → Sesi dinler, metne çevirir, not yazar
     ↓
[Tailwind]  → Her şeyi güzel gösterir
     ↓
[Kullanıcı] → Yapılandırılmış notlarını alır
```

Her teknoloji bu fabrikada bir görevi üstleniyor.

---

## 📦 TEKNOLOJİ YIĞINI

---

### 1. Next.js — Fabrikanın Binası

**Bu nedir?**
Next.js, React tabanlı bir web uygulama çerçevesidir. Hem kullanıcının gördüğü sayfaları (frontend) hem de arka planda çalışan servisleri (backend/API) tek bir projede yönetmeni sağlar.

**Neden Next.js seçtik?**
- Hem frontend hem backend tek projede → iki ayrı proje yönetmek zorunda değilsin
- `app/api/` klasörüne dosya koyunca otomatik API endpoint'i oluyor
- Vercel'e deploy etmek çok kolay
- React öğreniyorsan Next.js doğal bir sonraki adım

**Alternatifler neden elendi?**
- *Express.js*: Sadece backend, frontend için ayrı çalışma gerekir
- *Django/Flask*: Python tabanlı, ekosistem farklı
- *Vite + React*: Sadece frontend, API yazamazsın

---

### 2. React — Sayfaların Yapı Taşı

**Bu nedir?**
React, kullanıcı arayüzü (UI) oluşturmak için Meta tarafından geliştirilen bir JavaScript kütüphanesidir. Sayfayı küçük parçalara (component) bölerek yönetmeni sağlar.

**Neden React seçtik?**
- Dünyada en yaygın kullanılan UI kütüphanesi
- İş bulma açısından en değerli becerilerden biri
- Next.js zaten React üzerine kurulu, ikisini birlikte öğreniyorsun

**Biz nasıl kullanıyoruz?**
- URL giriş kutusu → bir React component
- Yükleme göstergesi → bir React component
- Notlar ekranı → bir React component

---

### 3. TypeScript — Akıllı JavaScript

**Bu nedir?**
TypeScript, JavaScript'e "tip" sistemi ekleyen bir dildir. Kod yazarken hataları önceden yakalamanı sağlar.

**Neden TypeScript seçtik?**
- Hataları çalıştırmadan önce görürsün
- Kod editörü (VS Code) daha iyi yardım verir
- Büyük projelerde hayat kurtarır

**Örnek fark:**
```javascript
// JavaScript — Hata yazmak kolay
function notOlustur(metin) { ... }
notOlustur(123) // Sayı verdin, string bekliyordu — hata!

// TypeScript — Editör anında uyarır
function notOlustur(metin: string) { ... }
notOlustur(123) // ❌ Editör hemen kırmızı çizer
```

---

### 4. Tailwind CSS — Hızlı Stil Aracı

**Bu nedir?**
Tailwind CSS, HTML/JSX içine doğrudan yazabileceğin hazır CSS sınıfları sunar. Ayrı CSS dosyası yazmadan stilleri uygulayabilirsin.

**Neden Tailwind seçtik?**
- Ayrı CSS dosyası açmak zorunda değilsin
- Responsive tasarım çok kolay (`md:`, `lg:` önekleri)
- Hızlı prototipleme için ideal
- Next.js projelerinde standart seçim

**Örnek kullanım:**
```jsx
// Tailwind olmadan
<button style={{backgroundColor: 'blue', color: 'white', padding: '8px 16px'}}>
  Tıkla
</button>

// Tailwind ile
<button className="bg-blue-500 text-white px-4 py-2 rounded">
  Tıkla
</button>
```

---

### 5. Google Gemini AI — Projenin Beyni

**Bu nedir?**
Google'ın geliştirdiği büyük dil modelidir. Ses dosyalarını metne çevirebilir, metinleri anlayıp yeniden yazabilir, yapılandırılmış içerik üretebilir.

**Neden Gemini seçtik?**
- Ses dosyasını direkt anlayabiliyor (Whisper gibi ayrı transkripsiyon modeli gerekmez)
- Hem transkripsiyon hem not formatlaması tek API'de
- Google AI Studio'dan ücretsiz API anahtarı alabiliyorsun
- Türkçe içerik desteği güçlü

**Biz nasıl kullanıyoruz?**
- `gemini-2.5-flash` modeli: Ses → Türkçe transkripsiyon
- `gemini-2.5-flash` modeli: Ham metin → Yapılandırılmış not

**Alternatifler neden elendi?**
- *OpenAI Whisper*: Sadece transkripsiyon, not formatlaması için ayrı model gerekir
- *OpenAI GPT-4*: Ses dosyası doğrudan kabul etmiyor
- *Claude*: Ses dosyası desteği bu kullanım için uygun değil

---

### 6. yt-dlp — Video Ses Ayıklayıcı

**Bu nedir?**
YouTube ve 1000+ platformdan video/ses indirmeye yarayan açık kaynak bir komut satırı aracıdır.

**Neden yt-dlp seçtik?**
- YouTube resmi API'si ses indirmeye izin vermiyor
- En güvenilir ve sürekli güncellenen araç
- Sadece sesi (`-x` parametresi) indirebildiğimiz için bant genişliği tasarrufu
- Ücretsiz ve açık kaynak

**Biz nasıl kullanıyoruz?**
```bash
yt-dlp -x --audio-format mp3 -o "ses.mp3" "https://youtube.com/watch?v=..."
```
Bu komut: videoyu indir → sadece sesi al → mp3'e çevir → kaydet

---

### 7. ffmpeg — Ses Dönüştürücü

**Bu nedir?**
Ses ve video dosyalarını dönüştürmek için kullanılan profesyonel açık kaynak bir araçtır.

**Neden ffmpeg seçtik?**
- yt-dlp arka planda ffmpeg kullanır
- Gemini API'nin kabul ettiği formatlara (mp3, wav) dönüştürüyoruz
- Endüstri standardı araç, her platformda çalışır

---

### 8. Vercel — Yayınlama Platformu (Planlanan)

**Bu nedir?**
Web uygulamalarını internete açmak (deploy etmek) için kullanılan bir platformdur.

**Neden Vercel seçtik?**
- Next.js'i yapan şirket → en iyi uyum
- GitHub'a push edince otomatik yayınlanıyor
- Ücretsiz tier ile başlayabiliyorsun
- Tek tıkla HTTPS, CDN, domain

---

## 🔑 API ANAHTARI — Google AI Studio

### Adım 1 — API Anahtarını Al
1. [aistudio.google.com](https://aistudio.google.com) adresine git
2. Google hesabınla giriş yap
3. Sol menüden **"Get API Key"** tıkla
4. **"Create API Key"** butonuna bas
5. Çıkan anahtarı kopyala (bir daha gösterilmeyebilir, kaydet!)

### Adım 2 — Projeye Ekle
Proje klasörünün kökünde `.env.local` dosyasını aç (yoksa oluştur):

```bash
# .env.local
GOOGLE_GENERATIVE_AI_API_KEY=buraya_kopyaladığın_anahtarı_yapıştır
```

⚠️ **Önemli Uyarılar:**
- `.env.local` dosyasını **asla GitHub'a yükleme**
- `.gitignore` dosyasında `.env.local` satırının olduğundan emin ol
- API anahtarını kimseyle paylaşma

---

## 💻 KURULUM ADIMLARI

### Ön Koşullar
Bilgisayarında şunların kurulu olması gerekiyor:

```bash
# Node.js versiyonunu kontrol et (18+ olmalı)
node --version

# npm versiyonunu kontrol et
npm --version
```

Kurulu değilse → [nodejs.org](https://nodejs.org) adresinden indir.

---

### Adım 1 — yt-dlp Kur

**Mac:**
```bash
brew install yt-dlp
```

**Windows:**
```bash
# Önce pip ile kur
pip install yt-dlp

# veya winget ile
winget install yt-dlp
```

**Doğrula:**
```bash
yt-dlp --version
```

---

### Adım 2 — ffmpeg Kur

**Mac:**
```bash
brew install ffmpeg
```

**Windows:**
```bash
winget install ffmpeg
```

**Doğrula:**
```bash
ffmpeg -version
```

---

### Adım 3 — Proje Bağımlılıklarını Kur

```bash
# Proje klasörüne git
cd /Users/ecesur/Desktop/accessinote

# Tüm paketleri kur
npm install
```

---

### Adım 4 — Ortam Değişkenlerini Ayarla

```bash
# .env.local dosyasını oluştur
touch .env.local
```

Dosyayı aç ve şunu yaz:
```
GOOGLE_GENERATIVE_AI_API_KEY=senin_api_anahtarın
```

---

### Adım 5 — Projeyi Başlat

```bash
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini aç. Uygulama çalışıyor olmalı!

---

## 📁 PROJE KLASÖR YAPISI

```
accessinote/
├── app/                    ← Sayfalar ve API'ler burada
│   ├── page.tsx            ← Ana sayfa (kullanıcının gördüğü)
│   ├── layout.tsx          ← Genel sayfa düzeni
│   └── api/
│       ├── process/
│       │   └── route.ts    ← YouTube'dan ses indir
│       ├── transcribe/
│       │   └── route.ts    ← Sesi metne çevir
│       └── notes/
│           └── route.ts    ← Metni nota formatla (yapılacak)
├── features/               ← Özellik bazlı kodlar
│   └── video/
│       └── validate.ts     ← YouTube URL doğrulama
├── public/
│   └── temp/               ← Geçici ses dosyaları
├── .env.local              ← API anahtarları (GitHub'a gitme!)
├── .gitignore              ← GitHub'a gönderilmeyecek dosyalar
├── package.json            ← Proje bağımlılıkları
└── tailwind.config.ts      ← Tailwind ayarları
```

---

## 🔄 GELİŞTİRME AKIŞI

Kod yazarken bu döngü tekrarlanır:

```
1. npm run dev → Geliştirme sunucusunu başlat
2. Kod yaz / değiştir
3. Dosyayı kaydet → Next.js otomatik günceller
4. Tarayıcıda test et
5. Hata varsa → terminale bak
6. Tekrarla
```

---

## 📦 KULLANILAN NPM PAKETLERİ

```json
{
  "dependencies": {
    "next": "14.x",              // Web çerçevesi
    "react": "18.x",             // UI kütüphanesi
    "@google/generative-ai": "*" // Gemini API istemcisi
  },
  "devDependencies": {
    "typescript": "5.x",         // TypeScript desteği
    "tailwindcss": "3.x",        // CSS framework
    "@types/node": "*",          // Node.js tip tanımları
    "@types/react": "*"          // React tip tanımları
  }
}
```

Yüklemek için:
```bash
npm install @google/generative-ai
```

---

## ❓ SIK SORULAN SORULAR

**S: Next.js öğrenmek zor mu?**
React'ı biliyorsan Next.js çok kolay. Bilmiyorsan — önce 1 hafta React öğren, sonra Next.js'e geç.

**S: Gemini API ücretli mi?**
Google AI Studio üzerinden belirli bir kotaya kadar ücretsiz. Başlangıç için yeterli.

**S: yt-dlp yasal mı?**
Aracın kendisi yasal. Telif hakkı korumalı içerikleri izinsiz dağıtmak yasal değil. Kişisel kullanım için not alma amacıyla kullanmak sorun teşkil etmez.

**S: Windows'ta çalışıyor mu?**
Evet, ama yt-dlp ve ffmpeg path ayarları farklı. `PATH=/opt/homebrew/bin:...` kısmını Windows path'inize göre güncellemeniz gerekebilir.

---

*Son güncelleme: Mart 2026*
