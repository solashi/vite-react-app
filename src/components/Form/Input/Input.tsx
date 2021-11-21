import { FormControlProps, OutlinedInputProps } from '@mui/material'
import { useController, UseControllerProps } from 'react-hook-form'
import { AddControlProps, InputControl } from '..'
import { InputStyled } from '../components/InputStyled'

export type InputProps<T> = UseControllerProps<T> &
  OutlinedInputProps &
  AddControlProps & {
    controlProps?: FormControlProps
  }

function Input<T>({
  name,
  control,
  defaultValue,
  fullWidth,
  label,
  helperText,
  controlProps,
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
      {...controlProps}
    >
      <InputStyled {...inputProps} {...props} inputRef={ref} />
    </InputControl>
  )
}

export { Input }
