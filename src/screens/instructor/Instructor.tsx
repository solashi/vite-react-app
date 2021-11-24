import { Page } from 'components/Layouts'
import { ReactTable } from 'components/ReactTable'
import { useApiResource, usePaginationQuery } from 'lib/hooks'
import { useDialog } from 'lib/providers'
import { Instructor as InstructorType } from 'lib/types'
import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { CellProps, Column, Row } from 'react-table'
import LeftHeader from './LeftHeader'

const Instructor: React.VFC = () => {
  const { paginationData, refetch } = usePaginationQuery<InstructorType>('instructors')

  const navigate = useNavigate()
  const dialog = useDialog()
  const { deleteApi } = useApiResource<InstructorType>('instructors')

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
    [deleteApi, dialog, refetch]
  )

  const onRowClick = ({ original }: Row<InstructorType>) => {
    navigate('/instructors/' + original.id)
  }

  return (
    <Page title="イベント講師一覧" leftHeader={<LeftHeader />}>
      <ReactTable<InstructorType>
        columns={columns}
        defaultActionEdit
        onActionDelete={handleDelete}
        onRowClick={onRowClick}
        {...paginationData}
      />
    </Page>
  )
}

export { Instructor }
