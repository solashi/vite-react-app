import {
  Autocomplete,
  CircularProgress,
  FormControlProps,
  InputAdornment,
  OutlinedInputProps
} from '@mui/material'
import { useSelectQuery } from 'lib/hooks'
import { UnknownObj } from 'lib/types'
import { SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { Tag } from '../components'
import InputControl, { AddControlProps } from '../InputControl'
import { InputStyled } from '../InputStyled'

export type SelectOption = {
  label: string
  value: unknown
}

export type SelectQueryProps<T extends UnknownObj> = {
  query?: string
  queryFilter?: string
  addQueryFilter?: UnknownObj
  labelValueKeys?: [keyof T, keyof T]
}

export type LabelValueType<T> = [keyof T, keyof T]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseSelectProps<T> = UseControllerProps<any> &
  AddControlProps &
  OutlinedInputProps & {
    controlProps?: FormControlProps
    options?: SelectOption[]
    multiple?: boolean
    loading?: boolean
    labelValueKeys?: LabelValueType<T>
  }

export type SelectProps<T extends UnknownObj> = BaseSelectProps<T> & SelectQueryProps<T>

const defaultKey = ['name', 'id']

function Select<T extends UnknownObj>({
  name,
  control,
  defaultValue,
  fullWidth,
  label,
  helperText,
  controlProps,
  options: rawOptions,
  multiple,
  loading,
  query,
  queryFilter,
  addQueryFilter,
  labelValueKeys = defaultKey as LabelValueType<T>,
  ...props
}: SelectProps<T>) {
  const {
    field: { ref, onChange, onBlur, value: rawValue },
    fieldState: { error }
  } = useController({ name, control, defaultValue })

  const [inputValue, setInputValue] = useState('')

  const queryParams = useMemo(() => {
    if (!queryFilter || !addQueryFilter) return
    const inputParams = inputValue ? { [queryFilter]: inputValue } : undefined

    return { ...inputParams, ...addQueryFilter }
  }, [addQueryFilter, inputValue, queryFilter])

  const { options: queryOptions, isLoading } = useSelectQuery<T>({
    endpoint: query,
    params: queryParams,
    labelValueKeys: labelValueKeys as [keyof T, keyof T],
    enabled: !!query
  })

  const filterValue = useCallback(
    (value: unknown | unknown[]) => {
      const _options = query ? queryOptions : rawOptions

      if (!_options) {
        return multiple ? [] : null
      }

      if (multiple) {
        return (
          _options.filter(
            (option) => ((value as unknown[]) || []).findIndex((el) => el === option.value) !== -1
          ) || []
        )
      }

      return _options.find((option) => option.value === value) || null
    },
    [query, queryOptions, rawOptions, multiple]
  )

  const [value, setValue] = useState(filterValue(rawValue))

  useEffect(() => {
    setValue(filterValue(rawValue))
  }, [rawValue, filterValue])

  const handleChangeValue = (
    e: SyntheticEvent<Element, Event>,
    newValue: SelectOption | SelectOption[] | null
  ) => {
    if (!newValue) return
    if (multiple) {
      const _value = (newValue as SelectOption[]).map((option) => option.value)
      onChange(_value)
    } else {
      onChange((newValue as SelectOption).value)
    }

    setValue(newValue)
  }

  const handleChangeInputValue = (
    e: SyntheticEvent<Element, Event>,
    newValue: string,
    reason: string
  ) => {
    if (reason === 'reset') return
    setInputValue(newValue)
  }

  return (
    <InputControl
      fieldError={error}
      fullWidth={fullWidth}
      label={label}
      helperText={helperText}
      {...controlProps}
    >
      <Autocomplete
        value={value}
        inputValue={inputValue}
        onChange={handleChangeValue}
        onInputChange={handleChangeInputValue}
        multiple={multiple}
        onBlur={onBlur}
        ref={ref}
        loading={loading || isLoading}
        disablePortal
        options={rawOptions || queryOptions}
        isOptionEqualToValue={(options, value) => options.value === value.value}
        renderInput={(params) => (
          <InputStyled
            fullWidth
            {...params.InputProps}
            inputProps={params.inputProps}
            endAdornment={
              <InputAdornment position="end">
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </InputAdornment>
            }
            {...props}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option: SelectOption, index: number) => (
            <Tag label={option.label} {...getTagProps({ index })} key={index} />
          ))
        }
      />
    </InputControl>
  )
}

export { Select }