import { InputAdornment } from '@mui/material'
import { Control } from 'react-hook-form'

type Props<T> = {
  name: string
  control: Control<T, object>
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

function ColorAdornment<T>({ name, control, onChange }: Props<T>) {
  const { _formValues } = control

  return (
    <InputAdornment position="start">
      <input type="color" value={_formValues[name]} onChange={onChange} />
    </InputAdornment>
  )
}

export { ColorAdornment }
