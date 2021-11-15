import { FormControl, FormControlProps } from '@mui/material'
import { memo } from 'react'
import { FieldError } from 'react-hook-form'
import { FormHelper } from './FormHelper'
import { FormLabel } from './FormLabel'

export type InputControlProps = FormControlProps & {
  helperText?: string
  label?: string
  error: FieldError
}

function InputControl({
  error,
  fullWidth,
  label,
  helperText,
  children,
  ...props
}: InputControlProps) {
  return (
    <FormControl fullWidth={fullWidth} error={!!error} {...props}>
      {label && <FormLabel>{label}</FormLabel>}

      {children}

      {helperText && <FormHelper error={false}>{helperText}</FormHelper>}

      {!!error && <FormHelper error>{error?.message}</FormHelper>}
    </FormControl>
  )
}

export default memo(InputControl) as typeof InputControl
