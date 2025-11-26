## GIAI ĐOẠN 1: KHỞI TẠO & THIẾT LẬP DESIGN SYSTEM (FOUNDATION)

Trước khi viết bất kỳ dòng code logic nào, chúng ta cần "nhuộm màu" cho dự án bằng các biến số của Design System đã thống nhất. Việc này đảm bảo mọi nút bấm, tiêu đề đều tuân thủ nguyên tắc thị giác của thương hiệu Amy Hotel.

### Bước 1.1: Khởi tạo dự án Next.js chuẩn Enterprise

Sử dụng cấu hình TypeScript và App Router để đảm bảo hiệu năng và khả năng mở rộng.

**Lệnh thực thi:**

```bash
npx create-next-app@latest amy-booking-web --typescript --tailwind --eslint
# Chọn Yes cho tất cả các tùy chọn (src directory, App Router, import alias @/*)
cd amy-booking-web
npm install lucide-react clsx tailwind-merge date-fns framer-motion
npm install -D @tailwindcss/typography
```

### Bước 1.2: Cấu hình Tailwind CSS (Theming)

Đây là bước quan trọng nhất để đưa "linh hồn" thiết kế vào code. Chúng ta sẽ định nghĩa bảng màu (Royal Blue & Gold) và Font chữ trong `tailwind.config.ts`.

**Yêu cầu kỹ thuật:**
Cập nhật file `tailwind.config.ts` để mở rộng (extend) theme mặc định.

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E3A8A", // Royal Blue - Sang trọng, tin cậy
          foreground: "#FFFFFF",
          hover: "#172554",
        },
        accent: {
          DEFAULT: "#D97706", // Gold/Amber - Điểm nhấn, nút đặt phòng
          foreground: "#FFFFFF",
          hover: "#B45309",
        },
        background: "#F8FAFC", // Off-white - Nền nã
        surface: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"], // Body text
        serif: ["var(--font-playfair)", "serif"],   // Headings
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1280px",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
```

### Bước 1.3: Cấu hình Typography (Fonts)

Sử dụng `next/font/google` để tối ưu hóa việc tải font, tránh hiện tượng nhảy chữ (CLS).

**File:** `src/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  display: "swap" 
});

export const metadata: Metadata = {
  title: "Amy Hotel Hue | Trải nghiệm nghỉ dưỡng Cố đô",
  description: "Hệ thống đặt phòng trực tuyến chính thức của Amy Hotel Group.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background text-slate-800 antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

-----

## GIAI ĐOẠN 2: XÂY DỰNG CORE COMPONENTS (ATOMIC DESIGN)

Thay vì code cứng (hardcode) giao diện, chúng ta sẽ xây dựng bộ UI Kit tái sử dụng được. Điều này giúp đồng nhất trải nghiệm người dùng từ trang chủ đến trang thanh toán.

### Bước 2.1: Base Components

Tạo thư mục `src/components/ui` và xây dựng các thành phần cơ bản:

1.  **Button (`button.tsx`):**
      * Variant `default`: Nền `primary` (Royal Blue), chữ trắng. Dùng cho hành động phụ.
      * Variant `gold`: Nền `accent` (Gold), chữ trắng, hiệu ứng shadow. Dùng cho nút **"Đặt ngay"** (CTA chính).
      * Variant `outline`: Viền `primary`, nền trong suốt. Dùng cho nút "Xem chi tiết".
2.  **Input & Select:**
      * Style chung: Border mỏng, bo góc nhẹ (rounded-md), focus sẽ có viền màu Primary.
3.  **Card (`card.tsx`):**
      * Nền trắng (`bg-surface`), shadow nhẹ (`shadow-sm`), hover lên thì shadow đậm hơn (`hover:shadow-lg`).

### Bước 2.2: Global Layout Components

Tạo thư mục `src/components/layout`:

1.  **Header (`Header.tsx`):**

      * **Logic:** Thanh điều hướng (Navbar) sẽ trong suốt (transparent) khi ở đầu trang (đè lên ảnh Hero) và chuyển sang nền trắng (solid white) + shadow khi người dùng cuộn xuống.
      * **Logo:** Nằm bên trái.
      * **Menu:** "Trang chủ", "Phòng & Giá", "Về chúng tôi", "Liên hệ".
      * **CTA Button:** Nút "Đặt phòng ngay" luôn hiện ở góc phải.

2.  **Footer (`Footer.tsx`):**

      * Nền tối (`bg-gray-900`), chữ trắng.
      * Chia 4 cột: Logo & Brand Story, Liên kết nhanh, Thông tin liên hệ, Mạng xã hội.

-----

## GIAI ĐOẠN 3: TRIỂN KHAI CÁC TRANG CHÍNH (PAGE IMPLEMENTATION)

Dựa trên Sitemap đã thiết kế, chúng ta sẽ lần lượt dựng khung (wireframe to code) cho các trang.

### Bước 3.1: Trang Chủ (Homepage) - The First Impression

Đây là trang quan trọng nhất. Cấu trúc file: `src/app/page.tsx`.

  * **Hero Section:**
      * Sử dụng thẻ `video` hoặc `Image` làm nền full-screen.
      * Tiêu đề lớn dùng font `Playfair Display`: *"Trải nghiệm nét Huế bình yên"*.
  * **Search Widget (Component quan trọng):**
      * Tạo component `src/components/booking/SearchAvailability.tsx`.
      * Vị trí: Nằm đè lên phần dưới của Hero Section (âm margin-top).
      * Giao diện: Một thanh ngang màu trắng, chia làm 3 ô input (Chi nhánh, Ngày đi/về, Số người) và 1 nút Tìm kiếm màu Gold to bản.
  * **Featured Rooms:** Sử dụng Grid Layout (3 cột) hiển thị danh sách phòng tiêu biểu (fetch từ Directus `room_types`).

### Bước 3.2: Trang Chi tiết Chi nhánh (Branch Detail)

Cấu trúc file: `src/app/branch/[slug]/page.tsx`.

  * **Header Image:** Ảnh cover khổ rộng, hiển thị tên chi nhánh đè lên.
  * **Inventory List (Danh sách phòng):**
      * Thay vì Grid, sử dụng Layout dạng List (Hàng ngang) để khách dễ so sánh.
      * Bên trái: Ảnh thumbnail + Tên phòng.
      * Giữa: Tiện ích (Icon giường, wifi...) + Sức chứa.
      * Bên phải: Giá tiền (Màu đỏ/Gold) + Nút "Chọn phòng".

### Bước 3.3: Trang Tìm kiếm & Đặt phòng (Booking Flow)

Đây là phần logic phức tạp cần xử lý ở giai đoạn sau, nhưng về UI cần dựng sẵn khung:

  * **File:** `src/app/search/page.tsx`.
  * **Layout:**
      * Sidebar bên trái: Bộ lọc (Filter) theo giá, tiện ích.
      * Content bên phải: Kết quả tìm kiếm. Nếu không có phòng, hiển thị component `EmptyState` với lời nhắn thân thiện.

-----

## GIAI ĐOẠN 4: TÍCH HỢP DỮ LIỆU (DATA INTEGRATION)

Sau khi UI đã hoàn thiện (Static), chúng ta sẽ "thổi hồn" vào nó bằng dữ liệu thật từ Directus.

1.  **Directus Client:** Sử dụng `src/lib/directus.ts` (đã setup) để gọi API.
2.  **Server Components:** Tận dụng sức mạnh của Next.js 14 để fetch data ngay trên server (tại `page.tsx`) rồi truyền xuống các Client Component (như `SearchWidget`, `RoomList`) dưới dạng props.
3.  **Image Optimization:** Sử dụng hàm `getAssetUrl` kết hợp với `next/image` để tối ưu hóa việc tải ảnh, tránh làm chậm web.
