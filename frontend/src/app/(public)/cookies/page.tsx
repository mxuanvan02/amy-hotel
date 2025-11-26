import { StaticPage } from "@/components/layout/StaticPage";

export default function CookiesPage() {
  return (
    <StaticPage title="Cookie Policy" lastUpdated="November 26, 2024">
      <p>
        Amy Accommodation uses cookies to enhance your browsing experience,
        serve personalized content, and analyze our traffic.
      </p>

      <h3>What are Cookies?</h3>
      <p>
        Cookies are small text files that are stored on your device when you
        visit a website. They help the website remember your preferences and
        login status.
      </p>

      <h3>How We Use Cookies</h3>
      <ul>
        <li>
          <strong>Essential Cookies:</strong> Necessary for the website to
          function (e.g., booking cart).
        </li>
        <li>
          <strong>Analytics Cookies:</strong> Help us understand how visitors
          interact with our website.
        </li>
        <li>
          <strong>Marketing Cookies:</strong> Used to deliver relevant
          advertisements.
        </li>
      </ul>

      <h3>Managing Cookies</h3>
      <p>
        You can control and manage cookies through your browser settings. Please
        note that disabling cookies may affect the functionality of our website.
      </p>
    </StaticPage>
  );
}
