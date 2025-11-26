import { client } from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { Branch, DataStatus } from "@/types/schema";
import { DIRECTUS_URL } from "@/config/directus";

export const BranchService = {
  getAll: async (): Promise<Branch[]> => {
    try {
      // Log connection info for debugging
      if (!DIRECTUS_URL) {
        console.error("[BranchService.getAll] DIRECTUS_URL is not configured");
        return [];
      }

      // Using 'branches' collection name (as per schema v8.0)
      const collectionName = "branches";

      const data = await client.request(
        readItems(collectionName, {
          filter: {
            status: { _eq: DataStatus.PUBLISHED },
          },
          fields: ["*"],
        })
      );
      return (data ?? []) as Branch[];
    } catch (error) {
      // Enhanced error logging
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorDetails = error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error;

      console.error("[BranchService.getAll] Error:", {
        message: errorMessage,
        details: errorDetails,
        directusUrl: DIRECTUS_URL,
        collection: "branches"
      });
      return [];
    }
  },

  getBySlug: async (slug: string): Promise<Branch | null> => {
    try {
      const data = await client.request(
        readItems("branches", {
          filter: {
            slug: { _eq: slug },
            status: { _eq: DataStatus.PUBLISHED },
          },
          limit: 1,
          fields: ["*"],
        })
      );
      return (data?.[0] ?? null) as Branch | null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("[BranchService.getBySlug] Error:", {
        message: errorMessage,
        slug,
        directusUrl: DIRECTUS_URL,
        collection: "branches"
      });
      return null;
    }
  },
};
