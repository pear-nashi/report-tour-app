import Link from "next/link";
import { cn } from "@/lib/utils";

type TextPostCardProps = {
  authorName: string;
  body: string;
  createdAt: string;
  className?: string;
};

export function TextPostCard({
  authorName,
  body,
  createdAt,
  className,
}: TextPostCardProps) {
  // 日付と時間を「3/1 19:00」のような形式に変換する処理
  const formattedDateTime = (() => {
    if (!createdAt) return "";
    const date = new Date(createdAt);
    if (isNaN(date.getTime())) return createdAt;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${month}/${day} ${hours}:${minutes}`;
  })();

  return (
    <article
      className={cn(
        "border-b border-slate-200 px-1 py-1.5 last:border-b-0 sm:px-2 sm:py-1",
        className,
      )}
    >
      {/* 本文：くっきり濃い黒 */}
      <p className="whitespace-pre-wrap text-[15px] leading-7 text-black font-normal">
        {body}
      </p>

      {/* 投稿者名と日時を右下に配置 */}
      <div className="mt-1 flex flex-wrap items-center justify-end gap-x-2 text-right text-xs text-slate-600 font-semibold">
        <span className="font-bold text-slate-900">
          {authorName || "名無しさん"}
        </span>
        <span>·</span>
        <span>{formattedDateTime}</span>
      </div>
    </article>
  );
}

type BackLinkProps = {
  href: string;
  label: string;
};

export function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="mb-6 inline-flex text-sm font-bold text-slate-700 transition-colors hover:text-black"
    >
      ← {label}
    </Link>
  );
}