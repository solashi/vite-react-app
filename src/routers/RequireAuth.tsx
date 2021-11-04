import { useAuth } from 'lib/hooks'
import React, { useMemo } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

type RequireAuthProps = {
  children: JSX.Element
}

const RequireAuth: React.VFC<RequireAuthProps> = ({ children }) => {
  const { auth, getUser } = useAuth()
  const location = useLocation()

  useMemo(() => {
    getUser()
  }, [])

  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />
  }

  return children
}

export { RequireAuth }
