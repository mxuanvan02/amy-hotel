export * from "./directus/branches";
export * from "./directus/rooms";
export * from "./directus/bookings";
export * from "./directus/offers";
export * from "./directus/common";

import type { Branch } from "./directus/branches";
import type { Room } from "./directus/rooms";
import type { Booking } from "./directus/bookings";
import type { Offer } from "./directus/offers";

// Backward compatibility: some components still use Location naming
export type Location = Branch;

export interface MySchema {
  branches: Branch[];
  rooms: Room[];
  bookings: Booking[];
  offers: Offer[];
  locations: Branch[]; // alias to match existing collection name
}
