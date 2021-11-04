import { Button, Container as MContainer, Grid, Stack, styled, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Logo from 'assets/images/logo.png'
import { UserLoginArgs } from 'lib/types'
import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const Login: React.VFC = () => {
  const { control, handleSubmit } = useForm<UserLoginArgs>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<UserLoginArgs> = (values) => {
    console.log(values)
  }

  return (
    <Container maxWidth="xs">
      <Stack alignItems="center">
        <img src={Logo} alt="logo" />

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
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
