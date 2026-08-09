"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getItemPostCount,
  getShowById,
  getTimelineByShowId,
  getTourById,
} from "@/lib/store";
import type { TimelineItem } from "@/types/app";

export function SetlistTimeline({ showId }: { showId: string }) {
  const show = getShowById(showId);
  const tour = show ? getTourById(show.tourId) : undefined;

  const [items] = useState<TimelineItem[]>(() => getTimelineByShowId(showId));
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchCounts() {
      const newCounts: Record<string, number> = {};
      for (const item of items) {
        // 非同期で正確なコメント数を取得
        newCounts[item.id] = await getItemPostCount(item.id);
      }
      setCounts(newCounts);
    }
    fetchCounts();
  }, [items]);

  if (!show) {
    return <p className="py-16 text-center text-slate-600 font-medium">公演が見つかりません</p>;
  }

  return (
    <div className="text-slate-900">
      {/* 戻るリンク */}
      <Link
        href={`/tours/${show.tourId}`}
        className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors mb-6"
      >
        ← {tour?.name ?? "ツアー詳細へ"}
      </Link>

      {/* タイトル */}
      <div className="mb-8">
        {tour?.name && (
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800 mb-2 border border-emerald-200">
            {tour.name}
          </span>
        )}
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{show.label}</h1>
        <p className="mt-2 text-sm font-medium text-slate-700">
          セットリスト（曲順）になっています。コメントしたいものを選択して自由にコメントをどうぞ！
        </p>
      </div>

      {/* セトリ一覧 */}
      <section className="space-y-2">
        {items.map((item) => {
          const orderLabel = String(item.order).padStart(2, "0");
          const count = counts[item.id] ?? item.seedCommentCount ?? 0;

          return (
            <Link
              key={item.id}
              href={`/items/${item.id}`}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-3.5 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md sm:gap-4 sm:px-5"
            >
              {/* パステルグリーンの曲順バッジ */}
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xs font-bold tabular-nums text-emerald-900 group-hover:bg-emerald-200 transition-colors">
                {orderLabel}
              </span>

              <div className="min-w-0">
                <p className="truncate font-bold text-slate-900 group-hover:text-emerald-900">
                  {item.title}
                </p>
              </div>

              {/* パステルイエローのコメント数バッジ */}
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-100/80 border border-amber-300/70 px-2.5 py-1 text-xs font-bold text-amber-900">
                💬 {count}件
              </span>
            </Link>
          );
        })}
      </section>
    </div>
  );
}

export default SetlistTimeline;