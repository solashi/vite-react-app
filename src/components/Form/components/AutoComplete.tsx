import {
  Autocomplete as MuiAutoComplete,
  AutocompleteProps,
  CircularProgress,
  InputAdornment,
  OutlinedInputProps
} from '@mui/material'
import { ReactNode, Ref } from 'react'
import { InputStyled } from '../components/InputStyled'

type SelectOption = {
  label: string
  value: unknown
}

function CustomAutoComplete<
  T = SelectOption,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>({
  loading,
  inputProps,
  inputRef,
  additionSuffix,
  ...props
}: Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'> & {
  inputProps?: OutlinedInputProps
  inputRef?: Ref<unknown | null>
  additionSuffix?: ReactNode
}) {
  return (
    <MuiAutoComplete
      disablePortal
      {...props}
      renderInput={(params) => (
        <InputStyled
          fullWidth
          {...params.InputProps}
          inputProps={params.inputProps}
          endAdornment={
            <InputAdornment position="end">
              {additionSuffix}
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {params.InputProps.endAdornment}
            </InputAdornment>
          }
          inputRef={inputRef}
          {...inputProps}
        />
      )}
    />
  )
}

export { CustomAutoComplete }
