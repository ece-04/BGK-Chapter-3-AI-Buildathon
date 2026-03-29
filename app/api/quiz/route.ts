import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { notes } = await request.json();

    if (!notes) {
      return NextResponse.json({ error: "Notlar bulunamadı" }, { status: 400 });
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
          contents: [{
            parts: [{
              text: `Aşağıdaki ders notlarından 5 adet çoktan seçmeli quiz sorusu oluştur.

ÇIKTI FORMATI: Sadece geçerli JSON döndür, by yazma.

[
  {
    "soru": "Soru metni burada",
    "secenekler": ["A) seçenek", "B) seçenek", "C) seçenek", "D) seçenek"],
    "dogruCevap": "A) seçenek",
    "aciklama": "Bu cevabın doğru olmasının kısa açıklaması"
  }
]

Kurallar:
- Her soruda tam olarak 4 şık olsun (A, B, C, D)
- Sorular notların ana kavramlarını ölçsün
- Türkçe yaz
- Sadece JSON döndür, markdown veya açıklama ekleme

Ders Notları:
${notes}`
            }]
          }],
          generationConfig: { maxOutputTokens: 4096, temperature: 0.5 }
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      throw new Error("Gemini hatası: " + err);
    }

    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    
    // Markdown kod bloklarını temizle
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    const quiz = JSON.parse(text);

    return NextResponse.json({ quiz });

  } catch (error: any) {
    return NextResponse.json({ error: "Quiz oluşturma hatası: " + error.message }, { status: 500 });
  }
}
