import React, { createContext, useState } from 'react'
import { DaysGrid, MonthSwitcherButton } from './Calendar.children'
import {
  CalendarContextType,
  CalendarProps,
  SwitchDisplayedDateFunctionType,
} from './Calendar.types'

export const CalendarContext = createContext<CalendarContextType>({})

const Calendar = (props: CalendarProps) => {
  const {
    children,
    weekdays,
    defaultDate = new Date(),
    value: currentDate,
    onChange: setCurrentDate,
  } = props

  if ((currentDate && !setCurrentDate) || (!currentDate && setCurrentDate)) {
    throw new Error('xd')
  }

  const [displayedDate, setDisplayedDate] = useState(
    new Date(defaultDate.getFullYear(), defaultDate.getMonth(), 1)
  )

  const switchDisplayedDate: SwitchDisplayedDateFunctionType = (
    direction,
    exactDate
  ) => {
    setDisplayedDate((displayedDate) => {
      const newYear = exactDate?.getFullYear() ?? displayedDate.getFullYear()
      const newMonth =
        exactDate?.getMonth() ??
        displayedDate.getMonth() + (direction === 'next' ? 1 : -1)

      return new Date(newYear, newMonth, 1)
    })
  }

  return (
    <CalendarContext.Provider
      value={{
        weekdays,
        currentDate,
        setCurrentDate,
        displayedDate,
        switchDisplayedDate,
      }}
    >
      <div>
        <div>
          {weekdays.map((x) => (
            <span style={{ width: '36px' }}>{x}</span>
          ))}
        </div>
        <span>{currentDate.toDateString()}</span>
        <span>{displayedDate.toDateString()}</span>
        {children}
      </div>
    </CalendarContext.Provider>
  )
}

const CalendarNamespace = Object.assign(Calendar, {
  DaysGrid,
  MonthSwitcherButton,
})

export default CalendarNamespace
