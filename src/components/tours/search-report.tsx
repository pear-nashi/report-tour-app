"use client";

import { useState, useMemo } from "react";

export type SearchPostItem = {
  id: string;
  body: string;
  authorName?: string;
  venue: string;
  date?: string;
  title: string;
};

type SearchProps = {
  posts: SearchPostItem[];
};

export function SearchReport({ posts }: SearchProps) {
  const [keyword, setKeyword] = useState("");

  const filteredPosts = useMemo(() => {
    if (!keyword.trim()) return [];

    const query = keyword.toLowerCase();
    return posts.filter((post) => post.body.toLowerCase().includes(query));
  }, [posts, keyword]);

  return (
    <div className="space-y-6">
      {/* 検索入力フォーム */}
      <div>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="キーワードを入力して検索（例：衣装、可愛い など）"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:border-slate-500 focus:outline-none"
        />
      </div>

      {/* 検索結果の表示 */}
      <div className="space-y-4">
        {keyword.trim() && (
          <p className="text-xs font-bold text-slate-500">
            検索結果: {filteredPosts.length}件
          </p>
        )}

        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-sm"
          >
            {/* 本文 */}
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800 font-medium">
              {post.body}
            </p>

            {/* 下部：曲名・会場情報・投稿者名を同じ行にまとめる */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500 font-bold">
              <span className="text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                🎵 {post.title}
              </span>
              <span>
                📍 {post.venue} {post.date ? `・ ${post.date}` : ""} ・ {post.authorName || "匿名"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}