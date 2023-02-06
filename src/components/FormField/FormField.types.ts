import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  ElementType,
  HTMLInputTypeAttribute,
  PropsWithChildren,
} from 'react'

export type FormFieldContextType = FormFieldBaseProps & {
  ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>
}

type FormFieldBaseProps = {
  id?: string
  name?: string
  type?: HTMLInputTypeAttribute | 'textarea'
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}
export interface FormFieldProps extends PropsWithChildren<FormFieldBaseProps> {
  className?: string
}

export type LabelProps = {
  children: string
}

export type InputProps<T extends ElementType> = ComponentPropsWithoutRef<T>
