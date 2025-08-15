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
import { Pressable, PressableProps, View } from "react-native";
import {
  RovingFocusGroup,
  RovingFocusGroupItem,
} from "../arrow-navigation/roving-focus-group";

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
  // date filter
  disabledFilter?: (date: Date) => boolean;
  // what date to mark as today
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
  /*
   * where to start the calendar from
   * priority: currentDate > value > today
   */
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

  const weeks = chunkIntoWeeks(calendar.currentDate.calendarDays); // This is used to separate the date rows.
  const [focusedRow, setFocusedRow] = React.useState(0); // week index
  const [focusedCol, setFocusedCol] = React.useState(0); // day index (0-6)
  const cellRefs = React.useRef<Array<Array<HTMLDivElement | null>>>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    const rowCount = weeks.length;
    const colCount = 7;

    const move = (r: number, c: number) => {
      const date = weeks[r]?.[c];
      const cell = cellRefs.current[r]?.[c];
      const isDisabled = disabledFilter?.(date) ?? false;
      const isHidden = date?.getMonth() !== calendar.currentDate.currentMonth;

      if (cell && !isDisabled && !isHidden) {
        cell.focus();
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
      calendar.currentDate.goTovPrevMonth();
      requestAnimationFrame(() => {
        const newWeeks = chunkIntoWeeks(calendar.currentDate.calendarDays);
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

      case "Enter": {
        const date = weeks[focusedRow][focusedCol];
        if (!disabledFilter?.(date)) {
          setSelected(date);
        }
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

      <View className="flex flex-col gap-y-2 w-[280px] items-center">
        {weeks.map((week, weekIndex) => {
          if (!cellRefs.current[weekIndex]) {
            cellRefs.current[weekIndex] = [];
          }
          return (
            <View
              className="flex flex-row justify-between gap-y-2"
              key={weekIndex}
            >
              {week.map((date, colIndex) => (
                <CalendarCell
                  key={date.toISOString()}
                  ref={(el) => {
                    cellRefs.current[weekIndex][colIndex] = el;
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
                  onClick={() => setSelected(date)}
                  onKeyDown={handleKeyDown}
                />
              ))}
            </View>
          );
        })}
      </View>

      {/*     <RovingFocusGroup orientation="horizontal" asChild>
        <View className="flex w-[280px] flex-row flex-wrap items-center justify-between gap-y-2">
          {calendar.currentDate.calendarDays.map((date) => (
            <CalendarCell
              key={date.toISOString()}
              day={date.getDate()}
              selected={isDateEqual(selected || new Date(), date)}
              today={isDateEqual(calendar.today, date)}
              disabled={disabledFilter?.(date) || false}
              hidden={date.getMonth() !== calendar.currentDate.currentMonth}
              onPress={() => setSelected(date)}
            />
          ))}
        </View>
      </RovingFocusGroup> */}
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

type DatePickerRangeProps = {
  value?: [Date | undefined, Date | undefined];
  onChange?: (date: [Date | undefined, Date | undefined]) => void;
  defaultValue?: [Date | undefined, Date | undefined];
  /*
   * where to start the calendar from
   * priority: currentDate > value > today
   */
  currentDate?: Date;
  /*
   * dual mode shows two calenders and a row of buttons
   * this mode requires the user to press "save" before the onChange is called
   */
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
    firstSelection,
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
    firstSelection,
    secondSelection,
    hoveringSecondSelection,
    disabledFilter,
  });

  const handleSave = () => {
    onChange?.([firstSelection, secondSelection]);
  };

  const handleClear = () => {
    setFirstSelection(undefined);
    setSecondSelection(undefined);
    onChange?.([undefined, undefined]);
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
          <View
            className="flex w-[280px] flex-row flex-wrap items-center justify-between gap-y-2"
            onPointerLeave={() => setHoveringSecondSelection(undefined)}
          >
            {firstCalendar.calendarDays.map((date, index) => (
              <CalendarCell
                key={date.toISOString()}
                day={date.getDate()}
                selected={calcIsSelected(date)}
                range={calcIsInRange(date)}
                today={isDateEqual(today, date)}
                disabled={calcDisabled(date)}
                hidden={calcHidden(date, firstCalendar.currentMonth)}
                mergeLeft={calcMergeLeft(date, index)}
                mergeRight={calcMergeRight(date, index)}
                onHoverIn={() => handleHover(date)}
                onPress={() => handleSelect(date)}
              />
            ))}
          </View>
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
              handleGoToDate(lastMonth);
            }}
          >
            <ButtonText>{texts.lastMonth}</ButtonText>
          </Button>
          <Button
            size="sm"
            color="brand-soft"
            className="ml-auto"
            disabled={!firstSelection || !secondSelection}
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
} & VariantProps<typeof cellVariants> &
  React.HTMLAttributes<HTMLDivElement>;

const CalendarCell = React.forwardRef<HTMLDivElement, CalendarCellProps>(
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
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const [hovered, setHovered] = React.useState(false);

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

        <div
          ref={ref}
          tabIndex={0}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onKeyDown={(e) => {
            console.log(e.key);
            onKeyDown?.(e);
          }}
          className={cn(
            "cursor-pointer",
            cellVariants({
              hovered: hovered || hoveredProp,
              today,
              selected,
              range,
              disabled: props.disabled,
              mergeLeft,
              mergeRight,
              hidden,
            }),
            className
          )}
          {...props}
        >
          <Text className={cellTextVariants({ selected })}>{day}</Text>
        </div>
      </View>
    );
  }
);
CalendarCell.displayName = "CalendarCell"; // optional but recommended

/* const CalendarCell: React.FC<CalendarCellProps> = (
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
    ...props
  },
  ref
) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <View className="relative" >
      
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
        //ref={ref}
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
          }),
          className
        )}
        {...props}
      >
        <Text className={cellTextVariants({ selected })}>{day}</Text>
      </Pressable>
      
    </View>
  );
}; */
