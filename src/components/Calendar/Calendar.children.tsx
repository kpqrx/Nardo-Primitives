import React, { useContext, useMemo } from 'react'
import { CalendarContext } from './Calendar'
import {
  DatesGridItemType,
  DaysGridProps,
  MonthSwitcherProps,
  SelectedDateProps,
} from './Calendar.types'
import {
  endOfWeek,
  eachDayOfInterval,
  startOfWeek,
  lastDayOfMonth,
  isSameMonth,
  addMonths,
  differenceInDays,
  getDaysInMonth,
  setDate,
  startOfMonth,
  endOfMonth,
} from 'date-fns'

export const MonthSwitcherButton = (props: MonthSwitcherProps) => {
  const { direction, children, onClick, ...restProps } = props
  const { setDisplayedDate } = useContext(CalendarContext)

  const handleOnClick = (event) => {
    onClick && onClick(event)
    setDisplayedDate((prevState) =>
      addMonths(prevState, direction === 'next' ? 1 : -1)
    )
  }

  return (
    <button
      onClick={handleOnClick}
      {...restProps}
    >
      {children}
    </button>
  )
}

export const SelectedDate = (props: SelectedDateProps) => {
  const { scope, render } = props
  const { currentDate, displayedDate } = useContext(CalendarContext)

  if (
    (scope === 'currentDate' && !currentDate) ||
    (scope === 'displayedDate' && !displayedDate)
  ) {
    throw new Error(
      `Requested selected date is out of scope: ${scope} value is not provided or avaliable.`
    )
  }

  return render(scope === 'currentDate' ? currentDate : displayedDate)
}

export const DaysGrid = (props: DaysGridProps) => {
  const { render, completeWithExtraDays, ...restProps } = props
  const { setCurrentDate, displayedDate, setDisplayedDate } =
    useContext(CalendarContext)

  const datesGrid = useMemo<DatesGridItemType[]>(
    () =>
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(displayedDate), { weekStartsOn: 1 }),
        end: endOfWeek(endOfMonth(displayedDate), { weekStartsOn: 1 }),
      }).map((date) => ({
        date,
        onClick: () => {
          setCurrentDate(date)
          !isSameMonth(date, displayedDate) && setDisplayedDate(date)
        },
      })),
    [displayedDate]
  )

  const containerDataAttributes = useMemo(
    () => ({
      'data-calendar-previous-month-days': differenceInDays(
        setDate(displayedDate, 1),
        datesGrid.at(0).date
      ),
      'data-calendar-next-month-days': differenceInDays(
        datesGrid.at(-1).date,
        lastDayOfMonth(displayedDate)
      ),
      'data-calendar-days': getDaysInMonth(displayedDate),
      'data-days-grid': '',
    }),
    [datesGrid]
  )

  return (
    <div
      {...containerDataAttributes}
      {...restProps}
    >
      {datesGrid.map((datesGridItem) => render(datesGridItem))}
    </div>
  )
}
