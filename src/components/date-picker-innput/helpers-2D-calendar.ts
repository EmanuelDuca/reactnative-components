// src/components/date-picker/helpers/navigation.ts

import { Platform } from "react-native";

type NavigationOptions = {
  weeks: Date[][];
  calendarMonth: number;
  cellRefs: React.MutableRefObject<Array<Array<React.ElementRef<any> | null>>>;
  focusedRow: number;
  focusedCol: number;
  setFocusedRow: (row: number) => void;
  setFocusedCol: (col: number) => void;
  disabledFilter?: (date: Date) => boolean;
  goToNextMonth: () => void;
  goToPrevMonth: () => void;
  chunkIntoWeeks: (days: Date[]) => Date[][];
  calendarDays: Date[];
};

export function handleKeyDown(
  e: React.KeyboardEvent<any>,
  options: NavigationOptions
) {
  e.preventDefault();

  const {
    weeks,
    calendarMonth,
    cellRefs,
    focusedRow,
    focusedCol,
    setFocusedRow,
    setFocusedCol,
    disabledFilter,
    goToNextMonth,
    goToPrevMonth,
    chunkIntoWeeks,
    calendarDays,
  } = options;

  const rowCount = weeks.length;
  const colCount = 7;

  const move = (r: number, c: number) => {
    const date = weeks[r]?.[c];
    const cell = cellRefs.current[r]?.[c];
    const isDisabled = disabledFilter?.(date) ?? false;
    const isHidden = date?.getMonth() !== calendarMonth;

    if (cell && !isDisabled && !isHidden) {
      if (Platform.OS === "web") (cell as any)?.focus?.();
      setFocusedRow(r);
      setFocusedCol(c);
      return true;
    }

    return false;
  };

  const getNextActiveCell = (
    weeks: Date[][],
    col: number
  ): [number, number] | null => {
    for (let r = 0; r < weeks.length; r++) {
      const date = weeks[r][col];
      if (date.getMonth() === calendarMonth && !disabledFilter?.(date)) {
        return [r, col];
      }
    }
    return null;
  };

  const getPrevActiveCell = (
    weeks: Date[][],
    col: number
  ): [number, number] | null => {
    for (let r = weeks.length - 1; r >= 0; r--) {
      const date = weeks[r][col];
      if (date.getMonth() === calendarMonth && !disabledFilter?.(date)) {
        return [r, col];
      }
    }
    return null;
  };

  const moveToNextMonth = () => {
    goToNextMonth();
    requestAnimationFrame(() => {
      const newWeeks = chunkIntoWeeks(calendarDays);
      const nextCell = getNextActiveCell(newWeeks, focusedCol);
      if (nextCell) {
        const [r, c] = nextCell;
        const cell = cellRefs.current[r]?.[c];
        if (cell) {
          cell.focus();
          setFocusedRow(r);
          setFocusedCol(c);
        }
      }
    });
  };

  const moveToPrevMonth = () => {
    goToPrevMonth();
    requestAnimationFrame(() => {
      const newWeeks = chunkIntoWeeks(calendarDays);
      const prevCell = getPrevActiveCell(newWeeks, focusedCol);
      if (prevCell) {
        const [r, c] = prevCell;
        const cell = cellRefs.current[r]?.[c];
        if (cell) {
          cell.focus();
          setFocusedRow(r);
          setFocusedCol(c);
        }
      }
    });
  };

  switch (e.key) {
    case "ArrowDown": {
      const nextRow = focusedRow + 1;
      if (nextRow < rowCount && move(nextRow, focusedCol)) return;
      moveToNextMonth();
      break;
    }
    case "ArrowUp": {
      const prevRow = focusedRow - 1;
      if (prevRow >= 0 && move(prevRow, focusedCol)) return;
      moveToPrevMonth();
      break;
    }
    case "ArrowRight": {
      for (let r = focusedRow, c = focusedCol + 1; r < rowCount; r++, c = 0) {
        for (; c < colCount; c++) {
          if (move(r, c)) return;
        }
      }
      moveToNextMonth();
      break;
    }
    case "ArrowLeft": {
      for (
        let r = focusedRow, c = focusedCol - 1;
        r >= 0;
        r--, c = colCount - 1
      ) {
        for (; c >= 0; c--) {
          if (move(r, c)) return;
        }
      }
      moveToPrevMonth();
      break;
    }
    default:
      break;
  }
}
