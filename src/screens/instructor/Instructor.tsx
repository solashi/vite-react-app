import { Box, Button, Stack, Typography } from '@mui/material'
import { Page } from 'components/Layouts'
import { ReactTable } from 'components/ReactTable'
import { useApiResource, usePaginationQuery } from 'lib/hooks'
import { useDialog } from 'lib/providers'
import { Instructor as InstructorType } from 'lib/types'
import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { CellProps, Column } from 'react-table'

const Instructor: React.VFC = () => {
  const { paginationData, refetch } = usePaginationQuery<InstructorType>('instructors')

  const navigate = useNavigate()
  const dialog = useDialog()
  const { deleteApi } = useApiResource<InstructorType>('instructors')

  const handleCreate = () => {
    navigate('/instructor/create')
  }

  const columns = useMemo<Column<InstructorType>[]>(
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

  const handleDelete = useCallback(
    async ({ row }: CellProps<InstructorType>) => {
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
          <Button>search</Button>
          <Button onClick={handleCreate}>新規追加</Button>
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

export { Instructor }
