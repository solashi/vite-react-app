import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Box, Button, Grid, Stack } from '@mui/material'
import { Input } from 'components/Form'
import { Page } from 'components/Layouts'
import { useApiResource } from 'lib/hooks/useApiResource'
import { Instructor } from 'lib/types'
import { handleValidateErrors } from 'lib/utils'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router'
import * as yup from 'yup'

const validateInstructor = yup
  .object({
    name: yup.string().required('名前は必須入力です。'),
    name_en: yup.string().required('名前(English)は必須入力です。'),
    unit_price: yup.string().required(),
    profile: yup.string().required()
  })
  .required()

const FormInstructor: React.VFC = () => {
  const slug = useParams()
  const navigate = useNavigate()

  const { createOrUpdateApi } = useApiResource<Instructor>('instructors')

  const { control, handleSubmit, setValue, setError } = useForm<Instructor>({
    defaultValues: {
      id: Number(slug.id),
      name: '',
      name_en: '',
      unit_price: '',
      profile: '',
      image_path: ''
    },
    resolver: yupResolver(validateInstructor)
  })

  useQuery<Instructor>([`instructors/${slug.id}`], {
    onSuccess: (data) => {
      setValue('name', data.name)
      setValue('name_en', data.name_en)
      setValue('unit_price', data.unit_price)
      setValue('profile', data.profile)
      setValue('image_path', data.image_path)
    },
    enabled: !!slug?.id
  })

  const onSubmit: SubmitHandler<Instructor> = async (values) => {
    try {
      await createOrUpdateApi(values)
      navigate('/instructor')
    } catch (error) {
      if (error.errors) {
        handleValidateErrors(error, setError)
      }
    }
  }

  return (
    <Page title="イベント講師新規登録">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <Stack spacing={2} mb={3}>
          {slug?.id ? (
            <Avatar sx={{ width: 100, height: 100 }} />
          ) : (
            <Input type="file" name="image_path" fullWidth label="名前" control={control} />
          )}

          <Input fullWidth label="名前" name="name" control={control} />

          <Input fullWidth label="名前(English)" name="name_en" control={control} />

          <Input
            fullWidth
            label="プロフィール"
            name="profile"
            rows={6}
            multiline
            control={control}
          />

          <Input
            fullWidth
            label="1回あたりの報酬金額"
            name="unit_price"
            type="number"
            control={control}
          />
        </Stack>

        <Grid container justifyContent="center">
          {slug?.id ? (
            <Button type="submit" variant="contained">
              編集
            </Button>
          ) : (
            <Button type="submit" variant="contained">
              新規登録
            </Button>
          )}
        </Grid>
      </Box>
    </Page>
  )
}

export { FormInstructor }
