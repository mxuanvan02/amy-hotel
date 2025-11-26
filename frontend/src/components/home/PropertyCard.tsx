import Image from "next/image";
import Link from "next/link";
import type { Branch } from "@/types/schema";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type PropertyCardProps = {
  location: Branch;
  assetsBase: string;
};

const fallbackImage =
  "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80";

export function PropertyCard({ location, assetsBase }: PropertyCardProps) {
  const coverId =
    location.images && location.images[0]
      ? typeof location.images[0] === "string"
        ? location.images[0]
        : typeof location.images[0].directus_files_id === "object"
        ? location.images[0].directus_files_id.id
        : location.images[0].directus_files_id
      : null;

  const cover = coverId ? `${assetsBase}/${coverId}` : fallbackImage;
  const nightlyPrice = formatCurrency(
    (location as { min_price?: number }).min_price ?? 1200000
  );

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/70 bg-white shadow-xl shadow-black/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={cover}
          alt={location.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-110"
          priority
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)] shadow">
          Luxury stay
        </span>
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <h3 className="heading-font text-2xl font-semibold text-[var(--color-primary)]">
            {location.name}
          </h3>
          <span className="heading-font text-xl font-semibold text-[var(--color-secondary)]">
            {nightlyPrice}
          </span>
        </div>
        <p className="text-sm text-[var(--color-muted)] line-clamp-1">
          {location.address || "Địa chỉ đang cập nhật"}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
            / đêm
          </p>
          <Link href={`/branch/${location.slug}`}>
            <Button
              variant="primary"
              size="sm"
              className="w-full text-xs font-semibold uppercase tracking-[0.08em]"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
