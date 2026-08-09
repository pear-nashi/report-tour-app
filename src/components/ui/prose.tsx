import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ProseProps = {
  children: ReactNode;
  className?: string;
};

export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        "whitespace-pre-wrap text-[15px] leading-[1.95] tracking-[0.01em] text-slate-800 sm:text-base sm:leading-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

type ProseSectionProps = {
  title: string;
  children: ReactNode;
  accent?: "rose" | "violet" | "amber";
};

const accentStyles = {
  rose: "from-rose-400/80 to-pink-400/80",
  violet: "from-violet-400/80 to-indigo-400/80",
  amber: "from-amber-400/80 to-orange-400/80",
};

export function ProseSection({
  title,
  children,
  accent = "violet",
}: ProseSectionProps) {
  return (
    <section className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-8">
      <div className="mb-5 flex items-center gap-3">
        <span
          className={cn(
            "h-8 w-1 rounded-full bg-gradient-to-b",
            accentStyles[accent],
          )}
        />
        <h2 className="text-lg font-semibold tracking-tight text-zinc-100 sm:text-xl">
          {title}
        </h2>
      </div>
      <Prose>{children}</Prose>
    </section>
  );
}
