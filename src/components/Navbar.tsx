import { MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../store/useAuth'

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1 flex items-center">
        <Link className="btn btn-ghost text-xl flex items-center" to="/">
          <MessageSquare className="text-primary" />
          Together
        </Link>
      </div>
      {isAuthenticated && (
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.profilePic.url}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
