import { InputAdornment } from '@mui/material'
import { Control } from 'react-hook-form'

type Props = {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, object>
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const ColorAdornment: React.VFC<Props> = ({ name, control, onChange }) => {
  const { _formValues } = control

  return (
    <InputAdornment position="start">
      <input type="color" value={_formValues[name]} onChange={onChange} />
    </InputAdornment>
  )
}

export { ColorAdornment }
