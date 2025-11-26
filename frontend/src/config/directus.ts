export const DIRECTUS_URL =
  process.env.NEXT_PUBLIC_DIRECTUS_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8055";

export const DIRECTUS_STATIC_TOKEN = process.env.DIRECTUS_STATIC_TOKEN;

export const DIRECTUS_DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};
