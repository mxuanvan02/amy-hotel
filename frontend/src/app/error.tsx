"use client";

import Link from "next/link";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[App Error]:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center bg-[var(--color-surface)] text-[var(--color-primary)]">
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
        <span className="text-2xl">⚠️</span>
      </div>
      <h1 className="heading-font text-3xl font-semibold">
        Oops, something went wrong
      </h1>
      <p className="mt-3 max-w-xl text-[var(--color-muted)]">
        Chúng tôi gặp sự cố khi tải trang. Vui lòng thử lại hoặc quay về trang
        chủ.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(31,37,68,0.25)] transition hover:-translate-y-0.5 hover:bg-[var(--color-primary)]/90"
        >
          Thử lại
        </button>
        <Link
          href="/"
          className="rounded-full border border-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-primary)] transition hover:-translate-y-0.5 hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
