import React, { useState } from 'react'

import { StoryFn, Meta } from '@storybook/react'

import FormField from './FormField'

export default {
  title: 'FormField',
  component: FormField,
} as Meta<typeof FormField>

export const Default: StoryFn<typeof FormField> = (props) => (
  <FormField {...props}>
    <FormField.Label>Name:</FormField.Label>
    <FormField.Field />
  </FormField>
)

export const WithAction: StoryFn<typeof FormField> = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true)

  return (
    <FormField id={'storybook-example'}>
      <FormField.Label>Password:</FormField.Label>
      <FormField.Field type={isPasswordVisible ? 'password' : 'text'} />
      <FormField.ActionTrigger
        onClick={() => setIsPasswordVisible((prevState) => !prevState)}
      >
        {isPasswordVisible ? 'Show' : 'Hide'}
      </FormField.ActionTrigger>
    </FormField>
  )
}

export const AsTextarea: StoryFn<typeof FormField> = () => (
  <FormField
    id={'storybook-example'}
    as={'textarea'}
  >
    <FormField.Label>Your message:</FormField.Label>
    <FormField.Field />
  </FormField>
)
