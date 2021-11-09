import { Button, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Page } from 'components/Layouts'
import { ReactTable } from 'components/ReactTable'
import { usePaginationQuery } from 'lib/hooks'
import { useDialog } from 'lib/providers'
import { AdminUser } from 'lib/types'
import { useMemo } from 'react'
import { useNavigate } from 'react-router'
import { CellProps, Column } from 'react-table'

const List: React.VFC = () => {
  const { paginationData } = usePaginationQuery<AdminUser>('admin-users')
  const navigate = useNavigate()
  const handleCreate = () => {
    navigate('/admin-user/create')
  }

  const columns = useMemo<Column<AdminUser>[]>(
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

  const deleteConfirm = async ({ row }: CellProps<AdminUser>) => {
    await dialog({
      description: 'Do you want to delete this cord?'
    })
    try {
      console.log(row.original.id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Page>
      <Stack direction="row" mb={{ md: 6 }} justifyContent="space-between">
        <Typography variant="h4">管理者管理一覧</Typography>

        <Box>
          <Button>search</Button>
          <Button onClick={handleCreate}>新規追加</Button>
        </Box>
      </Stack>
      <ReactTable
        columns={columns}
        {...paginationData}
        action={{
          onDelete: deleteConfirm
        }}
      />
    </Page>
  )
}

export { List }
