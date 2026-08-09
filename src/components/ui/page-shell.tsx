import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageIntroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: PageIntroProps) {
  return (
    <section className="mb-8 border-b border-slate-200 pb-8">
      {eyebrow ? (
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-800">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 text-sm leading-7 font-medium text-slate-700 sm:text-[15px]">
          {description}
        </p>
      ) : null}
      {children}
    </section>
  );
}

type StepLabelProps = {
  step: number;
  label: string;
  active?: boolean;
};

export function StepLabel({ step, label, active = false }: StepLabelProps) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors",
          active
            ? "bg-emerald-600 text-white shadow-sm"
            : "border border-slate-300 bg-slate-100 text-slate-500",
        )}
      >
        {step}
      </span>
      <h2
        className={cn(
          "text-sm font-bold tracking-wide",
          active ? "text-slate-900" : "text-slate-400",
        )}
      >
        {label}
      </h2>
    </div>
  );
}

type SelectionCardProps = {
  title: string;
  subtitle?: string;
  selected?: boolean;
  onClick?: () => void;
  href?: string;
};

export function SelectionCard({
  title,
  subtitle,
  selected,
  onClick,
  href,
}: SelectionCardProps) {
  const content = (
    <>
      <div className="flex items-center justify-between gap-2">
        <p
          className={cn(
            "font-bold transition-colors",
            selected ? "text-emerald-950" : "text-slate-900 group-hover:text-emerald-900",
          )}
        >
          {title}
        </p>
        {selected ? (
          <span className="shrink-0 rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
            選択中
          </span>
        ) : null}
      </div>
      {subtitle ? (
        <p
          className={cn(
            "mt-1 text-xs font-medium",
            selected ? "text-emerald-700" : "text-slate-500",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </>
  );

  const cardClasses = cn(
    "group w-full rounded-2xl border p-4 text-left transition-all",
    selected
      ? "border-emerald-500 bg-emerald-50/90 shadow-md ring-2 ring-emerald-400/20"
      : "border-slate-200 bg-white shadow-sm hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md",
  );

  if (href) {
    return (
      <Link href={href} className={cardClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cardClasses}>
      {content}
    </button>
  );
}

type RouteCardProps = {
  title: string;
  description: string;
  href: string;
  badge?: string;
};

export function RouteCard({ title, description, href, badge }: RouteCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="font-bold text-slate-900 group-hover:text-emerald-900">
          {title}
        </h3>
        {badge ? (
          <span className="rounded-full border border-emerald-300 bg-emerald-100/80 px-2.5 py-0.5 text-[11px] font-bold text-emerald-900">
            {badge}
          </span>
        ) : null}
      </div>
      <p className="text-sm leading-7 font-medium text-slate-600">{description}</p>
      <p className="mt-4 text-sm font-bold text-emerald-700 group-hover:text-emerald-900">
        → 開く
      </p>
    </Link>
  );
}