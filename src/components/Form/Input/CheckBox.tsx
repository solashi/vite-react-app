import { Checkbox, FormControlLabel, FormControlProps } from '@mui/material'
import { useController, UseControllerProps } from 'react-hook-form'
import { AddControlProps } from '..'

export type CheckBoxProps<T> = UseControllerProps<T> &
  AddControlProps & {
    controlProps?: FormControlProps
  }

function CheckBox<T>({ name, label, control }: CheckBoxProps<T>) {
  const {
    field: { onChange, value }
  } = useController({ name, control })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }

  return (
    <FormControlLabel
      control={<Checkbox onChange={handleChange} checked={!!value} />}
      label={label as string}
    />
  )
}

export { CheckBox }
