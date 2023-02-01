import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  HTMLInputTypeAttribute,
  ReactNode,
} from 'react'

export interface FormFieldProps {
  id?: string
  name?: string
  children: ReactNode | ((renderProps: FormFieldContextType) => ReactNode)
}

export type LabelProps = {
  children: string
}

export type InputProps = ComponentPropsWithoutRef<'input' | 'textarea'> & {
  type?: HTMLInputTypeAttribute | 'textarea'
  value?: string
}

export type FormFieldContextType = {
  value?: string
  setValue?: (value: string) => void
  id?: string
  name?: string
}
