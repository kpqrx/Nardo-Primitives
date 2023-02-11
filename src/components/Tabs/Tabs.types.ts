type ControlsType = {
  id: string | number
  [k: string]: any
}[]

export interface TabsProps extends React.PropsWithChildren {
  defaultTab?: string | number
  controls: ControlsType
  activationMode: 'auto' | 'manual'
}

export type ItemProps = React.PropsWithChildren & {
  id: string | number
}

export type ControlsListProps = React.PropsWithChildren & {
  render: (item: { [k: string]: any }) => React.ReactNode
}

export type TabsContextType = {
  controls?: ControlsType
  activeTab?: string | number
  setActiveTab?: React.Dispatch<React.SetStateAction<string | number>>
  activationMode?: 'auto' | 'manual'
}
