import { StaticPage } from "@/components/layout/StaticPage";

export default function TermsPage() {
  return (
    <StaticPage title="Terms of Service" lastUpdated="November 26, 2024">
      <p>
        Welcome to Amy Accommodation. By accessing our website and using our
        services, you agree to be bound by the following terms and conditions.
      </p>

      <h3>1. Booking & Reservations</h3>
      <p>
        All bookings are subject to availability and acceptance by Amy
        Accommodation. When you make a reservation, you agree to provide
        accurate and complete information.
      </p>

      <h3>2. Payment Policy</h3>
      <p>
        Payment terms vary by rate plan. For prepaid rates, full payment is
        required at the time of booking. For flexible rates, payment may be
        collected upon arrival.
      </p>

      <h3>3. Cancellation Policy</h3>
      <p>
        Cancellations must be made within the timeframe specified in your
        booking confirmation. Late cancellations or no-shows may be subject to a
        fee equivalent to the first night's stay.
      </p>

      <h3>4. House Rules</h3>
      <p>
        Guests are expected to respect the property and other guests. Smoking is
        strictly prohibited in non-smoking rooms. Pets are not allowed unless
        specifically stated.
      </p>
    </StaticPage>
  );
}
