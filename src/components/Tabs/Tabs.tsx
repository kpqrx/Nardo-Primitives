import React, { createContext, useState } from 'react'
import { ControlsList, Panel } from './Tabs.children'
import { TabsContextType, TabsProps } from './Tabs.types'

export const TabsContext = createContext<TabsContextType>({})

function Tabs(props: TabsProps) {
  const { children, defaultTab, controls, ...restProps } = props
  const [activeTab, setActiveTab] = useState(defaultTab || controls[0].id)

  return (
    <TabsContext.Provider value={{ controls, activeTab, setActiveTab }}>
      <div {...restProps}>{children}</div>
    </TabsContext.Provider>
  )
}

const TabsNamespace = Object.assign(Tabs, { ControlsList, Panel })

export default TabsNamespace
