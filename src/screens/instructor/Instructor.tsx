import { Box, Button, Stack, Typography } from '@mui/material'
import { Page } from 'components/Layouts'
import { ReactTable } from 'components/ReactTable'
import { useApiResource, usePaginationQuery } from 'lib/hooks'
import { useDialog } from 'lib/providers'
import { Instrutor as InstrutorType } from 'lib/types'
import { useMemo } from 'react'
import { useNavigate } from 'react-router'
import { CellProps, Column } from 'react-table'

const Instructor: React.VFC = () => {
  const { paginationData } = usePaginationQuery<InstrutorType>('instructors')

  const navigate = useNavigate()
  const dialog = useDialog()

  const handleCreate = () => {
    navigate('/instructor/create')
  }

  const columns = useMemo<Column<InstrutorType>[]>(
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
        Header: '名前(English)',
        accessor: 'name_en'
      },
      {
        Header: '報酬金額/回',
        accessor: 'unit_price'
      }
    ],
    []
  )

  const { deleteApi } = useApiResource<InstrutorType>('instructors')

  const deleteConfirm = async ({ row }: CellProps<InstrutorType>) => {
    await dialog({
      description: 'Do you want to delete this cord?'
    })
    try {
      await deleteApi(row.original.id)
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
        defaultActionEdit
        onActionDelete={deleteConfirm}
      />
    </Page>
  )
}

export { Instructor }
