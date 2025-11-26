"use client";

import clsx from "clsx";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type RefObject,
} from "react";

type PopoverContextValue = {
  open: boolean;
  setOpen: (next: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

const PopoverContext = createContext<PopoverContextValue | null>(null);

const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within a <Popover> root.");
  }
  return context;
};

type PopoverProps = {
  children: ReactNode;
};

export function Popover({ children }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-block w-full">{children}</div>
    </PopoverContext.Provider>
  );
}

type PopoverTriggerProps = ComponentPropsWithoutRef<"button"> & {
  children: ReactNode;
};

export function PopoverTrigger({
  children,
  className,
  onClick,
  ...props
}: PopoverTriggerProps) {
  const { open, setOpen, triggerRef } = usePopoverContext();

  return (
    <button
      ref={triggerRef}
      type="button"
      aria-expanded={open}
      onClick={(event) => {
        onClick?.(event);
        setOpen(!open);
      }}
      className={clsx(
        "flex w-full items-center justify-between rounded-xl border border-transparent bg-white px-4 py-3 text-left shadow-sm transition hover:border-[var(--color-primary)]/30 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

type PopoverContentProps = ComponentPropsWithoutRef<"div"> & {
  align?: "start" | "end" | "center";
};

export function PopoverContent({
  children,
  className,
  align = "start",
  ...props
}: PopoverContentProps) {
  const { open, setOpen, triggerRef } = usePopoverContext();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, setOpen, triggerRef]);

  if (!open) return null;

  const alignment =
    align === "end"
      ? "right-0"
      : align === "center"
      ? "left-1/2 -translate-x-1/2"
      : "left-0";

  return (
    <div
      ref={contentRef}
      className={clsx(
        "absolute z-50 mt-3 w-[min(360px,calc(100vw-3rem))] rounded-2xl border border-black/5 bg-white p-4 shadow-2xl shadow-black/10 ring-1 ring-black/5",
        alignment,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
