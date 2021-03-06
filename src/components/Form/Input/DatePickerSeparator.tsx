import { Autocomplete, FormControlProps, InputAdornment, Stack, Typography } from '@mui/material'
import { Box, BoxProps } from '@mui/system'
import { isValid } from 'date-fns'
import { addZero, getDaysInMonth } from 'lib/utils'
import ranger from 'lodash/rangeRight'
import { useEffect, useMemo, useState } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { AddControlProps, FormHelper, FormLabel, InputStyled } from '..'

export type DatePickerSeparatorProps<T> = UseControllerProps<T> &
  AddControlProps & {
    controlProps?: FormControlProps
    fullWidth?: boolean
    containerProps?: BoxProps
    splitString?: string
  }

const monthOptions = [...new Array(12)].map((_, index) => addZero(index + 1))
const yearRanger = [1800, new Date().getFullYear()]
const yearOptions = ranger(yearRanger[0], yearRanger[1] + 1).map(String)
const defaultDayOptions = [...new Array(31)].map((_, index) => addZero(index + 1))

function DatePickerSeparator<T>({
  name,
  control,
  defaultValue,
  label,
  helperText,
  containerProps,
  splitString = '-',
  required
}: DatePickerSeparatorProps<T>) {
  const {
    field: { onChange, value },
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
        d = newValue + splitString + month + splitString + date
        break
      case 'month':
        setMonth(newValue)
        d = year + splitString + newValue + splitString + date
        break
      default:
        setDate(newValue)
        d = year + splitString + month + splitString + newValue
        break
    }
    onChange(d)
  }

  useEffect(() => {
    if (!value || !isValid(new Date(value as Date))) return
    const d = (value as string).split(splitString)
    setYear(d[0])
    setMonth(d[1])
    setDate(d[2])
  }, [splitString, value])

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
      {label && (
        <FormLabel>
          {label}
          {required && (
            <Typography ml={0.5} variant="caption" color="error.main">
              ??????
            </Typography>
          )}
        </FormLabel>
      )}
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
              placeholder="???"
              endAdornment={
                <InputAdornment position="end">
                  {typeof year === 'string' ? '???' : undefined}
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
              placeholder="???"
              endAdornment={
                <InputAdornment position="end">
                  {typeof month === 'string' ? '???' : undefined}
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
              placeholder="???"
              endAdornment={
                <InputAdornment position="end">
                  {typeof date === 'string' ? '???' : undefined}
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

export { DatePickerSeparator }
