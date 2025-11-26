import { StaticPage } from "@/components/layout/StaticPage";
import Image from "next/image";

export default function AboutPage() {
  return (
    <StaticPage title="About Us">
      <p className="lead text-xl font-medium text-[var(--color-primary)]">
        Amy Accommodation is more than just a place to sleep. We are curators of
        exceptional experiences, dedicated to redefining hospitality in Vietnam.
      </p>

      <div className="my-12 relative h-64 w-full overflow-hidden rounded-2xl">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
          alt="Luxury Hotel Lobby"
          fill
          className="object-cover"
        />
      </div>

      <h3>Our Story</h3>
      <p>
        Founded in 2024, Amy Accommodation began with a simple vision: to create
        a network of boutique properties that offer the consistency of a luxury
        chain with the character of a local home. We started with a single
        property in Da Nang and have since expanded to key destinations across
        the country.
      </p>

      <h3>Our Philosophy</h3>
      <p>
        We believe that true luxury lies in the details. From the thread count
        of our linens to the warmth of our welcome, every aspect of your stay is
        carefully considered. We prioritize:
      </p>
      <ul>
        <li>
          <strong>Design:</strong> Spaces that inspire and relax.
        </li>
        <li>
          <strong>Service:</strong> Anticipating needs before they are
          expressed.
        </li>
        <li>
          <strong>Locality:</strong> Connecting guests with the authentic
          culture of each destination.
        </li>
      </ul>

      <h3>The Amy Standard</h3>
      <p>
        Every property in our collection, whether a city apartment or a
        beachside villa, adheres to the "Amy Standard" of quality, cleanliness,
        and comfort. When you book with us, you know exactly what to expect.
      </p>
    </StaticPage>
  );
}
