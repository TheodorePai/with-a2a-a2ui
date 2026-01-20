import { cn } from "@/lib/utils";

interface SkeletonShimmerProps {
  className?: string;
}

export function SkeletonShimmer({ className }: SkeletonShimmerProps) {
  return (
    <div
      className={cn(
        "skeleton-shimmer rounded-lg bg-muted",
        className
      )}
    />
  );
}

export function RestaurantCardSkeleton() {
  return (
    <div className="card-elevated p-4 flex gap-4 animate-pulse">
      <SkeletonShimmer className="w-32 h-24 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <SkeletonShimmer className="h-6 w-3/4" />
        <SkeletonShimmer className="h-4 w-20" />
        <SkeletonShimmer className="h-4 w-full" />
        <SkeletonShimmer className="h-4 w-16" />
        <SkeletonShimmer className="h-9 w-28 rounded-full" />
      </div>
    </div>
  );
}

export function RestaurantListSkeleton() {
  return (
    <div className="space-y-4">
      <SkeletonShimmer className="h-8 w-64 mb-6" />
      {[1, 2, 3].map((i) => (
        <RestaurantCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function RestaurantDetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <SkeletonShimmer className="h-8 w-72" />
      <SkeletonShimmer className="w-full h-64 rounded-2xl" />
      <SkeletonShimmer className="h-5 w-48" />
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <SkeletonShimmer className="h-5 w-20" />
          <SkeletonShimmer className="h-10 flex-1 rounded-lg" />
        </div>
        <div className="flex items-center gap-4">
          <SkeletonShimmer className="h-5 w-20" />
          <SkeletonShimmer className="h-10 flex-1 rounded-lg" />
        </div>
        <div className="flex items-center gap-4">
          <SkeletonShimmer className="h-5 w-28" />
          <SkeletonShimmer className="h-10 flex-1 rounded-lg" />
        </div>
        <SkeletonShimmer className="h-12 w-44 rounded-full mt-4" />
      </div>
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6 animate-pulse">
      <SkeletonShimmer className="w-72 h-48 sm:w-80 sm:h-56 rounded-2xl" />
      <div className="space-y-2 flex flex-col items-center">
        <SkeletonShimmer className="h-8 w-48" />
        <SkeletonShimmer className="h-4 w-56" />
      </div>
      <div className="w-full max-w-md px-4 flex gap-3">
        <SkeletonShimmer className="h-12 flex-1 rounded-full" />
        <SkeletonShimmer className="h-11 w-11 rounded-full" />
      </div>
    </div>
  );
}
