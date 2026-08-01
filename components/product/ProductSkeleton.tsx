export default function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border bg-white">

      <div className="aspect-square bg-gray-200" />

      <div className="space-y-3 p-4">

        <div className="h-6 rounded bg-gray-200" />

        <div className="h-5 w-1/2 rounded bg-gray-200" />

        <div className="h-4 w-1/3 rounded bg-gray-200" />

        <div className="mt-6 h-10 rounded-xl bg-gray-200" />

      </div>

    </div>
  );
}