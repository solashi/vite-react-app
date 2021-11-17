import { Stack, Typography } from '@mui/material'
import { FormDetail } from 'components/Form'
import { Page } from 'components/Layouts'
import { AdminUser } from 'lib/types'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const AdminUserDetail: React.VFC = () => {
  const params = useParams()
  const { data } = useQuery<AdminUser>([`admin-users/${params?.id}`])

  return (
    <Page title="管理者詳細">
      <Stack spacing={2} ml={10}>
        <FormDetail label="名前">
          <Typography>{data?.name}</Typography>
        </FormDetail>

        <FormDetail label="メールアドレス">
          <Typography>{data?.email}</Typography>
        </FormDetail>

        <FormDetail label="パスワード">
          <Typography>********</Typography>
        </FormDetail>
      </Stack>
    </Page>
  )
}

export { AdminUserDetail }
