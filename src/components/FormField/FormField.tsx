import React, { createContext, useState } from 'react'
import { FormFieldContextType, FormFieldProps } from './FormField.types'
import { Label, Input } from './FormField.children'

export const FormFieldContext = createContext<FormFieldContextType>({})

const FormField = (props: FormFieldProps) => {
  const { children, id, name } = props
  const [value, setValue] = useState('')

  return (
    <label>
      <FormFieldContext.Provider value={{ value, setValue, id, name }}>
        {children instanceof Function
          ? children({ value, setValue, id, name })
          : children}
      </FormFieldContext.Provider>
    </label>
  )
}
FormField.Label = Label
FormField.Input = Input

export default FormField
