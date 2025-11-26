import { StaticPage } from "@/components/layout/StaticPage";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HelpPage() {
  return (
    <StaticPage title="Help Center">
      <p className="lead text-xl">
        Need assistance? We are here to support you 24/7.
      </p>

      <div className="grid gap-8 md:grid-cols-2 mt-8 not-prose">
        <div className="rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
            Manage Booking
          </h3>
          <p className="text-sm text-[var(--color-muted)] mb-4">
            View, modify, or cancel your upcoming reservations.
          </p>
          <Link href="/booking/search">
            <Button variant="outline" className="w-full">
              Find My Booking
            </Button>
          </Link>
        </div>

        <div className="rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
            Contact Support
          </h3>
          <p className="text-sm text-[var(--color-muted)] mb-4">
            Speak directly with our customer service team.
          </p>
          <Button className="w-full">Chat with Us</Button>
        </div>
      </div>

      <div className="mt-12">
        <h3>Popular Topics</h3>
        <ul>
          <li>
            <Link href="/cancellation">Cancellation Policy</Link>
          </li>
          <li>
            <Link href="/faq">Payment Options</Link>
          </li>
          <li>
            <Link href="/faq">Check-in Instructions</Link>
          </li>
        </ul>
      </div>
    </StaticPage>
  );
}
