import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import useTheme from '../store/useTheme'

const DefaultLayout = () => {
  const { theme } = useTheme()
  return (
    <div className="min-h-screen" data-theme={theme}>
      <Navbar />
      <div className="container min-h-[70vh] flex justify-center mx-auto px-5 max-w-7xl">
        <Outlet />
      </div>
    </div>
  )
}

export default DefaultLayout
