import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1571896349842-6e53ce41e887?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Pool"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="mx-auto max-w-4xl px-5 text-center text-white">
        <h2 className="heading-font mb-4 text-3xl font-bold md:text-5xl">
          Unlock Exclusive Offers
        </h2>
        <p className="mb-8 text-lg text-white/80">
          Join our mailing list to receive special updates, secret deals, and
          travel inspiration directly to your inbox.
        </p>

        <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
          <Input
            type="email"
            placeholder="Your email address"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
          />
          <Button variant="gold" className="whitespace-nowrap">
            Subscribe Now
          </Button>
        </form>
        <p className="mt-4 text-xs text-white/60">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
