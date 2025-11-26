import { client } from "@/lib/directus";
import { createItem, readItems, readItem } from "@directus/sdk";
import type { Booking } from "@/types/schema";

interface CreateBookingInput {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  check_in: string;
  check_out: string;
  total_price: number;
  payment_status?: string;
  payment_method?: string;
  note?: string;
}

interface BookingItemInput {
  room_type_id: number;
  quantity: number;
  price_snapshot: number;
}

export const BookingService = {
  create: async (payload: CreateBookingInput, items: BookingItemInput[] = []) => {
    try {
      // 1. Create booking header
      const booking = await client.request(createItem("bookings", {
        ...payload,
        code: generateBookingCode(), // Auto-generate booking code
        payment_status: payload.payment_status || 'unpaid',
      }));

      console.log("[BookingService] Created booking:", booking); // Debug log

      // 2. Create booking items
      if (items.length > 0 && booking.id) {
        for (const item of items) {
          await client.request(createItem("booking_items", {
            booking_id: booking.id,
            room_type_id: item.room_type_id,
            quantity: item.quantity,
            price_snapshot: item.price_snapshot,
            status: 'published',
          }));
        }
      }

      return booking;
    } catch (error) {
      console.error("[BookingService.create] Error:", error);
      throw error;
    }
  },

  getByCode: async (code: string): Promise<Booking | null> => {
    try {
      const data = await client.request(
        readItems("bookings", {
          filter: { code: { _eq: code } },
          limit: 1,
          fields: ["*", "items.*", "items.room_type_id.*"],
        })
      );
      return (data?.[0] as unknown as Booking) ?? null;
    } catch (error) {
      console.error("[BookingService.getByCode] Error:", error);
      return null;
    }
  },

  getById: async (id: number): Promise<Booking | null> => {
    try {
      const data = await client.request(
        readItem("bookings", id, {
          fields: ["*", "items.*", "items.room_type_id.*"],
        })
      );
      return (data as unknown as Booking) ?? null;
    } catch (error) {
      console.error("[BookingService.getById] Error:", error);
      return null;
    }
  },
};

// Helper function to generate booking code
function generateBookingCode(): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `AMY-${dateStr}-${random}`;
}
