import { directusFetch } from "@/lib/api/directus-client";
import type { Room } from "@/types/directus";

type RoomListResponse = { data: Room[] };
type RoomResponse = { data: Room[] };

export async function getRooms(fields = "*"): Promise<Room[]> {
  const query = `?fields=${encodeURIComponent(fields)}`;
  const response = await directusFetch<RoomListResponse>(`/items/rooms${query}`);
  return response.data;
}

export async function getRoomsByBranch(branchId: string | number, fields = "*"): Promise<Room[]> {
  const query = `?filter[branch][_eq]=${encodeURIComponent(String(branchId))}&fields=${encodeURIComponent(
    fields
  )}`;
  const response = await directusFetch<RoomListResponse>(`/items/rooms${query}`);
  return response.data;
}

export async function getRoomById(id: string | number, fields = "*"): Promise<Room | null> {
  const query = `?filter[id][_eq]=${encodeURIComponent(String(id))}&limit=1&fields=${encodeURIComponent(
    fields
  )}`;
  const response = await directusFetch<RoomResponse>(`/items/rooms${query}`);
  return response.data[0] ?? null;
}
