import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-surface)] px-5">
      <div className="text-center">
        <h1 className="heading-font mb-4 text-6xl font-bold text-[var(--color-primary)]">404</h1>
        <h2 className="heading-font mb-4 text-3xl font-semibold text-[var(--color-primary)]">
          Branch Not Found
        </h2>
        <p className="mb-8 text-[var(--color-muted)]">
          The branch you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/">
          <Button variant="gold">Go Back Home</Button>
        </Link>
      </div>
    </main>
  );
}

