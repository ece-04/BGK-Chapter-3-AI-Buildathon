"use client";

import { useEffect, useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import { validateYouTubeUrl } from "@/features/video/validate";

const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`;

export default function Home() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [clientError, setClientError] = useState<string | null>(null);
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<any[]>([]);
const [quizLoading, setQuizLoading] = useState(false);
const [userAnswers, setUserAnswers] = useState<{[key: number]: string}>({});
const [quizSubmitted, setQuizSubmitted] = useState(false);
  // Mevcut state'lerinin altına ekle
const [isDyslexic, setIsDyslexic] = useState(false);
const [highlightIndex, setHighlightIndex] = useState<{ start: number; end: number } | null>(null);
async function handleQuizCreate() {
  if (!transcription) return;
  setQuizLoading(true);
  setQuiz([]);
  setUserAnswers({});
  setQuizSubmitted(false);
  try {
    const res = await fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: transcription }),
    });
    const data = await res.json();
    if (res.ok) {
      setQuiz(data.quiz);
    } else {
      setApiError(data.error ?? "Quiz oluşturulamadı.");
    }
  } catch {
    setApiError("Quiz oluşturulurken hata oluştu.");
  } finally {
    setQuizLoading(false);
  }
}
  async function handleProcessSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setClientError(null);
    setApiMessage(null);
    setApiError(null);
    setTranscription(null);

    const check = validateYouTubeUrl(youtubeUrl);
    if (!check.valid) {
      setClientError(check.error);
      return;
    }

    setPending(true);
    try {
      // 1. ADIM: Sesi Ayıkla
      const res = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: youtubeUrl }),
      });
      
      const data = await res.json();
      
      // Hata kontrolü: Dosya adı gelmezse dur
      if (!res.ok || !data.fileName) {
        setApiError(data.error ?? "Dosya adı sunucudan alınamadı.");
        setPending(false);
        return;
      }

      setApiMessage("🎵 Ses ayıklanıyor, lütfen bekleyin...");

      // 2. ADIM: Gemini Analizini Başlat
      const transRes = await fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: data.fileName }),
      });

      const transData = await transRes.json();

      if (!transRes.ok) {
        setApiError(transData.error ?? "Gemini analiz yaparken bir hata verdi.");
      } else {
        setApiMessage("🧠 Yapay zeka notları oluşturuyor...");
      
        // 3. ADIM: Notları formatla
        const notesRes = await fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: transData.text }),
        });
      
        const notesData = await notesRes.json();
      
        if (!notesRes.ok) {
          setApiError(notesData.error ?? "Notlar oluşturulurken hata oluştu.");
        } else {
          setTranscription(notesData.notes);
          setApiMessage("✅ Notlarınız hazır!");
        }
      }

    } catch (err) {
      setApiError("Sunucu bağlantısında bir hata oluştu.");
    } finally {
      setPending(false);
    }
  }
  
  // YENİ SESLİ OKUMA FONKSİYONU
  const speakText = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR';

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        setHighlightIndex({
          start: event.charIndex,
          end: event.charIndex + event.charLength
        });
      }
    };

    utterance.onend = () => setHighlightIndex(null);
    window.speechSynthesis.speak(utterance);
  };
  useEffect(() => {
    const nodes = document.querySelectorAll(".accessi-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            window.setTimeout(() => {
              el.classList.add("accessi-reveal-visible");
            }, 80);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
      <div
        className="pointer-events-none fixed inset-0 z-[9999] opacity-50"
        style={{ backgroundImage: NOISE_BG }}
        aria-hidden
      />

      <nav className="fixed top-0 right-0 left-0 z-[100] flex items-center justify-between border-b border-[var(--line)] bg-[rgba(245,240,232,0.88)] px-[4vw] py-[1.2rem] backdrop-blur-md">
        <a
          href="#"
          className="font-fraunces text-[1.4rem] font-black tracking-[-0.03em] text-[var(--ink)] no-underline"
        >
          Accessi<span className="text-[var(--accent)]">Note</span>
        </a>
        <ul className="hidden list-none items-center gap-10 min-[901px]:flex">
          <li>
            <a
              href="#problem"
              className="text-[0.875rem] font-medium tracking-wide text-[var(--muted)] no-underline transition-colors hover:text-[var(--ink)]"
            >
              Problem
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="text-[0.875rem] font-medium tracking-wide text-[var(--muted)] no-underline transition-colors hover:text-[var(--ink)]"
            >
              Özellikler
            </a>
          </li>
          <li>
            <a
              href="#flow"
              className="text-[0.875rem] font-medium tracking-wide text-[var(--muted)] no-underline transition-colors hover:text-[var(--ink)]"
            >
              Nasıl Çalışır
            </a>
          </li>
          <li>
            <a
              href="#tech"
              className="text-[0.875rem] font-medium tracking-wide text-[var(--muted)] no-underline transition-colors hover:text-[var(--ink)]"
            >
              Teknoloji
            </a>
          </li>
          <li>
            <a
              href="#start"
              className="rounded-full bg-[var(--ink)] px-5 py-2 text-[0.875rem] font-medium tracking-wide text-[var(--paper)] no-underline transition-colors hover:bg-[var(--accent)]"
            >
              Ücretsiz Başla
            </a>
          </li>
        </ul>
      </nav>

      <section className="relative grid min-h-screen grid-cols-1 overflow-hidden pt-20 lg:grid-cols-2">
        <div
          className="pointer-events-none absolute top-1/2 right-[-10%] h-[500px] w-[500px] -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(200,82,42,0.08) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <div className="relative z-[2] flex flex-col justify-center px-[4vw] py-16 pl-[4vw] lg:pl-[6vw] lg:pt-24">
          <div className="accessi-hero-eyebrow mb-6 inline-flex items-center gap-2 text-[0.75rem] font-medium tracking-[0.15em] text-[var(--accent)] uppercase">
            <span
              className="h-px w-8 bg-[var(--accent)]"
              aria-hidden
            />
            Erişilebilir Eğitim Teknolojisi
          </div>
          <h1 className="accessi-hero-title font-fraunces mb-6 text-[clamp(3rem,5.5vw,5.5rem)] leading-none font-black tracking-[-0.03em]">
            Ders Videosunu
            <br />
            <em className="font-light italic text-[var(--accent)]">
              Akıllı Nota
            </em>
            <br />
            Dönüştür.
          </h1>
          <p className="accessi-hero-desc mb-10 max-w-[480px] text-[1.05rem] leading-[1.75] text-[var(--muted)]">
            AccessiNote, uzun ve karmaşık ders videolarını saniyeler içinde temiz,
            düzenli ve sesli okunabilir notlara dönüştürür. Görme engelli ve
            disleksik öğrenciler için tasarlandı.
          </p>
          <div className="accessi-hero-actions flex flex-wrap items-center gap-4">
            <a
              href="#start"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-3.5 text-[0.95rem] font-medium text-white no-underline shadow-[0_4px_20px_rgba(200,82,42,0.3)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(200,82,42,0.4)]"
            >
              🎓 Hemen Başla
            </a>
            <a
              href="#flow"
              className="inline-flex items-center gap-2 text-[0.9rem] text-[var(--muted)] no-underline transition-colors hover:text-[var(--ink)]"
            >
              Nasıl çalışır? →
            </a>
          </div>
        </div>
        <div className="accessi-hero-right relative z-[2] flex items-center justify-center px-[4vw] py-12 lg:py-24 lg:pr-[6vw] lg:pl-[2vw]">
          <div className="w-full max-w-[460px] rounded-3xl border border-[var(--line)] bg-white p-8 shadow-[0_20px_60px_rgba(15,14,12,0.12),0_4px_16px_rgba(15,14,12,0.06)]">
            
            {/* ÜST PANEL ÇİZGİLERİ */}
            <div className="mb-5 flex items-center gap-3 border-b border-[var(--line)] pb-4">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#ff5f57]" aria-hidden />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#febc2e]" aria-hidden />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#28c840]" aria-hidden />
              <div className="flex-1 text-center text-[0.75rem] font-medium text-[var(--muted)]">
                AccessiNote — Analiz Paneli
              </div>
            </div>

            {/* FORM ALANI */}
            <form onSubmit={handleProcessSubmit} className="mb-4 rounded-xl bg-[var(--cream)] p-4">
              <label htmlFor="youtube-url" className="mb-2 block text-[0.75rem] font-medium text-[var(--muted)]">
                YouTube bağlantısı
              </label>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <div className="flex min-w-0 flex-1 items-stretch gap-3">
                  <div className="flex h-10 w-12 shrink-0 items-center justify-center self-center rounded-lg bg-gradient-to-br from-[#c8522a] to-[#e8804a] text-sm text-white sm:h-[42px] sm:w-[60px]">
                    ▶
                  </div>
                  <input
                    id="youtube-url"
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=…"
                    value={youtubeUrl}
                    onChange={(ev) => setYoutubeUrl(ev.target.value)}
                    disabled={pending}
                    className="min-h-10 w-full min-w-0 flex-1 rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-[0.8rem] outline-none ring-[var(--accent)] focus:ring-2 disabled:opacity-60"
                  />
                </div>
                <button
                  type="submit"
                  disabled={pending}
                  className="shrink-0 rounded-full bg-[var(--accent)] px-5 py-2.5 text-[0.8rem] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {pending ? "..." : "Gönder"}
                </button>
              </div>
            </form>

            {/* DİSLEKSİ BUTONU (HER KOŞULDA GÖRÜNÜR) */}
            <div className="mb-6 border-b border-[var(--line)] pb-4">
              <button
                type="button"
                onClick={() => setIsDyslexic(!isDyslexic)}
                className={`w-full flex items-center justify-center gap-2 rounded-xl border py-3 text-[0.8rem] font-bold shadow-sm transition-all active:scale-95 ${
                  isDyslexic 
                    ? "bg-orange-100 border-orange-400 text-orange-800 shadow-inner" 
                    : "bg-white border-[var(--line)] text-[var(--ink)] hover:bg-slate-50"
                }`}
              >
                {isDyslexic ? "📖 Disleksi Modu: AÇIK" : "📖 Disleksi Modunu Etkinleştir"}
              </button>
              </div>
            {/* NOTLAR VEYA BOŞ DURUM */}
            <div className="relative">
              {transcription ? (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className={`max-h-[300px] overflow-y-auto rounded-xl border border-[var(--line)] bg-[var(--paper)] p-4 shadow-inner ${isDyslexic ? "font-dyslexic leading-loose tracking-wide" : "leading-relaxed"}`}>
                    <div className="mb-2 inline-block rounded-full bg-[rgba(200,82,42,0.1)] px-2 py-0.5 text-[0.65rem] font-bold text-[var(--accent)] uppercase">
                      ✨ Akıllı Notlar
                    </div>
                    <ReactMarkdown
                      components={{
                        h2: ({children}) => <h2 className="font-fraunces text-[1rem] font-bold mt-4 mb-2 text-[var(--ink)]">{children}</h2>,
                        h3: ({children}) => <h3 className="font-fraunces text-[0.9rem] font-semibold mt-3 mb-1 text-[var(--ink)]">{children}</h3>,
                        p: ({children}) => <p className="mb-2 text-[0.85rem] text-[var(--ink)]">{children}</p>,
                        li: ({children}) => <li className="mb-1 text-[0.85rem] text-[var(--ink)] ml-3 list-disc">{children}</li>,
                        strong: ({children}) => <strong className="font-bold text-[var(--accent)]">{children}</strong>,
                      }}
                    >
                      {transcription}
                    </ReactMarkdown>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const u = new SpeechSynthesisUtterance(transcription);
                        u.lang = "tr-TR";
                        window.speechSynthesis.speak(u);
                      }}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--ink)] py-2.5 text-[0.75rem] font-bold text-white shadow-md transition-transform active:scale-95"
                    >
                      🔊 Sesli Oku
                    </button>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(transcription ?? "")}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-white py-2.5 text-[0.75rem] font-bold text-[var(--ink)] shadow-sm transition-transform active:scale-95"
                    >
                      📋 Kopyala
                    </button>
                    <button
  type="button"
  onClick={() => {
    setTranscription(null);
    setYoutubeUrl("");
    setApiMessage(null);
    setApiError(null);
    setQuiz([]);
    setUserAnswers({});
    setQuizSubmitted(false);
  }}
  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[var(--cream)] py-2.5 text-[0.75rem] font-bold text-[var(--ink)] transition-transform active:scale-95"
>
  🔄 Yeni Video
</button>
{/* QUIZ BÖLÜMÜ */}
{transcription && (
  <div className="mt-3">
    <button
      type="button"
      onClick={handleQuizCreate}
      disabled={quizLoading}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent2)] py-2.5 text-[0.75rem] font-bold text-white shadow-md transition-transform active:scale-95 disabled:opacity-50"
    >
      {quizLoading ? "⏳ Quiz oluşturuluyor..." : "🧪 Quiz Oluştur"}
    </button>

    {quiz.length > 0 && (
      <div className="mt-4 flex flex-col gap-4">
        {quiz.map((q, i) => (
          <div key={i} className="rounded-xl border border-[var(--line)] bg-white p-4">
            <p className="mb-3 text-[0.85rem] font-semibold text-[var(--ink)]">
              {i + 1}. {q.soru}
            </p>
            <div className="flex flex-col gap-2">
              {q.secenekler.map((s: string) => {
                const isSelected = userAnswers[i] === s;
                const isCorrect = s === q.dogruCevap;
                let btnClass = "rounded-lg border px-3 py-2 text-left text-[0.78rem] transition-colors ";
                if (!quizSubmitted) {
                  btnClass += isSelected
                    ? "border-[var(--accent)] bg-[rgba(200,82,42,0.1)] font-semibold"
                    : "border-[var(--line)] hover:bg-[var(--cream)]";
                } else {
                  if (isCorrect) btnClass += "border-green-400 bg-green-50 font-semibold text-green-700";
                  else if (isSelected) btnClass += "border-red-400 bg-red-50 text-red-700";
                  else btnClass += "border-[var(--line)]";
                }
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={quizSubmitted}
                    onClick={() => setUserAnswers(prev => ({ ...prev, [i]: s }))}
                    className={btnClass}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            {quizSubmitted && (
              <p className="mt-2 text-[0.75rem] text-[var(--muted)] italic">
                💡 {q.aciklama}
              </p>
            )}
          </div>
        ))}

        {!quizSubmitted && quiz.length > 0 && (
          <button
            type="button"
            onClick={() => setQuizSubmitted(true)}
            className="flex w-full items-center justify-center rounded-full bg-[var(--ink)] py-2.5 text-[0.75rem] font-bold text-white"
          >
            ✅ Cevapları Kontrol Et
          </button>
        )}

        {quizSubmitted && (
          <div className="rounded-xl bg-[var(--cream)] p-4 text-center">
            <p className="text-[0.9rem] font-bold text-[var(--ink)]">
              Sonuç: {quiz.filter((q, i) => userAnswers[i] === q.dogruCevap).length} / {quiz.length} doğru 🎉
            </p>
          </div>
        )}
      </div>
    )}
  </div>
)}
                  </div>
                </div>
              ) : (
                <div className="py-10 text-center text-[0.8rem] text-[var(--muted)] italic border border-dashed border-[var(--line)] rounded-xl">
                  {pending ? (
                    <div className="flex flex-col items-center gap-3 py-2">
                      <div className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-bounce" style={{animationDelay:"0ms"}} />
                        <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-bounce" style={{animationDelay:"150ms"}} />
                        <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-bounce" style={{animationDelay:"300ms"}} />
                      </div>
                      <p className="text-[0.8rem] font-medium text-[var(--accent)]">{apiMessage ?? "⏳ Video işleniyor..."}</p>
                      <p className="text-[0.7rem] text-[var(--muted)]">Bu işlem 30-90 saniye sürebilir</p>
                    </div>
                  ) : "Henüz bir analiz yapılmadı. Bir YouTube linki girerek ders notlarınızı oluşturun."}
                </div>
              )}
            </div>
          </div> {/* Analiz Paneli Kapatıcı */}
        </div> {/* Sağ Hero Kapatıcı */}
      </section>
      <div className="grid grid-cols-1 border-y border-[var(--line)] bg-[var(--cream)] md:grid-cols-3">
        <div className="accessi-reveal border-b border-[var(--line)] px-[3vw] py-10 text-center last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
          <div className="font-fraunces mb-1 text-[3rem] leading-none font-black tracking-[-0.04em] text-[var(--ink)]">
            <span className="text-[var(--accent)]">94</span>%
          </div>
          <div className="text-[0.825rem] font-normal text-[var(--muted)]">
            Zaman tasarrufu oranı
          </div>
        </div>
        <div className="accessi-reveal border-b border-[var(--line)] px-[3vw] py-10 text-center last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
          <div className="font-fraunces mb-1 text-[3rem] leading-none font-black tracking-[-0.04em] text-[var(--ink)]">
            <span className="text-[var(--accent)]">&lt;30</span>s
          </div>
          <div className="text-[0.825rem] font-normal text-[var(--muted)]">
            Ortalama işleme süresi
          </div>
        </div>
        <div className="accessi-reveal border-b border-[var(--line)] px-[3vw] py-10 text-center last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
          <div className="font-fraunces mb-1 text-[3rem] leading-none font-black tracking-[-0.04em] text-[var(--ink)]">
            <span className="text-[var(--accent)]">3</span>+
          </div>
          <div className="text-[0.825rem] font-normal text-[var(--muted)]">
            Engel türüne destek
          </div>
        </div>
      </div>

      <section className="relative py-28" id="problem">
        <div className="mx-auto max-w-[1200px] px-[6vw]">
          <div className="accessi-reveal">
            <div className="mb-4 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-[0.15em] text-[var(--accent)] uppercase">
              <span className="block h-px w-6 bg-[var(--accent)]" aria-hidden />
              Sorun & Çözüm
            </div>
            <h2 className="font-fraunces mb-4 text-[clamp(2.2rem,3.5vw,3.5rem)] leading-tight font-black tracking-[-0.03em]">
              Neden <em className="font-light italic text-[var(--accent)]">AccessiNote</em>?
            </h2>
            <p className="max-w-[600px] text-[1.05rem] leading-[1.75] text-[var(--muted)]">
              Eğitimdeki erişilebilirlik sorunu gerçek. Her öğrencinin bilgiye eşit
              ulaşma hakkı var.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--line)] max-[900px]:grid-cols-1 lg:grid-cols-2">
            {[
              {
                num: "01",
                icon: "👁️",
                iconBg: "rgba(200,82,42,0.1)",
                title: "Görsel İçerik Engeli",
                body: "Görme engelli öğrenciler tahta yazılarını, slaytları ve grafikleri takip edemiyor. Eğitim içeriğinin büyük kısmı görsel formatta.",
                pill: "✓ Yapay Zeka Görsel Betimleme",
              },
              {
                num: "02",
                icon: "🧠",
                iconBg: "rgba(58,107,78,0.1)",
                title: "Odak & Dikkat Kaybı",
                body: "Disleksik öğrenciler uzun videolarda dikkati sürdürmekte ve anlık not çıkarmakta ciddi zorluk yaşıyor.",
                pill: "✓ Akıllı & Yapılandırılmış Notlar",
              },
              {
                num: "03",
                icon: "⏱️",
                iconBg: "rgba(232,200,74,0.2)",
                title: "Zaman Kaybı",
                body: "60 dakikalık bir videodan önemli bilgileri süzmek saatler alabiliyor. Sınav dönemlerinde bu lüks mümkün değil.",
                pill: "✓ Saniyeler İçinde Analiz",
              },
              {
                num: "04",
                icon: "🗣️",
                iconBg: "rgba(200,82,42,0.1)",
                title: "Sesli Erişim Yokluğu",
                body: "Mevcut not araçları metni görsel sunuyor. Sesli geri bildirim ve okuma desteği son derece sınırlı kalıyor.",
                pill: "✓ Entegre Sesli Okuma (TTS)",
              },
            ].map((c) => (
              <div
                key={c.num}
                data-num={c.num}
                className="accessi-problem-card accessi-reveal relative bg-[var(--paper)] p-10"
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                  style={{ background: c.iconBg }}
                  aria-hidden
                >
                  {c.icon}
                </div>
                <h3 className="font-fraunces mb-2 text-[1.2rem] font-bold tracking-[-0.02em]">
                  {c.title}
                </h3>
                <p className="mb-5 text-[0.9rem] leading-relaxed text-[var(--muted)]">
                  {c.body}
                </p>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(58,107,78,0.2)] bg-[rgba(58,107,78,0.1)] px-3.5 py-1.5 text-[0.775rem] font-semibold text-[var(--accent2)]">
                  {c.pill}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[var(--ink)] py-28 text-[var(--paper)]" id="features">
        <div className="mx-auto max-w-[1200px] px-[6vw]">
          <div className="accessi-reveal">
            <div className="mb-4 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-[0.15em] text-[var(--accent3)] uppercase">
              <span className="block h-px w-6 bg-[var(--accent3)]" aria-hidden />
              Özellikler
            </div>
            <h2 className="font-fraunces mb-4 text-[clamp(2.2rem,3.5vw,3.5rem)] leading-tight font-black tracking-[-0.03em] text-[var(--paper)]">
              Her Şey <em className="font-light italic text-[var(--accent)]">Düşünüldü</em>
            </h2>
            <p className="max-w-[600px] text-[1.05rem] leading-[1.75] text-[rgba(245,240,232,0.55)]">
              Yapay zekanın gücüyle geliştirilen her özellik, gerçek bir öğrenci
              ihtiyacından doğdu.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-px bg-[rgba(245,240,232,0.08)] sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                n: "01",
                icon: "🎬",
                title: "Video Analizi",
                desc: "YouTube, MP4 veya herhangi bir video URL'si yapıştırın. AI saniyeler içinde içeriği işler ve yapılandırılmış çıktı üretir.",
              },
              {
                n: "02",
                icon: "👁️‍🗨️",
                title: "Görsel Betimleme",
                desc: "Tahta yazıları, slaytlar, grafikler ve diyagramlar otomatik olarak algılanır ve metne dönüştürülür.",
              },
              {
                n: "03",
                icon: "📝",
                title: "Akıllı Not Çıkarma",
                desc: "Gereksiz kısımlar ayıklanır. Ana kavramlar, formüller ve önemli noktalar hiyerarşik biçimde sunulur.",
              },
              {
                n: "04",
                icon: "🔊",
                title: "Sesli Okuma (TTS)",
                desc: "Tüm notlar yüksek kaliteli metin-konuşma sentezi ile sesli okunabilir. Hız ve ses tonu ayarlanabilir.",
              },
              {
                n: "05",
                icon: "📑",
                title: "Dışa Aktarma",
                desc: "Notlarınızı PDF, DOCX veya Markdown formatında indirin. Braille çıktı desteği de planlanmaktadır.",
              },
              {
                n: "06",
                icon: "♿",
                title: "WCAG 2.1 Uyumlu",
                desc: "Yüksek kontrast tema, klavye navigasyonu ve ekran okuyucu uyumluluğu ile tam erişilebilirlik.",
              },
            ].map((f) => (
              <div
                key={f.n}
                className="accessi-reveal cursor-default bg-[var(--ink)] px-8 py-10 transition-colors hover:bg-[rgba(245,240,232,0.04)]"
              >
                <div className="font-fraunces mb-6 text-[0.75rem] font-light tracking-widest text-[rgba(245,240,232,0.3)]">
                  {f.n}
                </div>
                <span className="mb-5 block text-4xl" aria-hidden>
                  {f.icon}
                </span>
                <h3 className="font-fraunces mb-3 text-[1.25rem] font-bold tracking-[-0.02em] text-[var(--paper)]">
                  {f.title}
                </h3>
                <p className="text-[0.875rem] leading-relaxed text-[rgba(245,240,232,0.55)]">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[var(--cream)] py-28" id="flow">
        <div className="mx-auto max-w-[1200px] px-[6vw]">
          <div className="accessi-reveal">
            <div className="mb-4 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-[0.15em] text-[var(--accent)] uppercase">
              <span className="block h-px w-6 bg-[var(--accent)]" aria-hidden />
              Kullanıcı Akışı
            </div>
            <h2 className="font-fraunces mb-4 text-[clamp(2.2rem,3.5vw,3.5rem)] leading-tight font-black tracking-[-0.03em]">
              3 Adımda <em className="font-light italic text-[var(--accent)]">Not Al</em>
            </h2>
            <p className="max-w-[600px] text-[1.05rem] leading-[1.75] text-[var(--muted)]">
              Karmaşık kurulum yok. Video linkini yapıştır, sihir başlasın.
            </p>
          </div>
          <div className="relative mt-16 before:absolute before:top-10 before:bottom-10 before:left-9 before:z-0 before:hidden before:w-px before:bg-[var(--line)] md:before:block">
            {[
              {
                num: "1",
                tag: "Başlangıç",
                title: "Video Linkini Yapıştır",
                body: "YouTube, Vimeo veya herhangi bir video URL'sini giriş kutusuna yapıştırın. Platform bağlantısı için giriş yapmanıza gerek yok.",
              },
              {
                num: "2",
                tag: "Yapay Zeka",
                title: "AI Analiz Ediyor",
                body: "Sistem konuşmayı transkribe eder, görsel içerikleri tanır (OCR + Vision AI), önemli bilgileri çıkarır ve hiyerarşik bir not yapısı oluşturur.",
              },
              {
                num: "3",
                tag: "Sonuç",
                title: "Notlarına Eriş",
                body: "Yapılandırılmış notlarınız anında ekranda belirir. Sesli okuma butonuna basın, istediğiniz formatta indirin veya arkadaşlarınızla paylaşın.",
              },
              {
                num: "4",
                tag: "Bonus",
                title: "Kişiselleştir & Kaydet",
                body: "Notlara kendi yorumlarınızı ekleyin, bölümleri vurgulayın ve not kütüphanenizde saklayın. Sınav döneminde hızlıca tekrar edin.",
              },
            ].map((s, i, arr) => (
              <div
                key={s.num}
                className={`accessi-reveal grid grid-cols-[5rem_1fr] items-start gap-8 border-[var(--line)] py-8 ${i < arr.length - 1 ? "border-b" : ""}`}
              >
                <div className="relative z-[1] flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] font-fraunces text-xl font-black text-[var(--accent)]">
                  {s.num}
                </div>
                <div>
                  <div className="mb-1.5 inline-block rounded-full bg-[var(--accent3)] px-2.5 py-0.5 text-[0.65rem] font-bold tracking-wider text-[var(--ink)] uppercase">
                    {s.tag}
                  </div>
                  <h3 className="font-fraunces pt-3 text-[1.4rem] font-bold tracking-[-0.02em]">
                    {s.title}
                  </h3>
                  <p className="max-w-[560px] text-[0.95rem] leading-relaxed text-[var(--muted)]">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28" id="tech">
        <div className="mx-auto max-w-[1200px] px-[6vw]">
          <div className="accessi-reveal">
            <div className="mb-4 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-[0.15em] text-[var(--accent)] uppercase">
              <span className="block h-px w-6 bg-[var(--accent)]" aria-hidden />
              Teknoloji Yığını
            </div>
            <h2 className="font-fraunces mb-4 text-[clamp(2.2rem,3.5vw,3.5rem)] leading-tight font-black tracking-[-0.03em]">
              Güçlü <em className="font-light italic text-[var(--accent)]">Altyapı</em>
            </h2>
            <p className="max-w-[600px] text-[1.05rem] leading-[1.75] text-[var(--muted)]">
              Her teknoloji bilinçli seçildi. Performans, erişilebilirlik ve
              ölçeklenebilirlik ön planda.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "⚡",
                title: "Next.js 14",
                desc: "React tabanlı full-stack framework. SSR ve statik üretim desteği.",
                reason: "✓ SEO + Hız + SSR",
              },
              {
                icon: "🤖",
                title: "Claude API",
                desc: "Anthropic'in dil modeli — transkript analizi ve akıllı not üretimi için.",
                reason: "✓ Yüksek kalite metin anlayışı",
              },
              {
                icon: "👁️",
                title: "Google Vision AI",
                desc: "Tahta, slayt ve grafik içeriklerinin OCR ile tanınması ve betimlenmesi.",
                reason: "✓ Görsel erişilebilirlik",
              },
              {
                icon: "🎙️",
                title: "Whisper ASR",
                desc: "OpenAI'ın açık kaynak konuşma tanıma modeli — çok dilli transkripsiyon.",
                reason: "✓ %95+ doğruluk oranı",
              },
              {
                icon: "🔊",
                title: "Web Speech API",
                desc: "Tarayıcı tabanlı metin-konuşma sentezi. Ek yükleme gerektirmez.",
                reason: "✓ Yerleşik TTS erişimi",
              },
              {
                icon: "🗄️",
                title: "Supabase",
                desc: "PostgreSQL tabanlı açık kaynak backend. Auth, storage ve realtime.",
                reason: "✓ Güvenli veri saklama",
              },
              {
                icon: "🎨",
                title: "Tailwind CSS",
                desc: "Utility-first CSS framework. WCAG 2.1 uyumlu renk ve kontrast yönetimi.",
                reason: "✓ Erişilebilir tasarım sistemi",
              },
              {
                icon: "☁️",
                title: "Vercel",
                desc: "Edge network üzerinden küresel dağıtım. Sıfır konfigürasyonlu CI/CD.",
                reason: "✓ Düşük gecikme, yüksek uptime",
              },
            ].map((t) => (
              <div
                key={t.title}
                className="accessi-reveal rounded-2xl border border-[var(--line)] bg-white px-6 py-7 transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(15,14,12,0.08)]"
              >
                <span className="mb-3 block text-3xl" aria-hidden>
                  {t.icon}
                </span>
                <h4 className="font-fraunces mb-1 text-base font-bold">{t.title}</h4>
                <p className="text-[0.8rem] leading-normal text-[var(--muted)]">{t.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-[0.72rem] font-semibold text-[var(--accent2)]">
                  {t.reason}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--cream)] py-28">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-[6vw] lg:grid-cols-2 lg:gap-24">
          <div className="accessi-reveal">
            <div className="mb-4 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-[0.15em] text-[var(--accent)] uppercase">
              <span className="block h-px w-6 bg-[var(--accent)]" aria-hidden />
              Erişilebilirlik
            </div>
            <h2 className="font-fraunces mb-4 text-[clamp(2.2rem,3.5vw,3.5rem)] leading-tight font-black tracking-[-0.03em]">
              Herkes İçin
              <br />
              <em className="font-light italic text-[var(--accent)]">Tasarlandı</em>
            </h2>
            <p className="max-w-[600px] text-[1.05rem] leading-[1.75] text-[var(--muted)]">
              AccessiNote, erişilebilirliği sonradan eklenen bir özellik olarak değil,
              temel tasarım ilkesi olarak benimsiyor.
            </p>
            <p className="mt-10 text-[0.9rem] leading-loose text-[var(--muted)]">
              Görme engelli, disleksik, dikkat eksikliği yaşayan veya yalnızca zaman
              kazanmak isteyen her öğrenci hedef kitlemizdir. Platform, ekran
              okuyucularla tam uyumlu şekilde geliştirilmekte ve klavye odaklı
              navigasyonu desteklemektedir.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              {
                icon: "👁️",
                tone: "orange" as const,
                title: "Görme Engelliler",
                desc: "Ekran okuyucu uyumlu ARIA etiketleri, sesli çıktı ve yüksek kontrast tema",
              },
              {
                icon: "🧠",
                tone: "green" as const,
                title: "Disleksi Desteği",
                desc: "Okunabilir font seçenekleri, geniş satır aralığı ve aşamalı içerik gösterimi",
              },
              {
                icon: "⌨️",
                tone: "yellow" as const,
                title: "Klavye Navigasyonu",
                desc: "Fare kullanımı gerektirmeden tam platform erişimi. Tab-focus görünür ve belirgin",
              },
              {
                icon: "🏆",
                tone: "orange" as const,
                title: "WCAG 2.1 AA Uyumlu",
                desc: "Web içerik erişilebilirlik yönergeleri tam olarak karşılanıyor",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="accessi-reveal flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-white px-6 py-5 transition-transform hover:translate-x-1.5"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${
                    b.tone === "orange"
                      ? "bg-[rgba(200,82,42,0.1)]"
                      : b.tone === "green"
                        ? "bg-[rgba(58,107,78,0.1)]"
                        : "bg-[rgba(232,200,74,0.2)]"
                  }`}
                  aria-hidden
                >
                  {b.icon}
                </div>
                <div>
                  <h4 className="mb-0.5 text-[0.925rem] font-semibold">{b.title}</h4>
                  <p className="text-[0.8rem] text-[var(--muted)]">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-[var(--ink)] py-32 text-center text-[var(--paper)]"
        id="start"
      >
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(200,82,42,0.15) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <div className="relative z-[1] mx-auto max-w-[1200px] px-[6vw]">
          <div className="accessi-reveal mb-6 text-[0.75rem] font-medium tracking-[0.15em] text-[var(--accent3)] uppercase">
            Ücretsiz Dene
          </div>
          <h2 className="accessi-reveal font-fraunces mb-6 text-[clamp(2.5rem,5vw,5rem)] leading-none font-black tracking-[-0.04em]">
            Videoyu Yapıştır,
            <br />
            <em className="font-light italic text-[var(--accent)]">Notunu Al.</em>
          </h2>
          <p className="accessi-reveal mx-auto mb-12 max-w-[500px] text-base leading-relaxed text-[rgba(245,240,232,0.55)]">
            Kredi kartı gerekmez. Kayıt zorunlu değil. Sadece bir video linki yeterli.
          </p>
          <div className="accessi-reveal flex flex-wrap items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--paper)] px-8 py-3.5 text-[0.95rem] font-semibold text-[var(--ink)] no-underline shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-0.5"
            >
              🎓 Ücretsiz Başla
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 text-[0.9rem] text-[rgba(245,240,232,0.6)] no-underline transition-colors hover:text-[var(--paper)]"
            >
              GitHub&apos;da İncele →
            </a>
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-4 border-t border-[rgba(245,240,232,0.08)] bg-[var(--ink)] px-[6vw] py-8 text-[0.8rem] text-[rgba(245,240,232,0.4)] sm:flex-row sm:items-center sm:justify-between">
        <div className="font-fraunces text-[1.1rem] font-black text-[var(--paper)]">
          Accessi<span className="text-[var(--accent)]">Note</span>
        </div>
        <div>Eğitimde erişilebilirlik için yapıldı 🤍</div>
        <div>© 2026 AccessiNote</div>
      </footer>
    </div>
  );
}
