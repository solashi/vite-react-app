import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Grid, Stack } from '@mui/material'
import { Input } from 'components/Form'
import { Page } from 'components/Layouts'
import {
  CreateAdminUser,
  createAdminUserApi,
  UpdateAdminUser,
  updateAdminUserApi
} from 'lib/api/adminUser'
import { AdminUser } from 'lib/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
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
      )
  })
  .required()

const FormAdminUser: React.VFC = () => {
  const navigate = useNavigate()
  const slug = useParams()

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors }
  } = useForm<CreateAdminUser | UpdateAdminUser>({
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

  const createAdminUser = useMutation(createAdminUserApi)
  const updateAdminUser = useMutation(updateAdminUserApi)

  const onSubmit: SubmitHandler<AdminUser> = async (values) => {
    try {
      if (!slug?.id) {
        await createAdminUser.mutate(values, {
          onSuccess: () => {
            navigate('/admin-user')
          },
          onError(error: any) {
            if (error.errors) {
              for (const name in error.errors) {
                console.log(name, error.errors[name])
                setError(
                  name as keyof CreateAdminUser,
                  {
                    message: error.errors[name]
                  },
                  {
                    shouldFocus: true
                  }
                )
              }
            }
          }
        })
      } else {
        await updateAdminUser.mutate(values as UpdateAdminUser, {
          onSuccess: () => {
            navigate('/admin-user')
          },
          onError(error: any) {
            if (error.errors) {
              for (const name in error.errors) {
                console.log(name, error.errors[name])
                setError(
                  name as keyof CreateAdminUser,
                  {
                    message: error.errors[name]
                  },
                  {
                    shouldFocus: true
                  }
                )
              }
            }
          }
        })
      }
    } catch (error: any) {
      console.log(1111111, error)
    }
  }

  console.log(errors)

  return (
    <Page title="管理者新規登録">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <Stack spacing={2} mb={3}>
          <Input fullWidth label="名前" name="name" control={control} />

          <Input fullWidth label="名前" name="email" control={control} />

          <Input fullWidth label="パスワード" name="password" type="password" control={control} />
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
