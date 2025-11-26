import { Breadcrumbs } from "@/components/ui/breadcrumbs";

interface StaticPageProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function StaticPage({ title, lastUpdated, children }: StaticPageProps) {
  return (
    <main className="min-h-screen bg-[var(--color-surface)]">
      <div className="mx-auto max-w-4xl px-5 py-12">
        <Breadcrumbs />

        <div className="mb-12 text-center">
          <h1 className="heading-font mb-4 text-4xl font-bold text-[var(--color-primary)]">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-sm text-[var(--color-muted)]">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>

        <div className="prose prose-lg mx-auto text-[var(--color-muted)] prose-headings:font-serif prose-headings:text-[var(--color-primary)] prose-a:text-[var(--color-secondary)]">
          {children}
        </div>
      </div>
    </main>
  );
}
