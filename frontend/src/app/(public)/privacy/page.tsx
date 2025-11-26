import { StaticPage } from "@/components/layout/StaticPage";

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" lastUpdated="November 26, 2024">
      <p>
        At Amy Accommodation, we value your privacy and are committed to
        protecting your personal data. This policy outlines how we collect, use,
        and safeguard your information.
      </p>

      <h3>1. Information We Collect</h3>
      <p>
        We collect information you provide directly to us, such as your name,
        email address, phone number, and payment details when you make a
        booking.
      </p>

      <h3>2. How We Use Your Information</h3>
      <p>
        We use your information to process your reservations, communicate with
        you about your stay, and improve our services. We do not sell your
        personal data to third parties.
      </p>

      <h3>3. Data Security</h3>
      <p>
        We implement appropriate technical and organizational measures to
        protect your personal data against unauthorized access, alteration,
        disclosure, or destruction.
      </p>

      <h3>4. Your Rights</h3>
      <p>
        You have the right to access, correct, or delete your personal data.
        Please contact us if you wish to exercise these rights.
      </p>
    </StaticPage>
  );
}
