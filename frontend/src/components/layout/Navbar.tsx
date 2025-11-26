"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const isScrolledState = scrolled || !isHome || mobileMenuOpen;

  const textColor = isScrolledState
    ? "text-[var(--color-primary)]"
    : "text-white";
  const subTextColor = isScrolledState
    ? "text-[var(--color-muted)]"
    : "text-white/90";
  const logoBg = isScrolledState
    ? "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]"
    : "bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/20";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolledState
          ? "bg-white/95 shadow-lg shadow-black/10 backdrop-blur-md border-b border-gray-200/50"
          : "bg-gradient-to-b from-black/60 via-black/30 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity z-50"
        >
          <div
            className={`h-10 w-10 rounded-full ${logoBg} shadow-lg transition-all duration-300`}
          />
          <div>
            <span
              className={`heading-font text-lg font-semibold ${textColor} drop-shadow-sm`}
            >
              Amy Accommodation
            </span>
            <p className={`text-xs ${subTextColor} drop-shadow-sm`}>
              Curated luxury stays
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav
          className={`hidden items-center gap-8 text-sm font-medium ${textColor} md:flex`}
        >
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-[var(--color-secondary)] ${
                  isActive
                    ? "text-[var(--color-secondary)] font-semibold"
                    : textColor
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/destinations"
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)] ${
              isScrolledState
                ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                : "border-white/80 text-white hover:bg-white/10 backdrop-blur-sm"
            }`}
          >
            View Locations
          </Link>
          <Link
            href="/destinations"
            className={`rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 ${
              isScrolledState
                ? "bg-[var(--color-primary)] shadow-[rgba(31,37,68,0.3)] hover:bg-[var(--color-primary)]/90"
                : "bg-[var(--color-primary)]/90 backdrop-blur-sm border border-white/20 shadow-[rgba(0,0,0,0.2)] hover:bg-[var(--color-primary)]"
            }`}
          >
            Book now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden z-50 p-2 ${textColor}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-white/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
            mobileMenuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <nav className="flex flex-col items-center gap-8 text-lg font-medium text-[var(--color-primary)]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-[var(--color-secondary)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/destinations"
              className="rounded-full border border-[var(--color-primary)] px-6 py-3 transition hover:bg-[var(--color-primary)] hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              View Locations
            </Link>
            <Link
              href="/destinations"
              className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-white shadow-lg transition hover:bg-[var(--color-primary)]/90"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book now
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
