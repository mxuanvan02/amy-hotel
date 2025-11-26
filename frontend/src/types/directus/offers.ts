import type { Branch } from "./branches";
import type { Room } from "./rooms";
import type { ID } from "./common";

export type DiscountType = "percent" | "fixed";

export interface Offer {
  id: ID;
  title: string;
  slug: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  discount_type?: DiscountType;
  discount_value?: number;
  branches?: Array<ID | Branch>;
  rooms?: Array<ID | Room>;
}
