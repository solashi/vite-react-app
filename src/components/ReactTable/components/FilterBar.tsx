import { Box, BoxProps, Button, Stack } from '@mui/material'
import { Input, InputProps, Select, SelectProps } from 'components/Form'
import { UnknownObj } from 'lib/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Column } from 'react-table'

export type FilterBarColumn = {
  regex?: '_like' | '_equal' | '_between' | '_notEqual' | '_isnull' | 'has_'
  query_key?: string
  type?: 'select' | 'text' | 'radio'
  additionSearchProps?: Partial<SelectProps<UnknownObj, UnknownObj> | InputProps<UnknownObj>>
}

export type FilterBarProps<T extends UnknownObj> = BoxProps<
  'div',
  {
    searchColumns: Column<T>[]
    handleChangeParams: (params: UnknownObj) => void
  }
>

function FilterBar<T extends UnknownObj>({
  handleChangeParams,
  searchColumns,
  ...props
}: FilterBarProps<T>) {
  const { control, handleSubmit } = useForm<UnknownObj>({
    defaultValues: searchColumns.reduce((df, cur) => {
      ;(df as UnknownObj)[cur['accessor'] as string] = ''
      return df
    }, {})
  })

  const getSearchObj = (key: string) => {
    return searchColumns.find((el) => el.accessor === key)
  }

  const getQueryParams = (values: UnknownObj) => {
    const params = Object.keys(values).reduce<UnknownObj>((_params, cur) => {
      if (values[cur]) {
        const searchObj = getSearchObj(cur)
        const regex = searchObj?.regex || '_like'
        const query_key = searchObj?.query_key || cur
        _params[`${query_key}${regex}`] = values[cur]
      }
      return _params
    }, {})

    return params
  }

  const onSubmit: SubmitHandler<UnknownObj> = (values) => {
    const params = getQueryParams(values)
    handleChangeParams(params)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
      {...props}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        {searchColumns.map(({ accessor, Header, type, additionSearchProps }, index) => {
          const controlProps = {
            name: accessor as string,
            label: Header as string,
            control,
            key: index
          }

          switch (type) {
            case 'select':
              return <Select {...controlProps} {...additionSearchProps} />
            default:
              return <Input {...controlProps} {...additionSearchProps} />
          }
        })}

        <Button type="submit" variant="contained">
          検索
        </Button>
      </Stack>
    </Box>
  )
}

export { FilterBar }
