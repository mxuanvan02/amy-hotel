import Link from "next/link";
import { HeroSearch } from "@/components/home/HeroSearch";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { HomeSearchSync } from "@/components/modules/HomeSearchSync";
import { BranchService } from "@/services/branch.service";
import type { Branch } from "@/types/schema";

const ASSETS_URL =
  process.env.NEXT_PUBLIC_ASSETS_URL || "http://localhost:8055/assets";

export default async function HomePage() {
  const branches = await BranchService.getAll();
  const locationOptions = branches.map((branch) => ({
    label: branch.name,
    value: branch.slug || String(branch.id),
  }));

  return (
    <main className="min-h-screen bg-transparent text-[var(--color-primary)]">
      <HomeSearchSync />
      <HeroSearch locations={locationOptions} />

      <section
        id="destinations"
        className="mx-auto max-w-6xl px-5 pb-16 pt-24 md:pt-32 text-[var(--color-primary)]"
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
              Explore properties curated for comfort, design, and exceptional
              service.
            </p>
          </div>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] underline-offset-8 transition hover:text-[var(--color-secondary)]"
          >
            View all destinations
          </Link>
        </div>

        <FeaturedGrid
          locations={branches.slice(0, 3) as Branch[]}
          assetsBase={ASSETS_URL}
          showSkeleton={branches.length === 0}
        />
      </section>

      {/* Experience Section */}
      <ExperienceSection />

      {/* About Section */}
      <section
        id="about"
        className="mx-auto max-w-6xl px-5 py-24 text-[var(--color-primary)]"
      >
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="relative h-96 w-full overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
              alt="Luxury Lobby"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)] mb-4">
              About Us
            </p>
            <h2 className="heading-font mb-6 text-3xl font-semibold md:text-4xl">
              Curating Exceptional Stays
            </h2>
            <p className="text-base leading-relaxed text-[var(--color-muted)] mb-6">
              Amy Accommodation specializes in handpicked luxury properties that
              offer exceptional comfort, unique design, and personalized
              service. We believe every journey deserves a memorable place to
              stay.
            </p>
            <Link
              href="/about"
              className="text-sm font-semibold text-[var(--color-secondary)] hover:underline"
            >
              Read our story
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter */}
      <NewsletterSection />

      {/* Contact Section */}
      <section
        id="contact"
        className="mx-auto max-w-6xl px-5 py-24 text-[var(--color-primary)]"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)] mb-4">
            Get in Touch
          </p>
          <h2 className="heading-font mb-6 text-3xl font-semibold md:text-4xl">
            We&apos;re Here to Help
          </h2>
          <p className="text-base leading-relaxed text-[var(--color-muted)] mb-8">
            Have questions about our properties or need assistance with your
            booking? Contact us and we&apos;ll be happy to help.
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:justify-center">
            <Link
              href="/contact"
              className="rounded-full border border-[var(--color-primary)] px-8 py-3 text-sm font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-primary)] hover:text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
