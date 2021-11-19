import { AvatarProps, Button, Stack, styled, Typography } from '@mui/material'
import { AvatarWithSize } from 'components/Avatar'
import { FileBag, useModalState, useUploader } from 'lib/hooks'
import React, { HTMLInputTypeAttribute } from 'react'
import { Control, useController } from 'react-hook-form'
import Viewer from 'react-viewer'
import { FormLabel } from './Form'

type ImageUploaderProps = AvatarProps<
  'div',
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any, object>
    label: string
    name: string
    size?: number
    defaultValue?: string
    urlUpload?: string
    inputProps?: HTMLInputTypeAttribute
  }
>

const ImageUploader: React.VFC<ImageUploaderProps> = ({
  name,
  label,
  control,
  urlUpload,
  inputProps,
  defaultValue,
  size,
  ...props
}) => {
  const { isOpen, onClose, onOpen } = useModalState()
  const {
    field: { onChange, value }
  } = useController({ name, control, defaultValue })

  const { onDrop } = useUploader({
    url: urlUpload || 'upload',
    onUploaded(file: FileBag) {
      onChange(file.responseData.link as string)
    }
  })

  const handleChooseImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    onDrop(target.files as FileList)
  }

  return (
    <>
      <Stack direction="row" spacing={3} alignItems="center">
        <AvatarWithSize onClick={onOpen} src={value} size={size} {...props} />

        <Stack spacing={1}>
          <FormLabel>{label}</FormLabel>

          <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor="image-uploader-button">
              <HiddenInput
                accept="image/*"
                id="image-uploader-button"
                type="file"
                onChange={handleChooseImage}
                {...inputProps}
              />

              <Button variant="contained" color="info" component="span" disableElevation>
                ファイルを選択
              </Button>
            </label>

            {!value && (
              <Typography variant="body2" color="grey.600">
                選択されていません
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>

      <Viewer
        zIndex={1600}
        visible={isOpen}
        onClose={onClose}
        drag={false}
        noFooter
        onMaskClick={onClose}
        images={[
          {
            src: value,
            alt: 'avatar'
          }
        ]}
      />
    </>
  )
}

const HiddenInput = styled('input')({
  display: 'none'
})

export { ImageUploader }
