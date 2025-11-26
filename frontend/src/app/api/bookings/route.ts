import { createDirectus, createItem, rest, staticToken } from "@directus/sdk";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { bookingSchema, type BookingPayload } from "@/lib/validation/booking";
import { type Booking, BookingStatus } from "@/types/schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8055";
const ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;

function getAdminClient() {
  if (!ADMIN_TOKEN) {
    throw new Error("DIRECTUS_ADMIN_TOKEN is not configured");
  }
  return createDirectus(API_URL)
    .with(staticToken(ADMIN_TOKEN))
    .with(rest());
}

function buildPayload(data: BookingPayload): Partial<Booking> {
  return {
    customer_name: data.customerName,
    check_in: data.checkIn.toISOString(),
    check_out: data.checkOut.toISOString(),
    guests: data.guests,
    total_price: data.totalPrice ?? 0,
    status: BookingStatus.PENDING,
    customer_email: data.email,
    customer_phone: data.phone,
    note: data.notes,
  };
}

async function sendConfirmationEmail(data: BookingPayload, bookingId: number) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 587);
  const from = process.env.BOOKING_MAIL_FROM || user;

  if (!host || !from) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
  });

  const recipient = data.email || from;
  const textBody = [
    "Cảm ơn bạn đã đặt phòng tại Amy Accommodation.",
    `Mã đặt phòng: ${bookingId}`,
    `Nhận phòng: ${data.checkIn.toDateString()}`,
    `Trả phòng: ${data.checkOut.toDateString()}`,
    `Số khách: ${data.guests}`,
  ].join("\n");

  await transporter.sendMail({
    from,
    to: recipient,
    subject: "Xác nhận đặt phòng - Amy Accommodation",
    text: textBody,
  });
}

export async function POST(request: Request) {
  let parsedBody: BookingPayload;

  try {
    const json = await request.json();
    const parsed = bookingSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Dữ liệu không hợp lệ", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }
    parsedBody = parsed.data;
  } catch (error) {
    console.error("[Bookings API] Parse Error:", error);
    return NextResponse.json({ message: "Payload không hợp lệ" }, { status: 400 });
  }

  try {
    const client = getAdminClient();
    const payload = buildPayload(parsedBody);
    const booking = await client.request(createItem("bookings", payload));

    try {
      await sendConfirmationEmail(parsedBody, booking.id);
    } catch (emailError) {
      console.error("[Bookings API] Email Error:", emailError);
    }

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error("[Bookings API] Error:", error);
    return NextResponse.json(
      { message: "Không thể tạo booking lúc này. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
