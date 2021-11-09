import { Button, Grid } from '@mui/material'
import { Page } from 'components/Layouts'
import { ReactTable } from 'components/ReactTable'
import { usePaginationQuery } from 'lib/hooks'
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

  const editAdminUser = async (row) => {
    console.log(row.original.id)
  }

  const deleteConfirm = async (row) => {
    alert(row.original.id)
  }

  return (
    <Page>
      <Grid container>
        <Grid item xs={6}>
          <h1>管理者管理一覧</h1>
        </Grid>
        <Grid item xs={6} justifyContent="flex-end" display="flex">
          <Button>search</Button>
          <Button onClick={handleCreate}>新規追加</Button>
        </Grid>
      </Grid>
      <ReactTable
        columns={columns}
        {...paginationData}
        action={{
          onEdit: ({ row }: CellProps<AdminUser>) => {
            editAdminUser(row)
          },
          onDelete: ({ row }: CellProps<AdminUser>) => {
            deleteConfirm(row)
          }
        }}
      />
    </Page>
  )
}

export { List }
