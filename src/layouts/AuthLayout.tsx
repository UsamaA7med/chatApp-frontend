import { Outlet } from 'react-router-dom'
import AuthAnimation from '../components/authAnimation'

const AuthLayout = () => {
  return (
    <div className="flex flex-col items-center md:flex-row gap-10 justify-between">
      <div className="w-full md:w-1/2 flex justify-center">
        <Outlet />
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <AuthAnimation />
      </div>
    </div>
  )
}

export default AuthLayout
