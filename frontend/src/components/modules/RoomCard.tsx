"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { RoomType } from "@/types/schema";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/store/use-booking-store";

import {
  Wifi,
  Tv,
  Wind,
  Wine,
  Trees,
  Bath,
  Lock,
  Monitor,
  Waves,
  Mountain,
  Building2,
  BedDouble,
  Bed,
  Ruler,
  Eye,
} from "lucide-react";

type RoomCardProps = {
  room: RoomType;
  assetsBase: string;
  onSelect?: (room: RoomType) => void;
};

const fallbackImage =
  "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80";

// Helper to map amenities to icons
const getAmenityIcon = (code: string) => {
  switch (code) {
    case "wifi":
      return <Wifi className="h-4 w-4" />;
    case "tv":
      return <Tv className="h-4 w-4" />;
    case "ac":
      return <Wind className="h-4 w-4" />;
    case "minibar":
      return <Wine className="h-4 w-4" />;
    case "balcony":
      return <Trees className="h-4 w-4" />;
    case "bathtub":
      return <Bath className="h-4 w-4" />;
    case "safe":
      return <Lock className="h-4 w-4" />;
    case "desk":
      return <Monitor className="h-4 w-4" />;
    case "scenic_view":
      return <Mountain className="h-4 w-4" />;
    case "hairdryer":
      return <Wind className="h-4 w-4" />;
    default:
      return null;
  }
};

const getViewLabel = (type?: string) => {
  switch (type) {
    case "sea_view":
      return "Sea View";
    case "river_view":
      return "River View";
    case "city_view":
      return "City View";
    case "garden_view":
      return "Garden View";
    case "no_window":
      return "No Window";
    default:
      return null;
  }
};

const getBedLabel = (type?: string) => {
  switch (type) {
    case "king":
      return "King Bed";
    case "queen":
      return "Queen Bed";
    case "twin":
      return "Twin Beds";
    case "king_sofa":
      return "King + Sofa";
    default:
      return null;
  }
};

export function RoomCard({ room, assetsBase, onSelect }: RoomCardProps) {
  const router = useRouter();
  const { addToCart } = useBookingStore();

  const coverId =
    room.images && Array.isArray(room.images) && room.images[0]
      ? typeof room.images[0] === "string"
        ? room.images[0]
        : typeof room.images[0].directus_files_id === "object"
        ? room.images[0].directus_files_id.id
        : room.images[0].directus_files_id
      : null;

  const cover = coverId ? `${assetsBase}/${coverId}` : fallbackImage;
  const price = formatCurrency(room.price_base);
  const viewLabel = getViewLabel(room.view_type);
  const bedLabel = getBedLabel(room.bed_type);

  const handleSelectRoom = () => {
    if (onSelect) {
      onSelect(room);
      return;
    }

    // Add to cart and navigate to checkout
    addToCart({
      roomTypeId: room.id,
      roomName: room.name,
      quantity: 1,
      price: room.price_base,
    });

    // Navigate to checkout page
    router.push("/checkout");
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/70 bg-white shadow-xl shadow-black/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={cover}
          alt={room.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        {room.inventory_count > 0 && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)] shadow">
            Available
          </span>
        )}
        {viewLabel && (
          <span className="absolute right-4 bottom-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {viewLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="heading-font text-xl font-semibold text-[var(--color-primary)]">
              {room.name}
            </h3>
            <div className="mt-1 flex flex-wrap gap-3 text-xs text-[var(--color-muted)]">
              {room.size_sqm && (
                <span className="flex items-center gap-1">
                  <Ruler className="h-3 w-3" /> {room.size_sqm}m²
                </span>
              )}
              {bedLabel && (
                <span className="flex items-center gap-1">
                  <BedDouble className="h-3 w-3" /> {bedLabel}
                </span>
              )}
            </div>
          </div>
          <span className="heading-font text-lg font-semibold text-[var(--color-secondary)]">
            {price}
          </span>
        </div>

        {/* Amenities */}
        {room.amenities && room.amenities.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {room.amenities.slice(0, 5).map((amenity) => (
              <div
                key={amenity}
                className="rounded-md bg-[var(--color-surface)] p-1.5 text-[var(--color-muted)]"
                title={amenity}
              >
                {getAmenityIcon(amenity)}
              </div>
            ))}
            {room.amenities.length > 5 && (
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-surface)] text-xs font-medium text-[var(--color-muted)]">
                +{room.amenities.length - 5}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto space-y-4">
          <div className="flex items-center gap-4 text-sm text-[var(--color-muted)] border-t border-dashed border-gray-100 pt-3">
            <span>
              <strong className="text-[var(--color-primary)]">
                {room.capacity_adults}
              </strong>{" "}
              Adults
            </span>
            {room.capacity_children > 0 && (
              <span>
                <strong className="text-[var(--color-primary)]">
                  {room.capacity_children}
                </strong>{" "}
                Children
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
              / night
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectRoom}
              disabled={room.inventory_count === 0}
              className="w-full sm:w-auto"
            >
              {room.inventory_count > 0 ? "Select Room" : "Unavailable"}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
