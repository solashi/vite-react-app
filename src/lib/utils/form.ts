import { ServerValidateError } from 'lib/types'
import { ErrorOption, Path, UseFormSetError } from 'react-hook-form'

export const handleValidateErrors = <T>(
  error: ServerValidateError<T>,
  setError: UseFormSetError<T>,
  options: ErrorOption = {}
) => {
  for (const name in error.errors) {
    setError(name as Path<T>, {
      ...options,
      message: error.errors[name]
    })
  }
}
