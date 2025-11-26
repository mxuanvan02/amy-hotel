import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Jenkins",
    location: "United Kingdom",
    rating: 5,
    text: "The attention to detail at Amy Da Nang was impeccable. From the welcome drink to the personalized turn-down service, everything was perfect.",
  },
  {
    name: "Minh Tuan",
    location: "Vietnam",
    rating: 5,
    text: "Không gian sang trọng nhưng vẫn rất ấm cúng. Nhân viên cực kỳ thân thiện và chuyên nghiệp. Chắc chắn sẽ quay lại.",
  },
  {
    name: "Michael Chen",
    location: "Singapore",
    rating: 5,
    text: "Best hotel experience I've had in years. The location is convenient, and the room views are breathtaking.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)] mb-3">
            Guest Stories
          </p>
          <h2 className="heading-font text-3xl font-bold text-[var(--color-primary)] md:text-4xl">
            What Our Guests Say
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[var(--color-surface)] p-8 shadow-sm border border-gray-100"
            >
              <div className="flex gap-1 mb-4 text-yellow-500">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mb-6 text-[var(--color-primary)] italic font-medium">
                "{review.text}"
              </p>
              <div>
                <p className="font-semibold text-[var(--color-primary)]">
                  {review.name}
                </p>
                <p className="text-xs text-[var(--color-muted)]">
                  {review.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
