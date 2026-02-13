export default function HomeLoading() {
  return (
    <main className="px-4 pb-16 sm:px-6 lg:px-12">
      {/* Hero skeleton */}
      <section className="pb-16 pt-16 sm:pt-20 lg:pt-24">
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <div className="mx-auto h-3 w-28 rounded animate-shimmer bg-gradient-to-r from-black/5 via-black/10 to-black/5" />
          <div className="mx-auto h-10 w-3/4 rounded-lg animate-shimmer bg-gradient-to-r from-black/5 via-black/10 to-black/5" />
          <div className="mx-auto h-4 w-2/3 rounded animate-shimmer bg-gradient-to-r from-black/5 via-black/10 to-black/5" />
        </div>

        {/* Featured project skeleton */}
        <div className="mt-10 sm:mt-14">
          <div className="overflow-hidden rounded-3xl animate-shimmer bg-gradient-to-r from-black/5 via-black/10 to-black/5">
            <div className="aspect-[16/9] sm:aspect-[21/9]" />
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="mx-auto mb-12 h-px w-16 bg-[var(--border)]" />

      {/* Grid skeleton */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="h-6 w-44 rounded-lg animate-shimmer bg-gradient-to-r from-black/5 via-black/10 to-black/5" />
          <div className="h-4 w-32 rounded animate-shimmer bg-gradient-to-r from-black/5 via-black/10 to-black/5" />
        </div>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[480px]:gap-3 sm:grid-cols-3 sm:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-black/10 bg-white"
            >
              <div className="aspect-[3/2] w-full animate-shimmer bg-gradient-to-r from-black/5 via-black/10 to-black/5 min-[480px]:aspect-[4/5]" />
              <div className="space-y-2 p-3 min-[480px]:p-4">
                <div className="h-4 w-3/4 rounded animate-shimmer bg-gradient-to-r from-black/5 via-black/10 to-black/5" />
                <div className="h-3 w-full rounded animate-shimmer bg-gradient-to-r from-black/5 via-black/10 to-black/5" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
