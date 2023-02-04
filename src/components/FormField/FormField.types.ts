import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  ElementType,
  HTMLInputTypeAttribute,
  PropsWithChildren,
} from 'react'

export type FormFieldContextType = {
  id?: string
  name?: string
  type?: HTMLInputTypeAttribute | 'textarea'
  ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export interface FormFieldProps
  extends PropsWithChildren<FormFieldContextType> {}

export type LabelProps = {
  children: string
}

export type InputProps<T extends ElementType> = ComponentPropsWithoutRef<T>
