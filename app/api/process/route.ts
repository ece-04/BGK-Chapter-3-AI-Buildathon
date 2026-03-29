import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import { validateYouTubeUrl } from "@/features/video/validate";

const execAsync = promisify(exec);
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    const result = validateYouTubeUrl(url);
    if (!result.valid) return NextResponse.json({ error: result.error }, { status: 400 });

    const dir = path.join(process.cwd(), "public", "temp");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // Dosya adı için rastgele bir ID (çakışma olmasın diye)
    const fileName = `audio-${Date.now()}.m4a`;
    const outputPath = path.join(dir, fileName);

    // Mac için Homebrew yollarını doğrudan komuta ekliyoruz (En garantisi bu!)
    const envPath = "PATH=/opt/homebrew/bin:/usr/local/bin:$PATH";
    const command = `${envPath} yt-dlp -x --audio-format m4a -o "${outputPath}" "${result.normalizedUrl}"`;

    console.log("Komut çalıştırılıyor:", command);

    await execAsync(command);

    return NextResponse.json({ message: "Ses başarıyla ayıklandı", fileName });

  } catch (error: any) {
    console.error("DETAYLI HATA:", error);
    return NextResponse.json(
      { error: "Hata: yt-dlp veya ffmpeg düzgün çalışmadı. Lütfen terminale bakın." },
      { status: 500 }
    );
  }
}