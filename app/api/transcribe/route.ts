import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    const { fileName } = await request.json();
    const m4aPath = path.join(process.cwd(), "public", "temp", fileName);

    if (!fs.existsSync(m4aPath)) {
      return NextResponse.json({ error: "Ses dosyası bulunamadı: " + fileName }, { status: 404 });
    }

    // m4a → mp3 dönüştür
    const mp3FileName = fileName.replace(".m4a", ".mp3");
    const mp3Path = path.join(process.cwd(), "public", "temp", mp3FileName);
    await execAsync(`PATH=/opt/homebrew/bin:/usr/local/bin:$PATH ffmpeg -y -i "${m4aPath}" "${mp3Path}"`);

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API anahtarı bulunamadı" }, { status: 500 });
    }

    // Dosyayı File API'ye yükle
    const fileBuffer = fs.readFileSync(mp3Path);
    const uploadResponse = await fetch(
      "https://generativelanguage.googleapis.com/upload/v1beta/files?uploadType=media",
      {
        method: "POST",
        headers: {
          "X-Goog-Api-Key": apiKey,
          "Content-Type": "audio/mp3",
          "X-Goog-Upload-Header-Content-Length": fileBuffer.length.toString(),
        },
        body: fileBuffer,
      }
    );

    if (!uploadResponse.ok) {
      const err = await uploadResponse.text();
      throw new Error("Dosya yükleme hatası: " + err);
    }

    const uploadData = await uploadResponse.json();
    const fileUri = uploadData.file.uri;
    console.log("✅ Dosya yüklendi:", fileUri);

    // Gemini ile transkribe et
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: "Transcribe everything said in this audio from start to finish, word by word. Do not summarize. Do not skip any part. Write the full transcription in Turkish." },
              { file_data: { mime_type: "audio/mp3", file_uri: fileUri } }
            ]
          }],
          generationConfig: { maxOutputTokens: 8192 }
        }),
      }
    );

    if (!geminiResponse.ok) {
      const err = await geminiResponse.text();
      throw new Error("Gemini hatası: " + err);
    }

    const geminiData = await geminiResponse.json();
    const transcription = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Temp dosyaları temizle
    fs.unlinkSync(mp3Path);

    return NextResponse.json({ text: transcription });

  } catch (error: any) {
    console.error("Transkripsiyon Hatası:", error);
    return NextResponse.json({ error: "Transkripsiyon hatası: " + error.message }, { status: 500 });
  }
}