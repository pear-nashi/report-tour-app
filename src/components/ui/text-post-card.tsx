import Link from "next/link";
import { cn, formatDateTime } from "@/lib/utils";

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
  return (
    <article
      className={cn(
        "border-b border-slate-200 px-1 py-4 last:border-b-0 sm:px-2 sm:py-5",
        className,
      )}
    >
      {/* 投稿者名と日時 */}
      <div className="mb-2 flex items-baseline gap-2">
        <span className="font-bold text-slate-900">
          {authorName || "名無しさん"}
        </span>
        <span className="text-xs text-slate-600 font-semibold">
          · {formatDateTime(createdAt)}
        </span>
      </div>
      {/* 本文：くっきり濃い黒 */}
      <p className="whitespace-pre-wrap text-[15px] leading-7 text-black font-normal">
        {body}
      </p>
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