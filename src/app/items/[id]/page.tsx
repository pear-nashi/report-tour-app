import { ItemPostsClient } from "@/components/items/item-posts-client";

type ItemPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <ItemPostsClient itemId={id} />
    </div>
  );
}
