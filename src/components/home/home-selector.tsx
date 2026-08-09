"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PageIntro, SelectionCard, StepLabel } from "@/components/ui/page-shell";
import { getArtists, getToursByArtistId } from "@/lib/store";

export function HomeSelector() {
  const router = useRouter();
  const artists = useMemo(() => getArtists(), []);
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);

  const tours = selectedArtistId ? getToursByArtistId(selectedArtistId) : [];

  return (
    <div>
      <PageIntro
        title="みんなのライブレポまとめ"
        description="テキストだけのライブレポのまとめサイト。あの瞬間の空気感や演出、現場の抱えきれない感情を残していきましょう。"
      />

      <section className="mb-10">
        <StepLabel step={1} label="グループを選択" active />
        <div className="grid gap-3 sm:grid-cols-3">
          {artists.map((artist) => (
            <SelectionCard
              key={artist.id}
              title={artist.name}
              selected={selectedArtistId === artist.id}
              onClick={() => setSelectedArtistId(artist.id)}
            />
          ))}
        </div>
      </section>

      <section>
        <StepLabel
          step={2}
          label="ツアーを選択"
          active={Boolean(selectedArtistId)}
        />
        {!selectedArtistId ? (
          <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-zinc-500">
            先にアーティストを選択してください
          </p>
        ) : (
          <div className="grid gap-3">
            {tours.map((tour) => (
              <SelectionCard
                key={tour.id}
                title={tour.name}
                subtitle={tour.subtitle}
                onClick={() => router.push(`/tours/${tour.id}`)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
