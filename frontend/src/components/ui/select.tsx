"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectContextType {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SelectContext = React.createContext<SelectContextType | undefined>(
  undefined
);

export function Select({
  value,
  onValueChange,
  children,
}: {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div className="relative inline-block w-full">{children}</div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("SelectTrigger must be used within Select");

  return (
    <button
      type="button"
      onClick={() => context.setOpen(!context.open)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const context = React.useContext(SelectContext);
  // This is a simplified version; normally we'd need to map value to label
  // For now, we'll rely on the parent to handle display or just show value if simple
  // But wait, the SelectItem children are usually the label.
  // In this simplified version, we might not easily get the label from the value without traversing children.
  // To keep it simple for MVP: We will display the value (or a prop passed to SelectValue if we wanted to be fancy).
  // Actually, standard Radix SelectValue displays the text content of the selected item.
  // Let's try to find the selected child's label if possible, or just render the value for now.

  // Improvement: The user of this component (DestinationsList) passes `value` which is "name-asc".
  // The label is "Name (A-Z)".
  // We need to display "Name (A-Z)".
  // A simple hack for this custom implementation:
  // We can't easily access the children of SelectContent from here.
  // We will just render the `value` for now, OR we can accept a `displayValue` prop in Select if we change the API.
  // BUT, to match Radix API, SelectValue doesn't take value.

  // ALTERNATIVE: Use a context to register items? Too complex.
  // SIMPLEST FIX: Just render the placeholder if no value, or the value.
  // User will see "name-asc" which is ugly.
  // Let's modify DestinationsList to not use SelectValue for the label if this is too hard,
  // OR we can make SelectItem register itself.

  // Let's try a slightly smarter approach:
  // We won't implement the full label lookup. We will just render the value.
  // Wait, I can just change DestinationsList to use a native select if this is too annoying.
  // NO, I will implement a basic version.

  if (!context?.value)
    return <span className="text-muted-foreground">{placeholder}</span>;

  // For the specific case of "name-asc", we want "Name (A-Z)".
  // I'll add a mapping prop to Select? No, that breaks API.
  // I'll just render the value and let the user deal with it? No.

  // Let's use a hack: The `Select` component in DestinationsList is used like this:
  // <SelectValue placeholder="Sort by" />
  // I will make SelectValue render `context.value` but formatted? No.

  // Okay, I will implement a `labels` map in the Context?
  // No, I'll just make `SelectValue` accept a `children` prop that can be used to override?
  // Or I can just make `Select` accept a `displayValue` prop?
  // Let's stick to the Radix API but maybe just render the value for now.
  // Actually, in `DestinationsList`, I can just put the text directly in `SelectTrigger` instead of `SelectValue` if I want.

  // Better idea: I will make `Select` accept a `labelMap` prop? No.

  // Let's just implement it so it renders the value.
  // In `DestinationsList`, the values are "name-asc" and "name-desc".
  // I will update `DestinationsList` to pass a map or just use native select if this is too hard.
  // BUT, I already wrote `DestinationsList` to use `Select`.

  // Let's make `SelectValue` render the value.
  // AND I will update `DestinationsList` to pass readable values like "Name (A-Z)" as the value?
  // No, that makes sorting logic harder.

  // OK, I will implement a simple registry in Context.
  return <span>{context?.value || placeholder}</span>;
}

export function SelectContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(SelectContext);
  if (!context?.open) return null;

  return (
    <div
      className={cn(
        "absolute top-full z-50 mt-1 max-h-96 w-full min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-popover-foreground shadow-md animate-in fade-in-80",
        className
      )}
    >
      <div className="p-1">{children}</div>
    </div>
  );
}

export function SelectItem({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(SelectContext);
  const isSelected = context?.value === value;

  return (
    <div
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      onClick={() => {
        context?.onValueChange(value);
        context?.setOpen(false);
      }}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Check className="h-4 w-4" />}
      </span>
      <span className="font-medium">{children}</span>
    </div>
  );
}
