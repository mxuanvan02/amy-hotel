import type { Branch } from "./branches";
import type { Room } from "./rooms";
import type { ID } from "./common";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking {
  id: ID;
  code?: string;
  branch?: ID | Branch;
  room?: ID | Room;
  check_in: string;
  check_out: string;
  nights?: number;
  guests: number;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  note?: string;
  total_amount?: number;
  status: BookingStatus;
  user?: ID;
  email?: string;
  phone?: string;
  notes?: string;
  total_price?: number;
}
