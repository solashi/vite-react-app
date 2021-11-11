import {
  FormControl,
  FormControlProps,
  OutlinedInput,
  outlinedInputClasses,
  OutlinedInputProps,
  styled
} from '@mui/material'
import { useController, UseControllerProps } from 'react-hook-form'
import { FormHelper } from './FormHelper'
import { FormLabel } from './FormLabel'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InputProps = UseControllerProps<any> &
  OutlinedInputProps & {
    controlProps?: FormControlProps
    helperText?: string
  }

const InputStyled = styled(OutlinedInput)(({ theme }) => ({
  [`&.${outlinedInputClasses.disabled}`]: {
    backgroundColor: theme.palette.grey[300]
  }
}))

const Input: React.FC<InputProps> = ({
  name,
  control,
  defaultValue,
  fullWidth,
  controlProps,
  label,
  helperText,
  ...props
}) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { error }
  } = useController({ name, control, defaultValue })

  return (
    <FormControl fullWidth={fullWidth} error={!!error} {...controlProps}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <InputStyled {...inputProps} {...props} inputRef={ref} />
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
