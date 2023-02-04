import React, { createContext, forwardRef } from 'react'
import { FormFieldContextType, FormFieldProps } from './FormField.types'
import { Label, Input } from './FormField.children'

export const FormFieldContext = createContext<FormFieldContextType>({})

const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>((props, ref) => {
  const { children, ...contextValue } = props

  return (
    <label>
      <FormFieldContext.Provider value={{ ...contextValue, ref }}>
        {children}
      </FormFieldContext.Provider>
    </label>
  )
})

const FormFieldNamespace = Object.assign(FormField, { Label, Input })

export default FormFieldNamespace
