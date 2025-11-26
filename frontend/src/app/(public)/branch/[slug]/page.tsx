import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BranchService } from "@/services/branch.service";
import { RoomService } from "@/services/room.service";
import { RoomCard } from "@/components/modules/RoomCard";
import { HomeSearchSync } from "@/components/modules/HomeSearchSync";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { MapPin, Phone, ArrowLeft } from "lucide-react";

const ASSETS_URL =
  process.env.NEXT_PUBLIC_ASSETS_URL || "http://localhost:8055/assets";

interface BranchDetailPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  }>;
}

export default async function BranchDetailPage({
  params,
  searchParams,
}: BranchDetailPageProps) {
  const { slug } = await params;
  const { checkIn, checkOut } = await searchParams;
  const branch = await BranchService.getBySlug(slug);

  if (!branch) {
    notFound();
  }

  const rooms = await RoomService.getByBranch(branch.id);

  const coverId =
    branch.images && Array.isArray(branch.images) && branch.images[0]
      ? typeof branch.images[0] === "string"
        ? branch.images[0]
        : typeof branch.images[0].directus_files_id === "object"
        ? branch.images[0].directus_files_id.id
        : branch.images[0].directus_files_id
      : null;

  const coverImage = coverId ? `${ASSETS_URL}/${coverId}` : null;

  // Filter rooms by availability if dates are provided
  let availableRooms = rooms;
  if (checkIn && checkOut) {
    try {
      const availableRoomsData = await RoomService.checkAvailability(
        checkIn,
        checkOut,
        branch.id
      );
      availableRooms = availableRoomsData;
    } catch (error) {
      console.error("[BranchDetail] Availability check failed:", error);
      // Fallback to showing all rooms if availability check fails
    }
  }

  return (
    <main className="min-h-screen bg-[var(--color-surface)]">
      <HomeSearchSync />
      {/* Header Image */}
      <div className="relative h-96 w-full overflow-hidden">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={branch.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="heading-font mb-2 text-4xl font-bold md:text-5xl">
            {branch.name}
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{branch.address}</span>
            </div>
            {branch.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{branch.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-12">
        <Breadcrumbs />
        {/* Description Section */}
        {branch.description && (
          <section className="mb-12">
            <h2 className="heading-font mb-4 text-2xl font-semibold text-[var(--color-primary)]">
              About This Location
            </h2>
            <div
              className="prose prose-sm max-w-none text-[var(--color-muted)]"
              dangerouslySetInnerHTML={{ __html: branch.description }}
            />
          </section>
        )}

        {/* Map Section */}
        {branch.map_url && (
          <section className="mb-12">
            <h2 className="heading-font mb-4 text-2xl font-semibold text-[var(--color-primary)]">
              Location
            </h2>
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
              <iframe
                src={branch.map_url}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>
        )}

        {/* Rooms Section */}
        <section>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="heading-font mb-2 text-2xl font-semibold text-[var(--color-primary)]">
                Available Rooms
              </h2>
              <p className="text-sm text-[var(--color-muted)]">
                {availableRooms.length}{" "}
                {availableRooms.length === 1 ? "room" : "rooms"} available
                {checkIn &&
                  checkOut &&
                  ` from ${new Date(
                    checkIn
                  ).toLocaleDateString()} to ${new Date(
                    checkOut
                  ).toLocaleDateString()}`}
              </p>
            </div>
          </div>

          {availableRooms.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--color-secondary)]/60 bg-white/60 p-12 text-center">
              <p className="text-[var(--color-primary)]">
                {checkIn && checkOut
                  ? `No rooms available for the selected dates. Please try different dates.`
                  : "No rooms available at this location at the moment."}
              </p>
              <Link href="/" className="mt-4 inline-block">
                <Button variant="outline">Browse Other Locations</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {availableRooms.map((room) => (
                <RoomCard key={room.id} room={room} assetsBase={ASSETS_URL} />
              ))}
            </div>
          )}
        </section>

        {/* Back Button */}
        <div className="mt-12">
          <Link href="/#destinations">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to All Locations
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
