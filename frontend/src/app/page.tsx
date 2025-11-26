import { HeroSearch } from "@/components/home/HeroSearch";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { BranchService } from "@/services/branch.service";
import type { Branch } from "@/types/schema";

const ASSETS_URL = process.env.NEXT_PUBLIC_ASSETS_URL || "http://localhost:8055/assets";

export default async function HomePage() {
  const branches = await BranchService.getAll();
  const locationOptions = branches.map((branch) => ({
    label: branch.name,
    value: branch.slug || String(branch.id),
  }));

  return (
    <main className="min-h-screen bg-transparent text-[var(--color-primary)]">
      <HeroSearch locations={locationOptions} />

      <section
        id="destinations"
        className="mx-auto max-w-6xl px-5 pb-16 pt-12 text-[var(--color-primary)]"
      >
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
              Featured escapes
            </p>
            <h2 className="heading-font text-3xl font-semibold md:text-4xl">
              Signature stays for every journey
            </h2>
            <p className="text-base text-[var(--color-muted)]">
              Explore properties curated for comfort, design, and exceptional service.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] underline-offset-8 transition hover:text-[var(--color-secondary)]"
          >
            View all destinations
          </a>
        </div>

        <FeaturedGrid
          locations={branches as Branch[]}
          assetsBase={ASSETS_URL}
          showSkeleton={branches.length === 0}
        />
      </section>
    </main>
  );
}
