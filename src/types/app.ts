export type Artist = {
  id: string;
  name: string;
  slug?: string;
};

export type Tour = {
  id: string;
  artistId: string;
  name: string;
  subtitle?: string;
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

export type TimelineItemType = "song" | "mc" | "other" | "overture";

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
  venue?: string;
  authorName: string;
  body: string;
  tags?: BoardTagType[];
  createdAt: string;
  deletePassword?: string; // 修正: 保存された投稿側でもパスワードを持てるように追加
};

export type BoardPostInput = {
  tourId: string;
  showId?: string;
  venue?: string;
  authorName: string;
  body: string;
  tags?: BoardTagType[];
  deletePassword?: string;
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
  deletePassword?: string; // 修正: 保存された投稿側でもパスワードを持てるように追加
};

export type ItemPostInput = {
  itemId: string;
  authorName: string;
  body: string;
  tags?: TagType[];
  deletePassword?: string;
};