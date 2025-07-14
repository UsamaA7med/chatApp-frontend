import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import DefaultLayout from './layouts/DefaultLayout'
import LoginPage from './pages/LoginPage'
import AuthLayout from './layouts/AuthLayout'
import CheckAuth from './CheckAuth'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <CheckAuth>
        <DefaultLayout />
      </CheckAuth>
    ),
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'signup',
            element: <SignupPage />,
          },
          {
            path: 'login',
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
])

export default router
