import { client } from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { RoomType, DataStatus } from "@/types/schema";

export const RoomService = {
  // Get rooms by Branch ID
  getByBranch: async (branchId: number): Promise<RoomType[]> => {
    try {
      const data = await client.request(
        readItems("room_types", {
          filter: {
            branch_id: { _eq: branchId },
            status: { _eq: DataStatus.PUBLISHED },
          },
          fields: [
            "*",
            "images.directus_files_id.*",
            "amenities",
            "bed_type",
            "size_sqm",
            "view_type"
          ],
        })
      );
      return (data ?? []) as RoomType[];
    } catch (error) {
      console.error("[RoomService.getByBranch] Error:", error);
      return [];
    }
  },

  // CORE LOGIC: Check Availability
  checkAvailability: async (
    checkIn: string,
    checkOut: string,
    branchId: number
  ): Promise<(RoomType & { available_qty: number })[]> => {
    try {
      // 1. Get all rooms for this branch
      const rooms = await RoomService.getByBranch(branchId);

      // 2. Get active bookings that overlap with the requested date range
      // Bookings overlap if: check_in <= requested_checkOut AND check_out >= requested_checkIn
      type BookingWithItems = {
        items?: Array<{
          room_type_id: number | { id: number };
          quantity: number;
        }>;
      };

      const bookings = await client.request(
        readItems("bookings", {
          filter: {
            _and: [
              { status: { _in: ["pending", "confirmed"] } },
              { check_in: { _lte: checkOut } },
              { check_out: { _gte: checkIn } },
            ],
          },
          fields: ["*", "items.*", "items.room_type_id", "items.quantity"],
        })
      ) as BookingWithItems[];

      // 3. Calculate available quantity per room type
      const roomAvailability = rooms.map((room) => {
        // Find all booking items for this room type
        let bookedQty = 0;

        bookings.forEach((booking) => {
          if (booking.items && Array.isArray(booking.items)) {
            booking.items.forEach((item) => {
              const roomTypeId = typeof item.room_type_id === "object" ? item.room_type_id?.id : item.room_type_id;
              if (roomTypeId === room.id) {
                bookedQty += item.quantity || 0;
              }
            });
          }
        });

        // Calculate available quantity
        const availableQty = Math.max(0, room.inventory_count - bookedQty);

        return {
          ...room,
          available_qty: availableQty,
        };
      });

      // 4. Return only rooms with availability > 0
      return roomAvailability.filter((room) => room.available_qty > 0);
    } catch (error) {
      console.error("[RoomService.checkAvailability] Error:", error);
      // Fallback: return all rooms if availability check fails
      const rooms = await RoomService.getByBranch(branchId);
      return rooms.map((room) => ({ ...room, available_qty: room.inventory_count }));
    }
  },
};
