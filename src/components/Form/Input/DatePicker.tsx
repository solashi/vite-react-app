import { DatePickerProps } from '@mui/lab'
import MuiDatePicker from '@mui/lab/DatePicker'
import { FormControlProps, TextField } from '@mui/material'
import { parseISO } from 'date-fns'
import { formatISODate } from 'lib/utils'
import { useController, UseControllerProps } from 'react-hook-form'
import { AddControlProps, InputControl } from '..'

type ControlProps = AddControlProps & {
  controlProps?: FormControlProps
  fullWidth?: boolean
}

type DatePickerType<T> = UseControllerProps<T> &
  ControlProps &
  Omit<DatePickerProps, 'renderInput' | 'onChange' | 'value'>

function DatePicker<T>({
  name,
  control,
  defaultValue,
  label,
  helperText,
  fullWidth,
  controlProps,
  ...props
}: DatePickerType<T>) {
  const {
    field: { onChange, value, ref, ...inputProps },
    fieldState: { error: fieldError }
  } = useController({ name, control, defaultValue })

  const handleChange = (newValue: unknown) => {
    onChange(formatISODate(newValue as Date))
  }

  return (
    <InputControl
      fieldError={fieldError}
      fullWidth={fullWidth}
      label={label}
      helperText={helperText}
      {...controlProps}
    >
      <MuiDatePicker
        {...props}
        {...inputProps}
        inputFormat="yyyy-MM-dd"
        mask="____-__-__"
        value={value ? parseISO(value as string) : null}
        onChange={handleChange}
        inputRef={ref}
        renderInput={(params) => <TextField {...params} />}
      />
    </InputControl>
  )
}

export { DatePicker }
