import { Stack, Typography } from '@mui/material'
import { FormDetail } from 'components/Form'
import { Page } from 'components/Layouts'
import { useModalState } from 'lib/hooks'
import { UserType } from 'lib/types/user'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import Viewer from 'react-viewer'

const UserDetail: React.VFC = () => {
  const params = useParams()
  const { isOpen, onClose, onOpen } = useModalState()
  const { data } = useQuery<UserType>([`users/${params?.id}`])

  return (
    <Page title="ユーザー詳細">
      <Stack spacing={2}>
        <FormDetail label="プロフィール画像" onClick={onOpen}>
          <img src={data?.image_path} alt="logo" width={150} height={150} />
        </FormDetail>

        <Viewer
          zIndex={1600}
          visible={isOpen}
          onClose={onClose}
          noFooter
          onMaskClick={onClose}
          images={[{ src: data?.image_path as string, alt: 'logo' }]}
        />

        <Stack direction="row" spacing={8}>
          <FormDetail label="姓">
            <Typography>{data?.first_name}</Typography>
          </FormDetail>

          <FormDetail label="名">
            <Typography>{data?.last_name}</Typography>
          </FormDetail>
        </Stack>

        <Stack direction="row" spacing={8}>
          <FormDetail label="姓（かな）">
            <Typography>{data?.first_name_kana}</Typography>
          </FormDetail>

          <FormDetail label="名（かな）">
            <Typography>{data?.last_name_kana}</Typography>
          </FormDetail>
        </Stack>

        <Stack direction="row" spacing={8}>
          <FormDetail label="性別">
            <Typography>{data?.gender == 1 ? 'Nam' : 'Nu'}</Typography>
          </FormDetail>

          <FormDetail label="生年月日">
            <Typography>{data?.birthday}</Typography>
          </FormDetail>
        </Stack>

        <FormDetail label="電話番号">
          <Typography>{data?.tell}</Typography>
        </FormDetail>

        <FormDetail label="メールアドレス">
          <Typography>{data?.email}</Typography>
        </FormDetail>

        <FormDetail label="所属企業">
          <Typography>{data?.company}</Typography>
        </FormDetail>

        <FormDetail label="興味のある分野">
          <Typography>{data?.interesting_fields}</Typography>
        </FormDetail>

        <FormDetail label="家族の情報">
          <Typography>{data?.families}</Typography>
        </FormDetail>

        <FormDetail label="その他">
          <Typography>{data?.other}</Typography>
        </FormDetail>
      </Stack>
    </Page>
  )
}

export { UserDetail }
