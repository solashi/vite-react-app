import { TextField } from '@mui/material'
import { useController, UseControllerProps } from 'react-hook-form'

const Input = (props: UseControllerProps) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { isTouched, invalid },
    formState
  } = useController(props)

  return <TextField {...inputProps} inputRef={ref} />
}

export { Input }
