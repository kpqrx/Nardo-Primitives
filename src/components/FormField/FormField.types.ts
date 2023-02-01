import {
  ComponentPropsWithRef,
  HTMLInputTypeAttribute,
  PropsWithChildren,
} from 'react'

export interface FormFieldProps extends PropsWithChildren {
  id?: string
  name?: string
}

export type LabelProps = {
  children: string
}

export type InputProps = ComponentPropsWithRef<any> & {
  type?: HTMLInputTypeAttribute | 'textarea'
}

export type FormFieldContextType = {
  id?: string
  name?: string
}
