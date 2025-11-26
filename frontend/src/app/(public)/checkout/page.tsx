"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useBookingStore } from "@/store/use-booking-store";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { BookingService } from "@/services/booking.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const checkoutSchema = z.object({
  customer_name: z.string().min(1, "Name is required"),
  customer_phone: z.string().min(6, "Phone number is required"),
  customer_email: z
    .string()
    .email("Invalid email")
    .optional()
    .or(z.literal("")),
  note: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { dateRange, guests, cart, getTotalPrice, clearCart } =
    useBookingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      router.push("/");
    }
  }, [cart, router]);

  const calculateNights = () => {
    if (!dateRange.from || !dateRange.to) return 0;
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);
    const diffTime = toDate.getTime() - fromDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const subtotal = getTotalPrice();
  const totalPrice = subtotal * nights;

  const onSubmit = async (data: CheckoutFormData) => {
    if (!dateRange.from || !dateRange.to || cart.length === 0) {
      setError("Please complete your booking details");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare booking items from cart
      const bookingItems = cart.map((item) => ({
        room_type_id: item.roomTypeId,
        quantity: item.quantity,
        price_snapshot: item.price,
      }));

      const booking = await BookingService.create(
        {
          customer_name: data.customer_name,
          customer_phone: data.customer_phone,
          customer_email: data.customer_email || undefined,
          check_in: format(new Date(dateRange.from), "yyyy-MM-dd"),
          check_out: format(new Date(dateRange.to), "yyyy-MM-dd"),
          total_price: totalPrice,
          payment_status: "unpaid", // Default to unpaid
          payment_method: selectedPaymentMethod,
          note: data.note || undefined,
        },
        bookingItems
      ); // Pass items array

      // Redirect to success page (cart will be cleared there)
      router.push(`/checkout/success?id=${booking.id}`);
    } catch (err: any) {
      console.error("Booking error:", err);
      // Show more detailed error if available
      const errorMessage =
        err?.errors?.[0]?.message ||
        err?.message ||
        "Failed to create booking. Please try again.";
      setError(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <Breadcrumbs />
        <h1 className="heading-font mb-8 text-3xl font-semibold text-[var(--color-primary)] lg:hidden">
          Checkout
        </h1>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Column: Booking Summary (Sticky) */}
          <div className="order-1 lg:order-1">
            <div className="sticky top-24 space-y-6">
              <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-black/5 ring-1 ring-black/5">
                {/* Cover Image from first cart item */}
                <div className="relative h-48 w-full bg-gray-100">
                  {/* We use the first item's image if available, or a generic hotel image */}
                  <img
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
                    alt="Hotel Cover"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6 text-white">
                    <p className="text-sm font-medium opacity-90">
                      Your Stay at
                    </p>
                    <h2 className="heading-font text-2xl font-bold">
                      Amy Accommodation
                    </h2>
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  <h3 className="heading-font mb-6 text-xl font-semibold text-[var(--color-primary)]">
                    Booking Details
                  </h3>

                  {/* Date & Guests */}
                  <div className="mb-8 grid grid-cols-2 gap-6 border-b border-dashed border-gray-200 pb-8">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                        Check-in
                      </p>
                      <p className="mt-1 font-medium text-[var(--color-primary)]">
                        {dateRange.from
                          ? format(new Date(dateRange.from), "MMM dd, yyyy")
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                        Check-out
                      </p>
                      <p className="mt-1 font-medium text-[var(--color-primary)]">
                        {dateRange.to
                          ? format(new Date(dateRange.to), "MMM dd, yyyy")
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                        Duration
                      </p>
                      <p className="mt-1 font-medium text-[var(--color-primary)]">
                        {nights} Nights
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                        Guests
                      </p>
                      <p className="mt-1 font-medium text-[var(--color-primary)]">
                        {guests.adults + guests.children} Guests
                      </p>
                    </div>
                  </div>

                  {/* Room List */}
                  <div className="mb-8 space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.roomTypeId}
                        className="flex justify-between text-sm"
                      >
                        <div>
                          <p className="font-medium text-[var(--color-primary)]">
                            {item.roomName}
                          </p>
                          <p className="text-xs text-[var(--color-muted)]">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-[var(--color-primary)]">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                    <span className="text-lg font-medium text-[var(--color-primary)]">
                      Total
                    </span>
                    <span className="heading-font text-2xl font-bold text-[var(--color-secondary)]">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex justify-center gap-6 text-xs text-[var(--color-muted)] opacity-80">
                <span className="flex items-center gap-1">
                  🔒 Secure Payment
                </span>
                <span className="flex items-center gap-1">
                  ✨ Best Price Guarantee
                </span>
                <span className="flex items-center gap-1">📞 24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="order-2 lg:order-2">
            <div className="mb-8 hidden lg:block">
              <h1 className="heading-font text-4xl font-semibold text-[var(--color-primary)]">
                Confirm Your Stay
              </h1>
              <p className="mt-2 text-[var(--color-muted)]">
                Please enter your details to complete the reservation.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Guest Info Section */}
              <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 lg:p-8">
                <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-[var(--color-primary)]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs text-white">
                    1
                  </span>
                  Guest Information
                </h3>

                <div className="grid gap-6">
                  <Input
                    label="Full Name *"
                    {...register("customer_name")}
                    error={errors.customer_name?.message}
                    className="bg-gray-50/50"
                  />
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Input
                      label="Phone Number *"
                      type="tel"
                      {...register("customer_phone")}
                      error={errors.customer_phone?.message}
                      className="bg-gray-50/50"
                    />
                    <Input
                      label="Email (Optional)"
                      type="email"
                      {...register("customer_email")}
                      error={errors.customer_email?.message}
                      className="bg-gray-50/50"
                    />
                  </div>
                </div>
              </section>

              {/* Payment Section */}
              <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 lg:p-8">
                <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-[var(--color-primary)]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs text-white">
                    2
                  </span>
                  Payment Method
                </h3>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { id: "cash", label: "Pay at Hotel", icon: "🏨" },
                    { id: "bank_transfer", label: "Bank Transfer", icon: "🏦" },
                    { id: "vnpay", label: "VNPay", icon: "💳" },
                    { id: "momo", label: "MoMo Wallet", icon: "📱" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`relative flex cursor-pointer flex-col gap-1 rounded-xl border p-4 transition-all hover:border-[var(--color-primary)]/50 ${
                        selectedPaymentMethod === method.id
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 ring-1 ring-[var(--color-primary)]"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={(e) =>
                          setSelectedPaymentMethod(e.target.value)
                        }
                        className="sr-only"
                      />
                      <span className="text-2xl">{method.icon}</span>
                      <span
                        className={`font-medium ${
                          selectedPaymentMethod === method.id
                            ? "text-[var(--color-primary)]"
                            : "text-gray-700"
                        }`}
                      >
                        {method.label}
                      </span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Notes Section */}
              <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 lg:p-8">
                <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-[var(--color-primary)]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs text-white">
                    3
                  </span>
                  Special Requests
                </h3>
                <textarea
                  {...register("note")}
                  rows={3}
                  placeholder="Any special requests? (e.g. late check-in, dietary restrictions)"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />
              </section>

              {error && (
                <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
                  <p className="font-semibold">Booking Failed</p>
                  <p>{error}</p>
                </div>
              )}

              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full text-lg shadow-xl shadow-orange-500/20 transition-transform hover:-translate-y-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Processing...
                  </span>
                ) : (
                  `Complete Booking • ${formatCurrency(totalPrice)}`
                )}
              </Button>

              <p className="text-center text-xs text-[var(--color-muted)]">
                By clicking "Complete Booking", you agree to our Terms &
                Conditions and Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
