import React, { createContext, useState } from 'react'
import { TabsContextType, TabsProps } from './Tabs.types'

export const TabsContext = createContext<TabsContextType>({})

function Tabs(props: TabsProps) {
  const { children, defaultTab, controls, ...restProps } = props
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <TabsContext.Provider value={{ controls, activeTab, setActiveTab }}>
      <div {...restProps}>{children}</div>
    </TabsContext.Provider>
  )
}

export default Tabs
