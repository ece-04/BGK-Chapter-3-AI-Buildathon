# AccessiNote AI Agent

AccessiNote, üç aşamalı bir AI pipeline kullanır:

## Pipeline

1. **Ses Ayıklama** → yt-dlp ile YouTube videosundan ses indirir
2. **Transkripsiyon Agent** → Gemini 2.5 Flash ile sesi metne çevirir
3. **Not Oluşturma Agent** → Ham metni yapılandırılmış ders notuna dönüştürür
4. **Quiz Agent** → Notlardan otomatik quiz soruları üretir

## Kullanılan Model
- Google Gemini 2.5 Flash
- Ses dosyaları için Gemini File API
