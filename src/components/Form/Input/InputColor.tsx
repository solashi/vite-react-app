import { FormControlProps, InputBase, InputBaseProps } from '@mui/material'
import { Control, useController, UseControllerProps } from 'react-hook-form'
import { AddControlProps, ColorAdornment, InputControl } from '..'

export type InputColorProps<T> = UseControllerProps<T> &
  InputBaseProps &
  AddControlProps & {
    controlProps?: FormControlProps
  }

function InputColor<T>({
  name,
  control,
  defaultValue,
  fullWidth,
  label,
  helperText,
  controlProps,
  ...props
}: InputColorProps<T>) {
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
      <InputBase
        {...inputProps}
        {...props}
        startAdornment={
          <ColorAdornment
            name={name}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            control={control as Control<any, object>}
            onChange={inputProps.onChange}
          />
        }
        inputRef={ref}
      />
    </InputControl>
  )
}

export { InputColor }
