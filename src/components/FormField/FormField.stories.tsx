import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import FormField from './FormField'

const meta: Meta<typeof FormField> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'FormField',
  component: FormField,
}

export default meta
type Story = StoryObj<typeof FormField>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/react/api/csf
 * to learn how to use render functions.
 */
export const InputField: Story = {
  render: () => (
    <FormField id="hello">
      <FormField.Label>First name</FormField.Label>
      <FormField.Input />
    </FormField>
  ),
}

export const TextAreaField: Story = {
  render: () => (
    <FormField id="hello">
      <FormField.Label>First name</FormField.Label>
      <FormField.Input type={'textarea'} />
    </FormField>
  ),
}

export const InputFieldWithCustomActions: Story = {
  render: () => (
    <FormField id="hello">
      {({ setValue }) => (
        <>
          <FormField.Label>Identifier: </FormField.Label>
          <small>Generate unique identifier</small>
          <FormField.Input readOnly />
          <button onClick={() => setValue(crypto.randomUUID())}>
            Generate
          </button>
        </>
      )}
    </FormField>
  ),
}
