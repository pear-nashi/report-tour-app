import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "みんなのライブレポまとめ",
  description:
    "テキストだけのライブレポのまとめサイト。あの瞬間の空気感や演出、現場の抱えきれない感情を残していきましょう。",
};

// スマホでの意図しない拡大・固定を防ぐ設定
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-slate-900">
        <div className="relative flex min-h-full flex-col">
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_50%)]"
          />
          <SiteHeader />
          <main className="relative flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}