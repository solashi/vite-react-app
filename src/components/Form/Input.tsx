import { FormControlProps, OutlinedInputProps } from '@mui/material'
import { Control, useController, UseControllerProps } from 'react-hook-form'
import { ColorAdornment } from './ColorAdornment'
import InputControl, { AddControlProps } from './InputControl'
import { InputStyled } from './InputStyled'

export type InputProps<T> = UseControllerProps<T> &
  OutlinedInputProps &
  AddControlProps & {
    colorPicker?: boolean
    controlProps?: FormControlProps
  }

function Input<T>({
  name,
  control,
  defaultValue,
  fullWidth,
  label,
  helperText,
  colorPicker,
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
      <InputStyled
        {...inputProps}
        {...props}
        startAdornment={
          colorPicker ? (
            <ColorAdornment
              name={name}
              control={control as Control<T, object>}
              onChange={inputProps.onChange}
            />
          ) : null
        }
        inputRef={ref}
      />
    </InputControl>
  )
}

export { Input }
