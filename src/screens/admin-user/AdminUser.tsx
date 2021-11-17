import { Button, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Page } from 'components/Layouts'
import { ReactTable } from 'components/ReactTable'
import { useApiResource, usePaginationQuery } from 'lib/hooks'
import { useDialog } from 'lib/providers'
import { AdminUser as UserType } from 'lib/types'
import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { CellProps, Column } from 'react-table'

const AdminUser: React.VFC = () => {
  const { paginationData, refetch } = usePaginationQuery<UserType>('admin-users')
  const { deleteApi } = useApiResource<UserType>('admin-users')

  const navigate = useNavigate()

  const handleCreate = () => {
    navigate('/admin-user/create')
  }

  const columns = useMemo<Column<UserType>[]>(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: '名前',
        accessor: 'name'
      },
      {
        Header: 'メールアドレス',
        accessor: 'email'
      }
    ],
    []
  )

  const dialog = useDialog()

  const handleDelete = useCallback(
    async ({ row }: CellProps<UserType>) => {
      await dialog({
        description: 'Do you want to delete this cord?'
      })
      try {
        await deleteApi(row.original.id)
        refetch()
      } catch (error) {
        console.log(error)
      }
    },
    [deleteApi, refetch]
  )

  return (
    <Page>
      <Stack direction="row" mb={{ md: 6 }} justifyContent="space-between">
        <Typography variant="h4">管理者管理一覧</Typography>

        <Box>
          <Button variant="textBold">絞り込み</Button>
          <Button variant="textBold" onClick={handleCreate}>
            新規追加
          </Button>
        </Box>
      </Stack>

      <ReactTable
        columns={columns}
        {...paginationData}
        defaultActionEdit
        onActionDelete={handleDelete}
      />
    </Page>
  )
}

export { AdminUser }
