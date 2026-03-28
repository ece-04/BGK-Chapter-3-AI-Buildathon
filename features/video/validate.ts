const YOUTUBE_VIDEO_ID = /^[a-zA-Z0-9_-]{11}$/;

function normalizeHost(hostname: string): string {
  return hostname.replace(/^www\./, "").toLowerCase();
}

function tryParseUrl(raw: string): URL | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    return new URL(trimmed);
  } catch {
    try {
      return new URL(`https://${trimmed}`);
    } catch {
      return null;
    }
  }
}

/** İlk geçerli 11 karakterlik video kimliğini döndürür; yoksa null. */
export function extractYouTubeVideoId(raw: string): string | null {
  const url = tryParseUrl(raw);
  if (!url) return null;

  const host = normalizeHost(url.hostname);

  if (host === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0] ?? "";
    return YOUTUBE_VIDEO_ID.test(id) ? id : null;
  }

  if (!host.endsWith("youtube.com")) return null;

  if (url.pathname === "/watch" || url.pathname.startsWith("/watch")) {
    const v = url.searchParams.get("v");
    return v && YOUTUBE_VIDEO_ID.test(v) ? v : null;
  }

  const embed = url.pathname.match(/^\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embed) return embed[1];

  const shorts = url.pathname.match(/^\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shorts) return shorts[1];

  const live = url.pathname.match(/^\/live\/([a-zA-Z0-9_-]{11})/);
  if (live) return live[1];

  return null;
}

export type YouTubeValidationResult =
  | { valid: true; normalizedUrl: string }
  | { valid: false; error: string };

export function validateYouTubeUrl(raw: string): YouTubeValidationResult {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { valid: false, error: "Lütfen bir bağlantı girin." };
  }

  const id = extractYouTubeVideoId(trimmed);
  if (!id) {
    return {
      valid: false,
      error: "Geçerli bir YouTube video bağlantısı değil.",
    };
  }

  return {
    valid: true,
    normalizedUrl: `https://www.youtube.com/watch?v=${id}`,
  };
}
