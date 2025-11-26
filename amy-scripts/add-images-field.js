import {
  createDirectus,
  rest,
  staticToken,
  createField,
  createRelation,
} from "@directus/sdk";
import "dotenv/config";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
const DIRECTUS_URL = process.env.DIRECTUS_URL;

const client = createDirectus(DIRECTUS_URL)
  .with(staticToken(ADMIN_TOKEN))
  .with(rest());

async function addImagesFields() {
  console.log("🖼️  Adding images fields to branches and room_types...\n");

  try {
    // === ADD IMAGES TO BRANCHES ===
    console.log("📍 Creating images field for BRANCHES...");

    await client.request(
      createField("branches", {
        field: "images",
        type: "alias",
        meta: {
          interface: "files",
          special: ["files"],
          note: "Branch images",
        },
      })
    );

    console.log("   ✅ branches.images created!\n");

    // === ADD IMAGES TO ROOM_TYPES ===
    console.log("🏨 Creating images field for ROOM_TYPES...");

    await client.request(
      createField("room_types", {
        field: "images",
        type: "alias",
        meta: {
          interface: "files",
          special: ["files"],
          note: "Room images",
        },
      })
    );

    console.log("   ✅ room_types.images created!\n");

    console.log("---------------------------------------------------");
    console.log("🎉 SUCCESS! Images fields added to both collections");
    console.log("---------------------------------------------------");
    console.log("You can now:");
    console.log("1. Go to Directus Admin → Content → Branches");
    console.log("2. Edit any branch → Upload images");
    console.log("3. Same for Room Types");
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.errors) {
      console.error("Details:", error.errors);
    }
  }
}

addImagesFields();
