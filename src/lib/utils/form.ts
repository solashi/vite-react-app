import { ServerValidateError } from 'lib/types'
import {
  ErrorOption,
  Path,
  PathValue,
  SetValueConfig,
  UnpackNestedValue,
  UseFormSetError,
  UseFormSetValue
} from 'react-hook-form'

export const handleValidateErrors = <T>(
  error: ServerValidateError<T>,
  setError: UseFormSetError<T>,
  options: ErrorOption = {}
) => {
  for (const name in error.errors) {
    setError(name as unknown as Path<T>, {
      ...options,
      message: error.errors[name]
    })
  }
}

export const setFormValues = <T>(
  data: T,
  setValue: UseFormSetValue<T>,
  options: SetValueConfig = {}
) => {
  for (const name in data) {
    setValue(
      name as unknown as Path<T>,
      data[name] as UnpackNestedValue<PathValue<T, Path<T>>>,
      options
    )
  }
}
