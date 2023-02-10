import { getRangeIterator } from '@/utils'
import React, { useCallback, useContext, useMemo } from 'react'
import { CalendarContext } from './Calendar'
import {
  DaysArrayType,
  DaysGridProps,
  HandleSetCurrentDateType,
  MonthSwitcherProps,
  SelectedDateProps,
} from './Calendar.types'

export const MonthSwitcherButton = (props: MonthSwitcherProps) => {
  const { direction, children, onClick, ...restProps } = props
  const { switchDisplayedDate } = useContext(CalendarContext)

  const handleOnClick = (event) => {
    onClick && onClick(event)
    switchDisplayedDate(direction)
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

  return <>{render(scope === 'currentDate' ? currentDate : displayedDate)}</>
}

export const DaysGrid = (props: DaysGridProps) => {
  const { render, completeWithExtraDays, ...restProps } = props
  const { setCurrentDate, displayedDate, switchDisplayedDate } =
    useContext(CalendarContext)

  const daysData = useMemo(() => {
    const monthLength = new Date(
      displayedDate.getFullYear(),
      displayedDate.getMonth() + 1,
      0
    ).getDate()
    const previousMonthLength = new Date(
      displayedDate.getFullYear(),
      displayedDate.getMonth(),
      0
    ).getDate()
    const previousMonthDaysCount =
      (displayedDate.getDay() === 0 ? 7 : displayedDate.getDay()) - 1
    const nextMonthDaysCount = 7 - ((previousMonthDaysCount + monthLength) % 7)

    return {
      monthLength,
      previousMonthLength,
      previousMonthDaysCount,
      nextMonthDaysCount,
    }
  }, [displayedDate])

  const daysArray = useMemo<DaysArrayType>(() => {
    const {
      monthLength,
      previousMonthLength,
      previousMonthDaysCount,
      nextMonthDaysCount,
    } = daysData

    const previousMonthDays = ['previous', 'both'].includes(
      completeWithExtraDays
    )
      ? [
          ...getRangeIterator({
            start: previousMonthLength - previousMonthDaysCount + 1,
            end: previousMonthLength,
          }),
        ]
      : []
    const currentMonthDays = [...getRangeIterator({ end: monthLength })]
    const nextMonthDays = ['next', 'both'].includes(completeWithExtraDays)
      ? [...getRangeIterator({ end: nextMonthDaysCount })]
      : []

    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays].map(
      (day, index) => ({
        day,
        monthOffset:
          index < previousMonthDaysCount
            ? -1
            : index >= previousMonthDaysCount &&
              index < monthLength + previousMonthDaysCount
            ? 0
            : 1,
      })
    )
  }, [displayedDate])

  const handleSetCurrentDate = useCallback<HandleSetCurrentDateType>(
    ({ day, monthOffset }) => {
      setCurrentDate(
        new Date(
          displayedDate.getFullYear(),
          displayedDate.getMonth() + monthOffset,
          day
        )
      )
      if (Math.abs(monthOffset)) {
        switchDisplayedDate(monthOffset === -1 ? 'previous' : 'next')
      }
    },
    [displayedDate]
  )

  return (
    <div
      data-previous-month-day-slots={
        !completeWithExtraDays ? daysData.previousMonthDaysCount : null
      }
      data-next-month-day-slots={
        !completeWithExtraDays ? daysData.nextMonthDaysCount : null
      }
      {...restProps}
    >
      {daysArray.map(({ day, monthOffset }) =>
        render({
          day,
          onClick: () => handleSetCurrentDate({ day, monthOffset }),
        })
      )}
    </div>
  )
}
