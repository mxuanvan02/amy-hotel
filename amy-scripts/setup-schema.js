import {
  createDirectus,
  rest,
  staticToken,
  createCollection,
  createField,
  deleteCollection,
} from "@directus/sdk";
import "dotenv/config";

// --- CONFIGURATION ---
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "thay-token-cua-ban-vao-day";
const DIRECTUS_URL = process.env.DIRECTUS_URL || "http://localhost:8055";

const client = createDirectus(DIRECTUS_URL)
  .with(staticToken(ADMIN_TOKEN))
  .with(rest());

// --- DEFINITIONS ---

// 1. Các trường hệ thống (Dùng chung cho các bảng chính)
const SYSTEM_FIELDS = [
  {
    field: "date_created",
    type: "timestamp",
    name: "Ngày tạo",
    schema: { default_value: "NOW()" },
    meta: {
      readonly: true,
      special: ["date-created"],
      interface: "datetime",
      width: "half",
    },
  },
  {
    field: "date_updated",
    type: "timestamp",
    name: "Ngày cập nhật",
    meta: {
      readonly: true,
      special: ["date-updated"],
      interface: "datetime",
      width: "half",
    },
  },
  {
    field: "sort",
    type: "integer",
    name: "Sắp xếp",
    meta: { interface: "input", hidden: true },
  },
  {
    field: "status",
    type: "string",
    name: "Trạng thái",
    schema: { default_value: "published" },
    meta: {
      width: "full",
      interface: "select-dropdown",
      options: {
        choices: [
          { text: "Published", value: "published", color: "#2ECDA7" },
          { text: "Draft", value: "draft", color: "#D3D3D3" },
          { text: "Archived", value: "archived", color: "#F2994A" },
        ],
      },
    },
  },
];

// 2. Schema chi tiết
const SCHEMA = [
  {
    collection: "branches",
    name: "Chi nhánh",
    icon: "apartment",
    sort_field: "sort",
    fields: [
      ...SYSTEM_FIELDS,
      {
        field: "name",
        type: "string",
        name: "Tên chi nhánh",
        meta: { required: true, width: "half" },
      },
      {
        field: "slug",
        type: "string",
        name: "Slug URL",
        meta: {
          required: true,
          unique: true,
          width: "half",
          interface: "input-slug",
          options: { template: "{{name}}" },
        },
      },
      {
        field: "address",
        type: "string",
        name: "Địa chỉ",
        meta: { interface: "input" },
      },
      {
        field: "phone",
        type: "string",
        name: "Hotline",
        meta: { width: "half" },
      },
      {
        field: "map_url",
        type: "string",
        name: "Google Map Link",
        meta: { width: "half" },
      },
      {
        field: "description",
        type: "text",
        name: "Mô tả",
        meta: { interface: "input-rich-text-html" },
      },
    ],
  },
  {
    collection: "room_types",
    name: "Loại phòng",
    icon: "hotel",
    sort_field: "sort",
    fields: [
      ...SYSTEM_FIELDS,
      {
        field: "name",
        type: "string",
        name: "Tên loại phòng",
        meta: { required: true, width: "half" },
      },
      {
        field: "slug",
        type: "string",
        name: "Slug",
        meta: {
          required: true,
          unique: true,
          width: "half",
          interface: "input-slug",
          options: { template: "{{name}}" },
        },
      },
      {
        field: "price_base",
        type: "integer",
        name: "Giá gốc (VND)",
        meta: { required: true, width: "half" },
      },
      {
        field: "inventory_count",
        type: "integer",
        name: "Tổng quỹ phòng",
        meta: { required: true, width: "half" },
      },
      {
        field: "capacity_adults",
        type: "integer",
        name: "Người lớn",
        meta: { width: "half" },
      },
      {
        field: "capacity_children",
        type: "integer",
        name: "Trẻ em",
        meta: { width: "half" },
      },
      {
        field: "size_sqm",
        type: "integer",
        name: "Diện tích (m²)",
        meta: { width: "half" },
      },
      {
        field: "bed_type",
        type: "string",
        name: "Loại giường",
        meta: {
          width: "half",
          interface: "select-dropdown",
          options: {
            choices: [
              { text: "1 Giường King", value: "king" },
              { text: "1 Giường Queen", value: "queen" },
              { text: "2 Giường Twin", value: "twin" },
              { text: "1 King + 1 Sofa", value: "king_sofa" },
            ],
          },
        },
      },
      {
        field: "view_type",
        type: "string",
        name: "Tầm nhìn",
        meta: {
          width: "half",
          interface: "select-dropdown",
          options: {
            choices: [
              { text: "Hướng biển", value: "sea_view" },
              { text: "Hướng sông", value: "river_view" },
              { text: "Hướng thành phố", value: "city_view" },
              { text: "Hướng vườn", value: "garden_view" },
              { text: "Không cửa sổ", value: "no_window" },
            ],
          },
        },
      },
      {
        field: "amenities",
        type: "json",
        name: "Tiện nghi",
        meta: {
          interface: "select-multiple-checkbox",
          options: {
            choices: [
              { text: "WiFi miễn phí", value: "wifi" },
              { text: "TV màn hình phẳng", value: "tv" },
              { text: "Điều hòa", value: "ac" },
              { text: "Minibar", value: "minibar" },
              { text: "Ban công", value: "balcony" },
              { text: "Bồn tắm", value: "bathtub" },
              { text: "Két sắt", value: "safe" },
              { text: "Máy sấy tóc", value: "hairdryer" },
              { text: "Bàn làm việc", value: "desk" },
              { text: "View đẹp", value: "scenic_view" },
            ],
          },
        },
      },
      {
        field: "description",
        type: "text",
        name: "Mô tả",
        meta: { interface: "input-rich-text-html" },
      },
      {
        field: "branch_id",
        type: "integer",
        name: "Thuộc chi nhánh",
        meta: {
          interface: "select-dropdown-m2o",
          display_template: "{{name}}",
        },
        schema: {
          is_foreign_key: true,
          foreign_key_table: "branches",
          on_delete: "CASCADE",
        },
      },
    ],
  },
  {
    collection: "bookings",
    name: "Đơn đặt phòng",
    icon: "book_online",
    sort_field: "date_created",
    fields: [
      {
        field: "date_created",
        type: "timestamp",
        name: "Ngày tạo",
        schema: { default_value: "NOW()" },
        meta: {
          readonly: true,
          special: ["date-created"],
          interface: "datetime",
          width: "half",
        },
      },
      {
        field: "date_updated",
        type: "timestamp",
        name: "Ngày cập nhật",
        meta: {
          readonly: true,
          special: ["date-updated"],
          interface: "datetime",
          width: "half",
        },
      },
      {
        field: "sort",
        type: "integer",
        name: "Sắp xếp",
        meta: { interface: "input", hidden: true },
      },
      {
        field: "status",
        type: "string",
        name: "Trạng thái đơn",
        schema: { default_value: "pending" },
        meta: {
          width: "full",
          interface: "select-dropdown",
          options: {
            choices: [
              { text: "Chờ xử lý", value: "pending", color: "#F2994A" },
              { text: "Đã xác nhận", value: "confirmed", color: "#2ECDA7" },
              { text: "Đã hủy", value: "cancelled", color: "#EB5757" },
              { text: "Hoàn tất", value: "completed", color: "#2F80ED" },
            ],
          },
        },
      },
      {
        field: "code",
        type: "string",
        name: "Mã booking",
        schema: { is_unique: true },
        meta: {
          readonly: true,
          width: "half",
          note: "Auto: AMY-YYYYMMDD-XXXX",
        },
      },
      {
        field: "customer_name",
        type: "string",
        name: "Tên khách",
        meta: { required: true, width: "half" },
      },
      {
        field: "customer_phone",
        type: "string",
        name: "SĐT",
        meta: { required: true, width: "half" },
      },
      {
        field: "customer_email",
        type: "string",
        name: "Email",
        meta: { width: "half" },
      },
      {
        field: "check_in",
        type: "date",
        name: "Check In",
        meta: { required: true, width: "half" },
      },
      {
        field: "check_out",
        type: "date",
        name: "Check Out",
        meta: { required: true, width: "half" },
      },
      {
        field: "total_price",
        type: "integer",
        name: "Tổng tiền",
        meta: { required: true, width: "half" },
      },
      {
        field: "payment_status",
        type: "string",
        name: "Trạng thái thanh toán",
        schema: { default_value: "unpaid" },
        meta: {
          width: "half",
          interface: "select-dropdown",
          options: {
            choices: [
              { text: "Chưa thanh toán", value: "unpaid", color: "#F2994A" },
              { text: "Đã cọc", value: "deposit_paid", color: "#2F80ED" },
              { text: "Đã thanh toán", value: "paid", color: "#2ECDA7" },
              { text: "Hoàn tiền", value: "refunded", color: "#EB5757" },
            ],
          },
        },
      },
      {
        field: "payment_method",
        type: "string",
        name: "Phương thức thanh toán",
        meta: {
          width: "half",
          interface: "select-dropdown",
          options: {
            choices: [
              { text: "Tiền mặt tại khách sạn", value: "cash" },
              { text: "VNPay", value: "vnpay" },
              { text: "MoMo", value: "momo" },
              { text: "Chuyển khoản ngân hàng", value: "bank_transfer" },
              { text: "Thẻ tín dụng", value: "credit_card" },
            ],
          },
        },
      },
      {
        field: "payment_transaction_id",
        type: "string",
        name: "Mã giao dịch",
        meta: { width: "half", note: "ID từ cổng thanh toán" },
      },
      { field: "note", type: "text", name: "Ghi chú của khách" },
    ],
  },
  {
    collection: "booking_items",
    name: "Chi tiết đơn",
    icon: "list",
    sort_field: "date_created",
    fields: [
      // --- FIX: Thêm đầy đủ System Fields để không bị lỗi archive_field ---
      {
        field: "date_created",
        type: "timestamp",
        name: "Ngày tạo",
        schema: { default_value: "NOW()" },
        meta: { readonly: true, special: ["date-created"] },
      },
      {
        field: "sort",
        type: "integer",
        name: "Sắp xếp",
        meta: { interface: "input", hidden: true },
      },
      {
        field: "status", // <--- THỦ PHẠM GÂY LỖI ĐÃ ĐƯỢC THÊM VÀO
        type: "string",
        name: "Trạng thái",
        schema: { default_value: "published" },
        meta: {
          width: "full",
          interface: "select-dropdown",
          options: {
            choices: [
              { text: "Published", value: "published", color: "#2ECDA7" },
              { text: "Draft", value: "draft", color: "#D3D3D3" },
              { text: "Archived", value: "archived", color: "#F2994A" },
            ],
          },
        },
      },
      // -------------------------------------------------------------------
      { field: "quantity", type: "integer", name: "Số lượng" },
      { field: "price_snapshot", type: "integer", name: "Giá chốt" },
      {
        field: "booking_id",
        type: "integer",
        name: "Mã đơn",
        meta: { interface: "select-dropdown-m2o" },
        schema: {
          is_foreign_key: true,
          foreign_key_table: "bookings",
          on_delete: "CASCADE",
        },
      },
      {
        field: "room_type_id",
        type: "integer",
        name: "Loại phòng",
        meta: { interface: "select-dropdown-m2o" },
        schema: {
          is_foreign_key: true,
          foreign_key_table: "room_types",
          on_delete: "SET NULL",
        },
      },
    ],
  },
];

// --- MAIN FUNCTION ---

async function main() {
  console.log(`🚀 Đang khởi chạy Script v7.0 (Fixed Missing Status)...`);

  try {
    // --- STEP 0: CLEANUP (XÓA CŨ) ---
    console.log("\n🗑  BƯỚC 1: DỌN DẸP DỮ LIỆU CŨ...");
    const deleteOrder = ["booking_items", "bookings", "room_types", "branches"];

    for (const col of deleteOrder) {
      try {
        await client.request(deleteCollection(col));
        console.log(`   🔥 Đã xóa bảng: ${col}`);
      } catch (e) {
        if (
          e?.response?.status === 403 ||
          e?.response?.status === 404 ||
          e?.errors?.[0]?.extensions?.code === "FORBIDDEN"
        ) {
          console.log(`   ⚠️ Bảng ${col} chưa tồn tại hoặc đã xóa.`);
        } else {
          console.log(`   ℹ️ Không thể xóa ${col}: ${e.message}`);
        }
      }
    }

    // --- STEP 1: CREATE NEW ---
    console.log("\n🛠  BƯỚC 2: KHỞI TẠO SCHEMA MỚI...");

    for (const table of SCHEMA) {
      console.log(`\n📦 Đang xử lý bảng: ${table.collection}...`);

      // 1. Tạo Collection
      await client.request(
        createCollection({
          collection: table.collection,
          meta: {
            icon: table.icon,
            note: table.name,
            sort_field: table.sort_field,
            archive_field: "status", // Cần field 'status' để hoạt động
            archive_value: "archived",
            unarchive_value: "published",
          },
          schema: {},
        })
      );
      console.log(`   ✅ Đã tạo bảng`);

      // 2. Tạo Fields
      for (const fieldData of table.fields) {
        try {
          await client.request(
            createField(table.collection, {
              field: fieldData.field,
              type: fieldData.type,
              schema: fieldData.schema,
              meta: {
                ...fieldData.meta,
                note: fieldData.name,
              },
            })
          );
          console.log(`      + Field: ${fieldData.field}`);
        } catch (e) {
          console.error(`      ❌ Lỗi field ${fieldData.field}:`, e.message);
        }
      }
    }

    console.log("\n-----------------------------------------------");
    console.log("🎉🎉🎉 SETUP THÀNH CÔNG (V7.0)!");
    console.log(
      "⚠️  ĐỪNG QUÊN: Vào Settings -> Access Control -> Public để cấp quyền Read/Create lại từ đầu nhé!"
    );
    console.log("-----------------------------------------------");
  } catch (error) {
    console.error("FATAL ERROR:", error);
  }
}

main();
