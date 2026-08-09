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
import { createSupabaseClient } from "@/lib/supabase/client";

const supabase = createSupabaseClient();

// --- 静的データ（アーティスト・ツアー・セトリなど）の取得はそのまま ---
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

// --- 以下、Supabaseからデータを取得・保存する非同期処理 ---

// 掲示板の投稿を全取得（Supabase + モック）
export async function getAllBoardPosts(): Promise<BoardPost[]> {
  const { data, error } = await supabase
    .from("board_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching board posts:", error.message);
    return mockBoardPosts;
  }

  const dbPosts: BoardPost[] = (data || []).map((row) => ({
    id: row.id,
    tourId: row.tour_id,
    venue: row.venue || undefined,
    authorName: row.author_name,
    body: row.body,
    tags: row.tags || [],
    createdAt: row.created_at,
  }));

  const mockIds = new Set(mockBoardPosts.map((post) => post.id));
  const userPosts = dbPosts.filter((post) => !mockIds.has(post.id));
  return [...userPosts, ...mockBoardPosts];
}

// タイムラインコメントを全取得（Supabase + モック）
export async function getAllItemPosts(): Promise<ItemPost[]> {
  const { data, error } = await supabase
    .from("item_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching item posts:", error.message);
    return mockItemPosts;
  }

  const dbPosts: ItemPost[] = (data || []).map((row) => ({
    id: row.id,
    itemId: row.item_id,
    authorName: row.author_name,
    body: row.body,
    tags: row.tags || [],
    createdAt: row.created_at,
  }));

  const mockIds = new Set(mockItemPosts.map((post) => post.id));
  const userPosts = dbPosts.filter((post) => !mockIds.has(post.id));
  return [...userPosts, ...mockItemPosts];
}

export async function getBoardPostsByTourId(tourId: string): Promise<BoardPost[]> {
  const posts = await getAllBoardPosts();
  return posts.filter((post) => post.tourId === tourId);
}

export async function getBoardPostsByTag(tag: BoardTagType): Promise<BoardPost[]> {
  const posts = await getAllBoardPosts();
  return posts.filter((post) => post.tags && post.tags.includes(tag));
}

export async function getItemPostsByItemId(itemId: string): Promise<ItemPost[]> {
  const posts = await getAllItemPosts();
  return posts.filter((post) => post.itemId === itemId);
}

export async function getItemPostsByTag(tag: TagType): Promise<ItemPost[]> {
  const posts = await getAllItemPosts();
  return posts.filter((post) => post.tags && post.tags.includes(tag));
}

export async function getItemPostCount(itemId: string): Promise<number> {
  const item = getTimelineItemById(itemId);
  const posts = await getItemPostsByItemId(itemId);
  const actual = posts.length;
  return Math.max(actual, item?.seedCommentCount ?? 0);
}

// 掲示板への新規投稿（Supabaseへ保存）
export async function createBoardPost(input: BoardPostInput): Promise<BoardPost> {
  const newPostData = {
    tour_id: input.tourId,
    venue: input.venue?.trim() || null,
    author_name: input.authorName.trim() || "匿名",
    body: input.body.trim(),
    tags: input.tags || [],
  };

  const { data, error } = await supabase
    .from("board_posts")
    .insert([newPostData])
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Failed to create board post: ${error?.message}`);
  }

  return {
    id: data.id,
    tourId: data.tour_id,
    venue: data.venue || undefined,
    authorName: data.author_name,
    body: data.body,
    tags: data.tags || [],
    createdAt: data.created_at,
  };
}

// タイムラインコメントへの新規投稿（Supabaseへ保存）
export async function createItemPost(input: ItemPostInput): Promise<ItemPost> {
  const newPostData = {
    item_id: input.itemId,
    author_name: input.authorName.trim() || "匿名",
    body: input.body.trim(),
    tags: input.tags || [],
  };

  const { data, error } = await supabase
    .from("item_posts")
    .insert([newPostData])
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Failed to create item post: ${error?.message}`);
  }

  return {
    id: data.id,
    itemId: data.item_id,
    authorName: data.author_name,
    body: data.body,
    tags: data.tags || [],
    createdAt: data.created_at,
  };
}

// 掲示板投稿の削除
export async function deleteBoardPost(postId: string): Promise<void> {
  const { error } = await supabase
    .from("board_posts")
    .delete()
    .eq("id", postId);

  if (error) {
    console.error("Error deleting board post:", error.message);
  }
}

// タイムラインコメントの削除
export async function deleteItemPost(postId: string): Promise<void> {
  const { error } = await supabase
    .from("item_posts")
    .delete()
    .eq("id", postId);

  if (error) {
    console.error("Error deleting item post:", error.message);
  }
}