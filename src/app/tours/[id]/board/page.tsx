import { SpoilerFreeBoard } from "@/components/tours/spoiler-free-board";

type TourBoardPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TourBoardPage({ params }: TourBoardPageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <SpoilerFreeBoard tourId={id} />
    </div>
  );
}
