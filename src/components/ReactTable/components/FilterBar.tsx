import { Box, BoxProps, Button, Stack } from '@mui/material'
import { Input, InputProps, Select, SelectProps } from 'components/Form'
import { UnknownObj } from 'lib/types'
import { snakeToCamel } from 'lib/utils'
import debounce from 'lodash/debounce'
import { memo, useCallback, useEffect, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Column } from 'react-table'

export type FilterBarColumn = {
  regex?: '_like' | '_equal' | '_between' | '_notEqual' | '_isnull' | 'has_' | 'none'
  queryKey?: string
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

const convertRelationship = (accessor = '') => {
  const arr = accessor.split('.')
  return [snakeToCamel(arr[0]), arr[1]].join(':')
}

const convertParamKey = (accessor = ''): string => {
  // Replace all array key
  const _accessor = accessor.replace(/\[[^\]]*\]/g, '')
  const name = _accessor.includes('.') ? convertRelationship(_accessor) : accessor
  return name
}

function FilterBarComponent<T extends UnknownObj>({
  handleChangeParams,
  searchColumns,
  watchMode,
  ...props
}: FilterBarProps<T>) {
  const { control, handleSubmit, watch } = useForm<UnknownObj>({
    defaultValues: searchColumns.reduce((df, cur) => {
      ;(df as UnknownObj)[convertParamKey(cur['accessor'] as string)] = ''
      return df
    }, {})
  })

  const getSearchObj = useCallback(
    (key: string) => {
      return searchColumns.find((el) => convertParamKey(el.accessor as string) === key)
    },
    [searchColumns]
  )

  const getQueryParams = useCallback(
    (values: UnknownObj) => {
      const params = Object.keys(values).reduce<UnknownObj>((_params, cur) => {
        if (values[cur]) {
          const searchObj = getSearchObj(cur)
          const _regex = searchObj?.regex || '_like'
          const regex = _regex === 'none' ? '' : _regex
          const queryKey = searchObj?.queryKey || cur
          _params[`${queryKey}${regex}`] = values[cur]
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
          ({ accessor = '', Header, searchType, additionSearchProps, search = true }, index) => {
            const name = convertParamKey(accessor as string)
            const controlProps = {
              name: name,
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
