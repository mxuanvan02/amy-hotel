"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import {
  Search,
  Calendar,
  User,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BookingService } from "@/services/booking.service";
import { formatCurrency } from "@/lib/utils";
import type { Booking } from "@/types/schema";

const formSchema = z.object({
  code: z.string().min(1, "Please enter your booking code"),
});

export default function BookingLookupPage() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setBooking(null);
    setSearched(true);

    try {
      const result = await BookingService.getByCode(values.code.trim());
      if (result) {
        setBooking(result);
      } else {
        setError("Booking not found. Please check your code and try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while searching. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-50 border-green-200";
      case "completed":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
    }
  };

  const getPaymentStatusColor = (status?: string) => {
    switch (status) {
      case "paid":
        return "text-green-600 bg-green-50 border-green-200";
      case "deposit_paid":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "refunded":
        return "text-purple-600 bg-purple-50 border-purple-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-surface)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs />
        <div className="text-center mb-10">
          <h1 className="heading-font text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">
            Find Your Booking
          </h1>
          <p className="mt-2 text-[var(--color-muted)]">
            Enter your booking code (e.g., AMY-2024...) to view details
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="flex-1">
              <Input
                placeholder="Enter Booking Code"
                {...form.register("code")}
                className="h-12 text-lg"
              />
              {form.formState.errors.code && (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.code.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-12 px-8"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 animate-spin" /> Searching...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="h-4 w-4" /> Find Booking
                </span>
              )}
            </Button>
          </form>
        </div>

        {/* Results */}
        {error && (
          <div className="rounded-xl bg-red-50 p-4 text-red-800 flex items-center gap-3 border border-red-100">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {booking && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="bg-[var(--color-primary)] p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-white/80 text-sm uppercase tracking-wider font-medium">
                  Booking Reference
                </p>
                <h2 className="text-2xl font-bold font-mono mt-1">
                  {booking.code}
                </h2>
              </div>
              <div
                className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide bg-white/20 backdrop-blur-sm`}
              >
                {booking.status}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Customer & Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                    Customer Details
                  </h3>
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-[var(--color-primary)] mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {booking.customer_name}
                      </p>
                      <p className="text-gray-500">{booking.customer_phone}</p>
                      {booking.customer_email && (
                        <p className="text-gray-500">
                          {booking.customer_email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                    Stay Dates
                  </h3>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-[var(--color-primary)] mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {format(new Date(booking.check_in), "EEE, MMM d, yyyy")}
                      </p>
                      <p className="text-gray-500 text-sm">to</p>
                      <p className="font-medium text-gray-900">
                        {format(
                          new Date(booking.check_out),
                          "EEE, MMM d, yyyy"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 my-6"></div>

              {/* Payment Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                  Payment Information
                </h3>
                <div className="flex flex-wrap gap-4">
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium ${getPaymentStatusColor(
                      booking.payment_status
                    )}`}
                  >
                    {booking.payment_status === "paid" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                    <span className="capitalize">
                      {booking.payment_status?.replace("_", " ") || "Unpaid"}
                    </span>
                  </div>

                  {booking.payment_method && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 text-sm font-medium">
                      <CreditCard className="h-4 w-4" />
                      <span className="capitalize">
                        {booking.payment_method.replace("_", " ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-100 my-6"></div>

              {/* Items */}
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-4">
                  Room Details
                </h3>
                {booking.items && booking.items.length > 0 ? (
                  <div className="space-y-3">
                    {booking.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center bg-gray-50 p-4 rounded-xl"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {typeof item.room_type_id === "object"
                              ? item.room_type_id.name
                              : "Room"}
                          </p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-[var(--color-primary)]">
                          {formatCurrency(item.price_snapshot)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    No room details available
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-lg font-bold text-gray-900">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-[var(--color-secondary)]">
                  {formatCurrency(booking.total_price)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
