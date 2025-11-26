import type { DirectusFile, ID } from "./common";

export type BranchType = "hostel" | "hotel" | "apartment" | "villa" | string;

export interface Branch {
  id: ID;
  status?: string;
  name: string;
  slug: string;
  description?: string;
  address?: string;
  city?: string;
  phone?: string;
  email?: string;
  type?: BranchType;
  min_price?: number;
  rating?: number;
  rating_count?: number;
  hero_image?: string | DirectusFile;
  gallery?: Array<string | DirectusFile>;
  images?: string[]; // compatibility with legacy locations data
  amenities?: string[];
}
