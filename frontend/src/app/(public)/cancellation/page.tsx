import { StaticPage } from "@/components/layout/StaticPage";

export default function CancellationPage() {
  return (
    <StaticPage title="Cancellation Policy" lastUpdated="November 26, 2024">
      <p>
        We understand that plans can change. Our cancellation policy is designed
        to be as flexible as possible while ensuring fair operation of our
        properties.
      </p>

      <h3>Flexible Rates</h3>
      <p>
        Bookings made with our Flexible Rate can be cancelled or modified up to
        24 hours before the scheduled check-in time without any penalty.
      </p>

      <h3>Non-Refundable Rates</h3>
      <p>
        Bookings made with Non-Refundable rates cannot be cancelled or modified.
        The full amount of the stay will be charged at the time of booking.
      </p>

      <h3>No-Shows</h3>
      <p>
        If you do not arrive on the scheduled check-in date and have not
        cancelled your reservation, you will be charged a no-show fee equivalent
        to the first night's stay (for flexible rates) or the full amount (for
        non-refundable rates).
      </p>

      <h3>Refund Process</h3>
      <p>
        Eligible refunds will be processed within 7-14 business days to the
        original method of payment.
      </p>
    </StaticPage>
  );
}
