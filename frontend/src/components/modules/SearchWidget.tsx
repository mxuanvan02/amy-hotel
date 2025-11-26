"use client";

import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/use-booking-store";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Users } from "lucide-react";
import { useEffect, useState } from "react";
import type { Branch } from "@/types/schema";
import { BranchService } from "@/services/branch.service";

export function SearchWidget() {
  const router = useRouter();
  const {
    dateRange,
    guests,
    selectedBranchId,
    setDateRange,
    setGuests: setGuestsStore,
  } = useBookingStore();
  
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<number | null>(selectedBranchId);

  useEffect(() => {
    // Load branches
    BranchService.getAll().then(setBranches);
  }, []);

  const handleSearch = () => {
    if (!dateRange.from || !dateRange.to || !selectedBranch) {
      alert("Please select dates and a location");
      return;
    }

    // Update store
    if (selectedBranch) {
      useBookingStore.getState().setSelectedBranchId(selectedBranch);
    }

    // Navigate to branch page with search params
    const branch = branches.find((b) => b.id === selectedBranch);
    if (branch && dateRange.from && dateRange.to) {
      const checkIn = dateRange.from.toISOString().split('T')[0];
      const checkOut = dateRange.to.toISOString().split('T')[0];
      router.push(`/branch/${branch.slug}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests.adults + guests.children}`);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Location Select */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[var(--color-primary)]">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" />
            <select
              value={selectedBranch || ""}
              onChange={(e) => setSelectedBranch(Number(e.target.value) || null)}
              className="w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 py-2 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
            >
              <option value="">Select location</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date Range Picker */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[var(--color-primary)]">Check-in / Check-out</label>
          <DateRangePicker
            from={dateRange.from}
            to={dateRange.to}
            onSelect={setDateRange}
          />
        </div>

        {/* Guests */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[var(--color-primary)]">Guests</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" />
            <div className="flex gap-2">
              <Input
                type="number"
                min="1"
                value={guests.adults}
                onChange={(e) => setGuestsStore({ ...guests, adults: Number(e.target.value) || 1 })}
                placeholder="Adults"
                className="pl-10"
              />
              <Input
                type="number"
                min="0"
                value={guests.children}
                onChange={(e) => setGuestsStore({ ...guests, children: Number(e.target.value) || 0 })}
                placeholder="Children"
              />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button
            variant="gold"
            className="w-full"
            onClick={handleSearch}
            disabled={!dateRange.from || !dateRange.to || !selectedBranch}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

