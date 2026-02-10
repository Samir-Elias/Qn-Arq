export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-7 w-40 rounded-lg bg-black/5" />
        <div className="h-9 w-32 rounded-md bg-black/5" />
      </div>

      {/* Card skeletons */}
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl border border-[var(--border)] p-4"
          >
            <div className="space-y-2">
              <div className="h-4 w-48 rounded bg-black/5" />
              <div className="h-3 w-28 rounded bg-black/5" />
            </div>
            <div className="h-4 w-4 rounded bg-black/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
