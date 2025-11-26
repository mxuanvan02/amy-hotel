import type { Branch } from "@/types/schema";
import { BranchCard } from "@/components/modules/BranchCard";

type FeaturedGridProps = {
  locations: Branch[];
  assetsBase: string;
  showSkeleton?: boolean;
};

const skeletonCards = Array.from({ length: 3 });

export function FeaturedGrid({ locations, assetsBase, showSkeleton = false }: FeaturedGridProps) {
  const hasData = locations.length > 0;

  if (!hasData && showSkeleton) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skeletonCards.map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-xl shadow-black/5"
          >
            <div className="h-64 w-full bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-24 rounded-full bg-[var(--color-primary)]/15" />
              <div className="h-6 w-3/4 rounded-full bg-[var(--color-primary)]/20" />
              <div className="h-4 w-full rounded-full bg-[var(--color-primary)]/10" />
              <div className="h-11 w-full rounded-xl bg-[var(--color-primary)]/20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!hasData) {
    return (
      <p className="rounded-2xl border border-dashed border-[var(--color-secondary)]/60 bg-white/60 p-6 text-center text-[var(--color-primary)]">
        Chưa có dữ liệu. Hãy vào Admin Directus để thêm một vài địa điểm.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {locations.map((item) => (
        <BranchCard key={item.id} branch={item} assetsBase={assetsBase} />
      ))}
    </div>
  );
}
