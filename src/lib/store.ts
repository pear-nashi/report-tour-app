import {
  artists,
  mockBoardPosts,
  mockItemPosts,
  shows,
  timelineItems,
  tours,
} from "@/data/mock-data";
import type {
  Artist,
  BoardPost,
  BoardPostInput,
  BoardTagType,
  ItemPost,
  ItemPostInput,
  Show,
  TagType,
  TimelineItem,
  Tour,
} from "@/types/app";

const BOARD_STORAGE_KEY = "observation-board-posts";
const ITEM_STORAGE_KEY = "observation-item-posts";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const raw = localStorage.getItem(key);
  if (!raw) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getArtists(): Artist[] {
  return artists;
}

export function getArtistById(id: string): Artist | undefined {
  return artists.find((artist) => artist.id === id);
}

export function getToursByArtistId(artistId: string): Tour[] {
  return tours.filter((tour) => tour.artistId === artistId);
}

export function getTourById(id: string): Tour | undefined {
  return tours.find((tour) => tour.id === id);
}

export function getShowsByTourId(tourId: string): Show[] {
  return shows.filter((show) => show.tourId === tourId);
}

export function getShowById(id: string): Show | undefined {
  return shows.find((show) => show.id === id);
}

export function getTimelineByShowId(showId: string): TimelineItem[] {
  return timelineItems
    .filter((item) => item.showId === showId)
    .sort((a, b) => a.order - b.order);
}

export function getTimelineItemById(id: string): TimelineItem | undefined {
  return timelineItems.find((item) => item.id === id);
}

function getAllBoardPosts(): BoardPost[] {
  const stored = readJson<BoardPost[]>(BOARD_STORAGE_KEY, []);
  const mockIds = new Set(mockBoardPosts.map((post) => post.id));
  const userPosts = stored.filter((post) => !mockIds.has(post.id));
  return [...userPosts, ...mockBoardPosts];
}

function getAllItemPosts(): ItemPost[] {
  const stored = readJson<ItemPost[]>(ITEM_STORAGE_KEY, []);
  const mockIds = new Set(mockItemPosts.map((post) => post.id));
  const userPosts = stored.filter((post) => !mockIds.has(post.id));
  return [...userPosts, ...mockItemPosts];
}

export function getBoardPostsByTourId(tourId: string): BoardPost[] {
  return getAllBoardPosts()
    .filter((post) => post.tourId === tourId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function getBoardPostsByTag(tag: BoardTagType): BoardPost[] {
  return getAllBoardPosts()
    .filter((post) => post.tags && post.tags.includes(tag))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function getItemPostsByItemId(itemId: string): ItemPost[] {
  return getAllItemPosts()
    .filter((post) => post.itemId === itemId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function getItemPostsByTag(tag: TagType): ItemPost[] {
  return getAllItemPosts()
    .filter((post) => post.tags && post.tags.includes(tag))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function getItemPostCount(itemId: string): number {
  const item = getTimelineItemById(itemId);
  const actual = getAllItemPosts().filter((post) => post.itemId === itemId).length;
  return Math.max(actual, item?.seedCommentCount ?? 0);
}

export function createBoardPost(input: BoardPostInput): BoardPost {
  const post: BoardPost = {
    id: crypto.randomUUID(),
    tourId: input.tourId,
    venue: input.venue?.trim() || undefined,
    authorName: input.authorName.trim() || "匿名",
    body: input.body.trim(),
    tags: input.tags || [],
    createdAt: new Date().toISOString(),
  };

  const stored = readJson<BoardPost[]>(BOARD_STORAGE_KEY, []);
  writeJson(BOARD_STORAGE_KEY, [post, ...stored]);
  return post;
}

export function createItemPost(input: ItemPostInput): ItemPost {
  const post: ItemPost = {
    id: crypto.randomUUID(),
    itemId: input.itemId,
    authorName: input.authorName.trim() || "匿名",
    body: input.body.trim(),
    tags: input.tags || [],
    createdAt: new Date().toISOString(),
  };

  const stored = readJson<ItemPost[]>(ITEM_STORAGE_KEY, []);
  writeJson(ITEM_STORAGE_KEY, [post, ...stored]);
  return post;
}

// 掲示板投稿の削除関数
export function deleteBoardPost(postId: string): void {
  const stored = readJson<BoardPost[]>(BOARD_STORAGE_KEY, []);
  const updated = stored.filter((post) => post.id !== postId);
  writeJson(BOARD_STORAGE_KEY, updated);
}

// タイムラインコメントの削除関数
export function deleteItemPost(postId: string): void {
  const stored = readJson<ItemPost[]>(ITEM_STORAGE_KEY, []);
  const updated = stored.filter((post) => post.id !== postId);
  writeJson(ITEM_STORAGE_KEY, updated);
}