import { directusFetch } from "@/lib/api/directus-client";
import type { Offer } from "@/types/directus";

type OfferListResponse = { data: Offer[] };
type OfferResponse = { data: Offer[] };

export async function getOffers(fields = "*"): Promise<Offer[]> {
  const query = `?fields=${encodeURIComponent(fields)}`;
  const response = await directusFetch<OfferListResponse>(`/items/offers${query}`);
  return response.data;
}

export async function getOfferBySlug(slug: string, fields = "*"): Promise<Offer | null> {
  const query = `?filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1&fields=${encodeURIComponent(
    fields
  )}`;
  const response = await directusFetch<OfferResponse>(`/items/offers${query}`);
  return response.data[0] ?? null;
}
