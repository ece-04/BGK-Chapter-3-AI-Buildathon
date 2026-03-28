import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "AccessiNote — Videolardan Akıllı Notlar",
  description:
    "Ders videolarını temiz, düzenli ve sesli okunabilir notlara dönüştürün. Görme engelli ve disleksik öğrenciler için tasarlandı.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${dmSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
