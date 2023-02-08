import { getRangeIterator } from '@/utils'
import React, { useCallback, useContext, useMemo } from 'react'
import { CalendarContext } from './Calendar'
import {
  DaysDataType,
  DaysGridProps,
  HandleSetCurrentDateType,
  MonthSwitcherProps,
} from './Calendar.types'

export function MonthSwitcherButton(props: MonthSwitcherProps) {
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

export function DaysGrid(props: DaysGridProps) {
  const { render, ...restProps } = props
  const { setCurrentDate, displayedDate, switchDisplayedDate } =
    useContext(CalendarContext)

  const daysData = useMemo<DaysDataType>(() => {
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

    const weekdayIndex =
      (displayedDate.getDay() === 0 ? 7 : displayedDate.getDay()) - 1

    const nextMonthDaysCount = 7 - ((weekdayIndex + monthLength) % 7)
    console.log(weekdayIndex)
    return [
      ...getRangeIterator({
        start: previousMonthLength - weekdayIndex + 1,
        end: previousMonthLength,
      }),
      ...getRangeIterator({ end: monthLength }),
      ...getRangeIterator({ end: nextMonthDaysCount }),
    ].map((day, index) => ({
      day,
      monthOffset:
        index < weekdayIndex
          ? -1
          : index >= weekdayIndex && index < monthLength + weekdayIndex
          ? 0
          : 1,
    }))
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
    <div {...restProps}>
      {daysData.map(({ day, monthOffset }) =>
        render({
          day,
          onClick: () => handleSetCurrentDate({ day, monthOffset }),
        })
      )}
    </div>
  )
}
