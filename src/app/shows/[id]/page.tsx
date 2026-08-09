import { SetlistTimeline } from "@/components/shows/setlist-timeline";

type ShowPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ShowPage({ params }: ShowPageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <SetlistTimeline showId={id} />
    </div>
  );
}