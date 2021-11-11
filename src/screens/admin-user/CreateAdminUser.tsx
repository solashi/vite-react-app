import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Box, Button, Grid, Stack } from '@mui/material'
import { Input } from 'components/Form'
import { Page } from 'components/Layouts'
import { createAdminUserApi, updateAdminUserApi } from 'lib/api/adminUser'
import { AdminUser } from 'lib/types'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router'
import * as yup from 'yup'

const schema = yup
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
      )
  })
  .required()

const CreateAdminUser: React.VFC = () => {
  const { control, handleSubmit } = useForm<AdminUser>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })

  const [error, setError] = useState('')

  const navigate = useNavigate()

  const slug = useParams()

  const { data: adminUser } = useQuery<AdminUser>([`admin-users/${slug.id}`])

  const createAdminUser = useMutation(createAdminUserApi)

  const updateAdminUser = useMutation(updateAdminUserApi)

  const onSubmit: SubmitHandler<AdminUser> = async (values) => {
    try {
      const formData: FormData = new FormData()
      formData.append('name', values.name as string)
      formData.append('email', values.email as string)
      formData.append('password', values.password as string)

      if (!adminUser) {
        createAdminUser.mutate(formData)
      } else {
        updateAdminUser.mutate({ formData, id: slug.id })
      }
      navigate('/admin-user')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Page title="管理者新規登録">
      <Stack>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <Input
            fullWidth
            label="名前"
            name="name"
            control={control}
            controlProps={{
              sx: {
                mb: 2
              }
            }}
            value={adminUser?.name}
          />

          <Input
            fullWidth
            label="名前"
            name="email"
            control={control}
            controlProps={{
              sx: {
                mb: 2
              }
            }}
            value={adminUser?.email}
          />

          <Input
            fullWidth
            label="パスワード"
            name="password"
            type="password"
            control={control}
            controlProps={{
              sx: {
                mb: 2
              }
            }}
            value={adminUser?.password}
          />

          <Grid container justifyContent="center">
            {adminUser ? (
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                編集
              </Button>
            ) : (
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                新規登録
              </Button>
            )}
          </Grid>
        </Box>
      </Stack>
    </Page>
  )
}

export { CreateAdminUser }
