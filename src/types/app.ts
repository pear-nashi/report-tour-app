export type Artist = {
  id: string;
  name: string;
  slug?: string; // ← 必須（slugがないデータもあるのでオプショナル「?」にしておく）
};

export type Tour = {
  id: string;
  artistId: string;
  name: string;
  subtitle?: string; // ★ここを追加！これでサブタイトルのエラーが消えます
  year?: number;
};

export type Show = {
  id: string;
  tourId: string;
  venue: string;
  date: string;
  time: string;
  label: string;
};

export type TimelineItemType = "song" | "mc" | "other" | "overture"; // ★ "overture" を追加！

export type TimelineItem = {
  id: string;
  showId: string;
  order: number;
  type: TimelineItemType;
  title: string;
  seedCommentCount?: number;
};

// 会場共通掲示板用のタグ定義
export type BoardTagType = "アリーナ構成" | "動線・外周" | "混雑・入場" | "銀テープ・落下物";

export type BoardPost = {
  id: string;
  tourId: string;
  showId?: string;
  venue?: string; // ★ここを追加！これで venue のエラーが消えます
  authorName: string;
  body: string;
  tags?: BoardTagType[];
  createdAt: string;
};

export type BoardPostInput = {
  tourId: string;
  showId?: string;
  venue?: string; // ★ここを追加！
  authorName: string;
  body: string;
  tags?: BoardTagType[];
};

// 選択できるタグの型定義（曲・MCなどの公演メモ用）
export type TagType = "演出全般" | "モニター映像" | "衣装";

export type ItemPost = {
  id: string;
  itemId: string;
  authorName: string;
  body: string;
  tags?: TagType[];
  createdAt: string;
};

export type ItemPostInput = {
  itemId: string;
  authorName: string;
  body: string;
  tags?: TagType[];
};