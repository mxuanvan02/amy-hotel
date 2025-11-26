"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useBookingStore } from "@/store/use-booking-store";

export function HomeSearchSync() {
  const searchParams = useSearchParams();
  const { setDateRange, setGuests, setSelectedBranchId } = useBookingStore();

  useEffect(() => {
    // Sync URL params with booking store
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const guestsParam = searchParams.get("guests");
    const branchId = searchParams.get("branchId");

    if (checkIn && checkOut) {
      setDateRange({
        from: new Date(checkIn),
        to: new Date(checkOut),
      });
    }

    if (guestsParam) {
      const guestCount = Number(guestsParam);
      setGuests({
        adults: guestCount,
        children: 0,
      });
    }

    if (branchId) {
      setSelectedBranchId(Number(branchId));
    }
  }, [searchParams, setDateRange, setGuests, setSelectedBranchId]);

  return null;
}

