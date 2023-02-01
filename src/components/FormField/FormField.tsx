import React, { createContext } from 'react'
import { FormFieldContextType, FormFieldProps } from './FormField.types'
import { Label, Input } from './FormField.children'

export const FormFieldContext = createContext<FormFieldContextType>({})

const FormField = (props: FormFieldProps) => {
  const { children, id, name } = props

  return (
    <label>
      <FormFieldContext.Provider value={{ id, name }}>
        {children}
      </FormFieldContext.Provider>
    </label>
  )
}
FormField.Label = Label
FormField.Input = Input

export default FormField
