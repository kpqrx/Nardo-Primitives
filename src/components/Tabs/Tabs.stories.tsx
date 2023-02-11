import React, { useMemo, useState } from 'react'
import type { Meta, StoryFn, StoryObj } from '@storybook/react'

import Tabs from './Tabs'

const meta: Meta<typeof Tabs> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Tabs',
  component: Tabs,
}

export default meta
type Story = StoryObj<typeof Tabs>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/react/api/csf
 * to learn how to use render functions.
 */
export const Default: StoryFn = () => {
  return (
    <Tabs
      controls={[
        { id: 'tab-1', label: 'Tab 1', icon: '😏' },
        { id: 'tab-2', label: 'Tab 2', icon: '🥹' },
        { id: 'tab-3', label: 'Tab 3', icon: '🥲' },
      ]}
      activationMode="manual"
    >
      <Tabs.ControlsList
        render={({ label, icon }) => (
          <span>
            {label} {icon}
          </span>
        )}
      />

      <Tabs.Panel id="tab-1">
        <h1>Tab 1</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus
          repudiandae nihil, quos repellendus dolor obcaecati architecto
          deserunt unde! Quam dolore enim ex inventore et provident facilis, a
          fugiat maiores quidem!
        </p>
      </Tabs.Panel>
      <Tabs.Panel id="tab-2">
        <h1>Tab 2</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus
          repudiandae nihil, quos repellendus dolor obcaecati architecto
          deserunt unde! Quam dolore enim ex inventore et provident facilis, a
          fugiat maiores quidem!
        </p>
      </Tabs.Panel>
      <Tabs.Panel id="tab-3">
        <h1>Tab 3</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus
          repudiandae nihil, quos repellendus dolor obcaecati architecto
          deserunt unde! Quam dolore enim ex inventore et provident facilis, a
          fugiat maiores quidem!
        </p>
      </Tabs.Panel>
    </Tabs>
  )
}
