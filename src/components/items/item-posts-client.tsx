"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { TextPostCard } from "@/components/ui/text-post-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  createItemPost,
  deleteItemPost,
  getItemPostsByItemId,
  getShowById,
  getTimelineItemById,
  getTourById,
} from "@/lib/store";
import type { ItemPost, TagType } from "@/types/app";

const MAX_LENGTH = 200;
const AVAILABLE_TAGS: TagType[] = ["演出全般", "モニター映像", "衣装", "ガチャ"];
const LOCAL_STORAGE_KEY = "my_item_post_ids";

type ItemPostsClientProps = {
  itemId: string;
};

export function ItemPostsClient({ itemId }: ItemPostsClientProps) {
  const item = getTimelineItemById(itemId);
  const show = item ? getShowById(item.showId) : undefined;
  const tour = show ? getTourById(show.tourId) : undefined;

  const [posts, setPosts] = useState<ItemPost[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [body, setBody] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);

  const [myPostIds, setMyPostIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getItemPostsByItemId(itemId);
        setPosts(Array.isArray(data) ? data : []);
      } catch {
        setPosts([]);
      }

      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          setMyPostIds(JSON.parse(saved));
        }
      } catch {
        // ignore
      }
      setReady(true);
    }
    fetchPosts();
  }, [itemId]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [itemId]);

  function handleTagToggle(tag: TagType) {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!body.trim()) return;

    // 修正: deletePassword をストアへ渡すように追加
    const newPost = await createItemPost({
      itemId,
      authorName: authorName.trim() || "",
      body: body.slice(0, MAX_LENGTH),
      tags: selectedTags,
      deletePassword: deletePassword.trim() || undefined,
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
    setDeletePassword("");
    setSelectedTags([]);

    const data = await getItemPostsByItemId(itemId);
    setPosts(Array.isArray(data) ? data : []);
  }

  async function handleDelete(postId: string, isMyPost: boolean, postDeletePassword?: string) {
    let passwordToSend: string | undefined = undefined;

    // 修正: 自分の投稿であっても、削除用パスワードが設定されているならパスワード入力を必須にする
    if (postDeletePassword) {
      const inputPassword = prompt("投稿時に設定した削除用パスワードを入力してください：");
      if (inputPassword === null) return; // キャンセルされた場合
      if (inputPassword !== postDeletePassword) {
        alert("パスワードが間違っています。");
        return;
      }
      passwordToSend = inputPassword;
    } else {
      // パスワードが設定されていない投稿の場合
      if (!isMyPost) {
        alert("この投稿を削除する権限がありません。");
        return;
      }
      if (!confirm("投稿を削除してもよろしいですか？")) return;
    }

    try {
      const success = await deleteItemPost(postId, passwordToSend);

      if (success !== false) {
        const updatedMyIds = myPostIds.filter((id) => id !== postId);
        setMyPostIds(updatedMyIds);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMyIds));
        } catch {
          // ignore
        }

        const data = await getItemPostsByItemId(itemId);
        setPosts(Array.isArray(data) ? data : []);
      } else {
        alert("削除に失敗しました。");
      }
    } catch {
      alert("削除に失敗しました。");
    }
  }

  if (!item || !show) {
    return <p className="py-16 text-center text-slate-800 font-bold">コマが見つかりません</p>;
  }

  return (
    <div className="text-black font-sans">
      <Link
        href={`/shows/${show.id}`}
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs text-slate-800 font-bold transition-all shadow-sm active:translate-y-0.5 mb-6"
      >
        ← {show.label}
      </Link>

      <div className="mb-8 bg-emerald-50/60 p-5 rounded-3xl border border-emerald-100/80">
        <p className="text-xs font-bold text-emerald-800 tracking-wider mb-1">
          {tour?.name} / {show.label}
        </p>
        <h1 className="text-2xl font-black text-slate-900 sm:text-3xl tracking-wide">{item.title}</h1>
        <p className="mt-2 text-sm text-slate-600 font-bold">
          ✨ このパフォーマンスに関するみんなのレポ・コメント
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-3 text-sm font-bold tracking-wider text-slate-900 flex items-center gap-2">
          <span>💬</span> コメント一覧（{posts.length}件）
        </h2>
        {!ready ? (
          <div className="h-40 animate-pulse rounded-3xl border border-slate-200 bg-slate-100" />
        ) : posts.length === 0 ? (
          <p className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/80 py-10 text-center text-sm text-slate-600 font-bold">
            まだコメントがありません。最初のコメントを投稿してみましょう！
          </p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => {
              const isMyPost = myPostIds.includes(post.id);

              return (
                <div
                  key={post.id}
                  className="relative group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-all"
                >
                  {/* 自分の投稿、またはパスワードがある投稿には削除ボタンを表示 */}
                  {(isMyPost || post.deletePassword) && (
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id, isMyPost, post.deletePassword)}
                      className="absolute top-4 right-4 text-xs font-bold text-slate-400 hover:text-red-600 transition-colors"
                    >
                      削除
                    </button>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1.5 pr-12">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-emerald-100/80 px-3 py-1 text-[11px] font-bold text-emerald-900 border border-emerald-300/80 shadow-2xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <TextPostCard
                    authorName={post.authorName ?? ""}
                    body={post.body}
                    createdAt={post.createdAt}
                  />
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-sm font-bold tracking-wider text-slate-900 flex items-center gap-2">
          <span>✏️</span> コメントを投稿する
        </h2>
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-md"
        >
          <div className="mb-5">
            <Label htmlFor="item-author" className="!text-slate-900 !font-bold text-sm mb-1 block">
              名前（任意）
            </Label>
            <Input
              id="item-author"
              value={authorName}
              onChange={(event) => setAuthorName(event.target.value)}
              placeholder="ニックネーム"
              className="mt-1 !rounded-2xl !bg-slate-50 !border-2 !border-slate-200 text-black font-medium placeholder:text-slate-400 focus:!bg-white focus:!border-emerald-500 transition-all h-11"
            />
          </div>

          <div className="mb-5">
            <Label htmlFor="delete-password" className="!text-slate-900 !font-bold text-sm mb-1 block">
              削除用パスワード（任意）
            </Label>
            <Input
              id="delete-password"
              type="password"
              value={deletePassword}
              onChange={(event) => setDeletePassword(event.target.value)}
              placeholder="アルファベット、数字など"
              className="mt-1 !rounded-2xl !bg-slate-50 !border-2 !border-slate-200 text-black font-medium placeholder:text-slate-400 focus:!bg-white focus:!border-emerald-500 transition-all h-11"
            />
            <p className="mt-1 text-xs text-slate-500">
              ※パスワードを設定しておくと、別の端末やブラウザからでも削除できるようになります。<br />
              ※削除用パスワードは、半角英数字で設定してください。忘れないようにご注意ください。
            </p>
          </div>

          <div className="mb-5">
            <Label className="mb-2 block !text-slate-900 !font-bold text-sm">
              タグを選択（任意）
            </Label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all shadow-xs border-b-2 ${
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
            <Label htmlFor="item-body" className="!text-slate-900 !font-bold text-sm mb-1 block">
              本文
            </Label>
            <Textarea
              id="item-body"
              value={body}
              onChange={(event) =>
                setBody(event.target.value.slice(0, MAX_LENGTH))
              }
              placeholder="この曲 / MC で見えたこと、感じたこと…"
              className="mt-1 min-h-28 !rounded-2xl !bg-slate-50 !border-2 !border-slate-200 text-black font-medium placeholder:text-slate-400 focus:!bg-white focus:!border-emerald-500 transition-all"
            />
          </div>

          <div className="mb-5 flex items-center justify-between text-xs">
            <span
              className={
                body.length >= MAX_LENGTH ? "text-amber-600 font-bold" : "text-slate-500 font-bold"
              }
            >
              {body.length} / {MAX_LENGTH}
            </span>
          </div>

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