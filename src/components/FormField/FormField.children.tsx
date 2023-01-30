import React, {
  ChangeEvent,
  useState,
  forwardRef,
  useContext,
  useMemo,
  useCallback,
} from 'react'

import { ActionTriggerProps } from '@components/FormField/FormField.types'
import { FormFieldContext } from '@components/FormField/FormField'

export const Field = forwardRef(
  <C extends React.ElementType>(
    props: React.ComponentPropsWithRef<C>,
    ref: React.Ref<C>
  ) => {
    const { id, as: Component, defaultValue } = useContext(FormFieldContext)
    const [value, setValue] = useState(defaultValue)

    const handleChange = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const {
        target: { value: fieldValue },
      } = event

      setValue(fieldValue)
    }

    return (
      <Component
        id={id}
        ref={ref}
        value={value}
        onChange={handleChange}
        data-has-value={value.length > 0}
        {...props}
      />
    )
  }
)

export const Container = React.memo((props: React.PropsWithChildren) => {
  const { children, ...restProps } = props
  return <div {...restProps}>{children}</div>
})

export const Label = (props: React.PropsWithChildren) => {
  const { children, ...restProps } = props
  const { id } = useContext(FormFieldContext)

  return (
    <label
      htmlFor={id}
      {...restProps}
    >
      {children}
    </label>
  )
}

export const ActionTrigger = (props: ActionTriggerProps) => {
  const { children, onClick, ...restProps } = props
  const handleClick = useCallback((event) => onClick(event), [])
  return (
    <button
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </button>
  )
}

Container.displayName = 'Container'
Field.displayName = 'Field'
Label.displayName = 'Label'
ActionTrigger.displayName = 'ActionTrigger'
