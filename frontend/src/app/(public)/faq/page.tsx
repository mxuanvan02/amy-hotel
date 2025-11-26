import { StaticPage } from "@/components/layout/StaticPage";

export default function FAQPage() {
  return (
    <StaticPage
      title="Frequently Asked Questions"
      lastUpdated="November 26, 2024"
    >
      <h3>Check-in & Check-out</h3>
      <p>
        <strong>Q: What are the check-in and check-out times?</strong>
        <br />
        A: Standard check-in is from 2:00 PM, and check-out is until 12:00 PM
        (noon). Early check-in or late check-out may be available upon request
        and subject to availability.
      </p>

      <h3>Booking & Payment</h3>
      <p>
        <strong>Q: Do I need a credit card to book?</strong>
        <br />
        A: It depends on the rate plan. Some rates require prepayment, while
        others allow you to pay at the hotel. We also accept bank transfers and
        e-wallets.
      </p>

      <h3>Amenities</h3>
      <p>
        <strong>Q: Is breakfast included?</strong>
        <br />
        A: Most of our room rates include a complimentary breakfast. Please
        check your specific booking details to confirm.
      </p>

      <p>
        <strong>Q: Do you offer airport transfers?</strong>
        <br />
        A: Yes, we can arrange airport transfers for an additional fee. Please
        contact us at least 24 hours in advance to arrange this service.
      </p>
    </StaticPage>
  );
}
