import {
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  OutlinedInputProps,
  Select,
  Stack
} from '@mui/material'
import { useState } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { AddControlProps, InputControl } from '..'

function years() {
  const years = []
  for (let i = 1900; i <= new Date().getFullYear(); i++) {
    const year_obj = { label: `${i}`, value: i }
    years.push(year_obj)
  }
  return years
}

function months() {
  const months = []
  for (let i = 1; i <= 12; i++) {
    const month_obj = { label: `${i}`, value: i }
    months.push(month_obj)
  }
  return months
}

export type SelectDateProps = UseControllerProps<any> &
  OutlinedInputProps &
  AddControlProps & {
    controlProps?: FormControlProps
  }

export function DateOfBirth({ name, label, control, fullWidth }: SelectDateProps) {
  const {
    field: { onChange },
    fieldState: { error }
  } = useController({ name, control })

  const [year, setYear] = useState(1)
  const [month, setMonth] = useState(1)
  const [date, setDate] = useState(1)

  const handleChangeYear = (e: any) => {
    setYear(e.target.value)
  }

  const handleChangeMonth = (e: any) => {
    setMonth(e.target.value)
  }
  const handleChangeDate = (e: any) => {
    setDate(e.target.value)
  }

  return (
    <InputControl label={label} fieldError={error}>
      <Stack direction="row" spacing={2}>
        <FormControl fullWidth={fullWidth}>
          <InputLabel>年</InputLabel>
          <Select onChange={handleChangeYear} label="年">
            {years().map((el) => (
              <MenuItem key={el.value} value={el.value}>
                {el.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth={fullWidth}>
          <InputLabel>月</InputLabel>
          <Select onChange={handleChangeMonth} label="月">
            {months().map((el) => (
              <MenuItem key={el.value} value={el.value}>
                {el.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth={fullWidth}>
          <InputLabel>日</InputLabel>
          <Select onChange={handleChangeDate} label="日">
            {[...Array(new Date(year, month, 0).getDate())].map((_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </InputControl>
  )
}
