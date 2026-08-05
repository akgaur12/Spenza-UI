export function AnalyticsSummarySkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="h-24 animate-pulse rounded-lg bg-accent/60" />
      ))}
    </div>
  )
}
