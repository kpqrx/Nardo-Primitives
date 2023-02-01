import { InputProps, LabelProps } from './FormField.types'
import React, {
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
  useContext,
} from 'react'
import { FormFieldContext } from './FormField'

export const Input = forwardRef((props: InputProps, ref) => {
  const { type, ...restProps } = props
  const { id, name } = useContext(FormFieldContext)

  console.log(restProps.ref)

  return type === 'textarea' ? (
    <textarea
      id={id}
      name={name}
      ref={ref as ForwardedRef<HTMLTextAreaElement>}
      {...(restProps as ComponentPropsWithoutRef<'textarea'>)}
    />
  ) : (
    <input
      id={id}
      name={name}
      type={type}
      ref={ref as ForwardedRef<HTMLInputElement>}
      {...(restProps as ComponentPropsWithoutRef<'input'>)}
    />
  )
})

export const Label = (props: LabelProps) => {
  const { children, ...restProps } = props

  return <span {...restProps}>{children}</span>
}
