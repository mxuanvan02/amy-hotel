import { directusFetch } from "@/lib/api/directus-client";
import type { Branch } from "@/types/directus";

type BranchListResponse = { data: Branch[] };
type BranchResponse = { data: Branch[] };

export async function getBranches(fields = "*"): Promise<Branch[]> {
  const query = `?fields=${encodeURIComponent(fields)}`;
  const response = await directusFetch<BranchListResponse>(`/items/locations${query}`);
  return response.data;
}

export async function getBranchBySlug(slug: string, fields = "*"): Promise<Branch | null> {
  const query = `?filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1&fields=${encodeURIComponent(
    fields
  )}`;
  const response = await directusFetch<BranchResponse>(`/items/locations${query}`);
  return response.data[0] ?? null;
}
