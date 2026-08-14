import type { Show, TimelineItem, Tour } from "@/types/app";

export const tour: Tour = {
  id: "naniwa-2026",
  artistId: "naniwa",
  name: "なにわ男子 LIVE TOUR 2026「ND⁵」",
  year: 2026,
};

export const shows: Show[] = [
  // 北海道
  { id: "naniwa-hokkaido-0711-1330", tourId: "naniwa-2026", venue: "北海きたえーる", date: "2026-07-11", time: "13:30", label: "7/11 北海道立総合体育センター（北海きたえーる） 13:30公演" },
  { id: "naniwa-hokkaido-0711-1800", tourId: "naniwa-2026", venue: "北海きたえーる", date: "2026-07-11", time: "18:00", label: "7/11 北海道立総合体育センター（北海きたえーる） 18:00公演" },
  { id: "naniwa-hokkaido-0712-1400", tourId: "naniwa-2026", venue: "北海きたえーる", date: "2026-07-12", time: "14:00", label: "7/12 北海道立総合体育センター（北海きたえーる） 14:00公演" },

  // 福岡県
  { id: "naniwa-fukuoka-0718-1330", tourId: "naniwa-2026", venue: "マリンメッセ福岡A館", date: "2026-07-18", time: "13:30", label: "7/18 マリンメッセ福岡A館 13:30公演" },
  { id: "naniwa-fukuoka-0718-1800", tourId: "naniwa-2026", venue: "マリンメッセ福岡A館", date: "2026-07-18", time: "18:00", label: "7/18 マリンメッセ福岡A館 18:00公演" },
  { id: "naniwa-fukuoka-0719-1300", tourId: "naniwa-2026", venue: "マリンメッセ福岡A館", date: "2026-07-19", time: "13:00", label: "7/19 マリンメッセ福岡A館 13:00公演" },
  { id: "naniwa-fukuoka-0719-1730", tourId: "naniwa-2026", venue: "マリンメッセ福岡A館", date: "2026-07-19", time: "17:30", label: "7/19 マリンメッセ福岡A館 17:30公演" },

  // 大阪府（7月）
  { id: "naniwa-osaka-0728-1800", tourId: "naniwa-2026", venue: "大阪城ホール", date: "2026-07-28", time: "18:00", label: "7/28 大阪城ホール 18:00公演" },
  { id: "naniwa-osaka-0729-1330", tourId: "naniwa-2026", venue: "大阪城ホール", date: "2026-07-29", time: "13:30", label: "7/29 大阪城ホール 13:30公演" },
  { id: "naniwa-osaka-0729-1800", tourId: "naniwa-2026", venue: "大阪城ホール", date: "2026-07-29", time: "18:00", label: "7/29 大阪城ホール 18:00公演" },

  // 神奈川県
  { id: "naniwa-yokohama-0805-1300", tourId: "naniwa-2026", venue: "横浜アリーナ", date: "2026-08-05", time: "13:00", label: "8/5 横浜アリーナ 13:00公演" },
  { id: "naniwa-yokohama-0805-1800", tourId: "naniwa-2026", venue: "横浜アリーナ", date: "2026-08-05", time: "18:00", label: "8/5 横浜アリーナ 18:00公演" },
  { id: "naniwa-yokohama-0806-1300", tourId: "naniwa-2026", venue: "横浜アリーナ", date: "2026-08-06", time: "13:00", label: "8/6 横浜アリーナ 13:00公演" },
  { id: "naniwa-yokohama-0806-1800", tourId: "naniwa-2026", venue: "横浜アリーナ", date: "2026-08-06", time: "18:00", label: "8/6 横浜アリーナ 18:00公演" },
  { id: "naniwa-yokohama-0807-1300", tourId: "naniwa-2026", venue: "横浜アリーナ", date: "2026-08-07", time: "13:00", label: "8/7 横浜アリーナ 13:00公演" },
  { id: "naniwa-yokohama-0807-1800", tourId: "naniwa-2026", venue: "横浜アリーナ", date: "2026-08-07", time: "18:00", label: "8/7 横浜アリーナ 18:00公演" },

  // 宮城県
  { id: "naniwa-miyagi-0815-1330", tourId: "naniwa-2026", venue: "セキスイハイムスーパーアリーナ", date: "2026-08-15", time: "13:30", label: "8/15 セキスイハイムスーパーアリーナ 13:30公演" },
  { id: "naniwa-miyagi-0815-1800", tourId: "naniwa-2026", venue: "セキスイハイムスーパーアリーナ", date: "2026-08-15", time: "18:00", label: "8/15 セキスイハイムスーパーアリーナ 18:00公演" },
  { id: "naniwa-miyagi-0816-1300", tourId: "naniwa-2026", venue: "セキスイハイムスーパーアリーナ", date: "2026-08-16", time: "13:00", label: "8/16 セキスイハイムスーパーアリーナ 13:00公演" },
  { id: "naniwa-miyagi-0816-1730", tourId: "naniwa-2026", venue: "セキスイハイムスーパーアリーナ", date: "2026-08-16", time: "17:30", label: "8/16 セキスイハイムスーパーアリーナ 17:30公演" },

  // 大阪府（8月）
  { id: "naniwa-osaka-0825-1800", tourId: "naniwa-2026", venue: "大阪城ホール", date: "2026-08-25", time: "18:00", label: "8/25 大阪城ホール 18:00公演" },
  { id: "naniwa-osaka-0826-1330", tourId: "naniwa-2026", venue: "大阪城ホール", date: "2026-08-26", time: "13:30", label: "8/26 大阪城ホール 13:30公演" },
  { id: "naniwa-osaka-0826-1800", tourId: "naniwa-2026", venue: "大阪城ホール", date: "2026-08-26", time: "18:00", label: "8/26 大阪城ホール 18:00公演" },

  // 新潟県
  { id: "naniwa-niigata-0905-1330", tourId: "naniwa-2026", venue: "朱鷺メッセ", date: "2026-09-05", time: "13:30", label: "9/5 朱鷺メッセ 新潟コンベンションセンター 13:30公演" },
  { id: "naniwa-niigata-0905-1800", tourId: "naniwa-2026", venue: "朱鷺メッセ", date: "2026-09-05", time: "18:00", label: "9/5 朱鷺メッセ 新潟コンベンションセンター 18:00公演" },
  { id: "naniwa-niigata-0906-1300", tourId: "naniwa-2026", venue: "朱鷺メッセ", date: "2026-09-06", time: "13:00", label: "9/6 朱鷺メッセ 新潟コンベンションセンター 13:00公演" },
  { id: "naniwa-niigata-0906-1730", tourId: "naniwa-2026", venue: "朱鷺メッセ", date: "2026-09-06", time: "17:30", label: "9/6 朱鷺メッセ 新潟コンベンションセンター 17:30公演" },

  // 香川県
  { id: "naniwa-kagawa-0919-1330", tourId: "naniwa-2026", venue: "あなぶきアリーナ香川", date: "2026-09-19", time: "13:30", label: "9/19 あなぶきアリーナ香川 13:30公演" },
  { id: "naniwa-kagawa-0919-1800", tourId: "naniwa-2026", venue: "あなぶきアリーナ香川", date: "2026-09-19", time: "18:00", label: "9/19 あなぶきアリーナ香川 18:00公演" },
  { id: "naniwa-kagawa-0920-1300", tourId: "naniwa-2026", venue: "あなぶきアリーナ香川", date: "2026-09-20", time: "13:00", label: "9/20 あなぶきアリーナ香川 13:00公演" },
  { id: "naniwa-kagawa-0920-1730", tourId: "naniwa-2026", venue: "あなぶきアリーナ香川", date: "2026-09-20", time: "17:30", label: "9/20 あなぶきアリーナ香川 17:30公演" },
  { id: "naniwa-kagawa-0921-1400", tourId: "naniwa-2026", venue: "あなぶきアリーナ香川", date: "2026-09-21", time: "14:00", label: "9/21 あなぶきアリーナ香川 14:00公演" },

  // 静岡県
  { id: "naniwa-shizuoka-1010-1330", tourId: "naniwa-2026", venue: "エコパアリーナ", date: "2026-10-10", time: "13:30", label: "10/10 エコパアリーナ 13:30公演" },
  { id: "naniwa-shizuoka-1010-1800", tourId: "naniwa-2026", venue: "エコパアリーナ", date: "2026-10-10", time: "18:00", label: "10/10 エコパアリーナ 18:00公演" },
  { id: "naniwa-shizuoka-1011-1300", tourId: "naniwa-2026", venue: "エコパアリーナ", date: "2026-10-11", time: "13:00", label: "10/11 エコパアリーナ 13:00公演" },
  { id: "naniwa-shizuoka-1011-1730", tourId: "naniwa-2026", venue: "エコパアリーナ", date: "2026-10-11", time: "17:30", label: "10/11 エコパアリーナ 17:30公演" },
  { id: "naniwa-shizuoka-1012-1400", tourId: "naniwa-2026", venue: "エコパアリーナ", date: "2026-10-12", time: "14:00", label: "10/12 エコパアリーナ 14:00公演" },

  // 千葉県
  { id: "naniwa-chiba-1024-1300", tourId: "naniwa-2026", venue: "ららアリーナ 東京ベイ", date: "2026-10-24", time: "13:00", label: "10/24 ららアリーナ 東京ベイ 13:00公演" },
  { id: "naniwa-chiba-1024-1800", tourId: "naniwa-2026", venue: "ららアリーナ 東京ベイ", date: "2026-10-24", time: "18:00", label: "10/24 ららアリーナ 東京ベイ 18:00公演" },
  { id: "naniwa-chiba-1025-1230", tourId: "naniwa-2026", venue: "ららアリーナ 東京ベイ", date: "2026-10-25", time: "12:30", label: "10/25 ららアリーナ 東京ベイ 12:30公演" },
  { id: "naniwa-chiba-1025-1730", tourId: "naniwa-2026", venue: "ららアリーナ 東京ベイ", date: "2026-10-25", time: "17:30", label: "10/25 ららアリーナ 東京ベイ 17:30公演" },
  { id: "naniwa-chiba-1026-1800", tourId: "naniwa-2026", venue: "ららアリーナ 東京ベイ", date: "2026-10-26", time: "18:00", label: "10/26 ららアリーナ 東京ベイ 18:00公演" },
  { id: "naniwa-chiba-1027-1300", tourId: "naniwa-2026", venue: "ららアリーナ 東京ベイ", date: "2026-10-27", time: "13:00", label: "10/27 ららアリーナ 東京ベイ 13:00公演" },
  { id: "naniwa-chiba-1027-1800", tourId: "naniwa-2026", venue: "ららアリーナ 東京ベイ", date: "2026-10-27", time: "18:00", label: "10/27 ららアリーナ 東京ベイ 18:00公演" },
  { id: "naniwa-chiba-1028-1500", tourId: "naniwa-2026", venue: "ららアリーナ 東京ベイ", date: "2026-10-28", time: "15:00", label: "10/28 ららアリーナ 東京ベイ 15:00公演" },
];

const naniwaBaseSetlist: Array<{ type: TimelineItem["type"]; title: string }> = [
  { type: "other", title: "Overture" },
  { type: "song", title: "Celebrate" },
  { type: "song", title: "ND Time" },
  { type: "song", title: "Viva Viva Carnival!!" },
  { type: "song", title: "初心LOVE" },
  { type: "mc", title: "挨拶" },
  { type: "song", title: "Black Nightmare" },
  { type: "song", title: "ARCHIVE（メドレー）：Circus Night" },
  { type: "song", title: "ARCHIVE（メドレー）：LAI-LA-LA" },
  { type: "song", title: "ARCHIVE（メドレー）：2 Faced" },
  { type: "song", title: "ARCHIVE（メドレー）：Live in the moment" },
  { type: "song", title: "ARCHIVE（メドレー）：F.L.E.X" },
  { type: "song", title: "ARCHIVE（メドレー）：Shall we...?" },
  { type: "song", title: "Better run" },
  { type: "other", title: "映像" },
  { type: "song", title: "ビーマイベイベー" },
  { type: "song", title: "Gimme The Day" },
  { type: "song", title: "ズッキュン・ザ・ムービー" },
  { type: "song", title: "ドン！ドン！やったるで！" },
  { type: "song", title: "HARD WORK" },
  { type: "mc", title: "MC" },
  { type: "other", title: "映像" },
  { type: "song", title: "Little Magic" },
  { type: "song", title: "僕がカワイくて君がカワイくて" },
  { type: "song", title: "勇気100%" },
  { type: "song", title: "Doki it" },
  { type: "song", title: "Because I just love you" },
  { type: "song", title: "Message" },
  { type: "song", title: "いつも" },
  { type: "song", title: "夜空ノムコウ" },
  { type: "song", title: "Wonder" },
  { type: "song", title: "Hide and Seek" },
  { type: "song", title: "アシンメトリー" },
  { type: "song", title: "5周年メドレー：ダイヤモンドスマイル -Anniversary ver-" },
  { type: "song", title: "5周年メドレー：Dreamin' Dreamin'" },
  { type: "song", title: "5周年メドレー：I Wish" },
  { type: "song", title: "5周年メドレー：Make Up Day" },
  { type: "song", title: "5周年メドレー：ハッピーサプライズ" },
  { type: "song", title: "5周年メドレー：Timeless Love" },
  { type: "song", title: "5周年メドレー：サチアレ" },
  { type: "song", title: "Never Romantic" },
  { type: "song", title: "【EC】スキスギ" },
  { type: "song", title: "【EC】なないろ day by day" },
  { type: "song", title: "【EC】初心Letter" },
];

export const timelineItems: TimelineItem[] = shows.flatMap((show) =>
  naniwaBaseSetlist.map((item, index) => ({
    id: `${show.id}-${index + 1}`,
    showId: show.id,
    order: index + 1,
    type: item.type,
    title: item.title,
  }))
);