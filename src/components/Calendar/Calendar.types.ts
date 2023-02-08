export interface CalendarProps extends React.PropsWithChildren {
  weekdays: string[]
  defaultDate: Date
}

export type CalendarContextType = {
  weekdays?: string[]
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

export type MonthSwitcherProps = React.PropsWithChildren & {
  direction: MonthDirectionType
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export type DaysGridProps = {
  render: (renderProps: { day: number; onClick: () => void }) => React.ReactNode
}

type DayType = {
  day: number
  monthOffset: -1 | 0 | 1
}

export type HandleSetCurrentDateType = (args: DayType) => void

export type DaysDataType = DayType[]
