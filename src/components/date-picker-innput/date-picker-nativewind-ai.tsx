import {
  isDateEqual,
  useCalendarHelpers,
  useDoubleCalendar,
  useSingleCalendar,
} from "./helpers";
import {
  Button,
  ButtonIcon,
  ButtonText,
  ChevronLeft,
  ChevronRight,
  Text,
} from "@usekeyhole/nativewind";
import { cn } from "@usekeyhole/utils";
import { useControllableState } from "@usekeyhole/hooks";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { Pressable, PressableProps, View, Platform } from "react-native";

const defaultTexts = {
  days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  clear: "Clear",
  today: "Today",
  yesterday: "Yesterday",
  lastWeek: "Last week",
  lastMonth: "Last month",
  saveDates: "Save dates",
};

type BaseDatePickerProps = {
  disabledFilter?: (date: Date) => boolean;
  today?: Date;
  texts?: {
    days?: [string, string, string, string, string, string, string];
    months?: [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
    ];
    clear?: string;
    today?: string;
    yesterday?: string;
    lastWeek?: string;
    lastMonth?: string;
    saveDates?: string;
  };
};

export type DatePickerProps =
  | (DatePickerSingleProps & {
      mode: "single";
    })
  | (DatePickerRangeProps & {
      mode: "range";
    });

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  if (props.mode === "single") {
    return <DatePickerSingle {...props} />;
  }

  if (props.mode === "range") {
    return <DatePickerRange {...props} />;
  }

  throw new Error("Invalid mode");
};

type DatePickerSingleProps = {
  value?: Date;
  onChange?: (date: Date) => void;
  defaultValue?: Date;
  currentDate?: Date;
} & BaseDatePickerProps;

const DatePickerSingle: React.FC<DatePickerSingleProps> = ({
  value: selectedProp,
  onChange,
  defaultValue,
  disabledFilter,
  today: todayProp,
  currentDate: currentDateProp,
  texts: textsProp,
}) => {
  const texts = { ...defaultTexts, ...textsProp };

  const [selected, setSelected] = useControllableState({
    prop: selectedProp,
    onChange,
    defaultProp: defaultValue,
  });

  const calendar = useSingleCalendar({
    currentDate: currentDateProp || selected,
    today: todayProp,
  });

  const weeks = chunkIntoWeeks(calendar.currentDate.calendarDays);
  const [focusedRow, setFocusedRow] = React.useState(0);
  const [focusedCol, setFocusedCol] = React.useState(0);
  const [isInitialized, setIsInitialized] = React.useState(false);

  const cellRefs = React.useRef<
    Array<Array<React.ElementRef<typeof Pressable> | null>>
  >([]);

  // Initialize focus to selected date or today
  React.useEffect(() => {
    if (!isInitialized && weeks.length > 0) {
      const targetDate = selected || calendar.today;
      const position = findDatePosition(
        weeks,
        targetDate,
        calendar.currentDate.currentMonth
      );
      if (position) {
        setFocusedRow(position.row);
        setFocusedCol(position.col);
      } else {
        // Default to first available date if target not found
        const firstAvailable = findFirstAvailableDate(
          weeks,
          calendar.currentDate.currentMonth,
          disabledFilter
        );
        if (firstAvailable) {
          setFocusedRow(firstAvailable.row);
          setFocusedCol(firstAvailable.col);
        }
      }
      setIsInitialized(true);
    }
  }, [
    weeks,
    selected,
    calendar.today,
    calendar.currentDate.currentMonth,
    isInitialized,
    disabledFilter,
  ]);

  const handleKeyDown = (e: React.KeyboardEvent<any>) => {
    e.preventDefault();

    const rowCount = weeks.length;
    const colCount = 7;

    const move = (r: number, c: number) => {
      const date = weeks[r]?.[c];
      if (!date) return false;

      const cell = cellRefs.current[r]?.[c];
      const isDisabled = disabledFilter?.(date) ?? false;
      const isHidden = date.getMonth() !== calendar.currentDate.currentMonth;

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
        if (
          date.getMonth() === calendar.currentDate.currentMonth &&
          !disabledFilter?.(date)
        ) {
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
        if (
          date.getMonth() === calendar.currentDate.currentMonth &&
          !disabledFilter?.(date)
        ) {
          return [r, col];
        }
      }
      return null;
    };

    const moveToNextMonth = () => {
      calendar.currentDate.goToNextMonth();
      requestAnimationFrame(() => {
        const newWeeks = chunkIntoWeeks(calendar.currentDate.calendarDays);
        const nextCell = getNextActiveCell(newWeeks, focusedCol);
        if (nextCell) {
          const [r, c] = nextCell;
          setFocusedRow(r);
          setFocusedCol(c);
          const cell = cellRefs.current[r]?.[c];
          if (cell && Platform.OS === "web") {
            (cell as any)?.focus?.();
          }
        }
      });
    };

    const moveToPrevMonth = () => {
      calendar.currentDate.goTovPrevMonth();
      requestAnimationFrame(() => {
        const newWeeks = chunkIntoWeeks(calendar.currentDate.calendarDays);
        const prevCell = getPrevActiveCell(newWeeks, focusedCol);
        if (prevCell) {
          const [r, c] = prevCell;
          setFocusedRow(r);
          setFocusedCol(c);
          const cell = cellRefs.current[r]?.[c];
          if (cell && Platform.OS === "web") {
            (cell as any)?.focus?.();
          }
        }
      });
    };

    switch (e.key) {
      case "ArrowDown": {
        const nextRow = focusedRow + 1;
        if (nextRow < rowCount && move(nextRow, focusedCol)) {
          return;
        }
        moveToNextMonth();
        break;
      }

      case "ArrowUp": {
        const prevRow = focusedRow - 1;
        if (prevRow >= 0 && move(prevRow, focusedCol)) {
          return;
        }
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

      case "Enter":
      case " ": {
        const date = weeks[focusedRow]?.[focusedCol];
        if (date && !disabledFilter?.(date)) {
          setSelected(date);
        }
        break;
      }

      case "Home": {
        // Go to first day of month
        const firstAvailable = findFirstAvailableDate(
          weeks,
          calendar.currentDate.currentMonth,
          disabledFilter
        );
        if (firstAvailable) {
          move(firstAvailable.row, firstAvailable.col);
        }
        break;
      }

      case "End": {
        // Go to last day of month
        const lastAvailable = findLastAvailableDate(
          weeks,
          calendar.currentDate.currentMonth,
          disabledFilter
        );
        if (lastAvailable) {
          move(lastAvailable.row, lastAvailable.col);
        }
        break;
      }

      case "PageUp": {
        calendar.currentDate.goTovPrevMonth();
        break;
      }

      case "PageDown": {
        calendar.currentDate.goToNextMonth();
        break;
      }

      default:
        break;
    }
  };

  return (
    <View className="bg-background border-border flex flex-col rounded-sm border p-4">
      <View className="flex w-[280px] select-none flex-col gap-y-2">
        <View className="flex flex-row items-center justify-between">
          <Button onPress={calendar.currentDate.goTovPrevMonth} size="icon-sm">
            <ButtonIcon>
              <ChevronLeft />
            </ButtonIcon>
          </Button>
          <Text className="font-semibold">
            {texts.months[calendar.currentDate.currentMonth]}{" "}
            {calendar.currentDate.currentYear}
          </Text>
          <Button onPress={calendar.currentDate.goToNextMonth} size="icon-sm">
            <ButtonIcon>
              <ChevronRight />
            </ButtonIcon>
          </Button>
        </View>
        <View className="flex flex-row items-center justify-around gap-x-2">
          {texts.days.map((day) => (
            <Text
              key={day}
              className="text-muted-foreground w-full py-2 text-center"
            >
              {day}
            </Text>
          ))}
        </View>
      </View>
      {weeks.map((week, weekIndex) => (
        <View key={weekIndex} className="flex flex-row justify-between gap-y-2">
          {week.map((date, colIndex) => (
            <CalendarCell
              key={date.toISOString()}
              ref={(el) => {
                (cellRefs.current[weekIndex] ??= [])[colIndex] = el;
              }}
              onFocus={() => {
                setFocusedRow(weekIndex);
                setFocusedCol(colIndex);
              }}
              day={date.getDate()}
              selected={isDateEqual(selected || new Date(), date)}
              today={isDateEqual(calendar.today, date)}
              disabled={disabledFilter?.(date) || false}
              hidden={date.getMonth() !== calendar.currentDate.currentMonth}
              focused={weekIndex === focusedRow && colIndex === focusedCol}
              onPress={() => setSelected(date)}
              {...(Platform.OS === "web" ? { onKeyDown: handleKeyDown } : {})}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

function chunkIntoWeeks(days: Date[]): Date[][] {
  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

// Helper functions for finding dates in the calendar grid
function findDatePosition(
  weeks: Date[][],
  targetDate: Date,
  currentMonth: number
) {
  for (let r = 0; r < weeks.length; r++) {
    for (let c = 0; c < weeks[r].length; c++) {
      const date = weeks[r][c];
      if (isDateEqual(date, targetDate) && date.getMonth() === currentMonth) {
        return { row: r, col: c };
      }
    }
  }
  return null;
}

function findFirstAvailableDate(
  weeks: Date[][],
  currentMonth: number,
  disabledFilter?: (date: Date) => boolean
) {
  for (let r = 0; r < weeks.length; r++) {
    for (let c = 0; c < weeks[r].length; c++) {
      const date = weeks[r][c];
      if (date.getMonth() === currentMonth && !disabledFilter?.(date)) {
        return { row: r, col: c };
      }
    }
  }
  return null;
}

function findLastAvailableDate(
  weeks: Date[][],
  currentMonth: number,
  disabledFilter?: (date: Date) => boolean
) {
  for (let r = weeks.length - 1; r >= 0; r--) {
    for (let c = weeks[r].length - 1; c >= 0; c--) {
      const date = weeks[r][c];
      if (date.getMonth() === currentMonth && !disabledFilter?.(date)) {
        return { row: r, col: c };
      }
    }
  }
  return null;
}

type DatePickerRangeProps = {
  value?: [Date | undefined, Date | undefined];
  onChange?: (date: [Date | undefined, Date | undefined]) => void;
  defaultValue?: [Date | undefined, Date | undefined];
  currentDate?: Date;
  dualMode?: boolean;
} & BaseDatePickerProps;

const DatePickerRange: React.FC<DatePickerRangeProps> = ({
  dualMode,
  value,
  onChange,
  defaultValue,
  currentDate,
  disabledFilter,
  today: todayProp,
  texts: textsProp,
}) => {
  const texts = { ...defaultTexts, ...textsProp };

  const {
    today,
    firstCalendar,
    secondCalendar,
    firstSelection: firstSelectionProp,
    secondSelection,
    hoveringSecondSelection,
    setFirstSelection,
    setSecondSelection,
    setHoveringSecondSelection,
    handlePrev,
    handleNext,
    handleSelect,
    handleHover,
    handleGoToDate,
  } = useDoubleCalendar({
    selection: value,
    defaultSelection: defaultValue,
    currentDate: currentDate || value?.[0],
    today: todayProp,
    dualMode,
    onSelectionChange: onChange,
  });

  const {
    calcIsInRange,
    calcMergeLeft,
    calcMergeRight,
    calcIsSelected,
    calcDisabled,
    calcHidden,
  } = useCalendarHelpers({
    firstSelection: firstSelectionProp,
    secondSelection,
    hoveringSecondSelection,
    disabledFilter,
  });

  const [calendarState, setCalendarState] = React.useState<
    "none" | "first-selected" | "both-days-selected"
  >("none");

  const [controledFirstSelection, setControledFirstSelection] =
    useControllableState({
      prop: firstSelectionProp,
      onChange: setFirstSelection,
      defaultProp: defaultValue?.[0],
    });

  const firstCalendarWeeks = chunkIntoWeeks(firstCalendar.calendarDays);
  const [focusedRow, setFocusedRow] = React.useState(0);
  const [focusedCol, setFocusedCol] = React.useState(0);
  const [isInitialized, setIsInitialized] = React.useState(false);

  const cellRefs = React.useRef<
    Array<Array<React.ElementRef<typeof Pressable> | null>>
  >([]);

  // Initialize focus for range mode
  React.useEffect(() => {
    if (!isInitialized && firstCalendarWeeks.length > 0) {
      const targetDate = firstSelectionProp || today;
      const position = findDatePosition(
        firstCalendarWeeks,
        targetDate,
        firstCalendar.currentMonth
      );
      if (position) {
        setFocusedRow(position.row);
        setFocusedCol(position.col);
      } else {
        const firstAvailable = findFirstAvailableDate(
          firstCalendarWeeks,
          firstCalendar.currentMonth,
          disabledFilter
        );
        if (firstAvailable) {
          setFocusedRow(firstAvailable.row);
          setFocusedCol(firstAvailable.col);
        }
      }
      setIsInitialized(true);
    }
  }, [
    firstCalendarWeeks,
    firstSelectionProp,
    today,
    firstCalendar.currentMonth,
    isInitialized,
    disabledFilter,
  ]);

  const handleSave = () => {
    onChange?.([controledFirstSelection, secondSelection]);
  };

  const handleClear = () => {
    setFirstSelection(undefined);
    setSecondSelection(undefined);
    setCalendarState("none");
    onChange?.([undefined, undefined]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<any>) => {
    e.preventDefault();

    const rowCount = firstCalendarWeeks.length;
    const colCount = 7;

    const move = (r: number, c: number) => {
      const date = firstCalendarWeeks[r]?.[c];
      if (!date) return false;

      const cell = cellRefs.current[r]?.[c];
      const isDisabled = disabledFilter?.(date) ?? false;
      const isHidden = date.getMonth() !== firstCalendar.currentMonth;

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
        if (
          date.getMonth() === firstCalendar.currentMonth &&
          !disabledFilter?.(date)
        ) {
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
        if (
          date.getMonth() === firstCalendar.currentMonth &&
          !disabledFilter?.(date)
        ) {
          return [r, col];
        }
      }
      return null;
    };

    const moveToNextMonth = () => {
      handleNext();
      requestAnimationFrame(() => {
        const newWeeks = chunkIntoWeeks(firstCalendar.calendarDays);
        const nextCell = getNextActiveCell(newWeeks, focusedCol);
        if (nextCell) {
          const [r, c] = nextCell;
          setFocusedRow(r);
          setFocusedCol(c);
          const cell = cellRefs.current[r]?.[c];
          if (cell && Platform.OS === "web") {
            (cell as any)?.focus?.();
          }
        }
      });
    };

    const moveToPrevMonth = () => {
      handlePrev();
      requestAnimationFrame(() => {
        const newWeeks = chunkIntoWeeks(firstCalendar.calendarDays);
        const prevCell = getPrevActiveCell(newWeeks, focusedCol);
        if (prevCell) {
          const [r, c] = prevCell;
          setFocusedRow(r);
          setFocusedCol(c);
          const cell = cellRefs.current[r]?.[c];
          if (cell && Platform.OS === "web") {
            (cell as any)?.focus?.();
          }
        }
      });
    };

    switch (e.key) {
      case "ArrowDown": {
        const nextRow = focusedRow + 1;
        if (nextRow < rowCount && move(nextRow, focusedCol)) {
          return;
        }
        moveToNextMonth();
        break;
      }

      case "ArrowUp": {
        const prevRow = focusedRow - 1;
        if (prevRow >= 0 && move(prevRow, focusedCol)) {
          return;
        }
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

      case "Enter":
      case " ": {
        const date = firstCalendarWeeks[focusedRow]?.[focusedCol];
        if (date && !disabledFilter?.(date)) {
          if (
            calendarState === "none" ||
            calendarState === "both-days-selected"
          ) {
            setFirstSelection(date);
            setSecondSelection(undefined);
            setControledFirstSelection(date);
            setCalendarState("first-selected");
          } else if (calendarState === "first-selected") {
            if (controledFirstSelection && date < controledFirstSelection) {
              // If selected date is before first selection, swap them
              setFirstSelection(date);
              setSecondSelection(controledFirstSelection);
              setControledFirstSelection(date);
            } else {
              setSecondSelection(date);
            }
            setCalendarState("both-days-selected");

            // Auto-save in non-dual mode
            if (!dualMode) {
              onChange?.([controledFirstSelection, date]);
            }
          }
        }
        break;
      }

      case "Home": {
        const firstAvailable = findFirstAvailableDate(
          firstCalendarWeeks,
          firstCalendar.currentMonth,
          disabledFilter
        );
        if (firstAvailable) {
          move(firstAvailable.row, firstAvailable.col);
        }
        break;
      }

      case "End": {
        const lastAvailable = findLastAvailableDate(
          firstCalendarWeeks,
          firstCalendar.currentMonth,
          disabledFilter
        );
        if (lastAvailable) {
          move(lastAvailable.row, lastAvailable.col);
        }
        break;
      }

      case "PageUp": {
        handlePrev();
        break;
      }

      case "PageDown": {
        handleNext();
        break;
      }

      case "Escape": {
        handleClear();
        break;
      }

      default:
        break;
    }
  };

  return (
    <View className="bg-background border-border flex flex-col rounded-sm border">
      <View className="flex flex-row gap-x-6 p-4">
        <View className="flex flex-col">
          <View className="flex w-[280px] select-none flex-col gap-y-2">
            <View className="flex flex-row items-center justify-between">
              <Button onPress={handlePrev} size="icon-sm">
                <ButtonIcon>
                  <ChevronLeft />
                </ButtonIcon>
              </Button>
              <Text className="font-semibold">
                {texts.months[firstCalendar.currentMonth]}{" "}
                {firstCalendar.currentYear}
              </Text>
              <Button
                size="icon-sm"
                className={cn({
                  "pointer-events-none opacity-0": dualMode,
                })}
                onPress={!dualMode ? handleNext : undefined}
              >
                <ButtonIcon>
                  <ChevronRight />
                </ButtonIcon>
              </Button>
            </View>
            <View className="flex flex-row items-center justify-around gap-x-2">
              {texts.days.map((day) => (
                <Text
                  key={day}
                  className="text-muted-foreground w-full py-2 text-center"
                >
                  {day}
                </Text>
              ))}
            </View>
          </View>

          {firstCalendarWeeks.map((week, weekIndex) => (
            <View
              key={weekIndex}
              className="flex flex-row justify-between gap-y-2"
            >
              {week.map((date, colIndex) => (
                <CalendarCell
                  key={date.toISOString()}
                  ref={(el) => {
                    (cellRefs.current[weekIndex] ??= [])[colIndex] = el;
                  }}
                  onFocus={() => {
                    setFocusedRow(weekIndex);
                    setFocusedCol(colIndex);
                  }}
                  day={date.getDate()}
                  selected={calcIsSelected(date)}
                  range={calcIsInRange(date)}
                  today={isDateEqual(today, date)}
                  disabled={calcDisabled(date)}
                  hidden={calcHidden(date, firstCalendar.currentMonth)}
                  focused={weekIndex === focusedRow && colIndex === focusedCol}
                  onHoverIn={() => handleHover(date)}
                  onPress={() => handleSelect(date)}
                  mergeLeft={calcMergeLeft(date, weekIndex * 7 + colIndex)}
                  mergeRight={calcMergeRight(date, weekIndex * 7 + colIndex)}
                  {...(Platform.OS === "web"
                    ? { onKeyDown: handleKeyDown }
                    : {})}
                />
              ))}
            </View>
          ))}
        </View>
        {dualMode && (
          <View className="flex flex-col">
            <View className="flex w-[280px] flex-col gap-y-2">
              <View className="flex flex-row items-center justify-between">
                <Button
                  size="icon-sm"
                  className="pointer-events-none opacity-0"
                >
                  <ButtonIcon>
                    <ChevronLeft />
                  </ButtonIcon>
                </Button>
                <Text className="font-semibold">
                  {texts.months[secondCalendar.currentMonth]}{" "}
                  {secondCalendar.currentYear}
                </Text>
                <Button onPress={handleNext} size="icon-sm">
                  <ButtonIcon>
                    <ChevronRight />
                  </ButtonIcon>
                </Button>
              </View>
              <View className="flex flex-row items-center justify-around gap-x-2">
                {texts.days.map((day) => (
                  <Text
                    key={day}
                    className="text-muted-foreground w-full py-2 text-center"
                  >
                    {day}
                  </Text>
                ))}
              </View>
            </View>
            <View
              className="flex w-[280px] flex-row flex-wrap items-center justify-between gap-y-2"
              onPointerLeave={() => setHoveringSecondSelection(undefined)}
            >
              {secondCalendar.calendarDays.map((date, index) => (
                <CalendarCell
                  key={date.toISOString()}
                  day={date.getDate()}
                  selected={calcIsSelected(date)}
                  range={calcIsInRange(date)}
                  today={isDateEqual(today, date)}
                  disabled={calcDisabled(date)}
                  hidden={calcHidden(date, secondCalendar.currentMonth)}
                  mergeLeft={calcMergeLeft(date, index)}
                  mergeRight={calcMergeRight(date, index)}
                  onHoverIn={() => handleHover(date)}
                  onPress={() => handleSelect(date)}
                />
              ))}
            </View>
          </View>
        )}
      </View>
      {dualMode && (
        <View className="border-border flex flex-row items-center gap-x-4 border-t p-4">
          <Button size="sm" onPress={handleClear}>
            <ButtonText>{texts.clear}</ButtonText>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onPress={() => {
              setFirstSelection(today);
              setSecondSelection(undefined);
              setCalendarState("first-selected");
              handleGoToDate(today);
            }}
          >
            <ButtonText>{texts.today}</ButtonText>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onPress={() => {
              const yesterday = new Date(today);
              yesterday.setDate(today.getDate() - 1);
              setFirstSelection(yesterday);
              setSecondSelection(undefined);
              setCalendarState("first-selected");
              handleGoToDate(yesterday);
            }}
          >
            <ButtonText>{texts.yesterday}</ButtonText>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onPress={() => {
              const lastWeek = new Date(today);
              lastWeek.setDate(today.getDate() - 7);
              setFirstSelection(lastWeek);
              setSecondSelection(today);
              setCalendarState("both-days-selected");
              handleGoToDate(lastWeek);
            }}
          >
            <ButtonText>{texts.lastWeek}</ButtonText>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onPress={() => {
              const lastMonth = new Date(today);
              lastMonth.setMonth(today.getMonth() - 1);
              setFirstSelection(lastMonth);
              setSecondSelection(today);
              setCalendarState("both-days-selected");
              handleGoToDate(lastMonth);
            }}
          >
            <ButtonText>{texts.lastMonth}</ButtonText>
          </Button>
          <Button
            size="sm"
            color="brand-soft"
            className="ml-auto"
            disabled={!controledFirstSelection || !secondSelection}
            onPress={handleSave}
          >
            <ButtonText>{texts.saveDates}</ButtonText>
          </Button>
        </View>
      )}
    </View>
  );
};

const cellVariants = cva(
  "flex size-[40px] items-center justify-center rounded-sm p-[8px]",
  {
    variants: {
      hovered: {
        true: "bg-accent",
      },
      today: {
        true: "bg-accent",
      },
      range: {
        true: "bg-primary-soft",
      },
      selected: {
        true: "bg-primary",
      },
      disabled: {
        true: "opacity-30",
      },
      hidden: {
        true: "pointer-events-none opacity-0",
      },
      mergeLeft: {
        true: "rounded-l-none",
      },
      mergeRight: {
        true: "rounded-r-none",
      },
      focused: {
        true: "ring-2 ring-primary ring-offset-2",
      },
    },
    compoundVariants: [
      {
        selected: true,
        range: true,
        className: "rounded-sm",
      },
    ],
  }
);

const cellTextVariants = cva("text-foreground text-center text-base", {
  variants: {
    selected: {
      true: "text-primary-foreground",
    },
  },
});

type CalendarCellProps = {
  day: number;
  focused?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<any>) => void;
  onKeyUp?: (e: React.KeyboardEvent<any>) => void;
} & VariantProps<typeof cellVariants> &
  PressableProps;

type CalendarCellHandle = React.ElementRef<typeof Pressable>;

const CalendarCell = React.forwardRef<CalendarCellHandle, CalendarCellProps>(
  (
    {
      day,
      today,
      selected,
      range,
      hovered: hoveredProp,
      mergeLeft,
      mergeRight,
      className,
      hidden,
      focused,
      onKeyDown,
      onKeyUp,
      ...props
    },
    ref
  ) => {
    const [hovered, setHovered] = React.useState(false);

    // Only attach keyboard handlers on web
    const webOnlyHandlers =
      Platform.OS === "web"
        ? {
            onKeyDown,
            onKeyUp,
            focusable: true as const,
            accessibilityRole: "button" as const,
            // keep focus when clicking with mouse
            onMouseDown: (e: any) => e.preventDefault(),
          }
        : {};

    return (
      <View className="relative">
        {/* trick to keep the background color in the range on the selected dates */}
        {!hidden && range && selected && (
          <View
            pointerEvents="none"
            className={cn("bg-primary-soft absolute size-[40px] rounded-sm", {
              "rounded-l-none": mergeLeft,
              "rounded-r-none": mergeRight,
            })}
          />
        )}
        <Pressable
          ref={ref}
          onHoverIn={() => setHovered(true)}
          onHoverOut={() => setHovered(false)}
          className={cn(
            cellVariants({
              hovered: hovered || hoveredProp,
              today,
              selected,
              range: range,
              disabled: props.disabled,
              mergeLeft,
              mergeRight,
              hidden,
              focused,
            }),
            className
          )}
          {...webOnlyHandlers}
          {...props}
        >
          <Text className={cellTextVariants({ selected })}>{day}</Text>
        </Pressable>
      </View>
    );
  }
);
