import {
  createDirectus,
  rest,
  staticToken,
  createItem,
  deleteItems,
  readItems,
} from "@directus/sdk";
import "dotenv/config";

// --- CONFIG ---
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
const DIRECTUS_URL = process.env.DIRECTUS_URL;

if (!ADMIN_TOKEN || !DIRECTUS_URL) {
  console.error("❌ Thiếu .env (ADMIN_TOKEN hoặc DIRECTUS_URL)");
  process.exit(1);
}

const client = createDirectus(DIRECTUS_URL)
  .with(staticToken(ADMIN_TOKEN))
  .with(rest());

// --- COMPREHENSIVE DATA POOL ---
const CUSTOMERS = [
  {
    name: "Nguyễn Văn An",
    phone: "0901234567",
    email: "an.nguyen@example.com",
  },
  {
    name: "Trần Thị Bình",
    phone: "0902345678",
    email: "binh.tran@example.com",
  },
  {
    name: "Lê Hoàng Cường",
    phone: "0903456789",
    email: "cuong.le@example.com",
  },
  { name: "Phạm Minh Duy", phone: "0904567890", email: "duy.pham@example.com" },
  {
    name: "Hoàng Thị Dung",
    phone: "0905678901",
    email: "dung.hoang@example.com",
  },
  { name: "Vũ Văn Em", phone: "0906789012", email: "em.vu@example.com" },
  {
    name: "Đặng Thị Giang",
    phone: "0907890123",
    email: "giang.dang@example.com",
  },
  { name: "Bùi Văn Hùng", phone: "0908901234", email: "hung.bui@example.com" },
  { name: "Đỗ Thị Hương", phone: "0909012345", email: "huong.do@example.com" },
  { name: "Hồ Văn Khanh", phone: "0910123456", email: "khanh.ho@example.com" },
  { name: "Mai Thị Lan", phone: "0911234567", email: "lan.mai@example.com" },
  {
    name: "Phan Văn Minh",
    phone: "0912345678",
    email: "minh.phan@example.com",
  },
  { name: "Đinh Thị Nga", phone: "0913456789", email: "nga.dinh@example.com" },
  {
    name: "Trương Văn Phong",
    phone: "0914567890",
    email: "phong.truong@example.com",
  },
  { name: "Lý Thị Quỳnh", phone: "0915678901", email: "quynh.ly@example.com" },
];

const LOCATIONS = [
  {
    name: "City Center Premium",
    address: "123 Đường Lê Lợi, Phú Nhuận",
    type: "Premium",
    description: "Khách sạn cao cấp tại trung tâm thành phố với view toàn cảnh",
  },
  {
    name: "Imperial Heritage",
    address: "45 Đường Lê Duẩn, Thuận Thành",
    type: "Heritage",
    description: "Nằm gần Hoàng Thành Huế, kiến trúc cổ kính sang trọng",
  },
  {
    name: "Riverside Boutique",
    address: "78 Đường Lê Lợi, Vĩnh Ninh",
    type: "Boutique",
    description: "Khách sạn boutique view sông Hương thơ mộng",
  },
  {
    name: "Garden Oasis Resort",
    address: "Km 5 Thủy Biều, Hương Thủy",
    type: "Resort",
    description: "Resort nghỉ dưỡng ven sông, không gian xanh mát",
  },
  {
    name: "Beachfront Paradise",
    address: "234 Biển Thuận An, Phú Vang",
    type: "Beach",
    description: "Resort bãi biển với view biển tuyệt đẹp",
  },
  {
    name: "Downtown Business",
    address: "567 Đường Hùng Vương, Phú Hội",
    type: "Business",
    description: "Khách sạn business class, gần trung tâm hành chính",
  },
  {
    name: "Old Quarter Charm",
    address: "89 Đường Võ Thị Sáu, Phú Hội",
    type: "Boutique",
    description: "Khách sạn nhỏ xinh giữa lòng phố cổ",
  },
  {
    name: "Lagoon View Resort",
    address: "Đầm Chuồn, Phú Lộc",
    type: "Resort",
    description: "View đầm phá tuyệt đẹp, yên tĩnh riêng tư",
  },
  {
    name: "Mountain Retreat",
    address: "Bạch Mã, Nam Đông",
    type: "Mountain",
    description: "Retreat trên núi, không khí trong lành",
  },
  {
    name: "Luxury Palace",
    address: "999 Đường Nguyễn Huệ, Vĩnh Ninh",
    type: "Luxury",
    description: "Khách sạn 5 sao đẳng cấp quốc tế",
  },
];

const ROOM_TEMPLATES = [
  {
    name: "Standard Double",
    price: 450000,
    size: 25,
    bed: "queen",
    amenities: ["wifi", "tv", "ac"],
    view: "city_view",
  },
  {
    name: "Standard Twin",
    price: 450000,
    size: 25,
    bed: "twin",
    amenities: ["wifi", "tv", "ac"],
    view: "city_view",
  },
  {
    name: "Superior Double",
    price: 650000,
    size: 30,
    bed: "king",
    amenities: ["wifi", "tv", "ac", "minibar"],
    view: "city_view",
  },
  {
    name: "Superior River View",
    price: 750000,
    size: 32,
    bed: "king",
    amenities: ["wifi", "tv", "ac", "minibar", "balcony"],
    view: "river_view",
  },
  {
    name: "Deluxe City View",
    price: 850000,
    size: 35,
    bed: "king",
    amenities: ["wifi", "tv", "ac", "minibar", "desk", "safe"],
    view: "city_view",
  },
  {
    name: "Deluxe Ocean View",
    price: 1100000,
    size: 38,
    bed: "king",
    amenities: ["wifi", "tv", "ac", "minibar", "balcony", "bathtub"],
    view: "sea_view",
  },
  {
    name: "Executive Suite",
    price: 1500000,
    size: 50,
    bed: "king_sofa",
    amenities: [
      "wifi",
      "tv",
      "ac",
      "minibar",
      "balcony",
      "bathtub",
      "safe",
      "desk",
    ],
    view: "city_view",
  },
  {
    name: "Family Suite",
    price: 1800000,
    size: 55,
    bed: "king_sofa",
    amenities: [
      "wifi",
      "tv",
      "ac",
      "minibar",
      "balcony",
      "bathtub",
      "safe",
      "desk",
      "hairdryer",
    ],
    view: "garden_view",
  },
  {
    name: "Presidential Suite",
    price: 3500000,
    size: 80,
    bed: "king_sofa",
    amenities: [
      "wifi",
      "tv",
      "ac",
      "minibar",
      "balcony",
      "bathtub",
      "safe",
      "desk",
      "hairdryer",
      "scenic_view",
    ],
    view: "sea_view",
  },
];

const VIEW_TYPES = ["city_view", "river_view", "garden_view", "sea_view"];
const PAYMENT_METHODS = ["cash", "vnpay", "momo", "bank_transfer"];

// --- HELPERS ---
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function generateBookingCode(index, date) {
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const sequence = String(index + 1).padStart(4, "0");
  return `AMY-${dateStr}-${sequence}`;
}

async function main() {
  console.log(
    `🌱 Đang khởi chạy Enhanced Seeding v3.0 (10 Branches + Many Rooms + 200 Bookings)...\n`
  );

  try {
    // --- 1. CLEANUP ---
    console.log("🧹 Dọn dẹp dữ liệu cũ...");
    const oldItems = await client.request(
      readItems("booking_items", { fields: ["id"], limit: -1 })
    );
    if (oldItems.length > 0)
      await client.request(
        deleteItems(
          "booking_items",
          oldItems.map((i) => i.id)
        )
      );

    const oldBookings = await client.request(
      readItems("bookings", { fields: ["id"], limit: -1 })
    );
    if (oldBookings.length > 0)
      await client.request(
        deleteItems(
          "bookings",
          oldBookings.map((b) => b.id)
        )
      );

    const oldRooms = await client.request(
      readItems("room_types", { fields: ["id"], limit: -1 })
    );
    if (oldRooms.length > 0)
      await client.request(
        deleteItems(
          "room_types",
          oldRooms.map((r) => r.id)
        )
      );

    const oldBranches = await client.request(
      readItems("branches", { fields: ["id"], limit: -1 })
    );
    if (oldBranches.length > 0)
      await client.request(
        deleteItems(
          "branches",
          oldBranches.map((b) => b.id)
        )
      );

    console.log("   ✅ Đã xóa sạch.\n");

    // --- 2. TẠO 10 BRANCHES ---
    console.log("🏗  Đang tạo 10 chi nhánh...");
    let allRooms = [];

    for (let i = 0; i < LOCATIONS.length; i++) {
      const loc = LOCATIONS[i];
      const branch = await client.request(
        createItem("branches", {
          status: "published",
          name: `Amy Hotel ${loc.name}`,
          slug: `amy-${loc.name.toLowerCase().replace(/ /g, "-")}`,
          address: `${loc.address}, Thừa Thiên Huế`,
          phone: `0234 3${i}${i}0 ${i}00`,
          map_url: `https://maps.google.com/?q=Amy+Hotel+${loc.name.replace(
            / /g,
            "+"
          )}`,
          description: `<p><strong>Amy Hotel ${loc.name}</strong></p><p>${loc.description}</p><p>Tiện nghi cao cấp, phục vụ chu đáo, vị trí đắc địa.</p>`,
        })
      );

      // Mỗi branch có 5-6 loại phòng
      const numRoomTypes = 5 + Math.floor(Math.random() * 2);
      const selectedTemplates = ROOM_TEMPLATES.sort(
        () => 0.5 - Math.random()
      ).slice(0, numRoomTypes);

      for (const tpl of selectedTemplates) {
        const room = await client.request(
          createItem("room_types", {
            status: "published",
            branch_id: branch.id,
            name: tpl.name,
            slug: `${tpl.name.toLowerCase().replace(/ /g, "-")}-branch${
              branch.id
            }`,
            price_base: tpl.price,
            inventory_count: Math.floor(Math.random() * 5) + 3, // 3-7 phòng
            capacity_adults: 2,
            capacity_children: tpl.name.includes("Family") ? 2 : 1,
            size_sqm: tpl.size,
            bed_type: tpl.bed,
            view_type:
              tpl.view ||
              VIEW_TYPES[Math.floor(Math.random() * VIEW_TYPES.length)],
            amenities: tpl.amenities,
            description: `<p>Phòng ${tpl.name} rộng ${tpl.size}m² với đầy đủ tiện nghi cao cấp.</p>`,
          })
        );
        allRooms.push(room);
      }
    }
    console.log(
      `   ✅ Đã tạo ${LOCATIONS.length} branches và ${allRooms.length} room types.\n`
    );

    // --- 3. TẠO 200 BOOKINGS ---
    console.log("📅 Đang tạo 200 bookings (có thể mất 30-60s)...");

    const BOOKING_COUNT = 200;
    let createdCount = 0;

    for (let i = 0; i < BOOKING_COUNT; i++) {
      const customer = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
      const room = allRooms[Math.floor(Math.random() * allRooms.length)];
      const quantity = Math.floor(Math.random() * 2) + 1;
      const nights = Math.floor(Math.random() * 6) + 1; // 1-7 nights

      const today = new Date();
      const checkIn = randomDate(addDays(today, -90), addDays(today, 90)); // 3 tháng trước đến 3 tháng sau
      const checkOut = addDays(checkIn, nights);

      let status =
        checkOut < today
          ? "completed"
          : Math.random() > 0.3
          ? "confirmed"
          : "pending";
      const totalPrice = room.price_base * quantity * nights;
      const bookingCode = generateBookingCode(i, checkIn);
      const paymentMethod =
        PAYMENT_METHODS[Math.floor(Math.random() * PAYMENT_METHODS.length)];
      let paymentStatus =
        status === "completed"
          ? "paid"
          : status === "confirmed"
          ? Math.random() > 0.5
            ? "paid"
            : "deposit_paid"
          : "unpaid";

      const newBooking = await client.request(
        createItem("bookings", {
          status: status,
          code: bookingCode,
          customer_name: customer.name,
          customer_phone: customer.phone,
          customer_email: customer.email,
          check_in: checkIn.toISOString().split("T")[0],
          check_out: checkOut.toISOString().split("T")[0],
          total_price: totalPrice,
          payment_status: paymentStatus,
          payment_method: paymentMethod,
          payment_transaction_id:
            paymentStatus !== "unpaid" ? `TXN${Date.now()}${i}` : null,
          note: `Booking tự động #${i + 1}`,
        })
      );

      await client.request(
        createItem("booking_items", {
          status: "published",
          booking_id: newBooking.id,
          room_type_id: room.id,
          quantity: quantity,
          price_snapshot: room.price_base,
        })
      );

      createdCount++;
      if (createdCount % 25 === 0)
        console.log(
          `      ✓ Đã tạo ${createdCount}/${BOOKING_COUNT} bookings...`
        );
    }

    console.log(`\n✅ Hoàn thành!\n`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📊 THỐNG KÊ DỮ LIỆU:");
    console.log(`   • ${LOCATIONS.length} branches`);
    console.log(`   • ${allRooms.length} room types`);
    console.log(`   • ${BOOKING_COUNT} bookings với booking items`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    console.log("🎉 Database sẵn sàng để test!");
  } catch (error) {
    console.error("❌ Lỗi:", error.message || error);
  }
}

main();
