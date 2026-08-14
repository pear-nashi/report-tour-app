"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import {
  getShowsByTourId,
  getTimelineByShowId,
  getItemPostsByItemId,
  getTourById,
} from "@/lib/store";
import type { ItemPost, Show, TimelineItem } from "@/types/app";

type TourWordsReportProps = {
  tourId: string;
};

type GroupedShowWords = {
  show: Show;
  posts: {
    item: TimelineItem;
    post: ItemPost;
    type: "mc" | "greeting";
  }[];
};

export function TourWordsReport({ tourId }: TourWordsReportProps) {
  const tour = getTourById(tourId);
  const [activeTab, setActiveTab] = useState<"all" | "mc" | "greeting">("all");
  
  const [groupedShows, setGroupedShows] = useState<GroupedShowWords[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 非同期で公演ごとのMC・挨拶データを取得して組み立てる
  useEffect(() => {
    let isMounted = true;

    async function fetchWordReports() {
      setLoading(true);
      try {
        const shows = getShowsByTourId(tourId);
        const groups: GroupedShowWords[] = [];

        for (const show of shows) {
          const timelineItems = getTimelineByShowId(show.id);
          const showPosts: GroupedShowWords["posts"] = [];

          for (const item of timelineItems) {
            const isMcOrGreeting =
              item.type === "mc" ||
              item.title.includes("MC") ||
              item.title.includes("挨拶") ||
              item.title.includes("MC・挨拶");

            if (isMcOrGreeting) {
              const posts = await getItemPostsByItemId(item.id);
              const type = item.title.includes("挨拶") ? "greeting" : "mc";

              posts.forEach((post) => {
                showPosts.push({ item, post, type });
              });
            }
          }

          if (showPosts.length > 0) {
            groups.push({ show, posts: showPosts });
          }
        }

        if (isMounted) {
          setGroupedShows(groups);
        }
      } catch (error) {
        console.error("Failed to fetch word reports:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchWordReports();

    return () => {
      isMounted = false;
    };
  }, [tourId]);

  if (!tour) {
    return <p className="py-16 text-center text-slate-700 font-bold">ツアーが見つかりません</p>;
  }

  return (
    <div className="text-black font-sans max-w-2xl mx-auto p-4 space-y-6">
      {/* 戻るボタン */}
      <Link
        href={`/tours/${tourId}`}
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs text-slate-800 font-bold transition-all shadow-sm mb-2"
      >
        ← {tour.name} へ戻る
      </Link>

      {/* ヘッダー情報 */}
      <div className="bg-blue-50/60 p-5 rounded-3xl border border-blue-100/80">
        <p className="text-xs font-bold text-blue-800 tracking-wider mb-1">{tour.name}</p>
        <h2 className="text-xl font-black text-slate-900 sm:text-2xl">MC・挨拶レポート</h2>
        <p className="mt-1 text-sm text-slate-600 font-medium">公演日毎にどんな話をしていたか確認することができます。</p>
      </div>

      {/* 切り替えタブ */}
      <div className="flex gap-2 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
            activeTab === "all"
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          すべて
        </button>
        <button
          onClick={() => setActiveTab("mc")}
          className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
            activeTab === "mc"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          MC
        </button>
        <button
          onClick={() => setActiveTab("greeting")}
          className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
            activeTab === "greeting"
              ? "bg-purple-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          挨拶
        </button>
      </div>

      {/* 公演ごとのグループ表示 */}
      <section className="space-y-6">
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-sm font-medium">
            読み込み中...
          </div>
        ) : groupedShows.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-3xl font-bold">
            該当するコメントはありません
          </div>
        ) : (
          groupedShows.map(({ show, posts }) => {
            const filteredPosts = posts.filter(
              (p) => activeTab === "all" || p.type === activeTab
            );

            if (filteredPosts.length === 0) return null;

            return (
              <div
                key={show.id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                {/* 公演ヘッダー：日付、時間、場所 の順番でコンパクトに表示 */}
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">📅</span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm sm:text-base font-mono">
                        {show.date}
                      </span>
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                        {show.time} 開演
                      </span>
                      <span className="text-xs font-medium text-slate-600 bg-slate-200/60 px-2 py-0.5 rounded-md">
                        @ {show.venue}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 font-bold shrink-0">
                    {filteredPosts.length}件のレポ
                  </span>
                </div>

                {/* 各コメントカード */}
                <div className="p-2 space-y-2">
                  {filteredPosts.map(({ post, type }) => (
                    <div
                      key={post.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50/40 px-3 py-2.5 relative space-y-1"
                    >
                      {/* 右上にバッジを配置 */}
                      <div className="flex items-center justify-end">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider ${
                            type === "mc"
                              ? "bg-blue-50 text-blue-600 border border-blue-200"
                              : "bg-purple-50 text-purple-600 border border-purple-200"
                          }`}
                        >
                          {type === "mc" ? "MC" : "挨拶"}
                        </span>
                      </div>

                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700 font-medium">
                        {post.body}
                      </p>

                      <div className="flex items-center justify-end text-[10px] text-slate-400 font-bold">
                        <span>{post.authorName || "匿名"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}

export default TourWordsReport;