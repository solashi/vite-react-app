import { FormControlProps, InputBase, OutlinedInputProps } from '@mui/material'
import { FieldError } from 'react-hook-form'
import { AddControlProps, InputControl } from '..'
import { InputStyled } from '../components/InputStyled'

export type RawInputProps = OutlinedInputProps &
  AddControlProps & {
    controlProps?: FormControlProps
    fieldError?: FieldError | boolean
    variant?: 'base' | 'outlined'
  }

function RawInput({
  fullWidth,
  label,
  helperText,
  controlProps,
  fieldError,
  variant,
  ...props
}: RawInputProps) {
  return (
    <InputControl
      fieldError={fieldError}
      fullWidth={fullWidth}
      label={label}
      helperText={helperText}
      {...controlProps}
    >
      {variant === 'base' ? <InputBase {...props} /> : <InputStyled {...props} />}
    </InputControl>
  )
}

export { RawInput }
