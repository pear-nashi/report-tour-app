import { SearchReport } from "@/components/tours/search-report";
import { BackLink } from "@/components/ui/text-post-card";
import { 
  getTourById, 
  getBoardPostsByTourId, 
  getItemPostsByTourId,
  getTimelineItemById,
  getShowById 
} from "@/lib/store";

type TourSearchPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TourSearchPage({ params }: TourSearchPageProps) {
  const { id } = await params;
  const tour = getTourById(id);
  
  // 1. 掲示板とタイムラインの投稿を両方取得
  const boardPosts = await getBoardPostsByTourId(id);
  const itemPosts = await getItemPostsByTourId(id);

  // 2. それぞれの投稿に、表示用の付加情報や種類（type）を紐づける
  const formattedBoardPosts = boardPosts.map((post) => ({
    id: post.id,
    body: post.body,
    authorName: post.authorName,
    venue: post.venue || "会場共通",
    date: undefined, 
    title: "会場レポ・構成",
    type: "board" as const, // 掲示板レポ用の目印
  }));

  const formattedItemPosts = itemPosts.map((post) => {
    const item = getTimelineItemById(post.itemId);
    const show = item ? getShowById(item.showId) : undefined;
    return {
      id: post.id,
      body: post.body,
      authorName: post.authorName,
      venue: show ? show.venue : "不明な会場",
      date: show ? `${show.date} (${show.time})` : undefined,
      title: item ? item.title : "セットリスト・MC",
      type: "item" as const, // セトリ・MC項目用の目印
    };
  });

  const allPosts = [...formattedBoardPosts, ...formattedItemPosts];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <BackLink href={`/tours/${id}`} label={`${tour?.name ?? "ツアー"}へ戻る`} />
      
      <div className="mb-6">
        <h1 className="text-xl font-black text-slate-900 sm:text-2xl tracking-wide">キーワード検索</h1>
        <p className="mt-2 text-sm text-slate-600 font-bold">
          ツアー内の全投稿から、キーワードで絞り込みます。
        </p>
        <p className="mt-1 text-xs text-slate-400 font-medium">
          💡 メンバー名で検索したいときは、苗字で検索するとあだ名での投稿もいい感じで検索対象に含まれます。<br />
          　※特殊なあだ名を利用した投稿は検索対象に含まれません。手動設定なのでね。<br />
          　※コンビ名は完全一致しか拾いません。複数呼び名がある系の場合は何回か試してみてね。
        </p>
      </div>

      {/* 拡張されたデータを渡す */}
      <SearchReport posts={allPosts} />
    </div>
  );
}