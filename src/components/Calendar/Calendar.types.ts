export interface CalendarProps extends React.PropsWithChildren {
  defaultDate?: Date
  value?: Date
  onChange?: React.Dispatch<React.SetStateAction<Date>>
  className?: string
}

export type CalendarContextType = {
  currentDate?: Date
  setCurrentDate?: React.Dispatch<React.SetStateAction<Date>>
  displayedDate?: Date
  setDisplayedDate?: React.Dispatch<React.SetStateAction<Date>>
}

export type MonthDirectionType = 'next' | 'previous'

export type MonthSwitcherProps = React.HTMLAttributes<unknown> &
  React.PropsWithChildren & {
    direction: MonthDirectionType
    onClick?: React.MouseEventHandler<HTMLButtonElement>
  }

export type DatesGridItemType = {
  date: Date
  onClick: () => void
}

export type DaysGridProps = React.HTMLAttributes<unknown> & {
  completeWithExtraDays?: MonthDirectionType | 'both'
  render: (args: DatesGridItemType) => React.ReactNode
}

export type SelectedDateProps = React.HTMLAttributes<unknown> & {
  scope: 'currentDate' | 'displayedDate'
  render: (scopedDateObject: Date) => JSX.Element
}
