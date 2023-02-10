import React, { useMemo, useState } from 'react'
import type { Meta, StoryFn, StoryObj } from '@storybook/react'
import './Calendar.stories.styles.css'

import Calendar from './Calendar'

const meta: Meta<typeof Calendar> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Calendar',
  component: Calendar,
}

export default meta
type Story = StoryObj<typeof Calendar>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/react/api/csf
 * to learn how to use render functions.
 */
export const Default: StoryFn = () => {
  const [date, setDate] = useState(new Date())

  const dateString = useMemo(() => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString()

    return `${year}-${month}-${day}`
  }, [date])

  return (
    <>
      <input
        type="date"
        value={dateString}
        readOnly
        className="elo"
      />
      <Calendar
        value={date}
        onChange={setDate}
        className="calendar"
      >
        <div className="calendar__header">
          <Calendar.MonthSwitcherButton direction="previous">
            Previous
          </Calendar.MonthSwitcherButton>
          <Calendar.SelectedDate
            scope="displayedDate"
            render={(date) => <span>{date.toDateString()}</span>}
          />
          <Calendar.MonthSwitcherButton direction="next">
            Next
          </Calendar.MonthSwitcherButton>
        </div>
        <Calendar.DaysGrid
          className="calendar__body"
          completeWithExtraDays="both"
          render={({ day, onClick }) => (
            <button onClick={onClick}>{day}</button>
          )}
        />
      </Calendar>
    </>
  )
}
