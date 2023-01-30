import React from 'react'

export interface FormFieldContextInterface {
  as: 'input' | 'textarea'
  id: string
  defaultValue: string
}

export interface FormFieldProps extends React.PropsWithChildren {
  as?: 'input' | 'textarea'
  id: string
  value?: string
}

export interface ActionTriggerProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLButtonElement> {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  value?: string
}
