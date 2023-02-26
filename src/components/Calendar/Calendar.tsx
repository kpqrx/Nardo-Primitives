// @ts-nocheck
import { addMonths } from 'date-fns'
import React, { createContext, useState, useRef, useCallback } from 'react'
import {
  DaysGrid,
  MonthSwitcherButton,
  SelectedDate,
} from './Calendar.children'
import { CalendarContextType, CalendarProps } from './Calendar.types'

export const CalendarContext = createContext<CalendarContextType>({})

const Calendar = (props: CalendarProps) => {
  const {
    children,
    defaultDate = new Date(),
    value: currentDate,
    onChange: setCurrentDate,
    ...restProps
  } = props

  if ((currentDate && !setCurrentDate) || (!currentDate && setCurrentDate)) {
    throw new Error('xd')
  }

  const [displayedDate, setDisplayedDate] = useState(
    new Date(defaultDate.getFullYear(), defaultDate.getMonth(), 1)
  )

  const calendarRef = useRef<HTMLDivElement>(null)

  const getElementWithinOffset = (targetElement, focusOffset) => {
    const elementsRoot = calendarRef.current.querySelector('[data-days-grid]')
    const elements = [...elementsRoot.children]

    return elements[elements.indexOf(targetElement) + focusOffset]
  }

  const getBoundaryElement = useCallback(
    (bound: 'first' | 'last') => {
      const elementsRoot = calendarRef.current.querySelector('[data-days-grid]')
      console.log({
        first: elementsRoot.firstChild,
        last: elementsRoot.lastChild,
      })
      return elementsRoot[`${bound}Child`]
    },
    [displayedDate]
  )

  const onKeyDown: React.KeyboardEventHandler = (event) => {
    const { key, target } = event

    const offsetsMap = {
      ArrowUp: -7,
      ArrowDown: 7,
      ArrowLeft: -1,
      ArrowRight: 1,
    }

    // temporary solution to skip handler for buttons other than arrows
    if (!Object.keys(offsetsMap).includes(key)) {
      return
    }

    let focusableElement = getElementWithinOffset(target, offsetsMap[key])
    console.log('within offset: ', focusableElement)

    if (!focusableElement) {
      const shouldIncrementMonth = offsetsMap[key] < 0
      setDisplayedDate((prevState) =>
        addMonths(prevState, shouldIncrementMonth ? -1 : 1)
      )

      focusableElement = getBoundaryElement(
        shouldIncrementMonth ? 'first' : 'last'
      )
    }

    console.log('boundary after state change', focusableElement)

    if (focusableElement.focus) {
      focusableElement.focus()
    }
  }

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        displayedDate,
        setDisplayedDate,
      }}
    >
      <div
        ref={calendarRef}
        {...restProps}
        onKeyDown={onKeyDown}
      >
        {children}
      </div>
    </CalendarContext.Provider>
  )
}

const CalendarNamespace = Object.assign(Calendar, {
  DaysGrid,
  MonthSwitcherButton,
  SelectedDate,
})

export default CalendarNamespace
