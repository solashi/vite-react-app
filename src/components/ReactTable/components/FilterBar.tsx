import { Box, BoxProps, Button, Stack } from '@mui/material'
import { Input, InputProps, Select, SelectProps } from 'components/Form'
import { UnknownObj } from 'lib/types'
import debounce from 'lodash/debounce'
import { memo, useCallback, useEffect, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Column } from 'react-table'

export type FilterBarColumn = {
  regex?: '_like' | '_equal' | '_between' | '_notEqual' | '_isnull' | 'has_'
  query_key?: string
  searchType?: 'select' | 'text' | 'radio'
  additionSearchProps?: Partial<SelectProps<UnknownObj, UnknownObj> | InputProps<UnknownObj>>
  search?: boolean
}

export type FilterBarProps<T extends UnknownObj> = BoxProps<
  'div',
  {
    searchColumns: Column<T>[]
    handleChangeParams: (params: UnknownObj) => void
    watchMode?: boolean
  }
>

function FilterBarComponent<T extends UnknownObj>({
  handleChangeParams,
  searchColumns,
  watchMode,
  ...props
}: FilterBarProps<T>) {
  const { control, handleSubmit, watch } = useForm<UnknownObj>({
    defaultValues: searchColumns.reduce((df, cur) => {
      ;(df as UnknownObj)[cur['accessor'] as string] = ''
      return df
    }, {})
  })

  const getSearchObj = useCallback(
    (key: string) => {
      return searchColumns.find((el) => el.accessor === key)
    },
    [searchColumns]
  )

  const getQueryParams = useCallback(
    (values: UnknownObj) => {
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
    },
    [getSearchObj]
  )

  const debounceChange = useMemo(
    () => debounce((params) => handleChangeParams(params), 300),
    [handleChangeParams]
  )

  useEffect(() => {
    if (!watchMode) return
    const subscription = watch((value, { name }) => {
      const searchObj = getSearchObj(name as string)
      const hasDebounce = searchObj?.searchType === 'text' || searchObj?.searchType === undefined
      const params = getQueryParams(value)
      if (hasDebounce) {
        debounceChange(params)
      } else {
        handleChangeParams(params)
      }
    })

    return () => subscription.unsubscribe()
  }, [debounceChange, getQueryParams, getSearchObj, handleChangeParams, watch, watchMode])

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
        {searchColumns.map(
          ({ accessor, Header, searchType, additionSearchProps, search = true }, index) => {
            const controlProps = {
              name: accessor as string,
              label: Header as string,
              control,
              key: index
            }

            if (!search) return null

            switch (searchType) {
              case 'select':
                return <Select size="small" {...controlProps} {...additionSearchProps} />
              default:
                return <Input size="small" {...controlProps} {...additionSearchProps} />
            }
          }
        )}

        {!watchMode && (
          <Button type="submit" variant="contained">
            検索
          </Button>
        )}
      </Stack>
    </Box>
  )
}

const FilterBar = memo(FilterBarComponent) as typeof FilterBarComponent

export { FilterBar }
