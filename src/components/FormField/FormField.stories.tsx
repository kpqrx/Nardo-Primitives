import React, { useRef, useState } from 'react'
import type { Meta, StoryFn, StoryObj } from '@storybook/react'

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
export const InputField: StoryFn = () => {
  const ref = useRef<HTMLInputElement>()

  return (
    <FormField
      id="formfield"
      ref={ref}
    >
      <FormField.Label>Full name: </FormField.Label>
      <FormField.Input placeholder="John Doe" />
    </FormField>
  )
}

export const CheckboxField: StoryFn = () => {
  const ref = useRef<HTMLInputElement>()

  return (
    <FormField
      id="formfield"
      type="checkbox"
      ref={ref}
    >
      <FormField.Label>Am I awesome? 🚀: </FormField.Label>
      <FormField.Input defaultChecked />
    </FormField>
  )
}

export const ControlledTextAreaField: StoryFn = () => {
  const [value, setValue] = useState('')

  const handleSetValue = (event) => {
    const {
      target: { value },
    } = event

    setValue(value)
  }

  return (
    <FormField
      id="formfield"
      type={'textarea'}
      value={value}
      onChange={handleSetValue}
    >
      <FormField.Label>First name</FormField.Label>
      <FormField.Input />
    </FormField>
  )
}

export const UncontrolledInputFieldWithCustomActions: StoryFn = () => {
  const ref = useRef<HTMLInputElement>()

  const handleUUIDGeneration = () => {
    ref.current.value = crypto.randomUUID()
  }

  return (
    <FormField
      id="formfield"
      ref={ref}
    >
      <FormField.Label>Identifier: </FormField.Label>
      <small>Generate unique identifier</small>
      <FormField.Input readOnly />
      <button onClick={handleUUIDGeneration}>Generate</button>
    </FormField>
  )
}
