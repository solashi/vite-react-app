import { Stack, Typography } from '@mui/material'
import { Color } from 'components/Color'
import { FormDetail, Tag } from 'components/Form'
import { Page } from 'components/Layouts'
import { MinimizeScrollbar } from 'components/MinimizeScrollbar'
import { useModalState } from 'lib/hooks'
import { Company, Domain, GroupType, ServiceType } from 'lib/types'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import Viewer from 'react-viewer'

const CompanyDetail: React.VFC = () => {
  const params = useParams()
  const { isOpen, onClose, onOpen } = useModalState()
  const { data } = useQuery<Company>([`companies/${params?.id}`])

  return (
    <Page title="企業詳細">
      <Stack spacing={2}>
        <FormDetail label="名前">
          <Typography>{data?.name}</Typography>
        </FormDetail>

        <FormDetail label="名前">
          <Typography>{data?.address}</Typography>
        </FormDetail>

        <FormDetail label="ユーザー登録可能ドメイン">
          <Stack direction="row" spacing={1}>
            {(data?.domains as Domain[])?.map((domain: Domain) => (
              <Tag label={domain.domain} key={domain.domain} />
            ))}
          </Stack>
        </FormDetail>

        <FormDetail label="グループ">
          <Stack direction="row" spacing={1}>
            {(data?.groups as GroupType[])?.map((group: GroupType) => (
              <Tag label={group.name} key={group.id} />
            ))}
          </Stack>
        </FormDetail>

        <FormDetail label="利用可能サービス">
          <Stack direction="row" spacing={1}>
            {(data?.services as ServiceType[])?.map((s: ServiceType) => (
              <Tag label={s.name} key={s.id} />
            ))}
          </Stack>
        </FormDetail>

        <FormDetail label="親会社">
          <Typography>{data?.parent_company_id}</Typography>
        </FormDetail>

        <FormDetail label="メインカラー">
          <Color bgcolor={data?.main_color_code} />
        </FormDetail>

        <FormDetail label="サブカラー">
          <Color bgcolor={data?.sub_color_code} />
        </FormDetail>

        <FormDetail label="サブカラー" onClick={onOpen}>
          <img src={data?.logo_path} alt="logo" width={150} height={150} />
        </FormDetail>

        <FormDetail label="個人情報の取扱い（上書きの場合アップデート）">
          <MinimizeScrollbar border={1} width={600} maxHeight={250} p={1}>
            <Typography paragraph>{data?.privacy_policy_text}</Typography>
          </MinimizeScrollbar>
        </FormDetail>

        <FormDetail label="利用にあたっての留意事項（上書きの場合アップデート）">
          <MinimizeScrollbar border={1} width={600} maxHeight={250} p={1}>
            <Typography paragraph>{data?.service_policy_text}</Typography>
          </MinimizeScrollbar>
        </FormDetail>

        <Viewer
          zIndex={1600}
          visible={isOpen}
          onClose={onClose}
          noFooter
          onMaskClick={onClose}
          images={[{ src: data?.logo_path as string, alt: 'logo' }]}
        />
      </Stack>
    </Page>
  )
}

export { CompanyDetail }
