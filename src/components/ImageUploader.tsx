import { Button, Grid, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { Avatar } from 'components/Avatar'
import { FormDetail } from 'components/Form'
import { FileBag, useModalState, useUploader } from 'lib/hooks'
import React from 'react'
import { Control, useController } from 'react-hook-form'
import Viewer from 'react-viewer'

type ImageUploaderProps = {
  control: Control<any, object>
  label: string
  name: string
  size?: number
  defaultValue?: string
  urlUpload?: string
}

const ImageUploader: React.VFC<ImageUploaderProps> = ({ name, label, control, urlUpload }) => {
  const { isOpen, onClose, onOpen } = useModalState()
  const {
    field: { onChange, value }
  } = useController({ name, control })

  const { onDrop } = useUploader({
    url: urlUpload || 'upload',
    onUploaded: (file: FileBag) => {
      onChange(file.responseData.link as string)
    }
  })

  const handleChooseImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    onDrop(target.files as FileList)
  }

  return (
    <>
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <Avatar onClick={onOpen} imageUrl={value}></Avatar>
        </Grid>
        <Grid item>
          <FormDetail label={label}></FormDetail>
          <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor="image-uploader-button">
              <HiddenInput
                accept="image/*"
                id="image-uploader-button"
                type="file"
                onChange={handleChooseImage}
              />
              <UploadButton variant="outlined" component="span">
                <Typography>ファイルを選択</Typography>
              </UploadButton>
            </label>
            {!value && (
              <Typography variant="body2" color="grey.600">
                選択されていません
              </Typography>
            )}
          </Stack>
        </Grid>
      </Grid>
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

const UploadButton = styled(Button)(({ theme }) => ({
  background: theme.palette.grey[100],
  border: 'none',
  color: theme.palette.grey[900],
  borderRadius: theme.spacing(0.75),
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  '&:hover': {
    border: 'none',
    background: theme.palette.grey[300]
  }
}))

export { ImageUploader }
