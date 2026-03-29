import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-slate-100 
                    px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg 
                        flex items-center justify-center">
          <span className="text-white font-black text-sm">C</span>
        </div>
        <span className="text-lg font-bold text-slate-800">
          CVPilot
        </span>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        {isLoggedIn ? (
          <>
            <Link to="/upload"
                  className="text-sm text-slate-600 
                             hover:text-blue-600 transition font-medium">
              Upload
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm bg-slate-100 text-slate-700 
                         px-4 py-2 rounded-lg hover:bg-red-50 
                         hover:text-red-600 transition font-medium">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login"
                  className="text-sm text-slate-600 
                             hover:text-blue-600 transition font-medium">
              Sign in
            </Link>
            <Link to="/register"
                  className="text-sm bg-blue-600 text-white 
                             px-4 py-2 rounded-lg hover:bg-blue-700 
                             transition font-medium">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar