import type { Branch } from "./branches";
import type { DirectusFile, ID } from "./common";

export interface Room {
  id: ID;
  branch: ID | Branch;
  name: string;
  slug?: string;
  description?: string;
  area?: number;
  max_guests?: number;
  bed_type?: string;
  base_price?: number;
  has_breakfast?: boolean;
  free_cancellation?: boolean;
  status?: "active" | "inactive" | string;
  images?: Array<string | DirectusFile>;
}
