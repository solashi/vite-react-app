import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Grid, Stack, useTheme } from '@mui/material'
import { Input, InputColor, InputTag, RawInput, Select } from 'components/Form'
import { Page } from 'components/Layouts'
import { FileBag, useApiResource, useUploader } from 'lib/hooks'
import { Company, CustomerCompany, Domain, GroupType, ServiceType } from 'lib/types'
import { handleValidateErrors } from 'lib/utils'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
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

  const { createOrUpdateApi } = useApiResource<Company>('companies')
  const isEdit = !!params?.id

  const { control, handleSubmit, setError, setValue } = useForm<Company>({
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
      fd_company_id: undefined,
      groups: [],
      services: [],
      domains: []
    },
    resolver: yupResolver(validateAdminUser)
  })

  useQuery<Company>([`companies/${params?.id}`], {
    onSuccess: (data) => {
      const instanceKeys: Array<keyof Company> = ['groups', 'services', 'domains']
      for (const name in data) {
        if (instanceKeys.includes(name as keyof Company)) {
          setValue(
            name as keyof Company,
            (data[name as keyof Company] as GroupType[] | ServiceType[] | Domain[])?.map((el) =>
              name === 'domains' ? (el as Domain).domain : el.id
            ) as Company['groups']
          )
        } else {
          setValue(name as keyof Company, data[name as keyof Company])
        }
      }
    },
    enabled: isEdit
  })

  const onSubmit: SubmitHandler<Company> = async (values) => {
    try {
      await createOrUpdateApi(values)
      navigate('/customer-company')
    } catch (error) {
      if (error.errors) {
        handleValidateErrors(error, setError)
      }
    }
  }

  const { onDrop } = useUploader({
    url: 'upload',
    onUploaded: (file: FileBag) => {
      setValue('logo_path', file.responseData.link as string)
    }
  })

  const handleChooseImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    onDrop(target.files as FileList)
  }

  return (
    <Page title={isEdit ? '企業編集' : '企業新規登録'}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Stack spacing={2} mb={3}>
          <Input fullWidth label="名前" name="name" control={control} />
          <Input fullWidth label="名前" name="address" control={control} />
          <InputTag name="domains" label="ユーザー登録可能ドメイン" fullWidth control={control} />

          <Input fullWidth label="招待コード" control={control} name="invitation_code" />

          <Select<GroupType>
            name="groups"
            label="グループ"
            fullWidth
            control={control}
            multiple
            query="groups"
          />

          <Select<ServiceType>
            name="services"
            label="利用可能サービス"
            fullWidth
            control={control}
            multiple
            query="services"
          />

          <Select<CustomerCompany>
            name="parent_company_id"
            label="親会社"
            fullWidth
            control={control}
            query="companies"
          />

          <InputColor
            fullWidth
            label="メインカラー"
            control={control}
            name="main_color_code"
            readOnly
          />

          <InputColor
            fullWidth
            label="サブカラー"
            control={control}
            name="sub_color_code"
            readOnly
          />

          <RawInput
            label="サービスロゴ（上書きの場合アップロード）"
            type="file"
            variant="base"
            onChange={handleChooseImage}
          />

          <Input
            fullWidth
            label="個人情報の取扱い（上書きの場合アップデート）"
            name="privacy_policy_text"
            control={control}
            multiline
            rows={6}
            sx={{
              width: 600
            }}
          />

          <Input
            fullWidth
            label="利用にあたっての留意事項（上書きの場合アップデート）"
            name="service_policy_text"
            control={control}
            multiline
            rows={6}
            sx={{
              width: 600
            }}
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
