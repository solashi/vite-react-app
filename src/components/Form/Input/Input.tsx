import { FormControlProps, OutlinedInputProps } from '@mui/material'
import { useController, UseControllerProps } from 'react-hook-form'
import { AddControlProps, InputControl } from '..'
import { InputStyled } from '../components/InputStyled'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InputProps = UseControllerProps<any> &
  OutlinedInputProps &
  AddControlProps & {
    controlProps?: FormControlProps
  }

function Input({
  name,
  control,
  defaultValue,
  fullWidth,
  label,
  helperText,
  controlProps,
  ...props
}: InputProps) {
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
