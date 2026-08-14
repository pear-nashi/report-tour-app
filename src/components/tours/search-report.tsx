"use client";

import { useState, useMemo } from "react";

export type SearchPostItem = {
  id: string;
  body: string;
  authorName?: string;
  venue: string;
  date?: string;
  title: string;
  type: "board" | "item";
};

type SearchProps = {
  posts: SearchPostItem[];
};

export function SearchReport({ posts }: SearchProps) {
  const [keyword, setKeyword] = useState("");

  const filteredPosts = useMemo(() => {
    if (!keyword.trim()) return [];

    // スペース（全角・半角）で区切って複数のキーワードに分解する
    const queries = keyword.trim().split(/[\s ]+/);

    // 同義語・関連ワードの辞書マップ
    const synonymsMap: Record<string, string[]> = {
      かわいい: ["かわいい", "可愛い"],
      かっこいい: ["かっこいい", "カッコいい", "カッコイイ"],
      みちきょへ: ["みちきょへ", "きょへみち", "デビエン"],
      道枝: ["道枝", "みっちー", "みちえだ", "ミッチー", "駿佑", "駿ちゃん"],
      西畑: ["西畑", "大吾", "大ちゃん", "大ちゅん", "にしはた", "だいご"],
      藤原: ["丈一郎", "藤原", "丈くん", "丈君", "じょー", "じょーくん"],
      大橋: ["大橋", "はっすん", "和くん"],
      高橋: ["高橋", "恭平", "きょろ", "きょへ"],
      長尾: ["謙杜", "長尾"],
      大西: ["流星", "大西", "りゅちぇ", "りゅせ", "おおにっちゃん"],
      櫻井: ["翔くん", "翔ちゃん", "櫻井", "しょさん", "翔さん", "サクライ"],
      二宮: ["二宮", "ニノ", "にのみ", "にのちゃん","和也"],
      相葉: ["相葉", "あいば", "雅紀", "まさき"],
      大野: ["大野", "智くん", "さとぴ", "リーダー", "大ちゃん"],
      松本: ["松本", "潤くん", "潤", "松潤", "MJ", "まっさん"],
    };

    return posts.filter((post) => {
      const body = post.body.toLowerCase();
      const title = post.title.toLowerCase();
      const author = (post.authorName || "").toLowerCase();
      const targetText = `${body} ${title} ${author}`;

      // 入力されたすべてのキーワードが含まれているか（AND検索）
      return queries.every((q) => {
        const query = q.toLowerCase();

        // 辞書に登録されている同義語があれば、そのいずれかが含まれているかチェック
        const synonyms = synonymsMap[query];
        if (synonyms) {
          return synonyms.some((syn) => targetText.includes(syn));
        }

        // 通常の部分一致
        return targetText.includes(query);
      });
    });
  }, [posts, keyword]);

  return (
    <div className="space-y-6">
      {/* 検索入力フォーム */}
      <div>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="キーワードを入力"
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

        {filteredPosts.map((post) => {
          const isBoard = post.type === "board";

          return (
            <div
              key={post.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-sm"
            >
              {/* 本文 */}
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800 font-medium">
                {post.body}
              </p>

              {/* 下部：種類ごとのアイコン・色分け ＋ 会場・日付・投稿者名を同じ行にまとめる */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2 text-[9px] text-slate-500 font-bold">
                <span
                  className={`px-2 py-0.5 rounded-lg border ${
                    isBoard
                      ? "text-amber-900 bg-amber-50 border-amber-200"
                      : "text-emerald-900 bg-emerald-50 border-emerald-200"
                  }`}
                >
                  {isBoard ? "📝" : "🎵"}{post.title}
                </span>
                <span>
                  📍{post.venue}{post.date ? `・${post.date}` : ""} ・ {post.authorName || "匿名"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}