import {
  createDirectus,
  rest,
  staticToken,
  createPermissions,
} from "@directus/sdk";
import "dotenv/config";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
const DIRECTUS_URL = process.env.DIRECTUS_URL;

if (!ADMIN_TOKEN || !DIRECTUS_URL) {
  console.error("❌ Thiếu .env (ADMIN_TOKEN hoặc DIRECTUS_URL)");
  process.exit(1);
}

const client = createDirectus(DIRECTUS_URL)
  .with(staticToken(ADMIN_TOKEN))
  .with(rest());

async function main() {
  console.log("🔐 Đang cập nhật quyền truy cập (Permissions) - Force Mode...");

  const permissionsToSet = [
    { collection: "branches", action: "read", fields: ["*"] },
    { collection: "room_types", action: "read", fields: ["*"] },
    { collection: "bookings", action: "create", fields: ["*"] },
    { collection: "bookings", action: "read", fields: ["*"] },
    { collection: "booking_items", action: "create", fields: ["*"] },
    { collection: "booking_items", action: "read", fields: ["*"] },
    { collection: "directus_files", action: "read", fields: ["*"] },
  ];

  for (const perm of permissionsToSet) {
    try {
      await client.request(
        createPermissions({
          role: null, // Public role
          collection: perm.collection,
          action: perm.action,
          fields: perm.fields,
          permissions: {},
        })
      );
      console.log(
        `   ✅ Granted [${perm.action.toUpperCase()}] on [${perm.collection}]`
      );
    } catch (error) {
      // Ignore "Unique constraint" errors (means permission already exists)
      if (error.message && error.message.includes("unique")) {
        console.log(
          `   ⚠️  Permission [${perm.action}] on [${perm.collection}] already exists.`
        );
      } else {
        console.error(
          `   ❌ Failed [${perm.action}] on [${perm.collection}]:`,
          error.message
        );
      }
    }
  }

  console.log("\n🏁 Hoàn tất cập nhật quyền.");
}

main();
