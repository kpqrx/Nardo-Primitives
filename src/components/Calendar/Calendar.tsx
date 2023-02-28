// @ts-nocheck
import { addMonths, isAfter } from 'date-fns'
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
  const focusableElementPosition = useRef(null)

  const getElementWithinOffset = (targetElement, focusOffset) => {
    const elementsRoot = calendarRef.current.querySelector('[data-days-grid]')
    const elements = [...elementsRoot.children]

    return elements[elements.indexOf(targetElement) + focusOffset]
  }

  const getBoundaryElement = (bound: 'first' | 'last') => {
    const elementsRoot = calendarRef.current.querySelector('[data-days-grid]')
    return elementsRoot[`${bound}Child`]
  }

  const calendarRef = useRef<HTMLDivElement>()
  const setCalendarRef = useCallback((node) => {
    if (!node) {
      return
    }

    calendarRef.current = node

    if (focusableElementPosition.current) {
      const focusableElement = getBoundaryElement(
        focusableElementPosition.current
      )
      focusableElement.focus()
    }
  }, [])

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

    if (!focusableElement) {
      const shouldIncrementMonth = offsetsMap[key] < 0

      focusableElementPosition.current = shouldIncrementMonth ? 'last' : 'first'
      setDisplayedDate((prevState) =>
        addMonths(prevState, shouldIncrementMonth ? -1 : 1)
      )
      return
    }

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
        ref={(node) => setCalendarRef(node)}
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
