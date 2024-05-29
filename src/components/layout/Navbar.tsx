import { Link } from "react-router-dom"
import { useState } from "react"
import useUsersState from "@/hooks/useUsersState"
import { logoutUser } from "@/toolkit/slices/userSlice"
import { useDispatch } from "react-redux"
import useCartState from "@/hooks/useCartState"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

const Navbar = () => {
  const dispatch = useDispatch()
  const { isLoggedIn, userData } = useUsersState()
  const { cartItems } = useCartState()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/" className="navbar__link">
          <img src="/public/coffee-logo.png" alt="logo" className="logo" />
        </Link>
      </div>
      <div className="">
        <Link to="/" className="navbar__link">
          Home
        </Link>
        <Link to="/contact" className="navbar__link">
          Contact
        </Link>
        <Link to="/products" className="navbar__link">
          Products
        </Link>
      </div>
      <div className="navbar__actions">
        <Link to="/cart" className="navbar__link">
          <ShoppingCartIcon />
          {cartItems && cartItems.length > 0 && <span>{cartItems.length}</span>}
        </Link>
        {!isLoggedIn && (
          <>
            <button className="button__register">
              <Link to="/register">Register</Link>
            </button>
            <button className="button__login">
              <Link to="/login">Login</Link>
            </button>
          </>
        )}
        {isLoggedIn && (
          <>
            <button className="dashboard">
              <Link to={`/dashboard/${userData && userData.isAdmin ? "admin" : "user"}`}>
                Dashboard
              </Link>
            </button>
            <button className="button__logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
