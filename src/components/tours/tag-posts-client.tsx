"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  getItemPostsByTag,
  getShowById,
  getTimelineItemById,
  getTourById,
} from "@/lib/store";
import type { ItemPost, TagType, TimelineItem, Show } from "@/types/app";

const TAGS: TagType[] = ["演出全般", "モニター映像", "衣装"];

type TagPostsClientProps = {
  tourId: string;
};

// 曲/MCごとにグループ化された構造の型
type GroupedItemPost = {
  item: TimelineItem;
  title: string;
  order: number;
  type: TimelineItem["type"];
  posts: {
    post: ItemPost;
    show: Show;
  }[];
};

export function TagPostsClient({ tourId }: TagPostsClientProps) {
  const tour = getTourById(tourId);
  const [selectedTag, setSelectedTag] = useState<TagType>("演出全般");

  if (!tour) {
    return <p className="py-16 text-center text-slate-700 font-bold">ツアーが見つかりません</p>;
  }

  // 選択中のタグの投稿を取得し、セットリスト順・曲ごとにグループ化
  const groupedPosts = useMemo(() => {
    const allTagPosts = getItemPostsByTag(selectedTag);

    // 1. ツアーに属する投稿を抽出
    const tourPosts = allTagPosts
      .map((post) => {
        const item = getTimelineItemById(post.itemId);
        const show = item ? getShowById(item.showId) : undefined;
        return { post, item, show };
      })
      .filter(
        (entry): entry is { post: ItemPost; item: TimelineItem; show: Show } =>
          entry.item !== undefined &&
          entry.show !== undefined &&
          entry.show.tourId === tourId
      );

    // 2. 曲タイトル（または itemId / タイトル＋種別）ごとにグループ化
    const groupMap = new Map<string, GroupedItemPost>();

    tourPosts.forEach(({ post, item, show }) => {
      const key = `${item.title}-${item.type}`;

      if (!groupMap.has(key)) {
        groupMap.set(key, {
          item,
          title: item.title,
          order: item.order,
          type: item.type,
          posts: [],
        });
      }

      groupMap.get(key)!.posts.push({ post, show });
    });

    // 3. セットリストの曲順（order）で並べ替え
    return Array.from(groupMap.values()).sort((a, b) => a.order - b.order);
  }, [selectedTag, tourId]);

  return (
    <div className="text-black font-sans">
      {/* 戻るボタン（カプセル風ピル型） */}
      <Link
        href={`/tours/${tourId}`}
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs text-slate-800 font-bold transition-all shadow-sm active:translate-y-0.5 mb-6"
      >
        ← {tour.name} へ戻る
      </Link>

      {/* ヘッダー情報 */}
      <div className="mb-8 bg-emerald-50/60 p-5 rounded-3xl border border-emerald-100/80">
        <p className="text-xs font-bold text-emerald-800 tracking-wider mb-1">{tour.name}</p>
        <h1 className="text-2xl font-black text-slate-900 sm:text-3xl tracking-wide">全公演タグ別コメントまとめ</h1>
        <p className="mt-2 text-sm text-slate-600 font-bold">
          セットリスト順に、指定したタグ付きのコメントを全公演横断で確認することができます。
        </p>
      </div>

      {/* タグ切り替えタブ（ぷっくりカプセル風） */}
      <div className="mb-8 flex flex-wrap gap-2 border-b border-slate-200 pb-5">
        {TAGS.map((tag) => {
          const isActive = selectedTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all shadow-xs border-b-2 active:translate-y-0.5 ${
                isActive
                  ? "bg-emerald-400 text-emerald-950 border-emerald-600 shadow-emerald-200 scale-105"
                  : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200 hover:text-black"
              }`}
            >
              #{tag}
            </button>
          );
        })}
      </div>

      {/* メモ一覧（曲順グループ表示） */}
      <section className="space-y-6">
        {groupedPosts.length === 0 ? (
          <p className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/80 py-12 text-center text-sm text-slate-600 font-bold">
            「#{selectedTag}」がついたコメントはまだありません。
          </p>
        ) : (
          groupedPosts.map((group) => (
            <div
              key={`${group.title}-${group.order}`}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all"
            >
              {/* 曲・MCヘッダー (セットリスト順) */}
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-emerald-900 bg-emerald-100 border border-emerald-300/80 px-2.5 py-0.5 rounded-full">
                    M{String(group.order).padStart(2, "0")}
                  </span>
                  <h2 className="font-bold text-slate-900 sm:text-lg">
                    {group.title}
                  </h2>
                </div>
                <span className="text-xs text-slate-500 font-bold">
                  {group.posts.length}件のメモ
                </span>
              </div>

              {/* その曲に対する各公演のメモ一覧 */}
              <div className="p-4 space-y-3">
                {group.posts.map(({ post, show }) => (
                  <div
                    key={post.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4"
                  >
                    {/* 本文（主役） */}
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800 font-medium">
                      {post.body}
                    </p>

                    {/* 右下のメタ情報（会場・公演日・投稿者のみ） */}
                    <div className="mt-3 flex flex-wrap items-center justify-end gap-x-2 gap-y-1 text-right text-[11px] text-slate-500 font-bold">
                      <span className="text-slate-600">📍 {show.venue}（{show.date}）</span>
                      <span>・</span>
                      <span>{post.authorName || "匿名"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default TagPostsClient;