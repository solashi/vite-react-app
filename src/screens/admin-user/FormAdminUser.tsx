import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Grid, Stack } from '@mui/material'
import { Input } from 'components/Form'
import { Page } from 'components/Layouts'
import { CreateAdminUser, UpdateAdminUser } from 'lib/api/adminUser'
import { useApiResource } from 'lib/hooks/useApiResource'
import { AdminUser } from 'lib/types'
import { handleValidateErrors } from 'lib/utils'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router'
import * as yup from 'yup'

const validateAdminUser = yup
  .object({
    name: yup.string().required('名前は必須入力です。'),
    email: yup
      .string()
      .email('メールアドレスが正しい形式ではありません。')
      .required('メールアドレスは必須入力です。'),
    password: yup
      .string()
      .required('パスワードは必須入力です。')
      .min(8, 'パスワードは8文字以上で入力して下さい。')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'パスワードは半角英数字を混ぜたものを指定してください。'
      ),
    confirm_password: yup
      .string()
      .test('passwords-match', 'パスワードが一致しません', function (value) {
        return this.parent.password === value
      })
  })
  .required()

const FormAdminUser: React.VFC = () => {
  const navigate = useNavigate()
  const slug = useParams()

  const { createOrUpdateApi } = useApiResource<AdminUser, CreateAdminUser>('admin-users')

  const { control, handleSubmit, setValue, setError } = useForm<CreateAdminUser | UpdateAdminUser>({
    defaultValues: {
      id: Number(slug?.id),
      name: '',
      email: '',
      password: ''
    },
    resolver: yupResolver(validateAdminUser)
  })

  useQuery<AdminUser>([`admin-users/${slug.id}`], {
    onSuccess: (data) => {
      setValue('name', data.name)
      setValue('email', data.email)
    },
    enabled: !!slug?.id
  })

  const onSubmit: SubmitHandler<CreateAdminUser | UpdateAdminUser> = async (values) => {
    try {
      await createOrUpdateApi(values)
      navigate('/admin-user')
    } catch (error) {
      if (error.errors) {
        handleValidateErrors(error, setError)
      }
    }
  }

  return (
    <Page title="管理者新規登録">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <Stack spacing={2} mb={3}>
          <Input fullWidth label="名前" name="name" control={control} />

          <Input fullWidth label="メールアドレス" name="email" control={control} />

          <Input fullWidth label="パスワード" name="password" type="password" control={control} />

          <Input
            fullWidth
            label="パスワードの確認"
            name="confirm_password"
            type="password"
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

export { FormAdminUser }
