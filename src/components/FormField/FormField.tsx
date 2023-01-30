import React, { createContext, useEffect } from 'react'
import {
  ActionTrigger,
  Container,
  Field,
  Label,
} from '@components/FormField/FormField.children'
import {
  FormFieldContextInterface,
  FormFieldProps,
} from '@components/FormField/FormField.types'

export const FormFieldContext =
  createContext<FormFieldContextInterface>(undefined)

const FormField = (props: FormFieldProps) => {
  const {
    children,
    as = 'input',
    id,
    value: defaultValue = '',
    ...restProps
  } = props

  useEffect(() => {
    const areRequiredChildrenProvided = [Field, Label].every((requiredChild) =>
      React.Children.toArray(children).some(
        (child: React.ReactElement) => requiredChild === child.type
      )
    )

    if (!areRequiredChildrenProvided) {
      throw new Error('Required children are not provided.')
    }
  }, [])

  return (
    <FormFieldContext.Provider value={{ as, id, defaultValue }}>
      <Container {...restProps}>{children}</Container>
    </FormFieldContext.Provider>
  )
}

FormField.Field = Field
FormField.Label = Label
FormField.ActionTrigger = ActionTrigger

export default FormField
