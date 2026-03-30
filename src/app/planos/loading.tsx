export default function PlanosLoading() {
  return (
    <main className="px-4 pb-16 pt-20 sm:px-6 sm:pt-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header skeleton */}
        <div className="mb-8 space-y-2">
          <div className="h-3 w-20 rounded animate-shimmer bg-gradient-to-r from-black/5 via-black/10 to-black/5" />
          <div className="h-10 w-48 rounded-lg animate-shimmer bg-gradient-to-r from-black/5 via-black/10 to-black/5" />
          <div className="h-4 w-64 rounded animate-shimmer bg-gradient-to-r from-black/5 via-black/10 to-black/5" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-xl bg-black/5">
              <div className="aspect-[4/3] w-full animate-shimmer bg-gradient-to-r from-black/5 via-black/10 to-black/5" />
              <div className="space-y-2 p-3">
                <div className="h-4 w-3/4 rounded animate-shimmer bg-gradient-to-r from-black/5 via-black/10 to-black/5" />
                <div className="h-3 w-full rounded animate-shimmer bg-gradient-to-r from-black/5 via-black/10 to-black/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
