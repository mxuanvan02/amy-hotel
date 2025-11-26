import { clsx } from "clsx";
import { type ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "outline" | "primary" | "link";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      gold: "bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary)]/90 focus:ring-[var(--color-secondary)] shadow-lg shadow-[var(--color-secondary)]/25",
      outline:
        "border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 focus:ring-[var(--color-primary)]",
      primary:
        "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 focus:ring-[var(--color-primary)] shadow-lg shadow-[rgba(31,37,68,0.25)]",
      link: "text-[var(--color-primary)] underline-offset-4 hover:underline",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
