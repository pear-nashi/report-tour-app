import type { Show, TimelineItem, Tour } from "@/types/app";

export const tour: Tour = {
  id: "arashi-2026",
  artistId: "arashi",
  name: "ARASHI LIVE TOUR 2026 「We are ARASHI」",
  subtitle: "全15公演",
};

export const shows: Show[] = [
  // [北海道] 大和ハウス プレミストドーム（札幌ドーム）
  {
    id: "arashi-sapporo-0313-1800",
    tourId: "arashi-2026",
    label: "3/13 大和ハウス プレミストドーム 18:00公演",
    date: "2026-03-13",
    venue: "大和ハウス プレミストドーム",
    time: "18:00",
  },
  {
    id: "arashi-sapporo-0314-1800",
    tourId: "arashi-2026",
    label: "3/14 大和ハウス プレミストドーム 18:00公演",
    date: "2026-03-14",
    venue: "大和ハウス プレミストドーム",
    time: "18:00",
  },
  {
    id: "arashi-sapporo-0315-1600",
    tourId: "arashi-2026",
    label: "3/15 大和ハウス プレミストドーム 16:00公演",
    date: "2026-03-15",
    venue: "大和ハウス プレミストドーム",
    time: "16:00",
  },

  // [東京都] 東京ドーム
  {
    id: "arashi-tokyo-0401-1800",
    tourId: "arashi-2026",
    label: "4/1 東京ドーム 18:00公演",
    date: "2026-04-01",
    venue: "東京ドーム",
    time: "18:00",
  },
  {
    id: "arashi-tokyo-0402-1800",
    tourId: "arashi-2026",
    label: "4/2 東京ドーム 18:00公演",
    date: "2026-04-02",
    venue: "東京ドーム",
    time: "18:00",
  },

  // [愛知県] バンテリンドーム ナゴヤ
  {
    id: "arashi-nagoya-0406-1800",
    tourId: "arashi-2026",
    label: "4/6 バンテリンドーム ナゴヤ 18:00公演",
    date: "2026-04-06",
    venue: "バンテリンドーム ナゴヤ",
    time: "18:00",
  },
  {
    id: "arashi-nagoya-0407-1800",
    tourId: "arashi-2026",
    label: "4/7 バンテリンドーム ナゴヤ 18:00公演",
    date: "2026-04-07",
    venue: "バンテリンドーム ナゴヤ",
    time: "18:00",
  },
  {
    id: "arashi-nagoya-0408-1800",
    tourId: "arashi-2026",
    label: "4/8 バンテリンドーム ナゴヤ 18:00公演",
    date: "2026-04-08",
    venue: "バンテリンドーム ナゴヤ",
    time: "18:00",
  },

  // [福岡県] みずほPayPayドーム福岡
  {
    id: "arashi-fukuoka-0424-1800",
    tourId: "arashi-2026",
    label: "4/24 みずほPayPayドーム福岡 18:00公演",
    date: "2026-04-24",
    venue: "みずほPayPayドーム福岡",
    time: "18:00",
  },
  {
    id: "arashi-fukuoka-0425-1800",
    tourId: "arashi-2026",
    label: "4/25 みずほPayPayドーム福岡 18:00公演",
    date: "2026-04-25",
    venue: "みずほPayPayドーム福岡",
    time: "18:00",
  },
  {
    id: "arashi-fukuoka-0426-1600",
    tourId: "arashi-2026",
    label: "4/26 みずほPayPayドーム福岡 16:00公演",
    date: "2026-04-26",
    venue: "みずほPayPayドーム福岡",
    time: "16:00",
  },

  // [大阪府] 京セラドーム大阪
  {
    id: "arashi-osaka-0515-1800",
    tourId: "arashi-2026",
    label: "5/15 京セラドーム大阪 18:00公演",
    date: "2026-05-15",
    venue: "京セラドーム大阪",
    time: "18:00",
  },
  {
    id: "arashi-osaka-0516-1800",
    tourId: "arashi-2026",
    label: "5/16 京セラドーム大阪 18:00公演",
    date: "2026-05-16",
    venue: "京セラドーム大阪",
    time: "18:00",
  },
  {
    id: "arashi-osaka-0517-1600",
    tourId: "arashi-2026",
    label: "5/17 京セラドーム大阪 16:00公演",
    date: "2026-05-17",
    venue: "京セラドーム大阪",
    time: "16:00",
  },

  // [東京都] 東京ドーム
  {
    id: "arashi-tokyo-0531-1800",
    tourId: "arashi-2026",
    label: "5/31 東京ドーム 18:00公演",
    date: "2026-05-31",
    venue: "東京ドーム",
    time: "18:00",
  },
];

const arashiBaseSetlist: Array<{ type: TimelineItem["type"]; title: string }> = [
  { type: "other", title: "Overture" },
  { type: "song", title: "LΦve Rainbow" },
  { type: "song", title: "言葉より大切なもの" },
  { type: "song", title: "Lucky Man" },
  { type: "song", title: "Troublemaker" },
  { type: "mc", title: "挨拶" }, 
  { type: "song", title: "Believe" },
  { type: "other", title: "映像" },
  { type: "song", title: "Whenever You Call" },
  { type: "song", title: "カイト" },
  { type: "song", title: "One Love" },
  { type: "song", title: "Yes?No?" },
  { type: "song", title: "僕が僕のすべて" },
  { type: "other", title: "映像" },
  { type: "song", title: "サヨナラのあとで" },
  { type: "song", title: "つなぐ" },
  { type: "song", title: "P・A・R・A・D・O・X" },
  { type: "song", title: "CARNIVAL NIGHT part2" },
  { type: "song", title: "エナジーソング 〜絶好調超!!!!〜" },
  { type: "mc", title: "MC" },
  { type: "song", title: "スケッチ" },
  { type: "other", title: "映像" },
  { type: "song", title: "Oh Yeah!" },
  { type: "song", title: "ハダシの未来" },
  { type: "song", title: "果てない空" },
  { type: "song", title: "a Day in Our Life" },
  { type: "song", title: "GUTS!" },
  { type: "other", title: "映像" },
  { type: "song", title: "Monster" },
  { type: "song", title: "truth" },
  { type: "song", title: "迷宮ラブソング" },
  { type: "song", title: "ワイルドアットハート" },
  { type: "song", title: "Step and Go" },
  { type: "other", title: "映像" },
  { type: "song", title: "Love so sweet" },
  { type: "song", title: "PIKA★★NCHI DOUBLE" },
  { type: "song", title: "マイガール" },
  { type: "song", title: "A・RA・SHI" },
  { type: "song", title: "感謝カンゲキ雨嵐" },
  { type: "song", title: "Happiness" },
  { type: "mc", title: "最後の挨拶" }, 
  { type: "song", title: "Five" },
];

export const timelineItems: TimelineItem[] = shows.flatMap((show) =>
  arashiBaseSetlist.map((item, index) => ({
    id: `${show.id}-${index + 1}`,
    showId: show.id,
    order: index + 1,
    type: item.type,
    title: item.title,
  }))
);