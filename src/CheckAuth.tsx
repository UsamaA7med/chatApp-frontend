import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './store/useAuth'
import { useEffect, type JSX } from 'react'

const CheckAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation().pathname
  const { checkAuth, isCheckingAuth, isAuthenticated } = useAuth()
  useEffect(() => {
    checkAuth()
  }, [])
  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    )
  }
  if (
    !isAuthenticated &&
    location !== '/auth/login' &&
    location !== '/auth/signup'
  ) {
    return <Navigate to="/auth/login" />
  } else if (
    isAuthenticated &&
    (location === '/auth/login' || location === '/auth/signup')
  ) {
    return <Navigate to="/" />
  }
  return children
}

export default CheckAuth
