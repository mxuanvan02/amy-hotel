import { directusFetch } from "@/lib/api/directus-client";
import type { Booking } from "@/types/directus";

type BookingResponse = { data: Booking[] };
type CreateBookingResponse = { data: Booking };

export interface CreateBookingPayload {
  branch?: string | number;
  room?: string | number;
  check_in: string;
  check_out: string;
  guests: number;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  note?: string;
  total_amount?: number;
  status?: Booking["status"];
}

export async function createBooking(payload: CreateBookingPayload): Promise<Booking> {
  const response = await directusFetch<CreateBookingResponse>("/items/bookings", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return response.data;
}

export async function getBookingByCode(code: string, fields = "*"): Promise<Booking | null> {
  const query = `?filter[code][_eq]=${encodeURIComponent(code)}&limit=1&fields=${encodeURIComponent(
    fields
  )}`;
  const response = await directusFetch<BookingResponse>(`/items/bookings${query}`);
  return response.data[0] ?? null;
}
