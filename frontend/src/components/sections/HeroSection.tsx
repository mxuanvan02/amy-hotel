"use client";

import { motion, Variants } from "framer-motion";
import { FormEvent } from "react";

type HeroSectionProps = {
  backgroundImage?: string;
  onSearch?: (values: {
    location: string;
    dateRange: string;
    guests: number;
  }) => void;
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export function HeroSection({
  backgroundImage = "https://images.unsplash.com/photo-1501117716987-c8e1ecb210af?auto=format&fit=crop&w=1600&q=80",
  onSearch,
}: HeroSectionProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!onSearch) return;

    const formData = new FormData(event.currentTarget);
    onSearch({
      location: String(formData.get("location") || ""),
      dateRange: String(formData.get("dateRange") || ""),
      guests: Number(formData.get("guests") || 1),
    });
  };

  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(10, 12, 22, 0.75), rgba(10, 12, 22, 0.25)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "saturate(1.05)",
        }}
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(18,16,26,0.85)] via-[rgba(18,16,26,0.45)] to-[rgba(246,244,239,0.95)]" />

      <div className="mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-center px-5 pb-16 pt-36 text-white">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-2xl space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
            Curated luxury stays
          </div>
          <h1 className="heading-font text-5xl font-semibold leading-tight md:text-6xl">
            Elevate every getaway with Amy&apos;s signature hospitality.
          </h1>
          <p className="max-w-xl text-lg text-white/80">
            Discover handpicked villas, serene resorts, and city hideaways.
            Crafted for travelers who expect more than a place to sleep.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.15, duration: 0.85, ease: "easeOut" }}
          className="mt-10 grid w-full gap-4 rounded-2xl bg-white/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-lg md:grid-cols-[1.2fr_1fr_1fr_auto]"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="location"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              placeholder="Where to?"
              className="rounded-xl border border-white/60 bg-white px-4 py-3 text-[var(--color-primary)] shadow-inner shadow-black/5 outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
              defaultValue="Da Nang, Vietnam"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="dateRange"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]"
            >
              Date range
            </label>
            <input
              id="dateRange"
              name="dateRange"
              placeholder="Add dates"
              className="rounded-xl border border-white/60 bg-white px-4 py-3 text-[var(--color-primary)] shadow-inner shadow-black/5 outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
              defaultValue="Jun 18 - Jun 24"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="guests"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]"
            >
              Guests
            </label>
            <input
              id="guests"
              name="guests"
              type="number"
              min={1}
              max={12}
              placeholder="2 guests"
              className="rounded-xl border border-white/60 bg-white px-4 py-3 text-[var(--color-primary)] shadow-inner shadow-black/5 outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
              defaultValue={2}
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="h-full w-full rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(31,37,68,0.35)] transition hover:-translate-y-0.5 hover:bg-[var(--color-primary)]/90 md:w-auto"
            >
              Search stays
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
