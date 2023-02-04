import React, { createContext, forwardRef } from 'react'
import { FormFieldContextType, FormFieldProps } from './FormField.types'
import { Label, Input } from './FormField.children'

export const FormFieldContext = createContext<FormFieldContextType>({})

const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>((props, ref) => {
  const { children, id, name, type, onChange, value, ...restProps } = props

  return (
    <label {...restProps}>
      <FormFieldContext.Provider
        value={{ id, name, type, onChange, value, ref }}
      >
        {children}
      </FormFieldContext.Provider>
    </label>
  )
})

const FormFieldNamespace = Object.assign(FormField, { Label, Input })

export default FormFieldNamespace
