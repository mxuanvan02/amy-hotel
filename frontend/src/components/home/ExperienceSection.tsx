import Image from "next/image";
import { Utensils, Sparkles, Car } from "lucide-react";

const experiences = [
  {
    title: "Culinary Delight",
    description:
      "Savor authentic local flavors and international cuisine prepared by world-class chefs.",
    icon: Utensils,
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Wellness & Spa",
    description:
      "Rejuvenate your senses with our signature spa treatments and state-of-the-art fitness centers.",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Premium Transport",
    description:
      "Arrive in style with our private airport transfer and luxury car rental services.",
    icon: Car,
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
  },
];

export function ExperienceSection() {
  return (
    <section className="bg-[var(--color-surface)] py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)] mb-3">
            The Experience
          </p>
          <h2 className="heading-font text-3xl font-bold text-[var(--color-primary)] md:text-4xl">
            More Than Just a Stay
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {experiences.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 text-white">
                  <item.icon className="h-6 w-6 mb-2" />
                  <h3 className="heading-font text-xl font-semibold">
                    {item.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
