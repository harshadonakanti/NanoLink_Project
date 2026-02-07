import { Link, useNavigate } from "@tanstack/react-router"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../api/user.api"
import { logout } from "../store/slices/authSlice"

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()
      dispatch(logout())
      navigate({ to: "/" })
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-emerald-700 to-gray-900 shadow-lg">
      <div className="max-w-full mx-auto px-4">
        <div className="flex justify-between items-center h-12">
          {/* Left: Brand Name */}
          <Link to="/">
            <h1 className="text-lg font-bold text-white cursor-pointer hover:opacity-90 transition-opacity">
              URL Shortener
            </h1>
          </Link>

          {/* Right: Links and Auth */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-white font-medium text-sm hover:text-gray-200 transition-colors"
            >
              Homepage
            </Link>
            
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className="text-white font-medium text-sm hover:text-gray-200 transition-colors"
              >
                Dashboard
              </Link>
            )}

            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="bg-gray-900 text-white px-4 py-1 rounded-full font-semibold text-sm hover:bg-gray-100 hover:text-gray-900 transition-all shadow-md"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/auth"
                className="bg-gray-700 text-white px-4 py-1 rounded-full font-semibold text-sm transition-all shadow-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar