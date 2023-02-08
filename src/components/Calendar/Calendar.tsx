import React, { createContext, useState } from 'react'
import { DaysGrid, MonthSwitcherButton } from './Calendar.children'
import {
  CalendarContextType,
  CalendarProps,
  SwitchDisplayedDateFunctionType,
} from './Calendar.types'

export const CalendarContext = createContext<CalendarContextType>({})

function Calendar(props: CalendarProps) {
  const { children, weekdays, defaultDate } = props
  const [currentDate, setCurrentDate] = useState(defaultDate)
  const [displayedDate, setDisplayedDate] = useState(
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
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
