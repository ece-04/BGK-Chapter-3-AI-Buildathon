import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Metin bulunamadı" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API anahtarı bulunamadı" }, { status: 500 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{
              text: `Sen deneyimli bir Türk akademisyen ve ders notu uzmanısın. Görevin, ders transkripsiyon metinlerini öğrencilerin kolayca anlayabileceği, yapılandırılmış ve kapsamlı dnüştürmek. Görme engelli ve disleksik öğrenciler için erişilebilir notlar üretmek önceliğindir.`
            }]
          },
          contents: [{
            parts: [{
              text: `Aşağıdaki ders transkripsiyon metnini eksiksiz ve yapılandırılmış Türkçe ders notuna dönüştür.

FORMAT KURALLARI:
- Dersin ana konusu için # başlık kullan
- Ana bölümler için ## kullan  
- Alt konular için ### kullan
- Önemli kavramları **kalın** yaz
- Formülleri ve matematiği \`kod bloğu\` içinde göster
- Madde işaretleri için - kullan
- Numaralı adımlar için 1. 2. 3. kullan
- Zaman damgalarını [00:00] formatında koru
- Her bölüm arasına boş satır bırak

İÇERİK KURALLARI:
- Tüm önemli bilgileri eksiksiz yaz, hiçbir kavramı atlama
- "şey", "yani", "ee", "işte" gibi dolgu kelimelerini at
- Tekrar eden açıklamaları tek seferde yaz
- Örnekleri ve çözüm adımlarını detaylı tut
- Dersin sonunda "## Özet" bölümü ekle, ana kavramları listele
- Matemada not yaz. Açıklama veya giriş cümlesi ekleme.

Transkripsiyon:
${text}`
            }]
          }],
          generationConfig: {
            maxOutputTokens: 8192,
            temperature: 0.3,
          }
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      throw new Error("Gemini hatası: " + err);
    }

    const data = await response.json();
    const notes = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return NextResponse.json({ notes });

  } catch (error: any) {
    console.error("Notes Hatası:", error);
    return NextResponse.json({ error: "Not oluşturma hatası: " + error.message }, { status: 500 });
  }
}
