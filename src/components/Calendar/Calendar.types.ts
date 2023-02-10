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
  switchDisplayedDate?: SwitchDisplayedDateFunctionType
}

export type SwitchDisplayedDateFunctionType = (
  direction: MonthDirectionType,
  exactDate?: Date
) => void

export type MonthDirectionType = 'next' | 'previous'

export type MonthSwitcherProps = React.HTMLAttributes<unknown> &
  React.PropsWithChildren & {
    direction: MonthDirectionType
    onClick?: React.MouseEventHandler<HTMLButtonElement>
  }

export type DaysGridProps = React.HTMLAttributes<unknown> & {
  completeWithExtraDays?: MonthDirectionType | 'both'
  render: (renderProps: { day: number; onClick: () => void }) => React.ReactNode
}

export type SelectedDateProps = React.HTMLAttributes<unknown> & {
  scope: 'currentDate' | 'displayedDate'
  render: (scopedDateObject: Date) => React.ReactNode
}

type DayType = {
  day: number
  monthOffset: -1 | 0 | 1
}

export type HandleSetCurrentDateType = (args: DayType) => void

export type DaysArrayType = DayType[]
