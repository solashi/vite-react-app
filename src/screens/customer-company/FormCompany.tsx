import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Grid, Stack, useTheme } from '@mui/material'
import { Input } from 'components/Form'
import { Page } from 'components/Layouts'
import { useApiResource } from 'lib/hooks'
import { CustomerCompany } from 'lib/types'
import { handleValidateErrors } from 'lib/utils'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

const validateAdminUser = yup
  .object({
    name: yup.string().required('名前は必須入力です。'),
    address: yup.string().required()
  })
  .required()

const FormCompany: React.VFC = () => {
  const navigate = useNavigate()
  const params = useParams()
  const theme = useTheme()

  const { createOrUpdateApi } = useApiResource<CustomerCompany>('companies')
  const isEdit = !!params?.id

  const { control, handleSubmit, setError, setValue, getValues, register } =
    useForm<CustomerCompany>({
      defaultValues: {
        id: Number(params?.id) || undefined,
        name: '',
        address: '',
        invitaion_code: '',
        main_color_code: theme.palette.primary.main,
        sub_color_code: theme.palette.secondary.main,
        logo_path: '',
        privacy_policy_text: '',
        service_policy_text: '',
        parent_company_id: -1,
        fd_company_id: -1
      },
      resolver: yupResolver(validateAdminUser)
    })

  const onSubmit: SubmitHandler<CustomerCompany> = async (values) => {
    try {
      console.log(values)
      //   await createOrUpdateApi(values)
      //   navigate('/companies')
    } catch (error) {
      if (error.errors) {
        handleValidateErrors(error, setError)
      }
    }
  }

  return (
    <Page title={isEdit ? '企業編集' : '企業新規登録'}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Stack spacing={2} mb={3}>
          <Input fullWidth label="名前" name="name" control={control} />
          <Input fullWidth label="名前" name="address" control={control} />
          <Input
            fullWidth
            label="メインカラー"
            control={control}
            name="main_color_code"
            colorPicker
          />
          <Input fullWidth label="サブカラー" control={control} name="sub_color_code" colorPicker />
        </Stack>

        <Grid container justifyContent="center">
          {params?.id ? (
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

export { FormCompany }
