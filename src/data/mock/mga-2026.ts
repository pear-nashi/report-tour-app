import type { Show, TimelineItem, Tour } from "@/types/app";

export const tour: Tour = {
  id: "mga-2026",
  artistId: "mga",
  name: "Mrs. GREEN APPLE ARENA TOUR 2026",
  subtitle: "Arena Tour",
};

export const shows: Show[] = [
  {
    id: "mga-tokyo-1010-1800",
    tourId: "mga-2026",
    label: "10/10 有明アリーナ 18:00公演",
    date: "2026-10-10",
    venue: "有明アリーナ",
    time: "18:00",
  },
  {
    id: "mga-tokyo-1011-1600",
    tourId: "mga-2026",
    label: "10/11 有明アリーナ 16:00公演",
    date: "2026-10-11",
    venue: "有明アリーナ",
    time: "16:00",
  },
];

const mgaBaseSetlist: Array<{ type: TimelineItem["type"]; title: string }> = [
  { type: "overture", title: "Overture" },
  { type: "song", title: "ライラック" },
  { type: "song", title: "ダンスホール" },
  { type: "song", title: "青と夏" },
  { type: "song", title: "インフェルノ" },
  { type: "mc", title: "MC" },
  { type: "song", title: "Soranji" },
  { type: "song", title: "ケセラセラ" },
  { type: "song", title: "【EC】Magic" },
];

export const timelineItems: TimelineItem[] = shows.flatMap((show) =>
  mgaBaseSetlist.map((item, index) => ({
    id: `${show.id}-${index + 1}`,
    showId: show.id,
    order: index + 1,
    type: item.type,
    title: item.title,
  }))
);