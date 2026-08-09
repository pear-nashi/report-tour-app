import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-zinc-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="group">
          <span className="block text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-500">
            Observation Memo
          </span>
          <span className="text-base font-semibold tracking-tight text-zinc-100 transition-colors group-hover:text-white">
            みんなの現場メモまとめ
          </span>
        </Link>
      </div>
    </header>
  );
}
