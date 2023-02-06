import React from 'react'
import type { Meta, StoryFn, StoryObj } from '@storybook/react'

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
  return <Calendar></Calendar>
}
