import { InputProps, LabelProps } from './FormField.types'
import React, { ElementType, useContext } from 'react'
import { FormFieldContext } from './FormField'

export const Input = <T extends ElementType>(props: InputProps<T>) => {
  const { type, ...restProps } = props
  const { ref, ...restInputAttributes } = useContext(FormFieldContext)

  const ComponentTag = type === 'textarea' ? type : 'input'

  return (
    <ComponentTag
      ref={ref}
      {...restInputAttributes}
      {...restProps}
    />
  )
}

export const Label = (props: LabelProps) => {
  const { children, ...restProps } = props

  return <span {...restProps}>{children}</span>
}
