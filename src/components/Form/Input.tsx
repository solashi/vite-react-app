import { FormControlProps, OutlinedInputProps } from '@mui/material'
import { Control, useController, UseControllerProps } from 'react-hook-form'
import { ColorAdornment } from './ColorAdornment'
import InputControl, { AddControlProps } from './InputControl'
import { InputStyled } from './InputStyled'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InputProps = UseControllerProps<any> &
  OutlinedInputProps &
  AddControlProps & {
    colorPicker?: boolean
    controlProps?: FormControlProps
  }

function Input({
  name,
  control,
  defaultValue,
  fullWidth,
  label,
  helperText,
  colorPicker,
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
      <InputStyled
        {...inputProps}
        {...props}
        startAdornment={
          colorPicker ? (
            <ColorAdornment
              name={name}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              control={control as Control<any, object>}
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
