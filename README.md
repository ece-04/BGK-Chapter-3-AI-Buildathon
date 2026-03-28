# AccessiNote 🎓

> YouTube ders videolarını saniyeler içinde yapılandırılmış, sesli okunabilir notlara dönüştüren yapay zeka destekli web uygulaması.

Özellikle **görme engelli** ve **disleksik** öğrenciler için tasarlandı.

---

## ✨ Özellikler

- 🎬 YouTube linkini yapıştır, notlarını al
- 🧠 Gemini AI ile akıllı transkripsiyon
- 📝 Başlıklı, madde işaretli yapılandırılmış notlar
- 🔊 Sesli okuma (Web Speech API)
- 📋 Tek tıkla kopyala
- 📖 Disleksi modu (OpenDyslexic font)
- ♿ Ekran okuyucu uyumlu (WCAG 2.1)

---

## 🛠️ Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| Frontend | Next.js 14, React, Tailwind CSS |
| AI | Google Gemini 2.5 Flash |
| Ses indirme | yt-dlp + ffmpeg |
| Dil | TypeScript |

---

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- yt-dlp
- ffmpeg
- Google AI Studio API anahtarı

### Adımlar

\`\`\`bash
# 1. Repoyu klonla
git clone httpğımlılıkları kur
npm install

# 3. yt-dlp ve ffmpeg kur (Mac)
brew install yt-dlp ffmpeg

# 4. Ortam değişkenlerini ayarla
cp .env.example .env.local

# 5. Geliştirme sunucusunu başlat
npm run dev
\`\`\`

### Ortam Değişkenleri

\`.env.local\` dosyası oluştur:

\`\`\`env
GOOGLE_GENERATIVE_AI_API_KEY=senin_api_anahtarin
\`\`\`

API anahtarını [Google AI Studio](https://aistudio.google.com)'dan ücretsiz alabilirsin.

---

## 📖 Kullanım

1. \`localhost:3000\` adresini aç
2. YouTube ders videosu linkini yapıştır
3. "Gönder" butonuna tıkla
4. 30-90 saniye bekle
5. Yapılandırılmış notlarını al, sesli dinle veya kopyala

---

## ⚠️ Kısıtlamalar

- Maksimum video süresi: 90 dakika
- Desteklenen platform: YouTube
- Desteklenen dil: Türkçe

---

## 🤍 Neden AccessiNote?

60 dakikalık bir videodan not çıkarmak ortalama **3.5 saat** alıyor. Görme engelli öğrenciler tahta ve slayt içeriklerinden yoksun kalıyor. Disleksik öğrenciler yapılandırılmamış videoları üyor.

---

*Eğitimde erişilebilirlik için yapıldı 🤍*
