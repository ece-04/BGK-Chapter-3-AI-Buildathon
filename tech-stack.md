# 🛠️ tech-stack.md — AccessiNote

## Kullanılan Teknolojiler & Seçim Gerekçeleri

---

## Mimari Genel Bakış

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND                            │
│          Next.js 14  +  Tailwind CSS                    │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTPS / REST / WebSocket
┌─────────────────────▼───────────────────────────────────┐
│                  BACKEND (API Routes)                   │
│               Next.js API  +  Supabase                  │
└──────┬──────────────┬──────────────────┬────────────────┘
       │              │                  │
┌──────▼──────┐ ┌─────▼──────┐ ┌────────▼───────┐
│  Whisper    │ │ Google     │ │  Claude API    │
│  ASR        │ │ Vision AI  │ │  (Anthropic)   │
│  (OpenAI)   │ │            │ │                │
└─────────────┘ └────────────┘ └────────────────┘
```

---

## Teknoloji Detayları

### 1. ⚡ Next.js 14 — Frontend & API Katmanı

**Seçim Gerekçesi:**
- **App Router** ile server component'lar sayesinde sayfa yüklenme hızı kritik ölçüde artar.
- **API Routes** backend mantığını aynı repository'de tutar; ayrı bir sunucu gerektirmez.
- **Server-Side Rendering (SSR)** sayesinde ekran okuyucular içeriği anında tarayabilir — bu erişilebilirlik için kritiktir.
- Vercel ile sıfır konfigürasyonlu dağıtım.

**Kullanılan paketler:**
```
next@14, react@18, react-dom@18
```

---

### 2. 🎨 Tailwind CSS — Stil & Erişilebilirlik

**Seçim Gerekçesi:**
- `focus-visible:` ve `aria-*` utility'leri ile WCAG 2.1 AA uyumlu bileşenler kolaylıkla yazılır.
- `dark:` prefix ile yüksek kontrast tema sıfırdan yazmak yerine tek satırda aktif edilir.
- JIT modu ile kullanılmayan CSS üretilmez → küçük bundle boyutu → hızlı yükleme.

**Kullanılan paketler:**
```
tailwindcss@3, @headlessui/react (erişilebilir komponent primitifleri)
```

---

### 3. 🤖 Claude API (Anthropic) — Akıllı Not Üretimi

**Seçim Gerekçesi:**
- Uzun bağlamı (100K+ token) aynı anda işleyebildiği için 1 saatlik video transkribi eksiksiz analiz edilir.
- İnsan benzeri akıl yürütme kapasitesi sayesinde "önemli" ile "gereksiz" bilgiyi doğru ayırt eder.
- Structured Output desteği ile JSON formatında hiyerarşik not çıktısı üretir.
- Türkçe içerik anlama kalitesi rakip modellere kıyasla yüksektir.

**Kullanım:**
```javascript
// Örnek API çağrısı
const response = await anthropic.messages.create({
  model: "claude-opus-4-20250514",
  max_tokens: 4096,
  system: "Sen bir akademik not asistanısın...",
  messages: [{ role: "user", content: transcript + visualDescriptions }]
});
```

---

### 4. 🎙️ Whisper (OpenAI) — Otomatik Konuşma Tanıma

**Seçim Gerekçesi:**
- Açık kaynak; self-hosted çalıştırılabilir → maliyet kontrolü.
- Türkçe dahil 99 dil desteği; çok dilli derslerde sorunsuz çalışır.
- `large-v3` modeli %95+ word error rate doğruluğu sağlar.
- Zaman damgalı (timestamp) çıktı üretir — notları videodaki ilgili anla eşleştirmek için gerekli.

**Kullanım:**
```bash
whisper lecture.mp4 --model large-v3 --language Turkish --output_format json
```

---

### 5. 👁️ Google Vision AI — Görsel İçerik Tanıma

**Seçim Gerekçesi:**
- **Document Text Detection** özelliği tahta ve slayt yazısını yüksek doğrulukla tanır.
- Türkçe karakter seti (ş, ğ, ü, ö, ç, ı) tam desteklenmektedir.
- REST API ile kolayca entegre edilir; ek altyapı gerektirmez.
- Fiyatlandırma kullanım bazlı → küçük ölçekte ekonomik.

---

### 6. 🔊 Web Speech API — Metin-Konuşma Sentezi (TTS)

**Seçim Gerekçesi:**
- Tarayıcıya gömülü; ek kütüphane yüklemeye gerek yok → hızlı erişim.
- Kullanıcı kendi tarayıcısındaki sesi kullandığından veri gizliliği korunur.
- Hız, pitch ve ses tonu JavaScript ile programatik olarak ayarlanabilir.

**Yedek:** ElevenLabs API — Web Speech kalitesi yetersiz gelirse daha doğal ses sentezi için.

---

### 7. 🗄️ Supabase — Veritabanı, Auth & Storage

**Seçim Gerekçesi:**
- PostgreSQL tabanlı açık kaynak BaaS (Backend-as-a-Service).
- **Row Level Security (RLS)** ile kullanıcı notları izole ve güvenli.
- **Realtime** ile birden fazla cihazda not senkronizasyonu.
- **Storage** ile büyük video/ses dosyaları güvenli şekilde saklanır.
- Firebase'e kıyasla vendor lock-in riski düşük (kendi sunucunda da çalışır).

---

### 8. ☁️ Vercel — Dağıtım & Edge Network

**Seçim Gerekçesi:**
- Next.js'in resmi barındırma platformu; sıfır konfigürasyon.
- **Edge Functions** ile API yanıt süreleri minimize edilir.
- **Analytics** ile gerçek kullanıcı performansı izlenir.
- GitHub entegrasyonu ile her `push`'ta otomatik deploy.

---

## Güvenlik & Gizlilik

| Konu | Yaklaşım |
|---|---|
| API anahtarları | Sunucu taraflı; frontend'e sızdırılmaz |
| Kullanıcı notları | Supabase RLS ile yalnızca sahip görebilir |
| Video içerikleri | İşlem sonrası silinir, saklanmaz |
| TTS verisi | Tarayıcı taraflı; sunucuya gönderilmez |
| Erişilebilirlik verileri | Yalnızca localStorage'da tutulur |

---

## Bağımlılıklar Özeti

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "@anthropic-ai/sdk": "latest",
    "@supabase/supabase-js": "^2.0.0",
    "@headlessui/react": "^1.7.0",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^18.0.0"
  }
}
```
