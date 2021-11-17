import { InputAdornment } from '@mui/material'
import { useRef } from 'react'
import { useController } from 'react-hook-form'
import { InputProps } from '.'
import { InputControl, Tag } from '..'
import { InputStyled } from '../components/InputStyled'

function InputTag({
  name,
  control,
  defaultValue,
  fullWidth,
  label,
  helperText,
  controlProps,
  ...props
}: InputProps) {
  const {
    field: { onBlur, onChange, value },
    fieldState: { error }
  } = useController({ name, control, defaultValue })

  const inputRef = useRef<HTMLInputElement>(null)

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e
    const trimmedInput = String(inputRef.current?.value || '').trim()
    if (key === ',' && trimmedInput.length && !value.includes(trimmedInput)) {
      e.preventDefault()
      onChange([...value, trimmedInput])
      ;(inputRef.current as HTMLInputElement).value = ''
    }
  }

  const onDeleteTag = (tag: string) => {
    const newValue = value.filter((t: string) => t !== tag)
    onChange(newValue)
  }

  const handleBlur = () => {
    const trimmedInput = String(inputRef.current?.value || '').trim()
    if (trimmedInput) {
      onChange([...value, trimmedInput])
      ;(inputRef.current as HTMLInputElement).value = ''
    }
    onBlur()
  }

  return (
    <InputControl
      fieldError={error}
      fullWidth={fullWidth}
      label={label}
      helperText={helperText}
      {...controlProps}
    >
      <InputStyled
        onBlur={handleBlur}
        {...props}
        onKeyDown={onKeyDown}
        startAdornment={
          <InputAdornment position="end">
            {value.map((tag: string) => (
              <Tag label={tag} key={tag} onDelete={() => onDeleteTag(tag)} sx={{ mr: 1 }} />
            ))}
          </InputAdornment>
        }
        inputRef={inputRef}
      />
    </InputControl>
  )
}

export { InputTag }
