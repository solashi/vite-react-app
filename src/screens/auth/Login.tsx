import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Box, Button, Container as MContainer, Grid, Stack, styled } from '@mui/material'
import Logo from 'assets/images/logo.png'
import { Input } from 'components/Form'
import { useAuth } from 'lib/hooks'
import { UserLoginArgs, UserLoginError } from 'lib/types'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required()
  })
  .required()

const Login: React.VFC = () => {
  const { login, auth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth) {
      navigate('/', {
        replace: true
      })
    }
  }, [auth, navigate])

  const [error, setError] = useState('')

  const { control, handleSubmit } = useForm<UserLoginArgs>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<UserLoginArgs> = async (values) => {
    try {
      await login(values)
      navigate('/')
    } catch (error) {
      setError((error as UserLoginError).message)
    }
  }

  return (
    <Container maxWidth="xs">
      <Stack alignItems="center">
        <img src={Logo} alt="logo" />

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <Input
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            controlProps={{
              sx: {
                mb: 2
              }
            }}
            control={control}
          />

          <Input
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            control={control}
          />

          <Grid container justifyContent="flex-end">
            <Button>パスワードをお忘れですか？</Button>
          </Grid>

          <Grid container justifyContent="center">
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              ログイン
            </Button>
          </Grid>
        </Box>
      </Stack>
    </Container>
  )
}

const Container = styled(MContainer)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
})

export { Login }
