import { createDirectus, rest } from "@directus/sdk";
import { DIRECTUS_URL } from "@/config/directus";

export const client = createDirectus(DIRECTUS_URL).with(rest());
// To add staticToken for server-side admin operations, uncomment:
// import { staticToken } from "@directus/sdk";
// import { DIRECTUS_STATIC_TOKEN } from "@/config/directus";
// .with(staticToken(DIRECTUS_STATIC_TOKEN))

// Default export for backward compatibility
export default client;
