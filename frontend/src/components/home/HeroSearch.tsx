"use client";

import { useMemo, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { motion, Variants } from "framer-motion";
import { Calendar, MapPin, Search, Users } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBookingStore } from "@/store/use-booking-store";

type LocationOption = {
  label: string;
  value: string;
};

type HeroSearchProps = {
  backgroundImage?: string;
  locations?: LocationOption[];
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export function HeroSearch({
  backgroundImage = "https://images.unsplash.com/photo-1501117716987-c8e1ecb210af?auto=format&fit=crop&w=1600&q=80",
  locations = [],
}: HeroSearchProps) {
  const router = useRouter();
  const { setDateRange, setGuests, setSelectedBranchId } = useBookingStore();

  const [selectedLocation, setSelectedLocation] = useState(
    locations[0]?.value || ""
  );
  const [dateRange, setDateRangeState] = useState<{
    start: string;
    end: string;
  }>({ start: "", end: "" });
  const [guests, setGuestsState] = useState("2");

  const formattedRange = useMemo(() => {
    if (!dateRange.start || !dateRange.end) return "Chọn ngày đi - về";
    try {
      const start = format(new Date(dateRange.start), "dd MMM");
      const end = format(new Date(dateRange.end), "dd MMM");
      return `${start} → ${end}`;
    } catch {
      return "Chọn ngày đi - về";
    }
  }, [dateRange]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate inputs
    if (!selectedLocation || !dateRange.start || !dateRange.end) {
      alert("Vui lòng chọn địa điểm và ngày nhận/trả phòng");
      return;
    }

    // Parse dates and update store
    const checkInDate = new Date(dateRange.start);
    const checkOutDate = new Date(dateRange.end);

    if (checkOutDate <= checkInDate) {
      alert("Ngày trả phòng phải sau ngày nhận phòng");
      return;
    }

    // Update booking store
    setDateRange({ from: checkInDate, to: checkOutDate });

    const guestCount = Number(guests) || 2;
    const adults = guestCount;
    const children = 0;
    setGuests({ adults, children });

    // Find branch by slug
    const locationValue = selectedLocation;
    const branch = locations.find((loc) => loc.value === locationValue);

    if (branch) {
      // Check if it's a slug (contains hyphen) or numeric ID
      const isSlug =
        locationValue.includes("-") || !/^\d+$/.test(locationValue);

      if (isSlug) {
        // Navigate to branch detail page with search params
        router.push(
          `/branch/${locationValue}?checkIn=${dateRange.start}&checkOut=${dateRange.end}&guests=${guestCount}`
        );
      } else {
        // It's a numeric ID - find the branch slug from the location option
        // The value should be the slug, but if it's an ID, we need to find the branch
        setSelectedBranchId(Number(locationValue));
        router.push(
          `/#destinations?checkIn=${dateRange.start}&checkOut=${dateRange.end}&guests=${guestCount}`
        );
      }
    } else {
      // No specific branch, navigate to destinations
      router.push(
        `/#destinations?checkIn=${dateRange.start}&checkOut=${dateRange.end}&guests=${guestCount}`
      );
    }
  };

  return (
    <section className="relative isolate pb-12 md:pb-0">
      {/* Background Container - Clips the image but not the search bar */}
      <div className="absolute inset-0 -z-20 h-full w-full overflow-hidden bg-gray-900">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(10, 12, 22, 0.85), rgba(10, 12, 22, 0.45)), url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.35)] via-transparent to-[rgba(246,244,239,0.7)]" />
      </div>

      <div className="relative mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-center px-5 pb-20 pt-28 text-white">
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
            Discover destinations crafted for elevated escapes.
          </h1>
          <p className="max-w-xl text-lg text-white/80">
            From coastal sanctuaries to skyline suites, Amy handpicks stays
            where every detail feels bespoke.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.1, duration: 0.85, ease: "easeOut" }}
          className="relative mx-auto mt-12 w-full max-w-5xl rounded-3xl bg-white/95 p-4 shadow-2xl shadow-black/25 backdrop-blur-lg md:absolute md:-bottom-8 md:left-1/2 md:z-20 md:w-[90%] md:-translate-x-1/2 md:transform md:rounded-[38px] md:p-5 lg:w-[80%]"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-1">
            <div className="flex flex-1 items-center gap-3 rounded-2xl bg-white px-4 py-3 md:rounded-full">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <MapPin size={18} />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="location"
                  className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]"
                >
                  Destination
                </label>
                <select
                  id="location"
                  name="location"
                  className="w-full bg-transparent text-base font-semibold text-[var(--color-primary)] outline-none"
                  value={selectedLocation}
                  onChange={(event) => setSelectedLocation(event.target.value)}
                >
                  {locations.length === 0 && (
                    <option value="">Select destination</option>
                  )}
                  {locations.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-3 rounded-2xl bg-white px-4 py-3 md:rounded-full">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-secondary)]/15 text-[var(--color-primary)]">
                <Calendar size={18} />
              </div>
              <div className="w-full">
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  Dates
                </label>
                <Popover>
                  <PopoverTrigger className="mt-1 w-full rounded-xl border border-white/70 bg-white px-4 py-2.5 text-sm font-semibold text-[var(--color-primary)] shadow-inner shadow-black/5 hover:border-[var(--color-primary)]/30">
                    <span className="flex flex-col text-left">
                      <span className="text-xs font-medium text-[var(--color-muted)]">
                        Date range
                      </span>
                      <span className="text-sm text-[var(--color-primary)]">
                        {formattedRange}
                      </span>
                    </span>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="z-50 w-[340px] space-y-3 rounded-2xl bg-white p-4 shadow-2xl"
                  >
                    <p className="text-sm font-semibold text-[var(--color-primary)]">
                      Chọn ngày đi - về
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="startDate"
                          className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]"
                        >
                          Check-in
                        </label>
                        <input
                          id="startDate"
                          name="startDate"
                          type="date"
                          value={dateRange.start}
                          onChange={(event) =>
                            setDateRangeState((prev) => ({
                              ...prev,
                              start: event.target.value,
                            }))
                          }
                          className="w-full rounded-lg border border-[var(--color-primary)]/15 bg-white px-3 py-2 text-sm font-semibold text-[var(--color-primary)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="endDate"
                          className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]"
                        >
                          Check-out
                        </label>
                        <input
                          id="endDate"
                          name="endDate"
                          type="date"
                          value={dateRange.end}
                          onChange={(event) =>
                            setDateRangeState((prev) => ({
                              ...prev,
                              end: event.target.value,
                            }))
                          }
                          className="w-full rounded-lg border border-[var(--color-primary)]/15 bg-white px-3 py-2 text-sm font-semibold text-[var(--color-primary)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-xs font-semibold text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-primary)] hover:underline"
                      onClick={() => setDateRangeState({ start: "", end: "" })}
                    >
                      Xoá ngày
                    </button>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-3 rounded-2xl bg-white px-4 py-3 md:rounded-full">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <Users size={18} />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="guests"
                  className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]"
                >
                  Guests
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={guests}
                  onChange={(event) => setGuestsState(event.target.value)}
                  className="w-28 rounded-lg border border-transparent bg-transparent text-base font-semibold text-[var(--color-primary)] outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                >
                  {Array.from({ length: 8 }).map((_, index) => {
                    const guestCount = index + 1;
                    return (
                      <option key={guestCount} value={guestCount}>
                        {guestCount} khách
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-xl shadow-[rgba(31,37,68,0.3)] transition transform hover:-translate-y-0.5 hover:scale-105 hover:bg-[var(--color-primary)]/90 hover:shadow-[0_15px_30px_rgba(31,37,68,0.35)]"
                aria-label="Search stays"
              >
                <Search size={20} />
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
