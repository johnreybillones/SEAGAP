export default function SkeletonCard({ className = "" }) {
  return (
    <div className={`rounded-2xl overflow-hidden bg-card p-4 space-y-3 ${className}`}>
      <div className="shimmer-bg h-32 rounded-xl" />
      <div className="shimmer-bg h-4 rounded-full w-3/4" />
      <div className="shimmer-bg h-3 rounded-full w-1/2" />
      <div className="shimmer-bg h-10 rounded-2xl" />
    </div>
  );
}