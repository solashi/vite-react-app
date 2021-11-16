import { FormControl, FormControlProps } from '@mui/material'
import { memo } from 'react'
import { FieldError } from 'react-hook-form'
import { FormHelper } from './FormHelper'
import { FormLabel } from './FormLabel'

export type AddControlProps = {
  helperText?: string
  label?: string
  fieldError?: FieldError | boolean
}

export type InputControlProps = FormControlProps<'div', AddControlProps>

function RawInputControl({
  fieldError,
  fullWidth,
  label,
  helperText,
  children,
  ...props
}: InputControlProps) {
  return (
    <FormControl fullWidth={fullWidth} error={!!fieldError} {...props}>
      {label && <FormLabel>{label}</FormLabel>}

      {children}

      {helperText && <FormHelper error={false}>{helperText}</FormHelper>}

      {!!fieldError && (
        <FormHelper error>
          {typeof fieldError === 'boolean' ? helperText : fieldError?.message}
        </FormHelper>
      )}
    </FormControl>
  )
}

const InputControl = memo(RawInputControl) as typeof RawInputControl

export { InputControl }
