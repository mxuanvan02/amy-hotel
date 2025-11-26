"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";

const routeLabels: Record<string, string> = {
  branch: "Locations",
  checkout: "Checkout",
  success: "Confirmation",
  booking: "My Booking",
  search: "Search",
};

export function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show on home page
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex items-center text-sm text-[var(--color-muted)]"
    >
      <Link
        href="/"
        className="flex items-center gap-1 transition hover:text-[var(--color-primary)]"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>

      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;

        // Format label: use map or capitalize
        let label = routeLabels[segment] || segment;

        // If it looks like a slug or ID (long string), truncate or format
        if (segment.length > 20) {
          label = `${segment.substring(0, 8)}...`;
        } else {
          // Capitalize first letter if not in map
          if (!routeLabels[segment]) {
            label =
              segment.charAt(0).toUpperCase() +
              segment.slice(1).replace(/-/g, " ");
          }
        }

        return (
          <Fragment key={href}>
            <ChevronRight className="mx-2 h-4 w-4 opacity-50" />
            {isLast ? (
              <span
                className="font-medium text-[var(--color-primary)]"
                aria-current="page"
              >
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className="transition hover:text-[var(--color-primary)]"
              >
                {label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
