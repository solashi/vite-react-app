import { FormControlProps } from '@mui/material'
import { Editor as RichTextEditor, IAllProps } from '@tinymce/tinymce-react'
import { useCallback, useRef } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { Editor } from 'tinymce'
import { AddControlProps, InputControl } from '..'
import { apiKey, init } from './config'

export type RichTextProps<T> = UseControllerProps<T> &
  AddControlProps & {
    controlProps?: FormControlProps
  } & IAllProps

function RichText<T>({
  name,
  control,
  defaultValue,
  label,
  helperText,
  controlProps,
  ...props
}: RichTextProps<T>) {
  const {
    field: { onChange },
    fieldState: { error }
  } = useController({ name, control, defaultValue })

  const editorRef = useRef<Editor | null>(null)
  const timer = useRef<number | null>(null)

  const save = useCallback(() => {
    if (editorRef.current) {
      const content = editorRef.current.getContent()
      onChange(content)
    }
  }, [onChange])

  const onEditorChange = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    timer.current = setTimeout(save, 500)
  }, [save])

  return (
    <InputControl fieldError={error} label={label} helperText={helperText} {...controlProps}>
      <RichTextEditor
        initialValue={defaultValue as string}
        apiKey={apiKey}
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={init}
        onEditorChange={onEditorChange}
        {...props}
      />
    </InputControl>
  )
}

export { RichText }
