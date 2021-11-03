import { Outlet } from 'react-router-dom'

const DefaultLayout: React.VFC = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export { DefaultLayout }
