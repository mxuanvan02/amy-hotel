"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useBookingStore } from "@/store/use-booking-store";
import {
  CheckCircle,
  Copy,
  Home,
  Search,
  CreditCard,
  Banknote,
  QrCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingService } from "@/services/booking.service";
import type { Booking } from "@/types/schema";
import { formatCurrency } from "@/lib/utils";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  const { clearCart } = useBookingStore();

  useEffect(() => {
    if (!id) {
      router.push("/");
      return;
    }

    // Clear cart on successful load
    clearCart();

    const fetchBooking = async () => {
      try {
        const data = await BookingService.getById(Number(id));
        if (data) {
          setBooking(data as Booking);
        }
      } catch (error) {
        console.error("Failed to fetch booking", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id, router]);

  const copyToClipboard = () => {
    if (booking?.code) {
      navigator.clipboard.writeText(booking.code);
      // Could add toast here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-surface)] p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Booking Not Found
        </h1>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-surface)] py-12 px-4">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <h1 className="heading-font mb-4 text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">
          Booking Confirmed!
        </h1>
        <p className="mb-8 text-lg text-[var(--color-muted)]">
          Thank you for choosing Amy Hotel. Your reservation has been
          successfully created.
        </p>

        {/* Booking Code Card */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100">
          <div className="bg-[var(--color-primary)] p-4 text-white">
            <p className="text-sm font-medium uppercase tracking-wider opacity-90">
              Booking Reference
            </p>
          </div>
          <div className="p-8">
            <div className="flex items-center justify-center gap-4">
              <span className="font-mono text-3xl font-bold tracking-wider text-[var(--color-primary)]">
                {booking.code}
              </span>
              <button
                onClick={copyToClipboard}
                className="rounded-full p-2 hover:bg-gray-100 transition-colors text-gray-500"
                title="Copy Code"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Please save this code to check your booking status later.
            </p>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="mb-12 rounded-2xl bg-white p-6 shadow-md border border-gray-100 text-left">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-primary)] flex items-center gap-2">
            <CreditCard className="h-5 w-5" /> Payment Instructions
          </h2>

          <div className="space-y-4 text-sm text-gray-600">
            <p>
              <strong>Payment Method:</strong>{" "}
              <span className="capitalize">
                {booking.payment_method?.replace("_", " ")}
              </span>
            </p>
            <p>
              <strong>Total Amount:</strong>{" "}
              <span className="text-lg font-bold text-[var(--color-secondary)]">
                {formatCurrency(booking.total_price)}
              </span>
            </p>

            <div className="mt-4 rounded-lg bg-gray-50 p-4 border border-gray-200">
              {booking.payment_method === "bank_transfer" && (
                <div className="space-y-2">
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    <QrCode className="h-4 w-4" /> Bank Transfer Details:
                  </p>
                  <p>
                    Bank: <strong>Vietcombank</strong>
                  </p>
                  <p>
                    Account Name: <strong>AMY HOTEL GROUP</strong>
                  </p>
                  <p>
                    Account Number: <strong>0123456789</strong>
                  </p>
                  <p>
                    Content: <strong>{booking.code}</strong>
                  </p>
                </div>
              )}

              {booking.payment_method === "cash" && (
                <div className="space-y-2">
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    <Banknote className="h-4 w-4" /> Pay at Hotel:
                  </p>
                  <p>
                    Please present your booking code at the reception desk upon
                    arrival.
                  </p>
                  <p>Payment will be collected during check-in.</p>
                </div>
              )}

              {(booking.payment_method === "vnpay" ||
                booking.payment_method === "momo") && (
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">E-Wallet Payment:</p>
                  <p>
                    Please scan the QR code at the counter or wait for our
                    payment link sent to your email.
                  </p>
                  <p className="text-xs text-gray-500">
                    (Mock: In production, this would redirect to payment
                    gateway)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto gap-2">
              <Home className="h-4 w-4" /> Return Home
            </Button>
          </Link>
          <Link href="/booking/search">
            <Button className="w-full sm:w-auto gap-2">
              <Search className="h-4 w-4" /> Check Booking Status
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
