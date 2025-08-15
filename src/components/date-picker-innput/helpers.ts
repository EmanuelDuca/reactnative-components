import React from "react";

export const useSingleCalendar = ({
  currentDate: currentDateProp,
  today: todayProp,
}: {
  currentDate?: Date;
  today?: Date;
}) => {
  const today = React.useMemo(() => todayProp || new Date(), [todayProp]);
  const currentDate = useCalendarDate(currentDateProp || today);
  return {
    today,
    currentDate,
  };
};

export const useDoubleCalendar = ({
  selection,
  defaultSelection,
  currentDate: currentDateProp,
  today: todayProp,
  dualMode,
  onSelectionChange,
}: {
  selection?: [Date | undefined, Date | undefined];
  defaultSelection?: [Date | undefined, Date | undefined];
  currentDate?: Date;
  today?: Date;
  dualMode?: boolean;
  onSelectionChange?: (selection: [Date | undefined, Date | undefined]) => void;
}) => {
  const today = React.useMemo(() => todayProp || new Date(), [todayProp]);

  const firstCalendar = useCalendarDate(currentDateProp || today);
  const secondCalendar = useCalendarDate(
    new Date(
      Date.UTC(firstCalendar.currentYear, firstCalendar.currentMonth + 1)
    )
  );

  const [firstSelection, setFirstSelection] = React.useState<Date | undefined>(
    defaultSelection?.[0]
  );
  const [secondSelection, setSecondSelection] = React.useState<
    Date | undefined
  >(defaultSelection?.[1]);
  const [hoveringSecondSelection, setHoveringSecondSelection] = React.useState<
    Date | undefined
  >(undefined);

  // sync local selection state with external contrlled state
  React.useEffect(() => {
    if (!selection) return;
    setFirstSelection(selection?.[0]);
    setSecondSelection(selection?.[1]);
  }, [selection]);

  const handleGoToDate = (date: Date) => {
    firstCalendar.goToDate(date);
    secondCalendar.goToDate(
      new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1))
    );
  };

  const handlePrev = () => {
    firstCalendar.goTovPrevMonth();
    secondCalendar.goTovPrevMonth();
  };

  const handleNext = () => {
    firstCalendar.goToNextMonth();
    secondCalendar.goToNextMonth();
  };

  const handleSelect = (date: Date) => {
    if (!secondSelection) {
      // the selected date is after the first selection so complete the range selection
      if (firstSelection && date > firstSelection) {
        setSecondSelection(date);
        // when in dual-mode it is required to click a "save dates"-button
        if (!dualMode) onSelectionChange?.([firstSelection, date]);
        return;
      }
    }
    // start a new selection
    setFirstSelection(date);
    setSecondSelection(undefined);
  };

  const handleHover = (date: Date) => {
    if (!firstSelection || secondSelection) return;
    setHoveringSecondSelection(date);
  };

  return {
    today,
    firstCalendar,
    secondCalendar,
    firstSelection,
    setFirstSelection,
    secondSelection,
    setSecondSelection,
    hoveringSecondSelection,
    setHoveringSecondSelection,
    handlePrev,
    handleNext,
    handleGoToDate,
    handleSelect,
    handleHover,
  };
};

type CalendarDate = {
  currentYear: number;
  currentMonth: number;
  daysInMonth: number;
  daysInPrevMonth: number;
  firstDayOfMonth: number;
  needSixRows: boolean;
  calendarDays: Date[];
  goTovPrevMonth: () => void;
  goToNextMonth: () => void;
  goToDate: (date: Date) => void;
};
export const useCalendarDate = (currentDateParam: Date): CalendarDate => {
  const [currentDate, setCurrentDate] = React.useState<Date>(currentDateParam);

  const currentYear = React.useMemo(
    () => currentDate.getUTCFullYear(),
    [currentDate]
  );

  const currentMonth = React.useMemo(
    () => currentDate.getUTCMonth(),
    [currentDate]
  );

  const prevMonth = React.useMemo(() => currentMonth - 1, [currentMonth]);

  const daysInMonth = React.useMemo(
    () => getDaysInMonthUTC(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const daysInPrevMonth = React.useMemo(
    () => getDaysInMonthUTC(currentYear, prevMonth),
    [currentYear, prevMonth]
  );

  const firstDayOfMonth = React.useMemo(
    () => new Date(Date.UTC(currentYear, currentMonth, 1)).getUTCDay(), // Day of the week (0-6)
    [currentYear, currentMonth]
  );

  const needSixRows = React.useMemo(
    () => firstDayOfMonth + daysInMonth > 35,
    [firstDayOfMonth, daysInMonth]
  );

  const goTovPrevMonth = () => {
    setCurrentDate(startOfDayUTC(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(startOfDayUTC(currentYear, currentMonth + 1, 1));
  };

  const goToDate = (date: Date) => {
    setCurrentDate(
      startOfDayUTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate()
      )
    );
  };

  const calendarDays = React.useMemo(() => {
    const days: Date[] = [];
    const blanks = firstDayOfMonth;
    const totalCells = needSixRows ? 42 : 35;

    // Add days from previous month
    const prevMonthDays = getDaysInMonthUTC(currentYear, prevMonth);
    for (let i = blanks - 1; i >= 0; i--) {
      days.push(startOfDayUTC(currentYear, prevMonth, prevMonthDays - i));
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(startOfDayUTC(currentYear, currentMonth, day));
    }

    // Add days from next month to fill the remaining cells
    const remainingCells = totalCells - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push(startOfDayUTC(currentYear, currentMonth + 1, day));
    }

    return days;
  }, [
    currentYear,
    currentMonth,
    daysInMonth,
    daysInPrevMonth,
    firstDayOfMonth,
    needSixRows,
  ]);

  return {
    currentYear,
    currentMonth,
    daysInMonth,
    daysInPrevMonth,
    firstDayOfMonth,
    needSixRows,
    calendarDays,
    goTovPrevMonth,
    goToNextMonth,
    goToDate,
  };
};

export const useCalendarHelpers = ({
  firstSelection,
  secondSelection,
  hoveringSecondSelection,
  disabledFilter,
}: {
  firstSelection?: Date;
  secondSelection?: Date;
  hoveringSecondSelection?: Date;
  disabledFilter?: (date: Date) => boolean;
}) => {
  const calcInHoveringRange = (date: Date) => {
    if (!firstSelection || !hoveringSecondSelection) return false;
    return date >= firstSelection && date <= hoveringSecondSelection;
  };

  const calcHoveringMergeLeft = (date: Date) => {
    if (!firstSelection || !hoveringSecondSelection) return false;
    return calcInHoveringRange(date) && date > firstSelection;
  };

  const calcHoveringMergeRight = (date: Date) => {
    if (!firstSelection || !hoveringSecondSelection) return false;
    return calcInHoveringRange(date) && date < hoveringSecondSelection;
  };

  const calcIsInRange = (date: Date) => {
    const hoveringRange = calcInHoveringRange(date);
    if (hoveringRange) return true;

    if (!firstSelection || !secondSelection) return false;
    return date >= firstSelection && date <= secondSelection;
  };

  const calcMergeLeft = (date: Date, index: number) => {
    if (isFirstDayInRow(index) || isFirstDayInMonth(date)) return false;

    const hoveringMergeLeft = calcHoveringMergeLeft(date);
    if (hoveringMergeLeft) return true;

    if (!firstSelection || !secondSelection) return false;
    return calcIsInRange(date) && date > firstSelection;
  };

  const calcMergeRight = (date: Date, index: number) => {
    if (isLastDayInRow(index) || isLastDayInMonth(date)) return false;

    const hoveringMergeRight = calcHoveringMergeRight(date);
    if (hoveringMergeRight) return true;

    if (!firstSelection || !secondSelection) return false;
    return calcIsInRange(date) && date < secondSelection;
  };

  const calcIsSelected = (date: Date) => {
    return isDateInList(date, [firstSelection, secondSelection]);
  };

  const calcDisabled = (date: Date) => {
    return disabledFilter?.(date);
  };

  const calcHidden = (date: Date, currentMonth: number) => {
    return date.getMonth() !== currentMonth;
  };

  return {
    calcIsInRange,
    calcMergeLeft,
    calcMergeRight,
    calcIsSelected,
    calcDisabled,
    calcHidden,
  };
};

export const isDateEqual = (date1?: Date, date2?: Date) => {
  if (date1 === date2) return true;
  if (!date1 || !date2) return false;
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const isDateInList = (date: Date, dates: (Date | undefined)[]) => {
  return dates.some((d) => isDateEqual(d, date));
};

const isFirstDayInRow = (index: number) => index % 7 === 0;
const isLastDayInRow = (index: number) => index % 7 === 6;

const isLastDayInMonth = (date: Date) =>
  date.getDate() === getDaysInMonth(date.getFullYear(), date.getMonth());
const isFirstDayInMonth = (date: Date) => date.getDate() === 1;

const getDaysInMonth = (year: number, month: number) => {
  return new Date(Date.UTC(year, month + 1, 0)).getDate();
};

const startOfDayUTC = (year: number, month: number, day: number): Date => {
  return new Date(Date.UTC(year, month, day));
};

const getDaysInMonthUTC = (year: number, month: number) => {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
};
