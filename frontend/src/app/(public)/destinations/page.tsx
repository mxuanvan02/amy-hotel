import { BranchService } from "@/services/branch.service";
import { DestinationsList } from "@/components/modules/DestinationsList";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import type { Branch } from "@/types/schema";

const ASSETS_URL =
  process.env.NEXT_PUBLIC_ASSETS_URL || "http://localhost:8055/assets";

export const metadata = {
  title: "Destinations | Amy Accommodation",
  description: "Explore our collection of luxury properties across Vietnam.",
};

export default async function DestinationsPage() {
  const branches = await BranchService.getAll();

  return (
    <main className="min-h-screen bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <Breadcrumbs />

        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)] mb-3">
            Discover
          </p>
          <h1 className="heading-font mb-6 text-4xl font-bold text-[var(--color-primary)] md:text-5xl">
            Our Destinations
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[var(--color-muted)]">
            From vibrant city centers to serene coastal retreats, explore our
            handpicked collection of properties designed for your ultimate
            comfort.
          </p>
        </div>

        <DestinationsList
          initialBranches={branches as Branch[]}
          assetsBase={ASSETS_URL}
        />
      </div>
    </main>
  );
}
