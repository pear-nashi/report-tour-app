"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  getItemPostsByTag,
  getShowById,
  getTimelineItemById,
  getTourById,
} from "@/lib/store";
import type { ItemPost, TagType, TimelineItem, Show } from "@/types/app";

const TAGS: TagType[] = ["演出全般", "モニター映像", "衣装", "ガチャ"];

type TagPostsClientProps = {
  tourId: string;
};

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
  const [tagPosts, setTagPosts] = useState<ItemPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // タグが変更されたときにSupabaseから非同期でデータを取得する
  useEffect(() => {
    let isMounted = true;
    async function fetchPosts() {
      setLoading(true);
      try {
        const posts = await getItemPostsByTag(selectedTag);
        if (isMounted) {
          setTagPosts(posts);
        }
      } catch (error) {
        console.error("Failed to fetch tag posts:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchPosts();
    return () => {
      isMounted = false;
    };
  }, [selectedTag]);

  if (!tour) {
    return <p className="py-16 text-center text-slate-700 font-bold">ツアーが見つかりません</p>;
  }

  // 取得した投稿をセットリスト順・曲ごとにグループ化
  const groupedPosts = useMemo(() => {
    const tourPosts = tagPosts
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

    return Array.from(groupMap.values()).sort((a, b) => a.order - b.order);
  }, [tagPosts, tourId]);

  return (
    <div className="text-black font-sans">
      {/* 戻るボタン */}
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

      {/* タグ切り替えタブ */}
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
        {loading ? (
          <p className="py-12 text-center text-sm text-slate-500 font-bold">読み込み中...</p>
        ) : groupedPosts.length === 0 ? (
          <p className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/80 py-12 text-center text-sm text-slate-600 font-bold">
            「#{selectedTag}」がついたコメントはまだありません。
          </p>
        ) : (
          groupedPosts.map((group) => (
            <div
              key={`${group.title}-${group.order}`}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all"
            >
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

              <div className="p-4 space-y-3">
              {group.posts
                  .sort((a, b) => new Date(a.show.date).getTime() - new Date(b.show.date).getTime())
                  .map(({ post, show }) => (
                  <div
                    key={post.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4"
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800 font-medium">
                      {post.body}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center justify-end gap-x-2 gap-y-1 text-right text-[11px] text-slate-500 font-bold">
                      <span className="text-slate-600">📍{show.venue}（{show.date} {show.time}）・{post.authorName || "匿名"}</span>
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