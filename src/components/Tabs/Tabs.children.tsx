import React, { KeyboardEvent, useContext, useRef } from 'react'
import { TabsContext } from './Tabs'
import { ControlsListProps, ItemProps } from './Tabs.types'

export const ControlsList = (props: ControlsListProps) => {
  const { render } = props
  const { controls, activeTab, setActiveTab } = useContext(TabsContext)
  const tabsListRef = useRef<HTMLUListElement>()

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key, target } = event

    const controlButtons = [...tabsListRef.current.children].map(
      (tabsListChild) =>
        [...tabsListChild.children].find(
          ({ localName }) => localName === 'button'
        )
    ) as HTMLButtonElement[]

    let focusCandidateIndex

    switch (key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        focusCandidateIndex =
          controlButtons.indexOf(target as HTMLButtonElement) - 1
        break
      case 'ArrowDown':
      case 'ArrowRight':
        focusCandidateIndex =
          controlButtons.indexOf(target as HTMLButtonElement) + 1
        break
      default:
        return
    }

    focusCandidateIndex =
      focusCandidateIndex < 0
        ? controlButtons.length - 1
        : focusCandidateIndex > controlButtons.length - 1
        ? 0
        : focusCandidateIndex

    controlButtons[focusCandidateIndex].focus()
    event.preventDefault()
  }

  return (
    <ul
      role="tablist"
      ref={tabsListRef}
    >
      {controls.map(({ id, ...item }) => (
        <li>
          <button
            type="button"
            role="tab"
            id={`tabs-item-control-${id}`}
            aria-controls={`tabs-item-panel-${id}`}
            aria-selected={activeTab === id}
            onClick={() => setActiveTab(id)}
            onKeyDown={handleKeyDown}
          >
            {render(item)}
          </button>
        </li>
      ))}
    </ul>
  )
}

export const Panel = (props: ItemProps) => {
  const { children, id, ...restProps } = props
  const { controls, activeTab } = useContext(TabsContext)

  if (!controls.map(({ id: controlId }) => controlId).includes(id)) {
    throw new Error(
      'Given identifier does not represent any provided control item.'
    )
  }

  return (
    <div
      role="tabpanel"
      aria-labelledby={`tabs-item-control-${id}`}
      id={`tabs-item-panel-${id}`}
      hidden={activeTab !== id}
      aria-hidden={activeTab !== id}
      {...restProps}
    >
      {children}
    </div>
  )
}
