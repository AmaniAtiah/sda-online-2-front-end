import { Button, Menu, MenuItem } from "@mui/material"
import { Link } from "react-router-dom"
import { useState } from "react"
import MenuIcon from "@mui/icons-material/Menu"
import useUsersState from "@/hooks/useUsersState"
import { logoutUser } from "@/toolkit/slices/userSlice"
import { AppDispatch, RootState } from "@/toolkit/store"
import { useDispatch } from "react-redux"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

const Navbar = () => {
  const dispatch: AppDispatch = useDispatch()
  const { isLoggedIn, userData } = useUsersState()
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <nav className="flex items-center justify-between text-black p-4 ">
      <div className="flex items-center">
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-black">
            <MenuIcon />
          </button>
        </div>
        <div className="hidden md:flex items-center">
          <Link to="/" className="text-black mx-4">
            Home
          </Link>
          <Link to="/contact" className="text-black mx-4">
            Contact
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        <div className="hidden md:block">
          {isLoggedIn && (
            <>
              <Button onClick={handleMenuOpen} className="mx-4">
                <AccountCircleIcon sx={{ fontSize: "2.5rem", color: "black" }} />
              </Button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link to="/register" className="text-black mx-4">
                Register
              </Link>
              <Link to="/login" className="text-black mx-4">
                Login
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          {isLoggedIn && (
            <>
              <Button onClick={handleMenuOpen} className="mx-4">
                <AccountCircleIcon sx={{ fontSize: "2.5rem", color: "black" }} />
              </Button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link to="/register" className="text-black mx-4">
                Register
              </Link>
              <Link to="/login" className="text-black mx-4">
                Login
              </Link>
            </>
          )}
        </div>
        {menuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white menu_open ">
            <div className="flex flex-col items-center py-4">
              <Link to="/" className="text-balck my-2" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link to="/contact" className="text-black my-2" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        )}

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
          <MenuItem>
            <Link
              to={`/dashboard/${userData && userData.isAdmin ? "admin" : "user"}`}
              className="text-black"
            >
              Dashboard
            </Link>
          </MenuItem>
        </Menu>
      </div>
    </nav>
  )
}

export default Navbar
