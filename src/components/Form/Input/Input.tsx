import { FormControlProps, OutlinedInputProps } from '@mui/material'
import { useController, UseControllerProps } from 'react-hook-form'
import { AddControlProps, InputControl } from '..'
import { AdditionInputProps, InputStyled } from '../components/InputStyled'

export type InputProps<T> = UseControllerProps<T> &
  OutlinedInputProps &
  AddControlProps &
  AdditionInputProps & {
    controlProps?: FormControlProps
    insideLabel?: string
  }

function Input<T>({
  name,
  control,
  defaultValue,
  fullWidth,
  label,
  helperText,
  controlProps,
  insideLabel,
  required,
  ...props
}: InputProps<T>) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error }
  } = useController({ name, control, defaultValue })

  return (
    <InputControl
      fieldError={error}
      fullWidth={fullWidth}
      label={label}
      helperText={helperText}
      required={required}
      {...controlProps}
    >
      <InputStyled label={insideLabel} {...inputProps} {...props} inputRef={ref} />
    </InputControl>
  )
}

export { Input }
