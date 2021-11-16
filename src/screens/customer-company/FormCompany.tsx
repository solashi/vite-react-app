import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Grid, Stack, useTheme } from '@mui/material'
import { Input, Select } from 'components/Form'
import { Page } from 'components/Layouts'
import { useApiResource } from 'lib/hooks'
import { CustomerCompany, GroupType, ServiceType } from 'lib/types'
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

export type CreateCompanyType = CustomerCompany & {
  group_ids: number[]
  service_ids: number[]
  domains: string[]
}

const FormCompany: React.VFC = () => {
  const navigate = useNavigate()
  const params = useParams()
  const theme = useTheme()

  const { createOrUpdateApi } = useApiResource<CustomerCompany>('companies')
  const isEdit = !!params?.id

  const { control, handleSubmit, setError, setValue, getValues, register } =
    useForm<CreateCompanyType>({
      defaultValues: {
        id: Number(params?.id) || undefined,
        name: '',
        address: '',
        invitation_code: '',
        main_color_code: theme.palette.primary.main,
        sub_color_code: theme.palette.secondary.main,
        logo_path: '',
        privacy_policy_text: '',
        service_policy_text: '',
        parent_company_id: undefined,
        fd_company_id: -1,
        group_ids: [],
        service_ids: [],
        domains: []
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
          <Input fullWidth label="サブカラー" control={control} name="invitation_code" />

          <Select<CustomerCompany>
            name="parent_company_id"
            label="親会社"
            fullWidth
            control={control}
            query="companies"
          />

          <Input
            fullWidth
            label="メインカラー"
            control={control}
            name="main_color_code"
            colorPicker
            readOnly
          />

          <Input
            fullWidth
            label="招待コード"
            control={control}
            name="sub_color_code"
            readOnly
            colorPicker
          />

          <Select<GroupType>
            name="group_ids"
            label="グループ"
            fullWidth
            control={control}
            multiple
            query="groups"
          />

          <Select<ServiceType>
            name="service_ids"
            label="利用可能サービス"
            fullWidth
            control={control}
            multiple
            query="services"
          />
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
