import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { Input, RawInput, Select } from 'components/Form'
import { Page } from 'components/Layouts'
import { FileBag, useApiResource, useUploader } from 'lib/hooks'
import { CustomerCompany, UserType } from 'lib/types'
import { handleValidateErrors } from 'lib/utils'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router'

const FormUser: React.VFC = () => {
  const navigate = useNavigate()
  const params = useParams()
  const isEdit = !!params?.id

  const { control, handleSubmit, setError, setValue, getValues } = useForm<UserType>({
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
      setValue('last_name', data.last_name)
      setValue('first_name', data.first_name)
      setValue('last_name_kana', data.last_name_kana)
      setValue('first_name_kana', data.first_name_kana)
      setValue('gender', data.gender)
      setValue('company_id', data.company_id)
      setValue('birthday', data.birthday)
      setValue('tell', data.tell)
      setValue('email', data.email)
      setValue('aff_company', data.aff_company)
    },
    enabled: isEdit
  })

  const { onDrop } = useUploader({
    config: {
      url: 'upload'
    },
    onUploaded: (file: FileBag) => {
      setValue('logo_path', file.responseData.link as string)
    }
  })
  const handleChooseImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    onDrop(target.files as FileList)
  }

  const options = [
    { value: 1, label: '男性' },
    { value: 2, label: '女性' }
  ]

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
        <Stack>
          {getValues('logo_path') && (
            <img src={getValues('logo_path')} alt="logo" width={150} height={150} />
          )}
          <RawInput
            label="プロフィール画像"
            type="file"
            variant="base"
            onChange={handleChooseImage}
          />

          <Stack direction="row" spacing={2}>
            <Input fullWidth label="姓" name="last_name" control={control} />
            <Input fullWidth label="名" name="first_name" control={control} />
          </Stack>

          <Stack direction="row" spacing={2}>
            <Input fullWidth label="姓（かな）" name="last_name_kana" control={control} />
            <Input fullWidth label="名（かな）" name="first_name_kana" control={control} />
          </Stack>

          <Stack direction="row" spacing={2}>
            <Select name="gender" label="性別" fullWidth control={control} options={options} />
            <Input fullWidth label="生年月日 " name="birthday" control={control} />
          </Stack>

          <Input fullWidth label="電話番号" name="tell" control={control} />

          <Input fullWidth label="メールアドレス" name="email" control={control} />

          <Select<CustomerCompany>
            name="aff_company"
            label="所属企業"
            fullWidth
            control={control}
            query="companies"
          />

          <Select<CustomerCompany>
            name="interesting_fields"
            label="興味のある分野"
            fullWidth
            control={control}
            query="companies"
            multiple
          />

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
