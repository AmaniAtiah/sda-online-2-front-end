import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="flex-center">
      <ul className="nav__lists flex-center">
        <li>
          <Link className="nav__link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="nav__link" to="/register">
            Register
          </Link>
        </li>
        <li>
          <Link className="nav__link" to="/login">
            Login
          </Link>
        </li>
        <li>
          <Link className="nav__link" to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
