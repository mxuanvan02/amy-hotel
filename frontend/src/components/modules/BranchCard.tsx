import Image from "next/image";
import Link from "next/link";
import type { Branch } from "@/types/schema";
import { Button } from "@/components/ui/button";

type BranchCardProps = {
  branch: Branch;
  assetsBase: string;
};

const fallbackImage =
  "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80";

export function BranchCard({ branch, assetsBase }: BranchCardProps) {
  const coverId =
    branch.images && Array.isArray(branch.images) && branch.images[0]
      ? typeof branch.images[0] === "string"
        ? branch.images[0]
        : branch.images[0].id
      : null;

  const cover = coverId ? `${assetsBase}/${coverId}` : fallbackImage;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/70 bg-white shadow-xl shadow-black/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={cover}
          alt={branch.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-110"
          priority
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)] shadow">
          {branch.status === "published" ? "Available" : "Coming Soon"}
        </span>
      </div>

      <div className="flex flex-1 flex-col space-y-3 p-5">
        <div className="flex items-center justify-between">
          <h3 className="heading-font text-2xl font-semibold text-[var(--color-primary)]">
            {branch.name}
          </h3>
        </div>

        <p className="text-sm text-[var(--color-muted)] line-clamp-2">
          {branch.address || "Địa chỉ đang cập nhật"}
        </p>

        {branch.description && (
          <p className="text-sm text-[var(--color-muted)] line-clamp-2">
            {branch.description.replace(/<[^>]*>/g, "").substring(0, 100)}...
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="text-xs text-[var(--color-muted)]">{branch.phone}</p>
          <Link href={`/branch/${branch.slug}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
