import { Button } from '@mui/material'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

const LeftHeader = () => {
  const navigate = useNavigate()

  const onCreate = () => {
    navigate('/company-group/create')
  }

  return (
    <div>
      <Button variant="textBold">絞り込み</Button>
      <Button variant="textBold" onClick={onCreate}>
        新規追加
      </Button>
    </div>
  )
}

export default memo(LeftHeader)
