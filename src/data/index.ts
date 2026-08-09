import type { Artist, BoardPost, ItemPost, Show, TimelineItem, Tour } from "@/types/app";

// エリアスをつけて明示的にインポート
import { shows as arashiShows, timelineItems as arashiTimelineItems, tour as arashiTour } from "./mock/arashi-2026";
// import { shows as mgaShows, timelineItems as mgaTimelineItems, tour as mgaTour } from "./mock/mga-2026"; // ← ミセスを一時コメントアウト
import { shows as naniwaShows, timelineItems as naniwaTimelineItems, tour as naniwaTour } from "./mock/naniwa-2026";

export const artists: Artist[] = [
  { id: "arashi", name: "嵐" },
  // { id: "mga", name: "Mrs. GREEN APPLE" }, // ← ここをコメントアウト
  { id: "naniwa", name: "なにわ男子" },
];

// それぞれのデータを結合
export const tours: Tour[] = [
  naniwaTour,
  arashiTour,
  // mgaTour, // ← ここをコメントアウト
].filter(Boolean);

export const shows: Show[] = [
  ...naniwaShows,
  ...arashiShows,
  // ...mgaShows, // ← ここをコメントアウト
];

export const timelineItems: TimelineItem[] = [
  ...naniwaTimelineItems,
  ...arashiTimelineItems,
  // ...mgaTimelineItems, // ← ここをコメントアウト
];

export const mockBoardPosts: BoardPost[] = [];
export const mockItemPosts: ItemPost[] = [];

// 後方互換・別名エクスポート
export const allTours = tours;
export const allShows = shows;
export const allTimelineItems = timelineItems;
