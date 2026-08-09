"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BackLink, TextPostCard } from "@/components/ui/text-post-card";
import { PageIntro } from "@/components/ui/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  createBoardPost,
  deleteBoardPost,
  getArtistById,
  getBoardPostsByTourId,
  getShowsByTourId,
  getTourById,
} from "@/lib/store";
import type { BoardPost, BoardTagType } from "@/types/app";

const MAX_LENGTH = 200;
const ITEMS_PER_PAGE = 15;
const LOCAL_STORAGE_KEY = "my_board_post_ids";

const AVAILABLE_BOARD_TAGS: BoardTagType[] = [
  "アリーナ構成",
  "動線・外周",
  "混雑・入場",
  "銀テープ・落下物",
];

type SpoilerFreeBoardProps = {
  tourId: string;
};

function SpoilerFreeBoardContent({ tourId }: SpoilerFreeBoardProps) {
  const searchParams = useSearchParams();
  const initialVenue = searchParams.get("venue") || "ALL";

  const tour = getTourById(tourId);
  const artist = tour ? getArtistById(tour.artistId) : undefined;

  const tourShows = useMemo(() => getShowsByTourId(tourId), [tourId]);
  const venueList = useMemo(
    () => Array.from(new Set(tourShows.map((s) => s.venue))),
    [tourShows]
  );

  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [body, setBody] = useState("");
  const [selectedVenue, setSelectedVenue] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<BoardTagType[]>([]);

  const [myPostIds, setMyPostIds] = useState<string[]>([]);

  const [activeVenueFilter, setActiveVenueFilter] = useState<string>(initialVenue);
  const [activeFilterTag, setActiveFilterTag] = useState<BoardTagType | "ALL">("ALL");

  const [currentPage, setCurrentPage] = useState(1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPosts(getBoardPostsByTourId(tourId));
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setMyPostIds(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
    setReady(true);
  }, [tourId]);

  useEffect(() => {
    const param = searchParams.get("venue");
    if (param) {
      setActiveVenueFilter(param);
    }
  }, [searchParams]);

  // 引数を明示的に string 型にして、かつ optional にしないことで型不整合を防ぐ
  const handleVenueFilterChange = (venue: string) => {
    setActiveVenueFilter(venue);
    setCurrentPage(1);
  };

  const handleTagFilterChange = (tag: BoardTagType | "ALL") => {
    setActiveFilterTag(tag);
    setCurrentPage(1);
  };

  function handleTagToggle(tag: BoardTagType) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!body.trim()) return;

    const newPost = createBoardPost({
      tourId,
      venue: selectedVenue !== "" ? selectedVenue : undefined,
      authorName: authorName.trim() || undefined,
      body: body.slice(0, MAX_LENGTH),
      tags: selectedTags,
    });

    if (newPost && newPost.id) {
      const updatedMyIds = [...myPostIds, newPost.id];
      setMyPostIds(updatedMyIds);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMyIds));
      } catch {
        // ignore
      }
    }

    setBody("");
    setSelectedTags([]);
    setSelectedVenue("");
    setPosts(getBoardPostsByTourId(tourId));
    setCurrentPage(1);
  }

  function handleDelete(postId: string) {
    if (!confirm("投稿を削除してもよろしいですか？")) return;

    deleteBoardPost(postId);

    const updatedMyIds = myPostIds.filter((id) => id !== postId);
    setMyPostIds(updatedMyIds);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMyIds));
    } catch {
      // ignore
    }

    setPosts(getBoardPostsByTourId(tourId));
  }

  if (!tour) {
    return (
      <p className="py-16 text-center font-medium text-slate-600">
        ツアーが見つかりません
      </p>
    );
  }

  const filteredPosts = posts.filter((post) => {
    const matchVenue =
      activeVenueFilter === "ALL" || post.venue === activeVenueFilter;
    const matchTag =
      activeFilterTag === "ALL" || post.tags?.includes(activeFilterTag);
    return matchVenue && matchTag;
  });

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="text-slate-900">
      <BackLink href={`/tours/${tourId}`} label="ツアー詳細へ" />
      <PageIntro
        eyebrow={`${artist?.name ?? ""} / ネタバレなし`}
        title="会場共通・構成レポ"
        description="演出タグありコメントのツアー全体まとめ（アリーナ構成、動線記録、落下物等の記録）"
      />

      {/* 絞り込みフィルターエリア */}
      <div className="mb-8 space-y-4 rounded-2xl border-2 border-slate-200 bg-slate-50/50 p-4 shadow-xs">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">会場で絞り込み</span>
            {activeVenueFilter !== "ALL" && (
              <button
                type="button"
                onClick={() => handleVenueFilterChange("ALL")}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                全会場を表示
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleVenueFilterChange("ALL")}
              className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all border-b-2 active:translate-y-0.5 ${
                activeVenueFilter === "ALL"
                  ? "bg-slate-900 text-white border-black shadow-xs"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:text-black"
              }`}
            >
              全会場 ({posts.length})
            </button>
            {venueList.map((venue) => {
              const count = posts.filter((p) => p.venue === venue).length;
              const isActive = activeVenueFilter === venue;
              return (
                <button
                  key={venue}
                  type="button"
                  onClick={() =>
                    handleVenueFilterChange(isActive ? "ALL" : venue)
                  }
                  className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all border-b-2 active:translate-y-0.5 ${
                    isActive
                      ? "bg-emerald-400 text-emerald-950 border-emerald-600 shadow-emerald-200 scale-105"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:text-black"
                  }`}
                >
                  📍 {venue} ({count})
                </button>
              );
            })}
          </div>
        </div>

        <hr className="border-slate-200" />

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">内容タグで絞り込み</span>
            {activeFilterTag !== "ALL" && (
              <button
                type="button"
                onClick={() => handleTagFilterChange("ALL")}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                全タグを表示
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleTagFilterChange("ALL")}
              className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all border-b-2 active:translate-y-0.5 ${
                activeFilterTag === "ALL"
                  ? "bg-slate-900 text-white border-black shadow-xs"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:text-black"
              }`}
            >
              すべて
            </button>
            {AVAILABLE_BOARD_TAGS.map((tag) => {
              const isActive = activeFilterTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagFilterChange(isActive ? "ALL" : tag)}
                  className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all border-b-2 active:translate-y-0.5 ${
                    isActive
                      ? "bg-emerald-400 text-emerald-950 border-emerald-600 shadow-emerald-200 scale-105"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:text-black"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 投稿一覧 */}
      <section className="mb-12">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-wide text-slate-900">
            投稿一覧（{filteredPosts.length}件）
          </h2>
          {totalPages > 1 && (
            <span className="text-xs font-medium text-slate-500">
              {currentPage} / {totalPages} ページ
            </span>
          )}
        </div>

        {!ready ? (
          <div className="h-40 animate-pulse rounded-2xl border-2 border-slate-200 bg-slate-100" />
        ) : filteredPosts.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 py-12 text-center text-sm font-medium text-slate-500">
            <p>該当する投稿がありません</p>
            {(activeVenueFilter !== "ALL" || activeFilterTag !== "ALL") && (
              <button
                type="button"
                onClick={() => {
                  handleVenueFilterChange("ALL");
                  handleTagFilterChange("ALL");
                }}
                className="mt-2 text-xs font-bold text-emerald-700 underline"
              >
                すべてのフィルターを解除
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {paginatedPosts.map((post) => {
                const isMyPost = myPostIds.includes(post.id);

                return (
                  <div
                    key={post.id}
                    className="relative rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-xs sm:p-5"
                  >
                    <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {post.venue ? (
                          <button
                            type="button"
                            onClick={() => handleVenueFilterChange(post.venue ?? "ALL")}
                            className="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-800 transition-colors hover:bg-slate-200"
                          >
                            📍 {post.venue}
                          </button>
                        ) : (
                          <span className="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                            全会場共通
                          </span>
                        )}

                        {post.tags &&
                          post.tags.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => handleTagFilterChange(tag)}
                              className="rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-900 transition-colors hover:bg-emerald-100"
                            >
                              #{tag}
                            </button>
                          ))}
                      </div>

                      {isMyPost && (
                        <button
                          type="button"
                          onClick={() => handleDelete(post.id)}
                          className="text-xs font-bold text-rose-600 hover:text-rose-800 hover:underline"
                        >
                          削除
                        </button>
                      )}
                    </div>

                    <TextPostCard
                      authorName={post.authorName}
                      body={post.body}
                      createdAt={post.createdAt}
                    />
                  </div>
                );
              })}
            </div>

            {/* ページネーション */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-full border-2 border-slate-300 bg-white text-xs font-bold text-slate-700 shadow-xs active:translate-y-0.5"
                >
                  前へ
                </Button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`h-8 w-8 rounded-full text-xs font-bold transition-all border-b-2 active:translate-y-0.5 ${
                          currentPage === page
                            ? "bg-emerald-500 text-white border-emerald-700 shadow-xs"
                            : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>
                <Button
                  variant="secondary"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-full border-2 border-slate-300 bg-white text-xs font-bold text-slate-700 shadow-xs active:translate-y-0.5"
                >
                  次へ
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      {/* 投稿フォームエリア */}
      <section>
        <h2 className="mb-3 text-sm font-bold tracking-wide text-slate-900">
          レポ・情報を投稿する
        </h2>
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-xs sm:p-6"
        >
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="board-author" className="!text-slate-900 !font-bold text-sm mb-1 block">
                名前（任意）
              </Label>
              <Input
                id="board-author"
                value={authorName}
                onChange={(event) => setAuthorName(event.target.value)}
                placeholder="ニックネーム"
                className="mt-1 !rounded-2xl !bg-slate-50 !border-2 !border-slate-200 text-black font-medium placeholder:text-slate-400 focus:!bg-white focus:!border-emerald-500 transition-all"
              />
            </div>

            <div>
              <Label htmlFor="board-venue" className="!text-slate-900 !font-bold text-sm mb-1 block">
                対象会場（任意）
              </Label>
              <select
                id="board-venue"
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
                className="mt-1 h-10 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-black transition-all focus:bg-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="">全会場共通 / 指定なし</option>
                {venueList.map((venue) => (
                  <option key={venue} value={venue}>
                    {venue}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* タグ選択 */}
          <div className="mb-5">
            <Label className="mb-2 block !text-slate-900 !font-bold text-sm">
              タグを選択（任意）
            </Label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_BOARD_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all shadow-xs border-b-2 active:translate-y-0.5 ${
                      isSelected
                        ? "bg-emerald-400 text-emerald-950 border-emerald-600 shadow-emerald-200 scale-105"
                        : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200 hover:text-black"
                    }`}
                  >
                    {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-3">
            <Label htmlFor="board-body" className="!text-slate-900 !font-bold text-sm mb-1 block">
              本文
            </Label>
            <Textarea
              id="board-body"
              value={body}
              onChange={(event) =>
                setBody(event.target.value.slice(0, MAX_LENGTH))
              }
              placeholder="会場情報やアリーナ構成、立ち位置・動線など"
              className="mt-1 min-h-28 !rounded-2xl !bg-slate-50 !border-2 !border-slate-200 text-black font-medium placeholder:text-slate-400 focus:!bg-white focus:!border-emerald-500 transition-all"
            />
          </div>

          <div className="mb-5 flex items-center justify-between text-xs">
            <span
              className={
                body.length >= MAX_LENGTH
                  ? "text-amber-600 font-bold"
                  : "text-slate-500 font-bold"
              }
            >
              {body.length} / {MAX_LENGTH}
            </span>
          </div>

          {/* 投稿ボタン */}
          <Button
            type="submit"
            className="w-full sm:w-auto rounded-full font-bold px-7 py-2.5 h-auto text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-md border-b-2 border-emerald-700 active:border-b-0 active:translate-y-0.5 transition-all disabled:opacity-50"
            disabled={!body.trim()}
          >
            投稿する ✨
          </Button>
        </form>
      </section>
    </div>
  );
}

export function SpoilerFreeBoard(props: SpoilerFreeBoardProps) {
  return (
    <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-slate-100" />}>
      <SpoilerFreeBoardContent {...props} />
    </Suspense>
  );
}

export default SpoilerFreeBoard;