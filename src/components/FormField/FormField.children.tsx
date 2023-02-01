import { InputProps, LabelProps } from './FormField.types'
import React, {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  useContext,
  useEffect,
} from 'react'
import { FormFieldContext } from './FormField'

export const Input = (props: InputProps) => {
  const { type, value: defaultValue, ...restProps } = props
  const { value, setValue, id, name } = useContext(FormFieldContext)

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue)
    }
  })

  const handleSetValue: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const {
      target: { value },
    } = event

    setValue(value)
  }

  return type === 'textarea' ? (
    <textarea
      value={value}
      onChange={handleSetValue}
      {...(restProps as ComponentPropsWithoutRef<'textarea'>)}
      id={id}
      name={name}
    />
  ) : (
    <input
      value={value}
      onChange={handleSetValue}
      type={type}
      {...(restProps as ComponentPropsWithoutRef<'input'>)}
      id={id}
      name={name}
    />
  )
}

export const Label = (props: LabelProps) => {
  const { children, ...restProps } = props

  return <span {...restProps}>{children}</span>
}
