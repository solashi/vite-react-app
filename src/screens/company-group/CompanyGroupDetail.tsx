import { Stack, Typography } from '@mui/material'
import { FormDetail, Tag } from 'components/Form'
import { Page } from 'components/Layouts'
import { CompanyGroupType, GroupCompany } from 'lib/types'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const CompanyGroupDetail: React.VFC = () => {
  const params = useParams()
  const { data } = useQuery<GroupCompany>([`groups/${params?.id}`])

  return (
    <Page title="グループ詳細">
      <Stack spacing={2}>
        <FormDetail label="グループ名">
          <Typography>{data?.name}</Typography>
        </FormDetail>

        <FormDetail label="対象企業">
          <Stack direction="row" spacing={1}>
            {(data?.companies as CompanyGroupType[])?.map((companyGroup: CompanyGroupType) => (
              <Tag label={companyGroup.name} key={companyGroup.id} />
            ))}
          </Stack>
        </FormDetail>
      </Stack>
    </Page>
  )
}

export { CompanyGroupDetail }
