import { TagPostsClient } from "@/components/tours/tag-posts-client";

type TagPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TourTagPage({ params }: TagPageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <TagPostsClient tourId={id} />
    </div>
  );
}