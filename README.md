# AccessiNote 🎓

> YouTube ders videolarını saniyeler içinde yapılandırılmış, sesli okunabilir notlara dönüştüren yapay zeka destekli web uygulaması.

---

## 🔴 Problem

Türkiye'de milyonlarca öğrenci her gün ders videoları izliyor. Ama bu videolara **herkes eşit şekilde erişemiyor.**

**Görme engelli öğrenciler** için problem çok katmanlı: Hoca tahtaya bir formül yazıyor, slayta bir grafik koyuyor — ama görme engelli öğrenci bunların hiçbirini görmüyor. Sadece sesi duyuyor. Dersin görsel içeriği — ki çoğu zaman dersin özü burada — tamamen kaybolup gidiyor.

**Disleksik öğrenciler** ise farklı bir zorlukla boğuşuyor. Disleksi, beyinin yazılı metni işleme biçiminden kaynaklanan nörolojik bir farklılık. Uzun, yapılandırılmamış bir videoyu izlerken hem dinleyip hem not almak neredeyse imkânsız. Satır kaybediyorlar, harfleri karıştırıyorlar, dikkat dağılıyor.

**Tüm öğrdeodan çalışma notu çıkarmak ortalama **3.5 saat** alıyor. Sınav döneminde bu lüks mümkün değil.

Piyasadaki mevcut araçlar — YouTube altyazıları, Otter.ai, genel özet uygulamaları — bu üç sorunu bir arada, erişilebilirlik odağıyla çözmüyor.

---

## 💡 Çözüm

AccessiNote, bu üç problemi tek bir akıllı pipeline ile çözüyor.

Kullanıcı sadece bir YouTube linki yapıştırıyor. Gerisi tamamen otomatik:

**1. Ses Ayıklama** — yt-dlp aracı videodan yalnızca sesi çıkarıyor. Görüntüye gerek yok, sadece konuşulan içerik alınıyor.

**2. AI Transkripsiyon** — Google Gemini 2.5 Flash, ses dosyasını kelimesi kelimesine Türkçe metne dönüştürüyor. Sıradan bir dikte makinesi gibi değil — bağlamı anlıyor, noktalama koyuyor, teknik terimleri doğru yazıyor.

**3. Akıllı Not Oluşturma** — Ham transkripsiyon metni ikinci bir AI işleminden geçiyor. Gemini bu sefer bir akademisyen gibi düşünüyor: Başlıklar koyuyor, alt konuları grupluyoileceği en iyi nottan daha iyi.

**4. Erişilebilir Sunum** — Notlar ekrana geldiğinde iş bitmiyor. Görme engelli kullanıcılar için Web Speech API ile sesli okuma, disleksik kullanıcılar için bilimsel olarak tasarlanmış OpenDyslexic font, ekran okuyucu uyumlu ARIA etiketleri hazır.

**5. Quiz Oluşturma** — Notlardan tek tıkla çoktan seçmeli quiz üretiliyor. Öğrendiklerini hemen test edebiliyorsun.

Sonuç: 60 dakikalık ders videosu → 60 saniyede yapılandırılmış, sesli okunabilir, quiz destekli ders notu.

---

## 🎬 Demo Video
[Demo videoyu izle](https://www.loom.com/share/6a9d0bf3c6fd4eaeb90b7834b86c1048)

## 🌐 Yayın Linki
[bgk-chapter-3-ai-buildathon-production.up.railway.app](https://bgk-chapter-3-ai-buildathon-production.up.railway.app)

---

## ✨ Özellikler

- 🎬 YouTube linkini yapıştır, notlarını al
- 🧠 Gemini AI ile akıllı transkripsiyon
- 📝 Başlıklı, madde işaretli yapılandırılmış notlar
- 🔊 Sesli okuma (Web Speech API)
- 📋 Tek uiz oluşturma
- ♿ Ekran okuyucu uyumlu (WCAG 2.1)

---

## 🛠️ Kullanılan Teknolojiler

- **Next.js 14** — Full-stack web framework
- **Google Gemini 2.5 Flash** — Transkripsiyon ve not oluşturma
- **yt-dlp + ffmpeg** — YouTube ses ayıklama
- **TypeScript** — Tip güvenli geliştirme
- **Tailwind CSS** — Erişilebilir UI tasarımı

---

## 🚀 Nasıl Çalıştırılır?

### Gereksinimler
- Node.js 20+
- yt-dlp ve ffmpeg
- Google AI Studio API anahtarı

### Kurulum

\`\`\`bash
git clone https://github.com/ece-04/BGK-Chapter-3-AI-Buildathon.git
cd BGK-Chapter-3-AI-Buildathon
npm install
brew install yt-dlp ffmpeg
\`\`\`

\`.env.local\` dosyası oluştur:

\`\`\`env
GOOGLE_GENERATIVE_AI_API_KEY=senin_api_anahtarin
\`\`\`

\`\`\`bash
npm run dev
\`\`\`

---

## 📖 Proje Hikayesi

Eğitimde fırsat eşitliği benim için sadece bir slogan değil — AccessiNote'u bu inançla geliştirdim.

Görme engelli öğrenciler tahta ve slaytlardaki içeriklerden yoksun kalıyor. Disleksik öğrendim — erişilebilirlik sonradan eklenen bir özellik değil, tasarımın temeli.

Gelecekte görsel içerik anlama (OCR), PDF export ve çoklu dil desteği planlanıyor.

> AccessiNote, teknolojinin gerçekten herkese eşit fırsat sunabileceğinin kanıtı.

---

*Eğitimde erişilebilirlik için yapıldı 🤍*
