import { Autocomplete, FormControlProps, InputAdornment, Stack } from '@mui/material'
import { Box, BoxProps } from '@mui/system'
import { addZero, getDaysInMonth } from 'lib/utils'
import ranger from 'lodash/rangeRight'
import { useMemo, useState } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { AddControlProps, FormHelper, FormLabel, InputStyled } from '..'

export type DatePickerProps<T> = UseControllerProps<T> &
  AddControlProps & {
    controlProps?: FormControlProps
    fullWidth?: boolean
    containerProps?: BoxProps
  }

const monthOptions = [...new Array(12)].map((_, index) => addZero(index + 1))
const yearRanger = [1800, new Date().getFullYear()]
const yearOptions = ranger(yearRanger[0], yearRanger[1] + 1).map(String)
const defaultDayOptions = [...new Array(31)].map((_, index) => addZero(index + 1))

function DatePicker<T>({
  name,
  control,
  defaultValue,
  label,
  helperText,
  containerProps
}: DatePickerProps<T>) {
  const {
    field: { onChange },
    fieldState: { error: fieldError }
  } = useController({ name, control, defaultValue })

  const [year, setYear] = useState<string | null>(null)
  const [month, setMonth] = useState<string | null>(null)
  const [date, setDate] = useState<string | null>(null)

  const handleChangeValue = (newValue: string, type: 'year' | 'month' | 'date') => {
    let d: string
    switch (type) {
      case 'year':
        setYear(newValue)
        d = `${newValue}/${month}/${date}`
        break
      case 'month':
        setMonth(newValue)
        d = `${year}/${newValue}/${date}`
        break
      default:
        setDate(newValue)
        d = `${year}/${month}/${newValue}`
        break
    }
    onChange(d)
  }

  const dateOptions = useMemo(() => {
    const dates =
      year && month
        ? getDaysInMonth(Number(year), Number(month) - 1).map(addZero)
        : defaultDayOptions

    if (!dates.includes(date as string) && date !== null) {
      setDate(dates[dates.length - 1])
    }

    return dates
  }, [date, month, year])

  return (
    <Box {...containerProps}>
      {label && <FormLabel>{label}</FormLabel>}
      <Stack direction="row" mt={0.5} spacing={1}>
        <Autocomplete
          options={yearOptions}
          disableClearable
          value={year as string}
          onChange={(e, newValue) => handleChangeValue(newValue, 'year')}
          sx={{ minWidth: 150 }}
          renderInput={(params) => (
            <InputStyled
              fullWidth
              {...params.InputProps}
              inputProps={params.inputProps}
              placeholder="年"
              endAdornment={
                <InputAdornment position="end">
                  {typeof year === 'string' ? '年' : undefined}
                  {params.InputProps.endAdornment}
                </InputAdornment>
              }
            />
          )}
        />

        <Autocomplete
          options={monthOptions}
          disableClearable
          value={month as string}
          onChange={(e, newValue) => handleChangeValue(newValue, 'month')}
          sx={{ minWidth: 120 }}
          renderInput={(params) => (
            <InputStyled
              fullWidth
              {...params.InputProps}
              inputProps={params.inputProps}
              placeholder="月"
              endAdornment={
                <InputAdornment position="end">
                  {typeof month === 'string' ? '月' : undefined}
                  {params.InputProps.endAdornment}
                </InputAdornment>
              }
            />
          )}
        />

        <Autocomplete
          options={dateOptions}
          disableClearable
          value={date as string}
          onChange={(e, newValue) => handleChangeValue(newValue, 'date')}
          sx={{ minWidth: 120 }}
          renderInput={(params) => (
            <InputStyled
              fullWidth
              {...params.InputProps}
              inputProps={params.inputProps}
              placeholder="年"
              endAdornment={
                <InputAdornment position="end">
                  {typeof date === 'string' ? '日' : undefined}
                  {params.InputProps.endAdornment}
                </InputAdornment>
              }
            />
          )}
        />
      </Stack>
      {helperText && <FormHelper error={false}>{helperText}</FormHelper>}

      {!!fieldError && (
        <FormHelper error>
          {typeof fieldError === 'boolean' ? helperText : fieldError?.message}
        </FormHelper>
      )}
    </Box>
  )
}

export { DatePicker }
