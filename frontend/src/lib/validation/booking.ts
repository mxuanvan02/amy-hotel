import { z } from "zod";

export const bookingSchema = z
  .object({
    customerName: z.string().min(1, "Vui lòng nhập tên khách"),
    email: z.string().email("Email không hợp lệ").optional(),
    phone: z.string().min(6, "Số điện thoại không hợp lệ"),
    checkIn: z.coerce.date(),
    checkOut: z.coerce.date(),
    guests: z.number().min(1, "Phải có ít nhất 1 khách"),
    totalPrice: z.number().nonnegative().optional(),
    notes: z.string().max(500, "Ghi chú tối đa 500 ký tự").optional(),
  })
  .refine((data) => data.checkOut > data.checkIn, {
    message: "Ngày trả phòng phải sau ngày nhận phòng",
    path: ["checkOut"],
  });

export type BookingPayload = z.infer<typeof bookingSchema>;
