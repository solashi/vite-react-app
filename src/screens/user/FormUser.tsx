import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { DatePickerSeparator, Input, InputTag, Select } from 'components/Form'
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
    <Page title={isEdit ? '????????????????????????' : '????????????????????????'}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Stack spacing={2}>
          <ImageUploader name="image" control={control} label="????????????????????????" />

          <Stack direction="row" spacing={2}>
            <Input fullWidth label="???" name="last_name" control={control} />
            <Input fullWidth label="???" name="first_name" control={control} />
          </Stack>

          <Stack direction="row" spacing={2}>
            <Input fullWidth label="???????????????" name="last_name_kana" control={control} />
            <Input fullWidth label="???????????????" name="first_name_kana" control={control} />
          </Stack>

          <Select name="gender" label="??????" control={control} options={genderOptions} />

          <DatePickerSeparator label="????????????" fullWidth name="birthday" control={control} />

          <Input fullWidth label="????????????" name="tell" control={control} />

          <Input fullWidth label="?????????????????????" name="email" control={control} />

          <Select<CustomerCompany>
            name="aff_company"
            label="????????????"
            fullWidth
            control={control}
            query="companies"
          />

          <InputTag name="interesting_fields" label="?????????????????????" fullWidth control={control} />

          <Select<CustomerCompany>
            name="company_id"
            label="???????????????"
            fullWidth
            control={control}
            query="companies"
          />

          <Input fullWidth label="?????????" name="others" control={control} multiline rows={6} />

          <Select<CustomerCompany>
            name="status"
            label="???????????????"
            fullWidth
            control={control}
            query="companies"
          />

          <Select<CustomerCompany>
            name="roll"
            label="?????????"
            fullWidth
            control={control}
            query="companies"
          />

          <Typography sx={{ fontWeight: 'bold' }} mt={2} mb={2}>
            ?????????????????????
          </Typography>

          <Input fullWidth label="mot.??????ID???mot)" name="member_id" control={control} />

          <Select<CustomerCompany>
            name="building_name"
            label="????????????mot???"
            fullWidth
            control={control}
            query="companies"
          />

          <Select<CustomerCompany>
            name="company_name"
            label="????????????mot???"
            fullWidth
            control={control}
            query="companies"
          />

          <Input
            fullWidth
            label="OCA TOKYO??????ID???OCA TOKYO???"
            name="member_id_oca"
            control={control}
          />

          <Input
            fullWidth
            label="?????????/?????????OCA TOKYO???"
            name="company_name_oca"
            control={control}
          />

          <Input
            fullWidth
            label="????????????/????????????????????????"
            name="employee_number"
            control={control}
          />

          <Input fullWidth label="???????????????HumanFirst???" name="room_number" control={control} />

          <Select<CustomerCompany>
            name="office_base"
            label="?????????????????????HumanFirst???"
            fullWidth
            control={control}
            query="companies"
          />
        </Stack>

        <Grid container justifyContent="center">
          {isEdit ? (
            <Button type="submit" variant="contained">
              ??????
            </Button>
          ) : (
            <Button type="submit" variant="contained">
              ????????????
            </Button>
          )}
        </Grid>
      </Box>
    </Page>
  )
}

export { FormUser }
