import { InputAdornment } from '@mui/material'
import { useRef } from 'react'
import { useController } from 'react-hook-form'
import { InputProps } from '.'
import { InputControl, Tag } from '..'
import { InputStyled } from '../components/InputStyled'

function InputTag<T>({
  name,
  control,
  defaultValue,
  fullWidth,
  label,
  helperText,
  controlProps,
  ...props
}: InputProps<T>) {
  const {
    field: { onBlur, onChange, value },
    fieldState: { error }
  } = useController({ name, control, defaultValue })

  const inputRef = useRef<HTMLInputElement>(null)

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e
    const trimmedInput = String(inputRef.current?.value || '').trim()
    if (key === ',' && trimmedInput.length && !(value as string[]).includes(trimmedInput)) {
      e.preventDefault()
      onChange([...(value as string[]), trimmedInput])
      ;(inputRef.current as HTMLInputElement).value = ''
    }
  }

  const onDeleteTag = (tag: string) => {
    const newValue = (value as string[]).filter((t: string) => t !== tag)
    onChange(newValue)
  }

  const handleBlur = () => {
    const trimmedInput = String(inputRef.current?.value || '').trim()
    if (trimmedInput) {
      onChange([...(value as string[]), trimmedInput])
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
          (value as string[])?.length > 0 ? (
            <InputAdornment position="end">
              {(value as string[]).map((tag: string) => (
                <Tag label={tag} key={tag} onDelete={() => onDeleteTag(tag)} sx={{ mr: 1 }} />
              ))}
            </InputAdornment>
          ) : null
        }
        inputRef={inputRef}
      />
    </InputControl>
  )
}

export { InputTag }
