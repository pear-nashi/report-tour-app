import { TourDetailClient } from "@/components/tours/tour-detail-client";

type TourPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TourPage({ params }: TourPageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <TourDetailClient tourId={id} />
    </div>
  );
}
