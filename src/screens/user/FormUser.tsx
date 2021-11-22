import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { Input, InputTag, Select } from 'components/Form'
import { DatePicker } from 'components/Form/Input/DatePicker'
import { ImageUploader } from 'components/ImageUploader'
import { Page } from 'components/Layouts'
import { genderOptions } from 'lib/constants'
import { useApiResource } from 'lib/hooks'
import { CustomerCompany, UserType } from 'lib/types'
import { handleValidateErrors } from 'lib/utils'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router'

const FormUser: React.VFC = () => {
  const navigate = useNavigate()
  const params = useParams()
  const isEdit = !!params?.id

  const { control, handleSubmit, setError, setValue } = useForm<UserType>({
    defaultValues: {
      id: Number(params?.id) || undefined,
      last_name: '',
      first_name: '',
      last_name_kana: '',
      first_name_kana: '',
      gender: undefined,
      birthday: '',
      tell: '',
      email: '',
      aff_company: undefined,
      interesting_fields: [],
      company_id: undefined,
      others: '',
      status: undefined,
      roll: undefined,
      member_id: undefined,
      building_name: undefined,
      company_name: undefined,
      member_id_oca: '',
      company_name_oca: '',
      employee_number: '',
      room_number: '',
      office_base: undefined,
      logo_path: ''
    }
  })

  useQuery<UserType>([`users/${params.id}`], {
    onSuccess: (data) => {
      for (const name in data) {
        if (name === 'interesting_fields') return
        setValue(name as keyof UserType, data[name as keyof UserType])
      }

      setValue('interesting_fields', JSON.parse(data.interesting_fields as string))
    },
    enabled: isEdit
  })

  const { createOrUpdateApi } = useApiResource<UserType>('users')

  const onSubmit: SubmitHandler<UserType> = async (values) => {
    try {
      await createOrUpdateApi(values)
      navigate('/user')
    } catch (error) {
      if (error.errors) {
        handleValidateErrors(error, setError)
      }
    }
  }

  return (
    <Page title={isEdit ? 'ユーザー新規編集' : 'ユーザー新規登録'}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Stack spacing={2}>
          <ImageUploader name="image" control={control} label="プロフィール画像" />

          <Stack direction="row" spacing={2}>
            <Input fullWidth label="姓" name="last_name" control={control} />
            <Input fullWidth label="名" name="first_name" control={control} />
          </Stack>

          <Stack direction="row" spacing={2}>
            <Input fullWidth label="姓（かな）" name="last_name_kana" control={control} />
            <Input fullWidth label="名（かな）" name="first_name_kana" control={control} />
          </Stack>

          <Select name="gender" label="性別" control={control} options={genderOptions} />

          <DatePicker
            label="生年月日"
            splitString="-"
            fullWidth
            name="birthday"
            control={control}
          />

          <Input fullWidth label="電話番号" name="tell" control={control} />

          <Input fullWidth label="メールアドレス" name="email" control={control} />

          <Select<CustomerCompany>
            name="aff_company"
            label="所属企業"
            fullWidth
            control={control}
            query="companies"
          />

          <InputTag name="interesting_fields" label="興味のある分野" fullWidth control={control} />

          <Select<CustomerCompany>
            name="company_id"
            label="家族の情報"
            fullWidth
            control={control}
            query="companies"
          />

          <Input fullWidth label="その他" name="others" control={control} multiline rows={6} />

          <Select<CustomerCompany>
            name="status"
            label="ステータス"
            fullWidth
            control={control}
            query="companies"
          />

          <Select<CustomerCompany>
            name="roll"
            label="ロール"
            fullWidth
            control={control}
            query="companies"
          />

          <Typography sx={{ fontWeight: 'bold' }} mt={2} mb={2}>
            オプション項目
          </Typography>

          <Input fullWidth label="mot.会員ID（mot)" name="member_id" control={control} />

          <Select<CustomerCompany>
            name="building_name"
            label="ビル名（mot）"
            fullWidth
            control={control}
            query="companies"
          />

          <Select<CustomerCompany>
            name="company_name"
            label="会社名（mot）"
            fullWidth
            control={control}
            query="companies"
          />

          <Input
            fullWidth
            label="OCA TOKYO会員ID（OCA TOKYO）"
            name="member_id_oca"
            control={control}
          />

          <Input
            fullWidth
            label="会社名/屋号（OCA TOKYO）"
            name="company_name_oca"
            control={control}
          />

          <Input
            fullWidth
            label="社員番号/会員番号（電通）"
            name="employee_number"
            control={control}
          />

          <Input fullWidth label="部屋番号（HumanFirst）" name="room_number" control={control} />

          <Select<CustomerCompany>
            name="office_base"
            label="オフィス拠点（HumanFirst）"
            fullWidth
            control={control}
            query="companies"
          />
        </Stack>

        <Grid container justifyContent="center">
          {isEdit ? (
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

export { FormUser }
