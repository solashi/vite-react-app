import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Grid, Stack } from '@mui/material'
import { Input, Select } from 'components/Form'
import { Page } from 'components/Layouts'
import { useApiResource } from 'lib/hooks'
import { CompanyGroupType, GroupCompany } from 'lib/types'
import { handleValidateErrors } from 'lib/utils'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router'
import * as yup from 'yup'

const validateCompanyGroup = yup.object({
  name: yup.string().required('名前は必須入力です。')
})

const FormCompanyGroup: React.VFC = () => {
  const navigate = useNavigate()
  const params = useParams()
  const isEdit = !!params?.id

  const { control, handleSubmit, setError, setValue } = useForm<GroupCompany>({
    defaultValues: {
      id: Number(params?.id),
      name: '',
      companies: []
    },
    resolver: yupResolver(validateCompanyGroup)
  })

  useQuery<GroupCompany>([`groups/${params.id}`], {
    onSuccess: (data) => {
      setValue('name', data.name)
      setValue(
        'companies',
        (data.companies as GroupCompany[]).map((c) => c.id)
      )
    },
    enabled: isEdit
  })

  const { createOrUpdateApi } = useApiResource<GroupCompany>('groups')

  const onSubmit: SubmitHandler<GroupCompany> = async (values) => {
    try {
      await createOrUpdateApi(values)
      navigate('/customer-company-group')
    } catch (error) {
      if (error.errors) {
        handleValidateErrors(error, setError)
      }
    }
  }

  return (
    <Page title={isEdit ? 'グループ編集' : 'グループ新規登録'}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Stack spacing={2} mb={3}>
          <Input fullWidth label="名前" name="name" control={control} />

          <Select<CompanyGroupType>
            name="companies"
            label="対象企業"
            fullWidth
            control={control}
            multiple
            query="companies"
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

export { FormCompanyGroup }
