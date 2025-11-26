"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface DateRangePickerProps {
  from?: Date;
  to?: Date;
  onSelect?: (range: { from: Date | undefined; to: Date | undefined }) => void;
  className?: string;
}

export function DateRangePicker({ from, to, onSelect, className }: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(from);
  const [endDate, setEndDate] = useState<Date | undefined>(to);

  // Sync with props when they change (controlled component pattern)
  const currentFrom = from ?? startDate;
  const currentTo = to ?? endDate;

  const handleDateSelect = (date: Date, type: "from" | "to") => {
    if (type === "from") {
      setStartDate(date);
      if (currentTo && date > currentTo) {
        setEndDate(undefined);
      }
    } else {
      setEndDate(date);
    }
  };

  const handleApply = () => {
    const finalFrom = from !== undefined ? from : startDate;
    const finalTo = to !== undefined ? to : endDate;
    onSelect?.({ from: finalFrom, to: finalTo });
  };

  const handleClear = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    onSelect?.({ from: undefined, to: undefined });
  };

  const displayText = () => {
    const displayFrom = from !== undefined ? from : startDate;
    const displayTo = to !== undefined ? to : endDate;
    if (displayFrom && displayTo) {
      return `${format(displayFrom, "MMM dd")} - ${format(displayTo, "MMM dd")}`;
    }
    if (displayFrom) {
      return format(displayFrom, "MMM dd");
    }
    return "Select dates";
  };

  // Generate calendar days for current month
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const isDateInRange = (day: number) => {
    if (!currentFrom || !currentTo) return false;
    const date = new Date(currentYear, currentMonth, day);
    return date >= currentFrom && date <= currentTo;
  };

  const isDateSelected = (day: number, type: "from" | "to") => {
    const date = new Date(currentYear, currentMonth, day);
    if (type === "from") return currentFrom && date.getTime() === currentFrom.getTime();
    return currentTo && date.getTime() === currentTo.getTime();
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  return (
    <Popover>
      <PopoverTrigger className={className}>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-[var(--color-muted)]" />
          <span className="text-sm font-medium">{displayText()}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[var(--color-primary)]">
              {format(new Date(currentYear, currentMonth, 1), "MMMM yyyy")}
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleClear}>
                Clear
              </Button>
              <Button variant="gold" size="sm" onClick={handleApply}>
                Apply
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center text-xs font-semibold text-[var(--color-muted)]">
                {day}
              </div>
            ))}
            {emptyDays.map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {days.map((day) => {
              const disabled = isDateDisabled(day);
              const inRange = isDateInRange(day);
              const isStart = isDateSelected(day, "from");
              const isEnd = isDateSelected(day, "to");

              return (
                <button
                  key={day}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    if (!disabled) {
                      const date = new Date(currentYear, currentMonth, day);
                      if (!currentFrom || (currentFrom && currentTo)) {
                        handleDateSelect(date, "from");
                      } else {
                        handleDateSelect(date, "to");
                      }
                    }
                  }}
                  className={`
                    h-8 w-8 rounded-md text-sm transition
                    ${disabled ? "cursor-not-allowed text-gray-300" : "hover:bg-[var(--color-primary)]/10"}
                    ${isStart || isEnd ? "bg-[var(--color-primary)] text-white" : ""}
                    ${inRange && !isStart && !isEnd ? "bg-[var(--color-primary)]/10" : ""}
                    ${!disabled && !isStart && !isEnd && !inRange ? "text-[var(--color-primary)]" : ""}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

