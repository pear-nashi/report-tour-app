import { TourWordsReport } from "@/components/tours/tour-words-report";

type TourWordsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TourWordsPage({ params }: TourWordsPageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <TourWordsReport tourId={id} />
    </div>
  );
}