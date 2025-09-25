// ✅ Refactored for expert-level separation of logic
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { isDateEqual } from "./helpers";

function chunkIntoWeeks(days: Date[]): Date[][] {
  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export type UseCalendarGridFocusProps = {
  days: Date[];
  selected?: Date;
  today: Date;
  currentMonth: number;
  disabledFilter?: (date: Date) => boolean;
  onSelectDate?: (date: Date) => void;
  goToNextMonth?: (focusOnDate?: Date) => void;
  goToPrevMonth?: (focusOnDate?: Date) => void;
};

export function useCalendarGridFocus({
  days,
  selected,
  today,
  currentMonth,
  disabledFilter,
  onSelectDate,
  goToNextMonth,
  goToPrevMonth,
}: UseCalendarGridFocusProps) {
  const [focusedDate, setFocusedDate] = useState<Date | undefined>(undefined);
  const cellRefs = useRef<Map<string, any>>(new Map());
  const weeks = chunkIntoWeeks(days);

  const registerRef = (date: Date, ref: any) => {
    cellRefs.current.set(date.toISOString(), ref);
  };

  const focusDate = (date: Date) => {
    setFocusedDate(date);
    const ref = cellRefs.current.get(date.toISOString());
    if (Platform.OS === "web") {
      ref?.focus?.();
    }
  };

  const isFocusable = (date: Date) => {
    return date.getMonth() === currentMonth && !disabledFilter?.(date);
  };

  const findDateByOffset = (base: Date, offset: number) => {
    const newDate = new Date(base);
    newDate.setDate(base.getDate() + offset);
    return newDate;
  };

  const getFallbackDateForMonth = (
    monthIndex: number,
    direction: "start" | "end" | number
  ): Date | undefined => {
    const candidates = days
      .filter((d) => d.getMonth() === monthIndex && isFocusable(d))
      .sort((a, b) => a.getTime() - b.getTime());

    if (typeof direction === "number") {
      return candidates.find((d) => d.getDay() === direction);
    }

    if (direction === "start") return candidates[0];
    if (direction === "end") return candidates[candidates.length - 1];
  };

  const moveFocus = (direction: "left" | "right" | "up" | "down") => {
    if (!focusedDate) return;

    let offset = 0;
    switch (direction) {
      case "left":
        offset = -1;
        break;
      case "right":
        offset = 1;
        break;
      case "up":
        offset = -7;
        break;
      case "down":
        offset = 7;
        break;
    }

    const candidate = findDateByOffset(focusedDate, offset);
    if (isFocusable(candidate)) {
      focusDate(candidate);
      return;
    }

    const currentMonthIndex = focusedDate.getMonth();
    const currentWeekday = focusedDate.getDay();

    // Handle month switching
    if (direction === "left" && goToPrevMonth) {
      const fallback = getFallbackDateForMonth(currentMonthIndex - 1, "end");
      goToPrevMonth(fallback);
      return;
    }

    if (direction === "right" && goToNextMonth) {
      const fallback = getFallbackDateForMonth(currentMonthIndex + 1, "start");
      goToNextMonth(fallback);
      return;
    }

    if (direction === "up" && goToPrevMonth) {
      const fallback = getFallbackDateForMonth(
        currentMonthIndex - 1,
        currentWeekday
      );
      goToPrevMonth(fallback);
      return;
    }

    if (direction === "down" && goToNextMonth) {
      const fallback = getFallbackDateForMonth(
        currentMonthIndex + 1,
        currentWeekday
      );
      goToNextMonth(fallback);
      return;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<any>) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        moveFocus("up");
        break;
      case "ArrowDown":
        e.preventDefault();
        moveFocus("down");
        break;
      case "ArrowLeft":
        e.preventDefault();
        moveFocus("left");
        break;
      case "ArrowRight":
        e.preventDefault();
        moveFocus("right");
        break;
      case "Enter":
        if (focusedDate && isFocusable(focusedDate)) {
          onSelectDate?.(focusedDate);
        }
        break;
    }
  };

  const focusSelectedOrToday = () => {
    const fallback = days.find((d) => isFocusable(d));

    if (selected && isFocusable(selected)) {
      focusDate(selected);
    } else if (today && isFocusable(today)) {
      focusDate(today);
    } else if (fallback) {
      focusDate(fallback);
    }
  };

  useEffect(() => {
    if (Platform.OS === "web") {
      focusSelectedOrToday();
    }
  }, [days.toString()]);

  return {
    weeks,
    focusedDate,
    setFocusedDate,
    focusDate,
    registerRef,
    handleKeyDown,
    focusSelectedOrToday,
  };
}
