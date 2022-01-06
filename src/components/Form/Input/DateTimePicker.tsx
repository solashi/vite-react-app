import DateTimePicker, { DateTimePickerProps } from '@mui/lab/DateTimePicker'
import { FormControlProps, TextField } from '@mui/material'
import { parseISO } from 'date-fns'
import { formatDateTime } from 'lib/utils'
import { useController, UseControllerProps } from 'react-hook-form'
import { AddControlProps, InputControl } from '..'

type DateTimeProps<T> = UseControllerProps<T> &
  AddControlProps & {
    controlProps?: FormControlProps
  } & Omit<DateTimePickerProps, 'renderInput' | 'onChange' | 'value'>

function DateTimePickers<T>({
  name,
  label,
  control,
  controlProps,
  helperText,
  ...props
}: DateTimeProps<T>) {
  const {
    field: { onChange, value, ref, ...inputProps },
    fieldState: { error: fieldError }
  } = useController({ name, control })

  const handleChange = (newValue: unknown) => {
    onChange(formatDateTime(newValue as Date))
  }

  return (
    <InputControl fieldError={fieldError} helperText={helperText} label={label} {...controlProps}>
      <DateTimePicker
        {...props}
        {...inputProps}
        value={value ? parseISO(value as string) : null}
        onChange={handleChange}
        inputRef={ref}
        inputFormat="yyyy-MM-dd HH:mm:ss"
        mask="____-__-__ __:__:__"
        renderInput={(params) => <TextField {...params} />}
      />
    </InputControl>
  )
}

export { DateTimePickers }
