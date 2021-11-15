import {
  FormControl,
  FormControlProps,
  OutlinedInput,
  outlinedInputClasses,
  OutlinedInputProps,
  styled
} from '@mui/material'
import { Control, useController, UseControllerProps } from 'react-hook-form'
import { ColorAdornment } from './ColorAdornment'
import { FormHelper } from './FormHelper'
import { FormLabel } from './FormLabel'

export type InputProps<T> = UseControllerProps<T> &
  OutlinedInputProps & {
    controlProps?: FormControlProps
    helperText?: string
    colorPicker?: boolean
  }

const InputStyled = styled(OutlinedInput)(({ theme }) => ({
  [`&.${outlinedInputClasses.disabled}`]: {
    backgroundColor: theme.palette.grey[300]
  }
}))

function Input<T>({
  name,
  control,
  defaultValue,
  fullWidth,
  controlProps,
  label,
  helperText,
  colorPicker,
  readOnly,
  ...props
}: InputProps<T>) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error }
  } = useController({ name, control, defaultValue })

  return (
    <FormControl fullWidth={fullWidth} error={!!error} {...controlProps}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <InputStyled
        autoComplete="off"
        {...inputProps}
        {...props}
        readOnly={colorPicker || readOnly}
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

      {helperText && (
        <FormHelper id={name} error={false}>
          {helperText}
        </FormHelper>
      )}

      {!!error && (
        <FormHelper id={name} error>
          {error?.message}
        </FormHelper>
      )}
    </FormControl>
  )
}

export { Input }
