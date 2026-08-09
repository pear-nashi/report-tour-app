"use client";

import Link from "next/link";
import { useMemo } from "react";
import { BackLink } from "@/components/ui/text-post-card";
import { PageIntro } from "@/components/ui/page-shell";
import {
  getArtistById,
  getShowsByTourId,
  getTourById,
} from "@/lib/store";
import type { Show } from "@/types/app";

type TourDetailClientProps = {
  tourId: string;
};

// 公演の日付と現実の今日を比較してステータスを返すヘルパー関数
function getShowStatus(showDateStr: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const showDate = new Date(showDateStr);
  showDate.setHours(0, 0, 0, 0);

  if (showDate.getTime() === today.getTime()) {
    return { label: "本日開催", color: "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold" };
  } else if (showDate.getTime() < today.getTime()) {
    return { label: "終了", color: "bg-slate-100 text-slate-500 border-slate-200" };
  } else {
    return { label: "開催前", color: "bg-sky-50 text-sky-700 border-sky-200 font-medium" };
  }
}

export function TourDetailClient({ tourId }: TourDetailClientProps) {
  const tour = getTourById(tourId);
  const artist = tour ? getArtistById(tour.artistId) : undefined;
  const shows = useMemo(() => getShowsByTourId(tourId), [tourId]);

  // 日程ブロック（同じ会場の連続した開催日程）ごとに公演をグループ化
  const showBlocks = useMemo(() => {
    const blocks: {
      id: string;
      venue: string;
      shows: Show[];
    }[] = [];

    shows.forEach((show) => {
      const lastBlock = blocks[blocks.length - 1];

      // 直前のブロックと同じ会場なら同じブロックに追加、違えば新しいブロックを作成
      if (lastBlock && lastBlock.venue === show.venue) {
        lastBlock.shows.push(show);
      } else {
        blocks.push({
          id: `${show.venue}-${show.date}`,
          venue: show.venue,
          shows: [show],
        });
      }
    });

    return blocks;
  }, [shows]);

  if (!tour) {
    return (
      <div className="py-16 text-center">
        <p className="text-slate-600 font-medium">ツアーが見つかりませんでした</p>
        <Link href="/" className="mt-4 inline-block text-sm text-slate-500 hover:underline">
          トップへ戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="text-slate-900">
      <BackLink href="/" label="トップへ" />
      <PageIntro
        eyebrow={artist?.name}
        title={tour.name}
        description="会場ごとの構成レポや、各公演のセットリスト・MCレポを確認できます。"
      />

      {/* 1. 演出タグありコメントのツアー全体まとめ */}
      <div className="mb-4">
        <Link
          href={`/tours/${tour.id}/tags`}
          className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 transition-all hover:bg-emerald-100/80 hover:border-emerald-300 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🏷️</span>
            <div>
              <p className="font-bold text-emerald-950">演出タグありコメントのツアー全体まとめ</p>
              <p className="text-xs text-slate-600 font-medium">「衣装」「モニター映像」「演出全般」などを特定公演日関係なくタグごとにコメントをチェック</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-sm">
            開く →
          </span>
        </Link>
      </div>

      {/* 2. MC・挨拶 振り返りログへのリンク */}
      <div className="mb-6">
        <Link
          href={`/tours/${tour.id}/words`}
          className="flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50/80 p-4 transition-all hover:bg-blue-100/80 hover:border-blue-300 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">💬</span>
            <div>
              <p className="font-bold text-blue-950">MC・挨拶 振り返りログ</p>
              <p className="text-xs text-slate-600 font-medium">あの公演でどんな話をしてたっけ？MCや挨拶の話題を横断チェック</p>
            </div>
          </div>
          <span className="text-xs font-bold text-blue-800 bg-white px-3 py-1.5 rounded-xl border border-blue-200 shadow-sm">
            開く →
          </span>
        </Link>
      </div>

      <div className="space-y-6">
        {showBlocks.map((block) => (
          <div
            key={block.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            {/* 会場ヘッダー */}
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
              <h2 className="font-bold text-slate-900 text-base">{block.venue}</h2>
            </div>

            <div className="p-3 space-y-2">
              {/* 会場共通・構成レポ */}
              <Link
                href={`/tours/${tour.id}/board?venue=${encodeURIComponent(block.venue)}`}
                className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/50 px-4 py-3 transition-all hover:bg-emerald-100/60 hover:border-emerald-300"
              >
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700">📝</span>
                  <span className="text-sm font-bold text-emerald-900">
                    会場共通・構成レポ
                  </span>
                </div>
                <span className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-200 shadow-sm">
                  開く →
                </span>
              </Link>

              {/* 各日程 */}
              {block.shows.map((show) => {
                const status = getShowStatus(show.date);
                return (
                  <Link
                    key={show.id}
                    href={`/shows/${show.id}`}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 transition-all hover:border-slate-300 hover:bg-slate-100/80"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] ${status.color}`}
                      >
                        {status.label}
                      </span>
                      <span className="text-xs text-slate-600 font-mono font-medium">
                        {show.date}
                      </span>
                      <span className="text-sm text-slate-900 font-bold">
                        {show.time}開演
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-500 hover:text-slate-800">セトリ・MC →</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}