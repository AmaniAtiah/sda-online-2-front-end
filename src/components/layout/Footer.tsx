import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="footer flex-space-around">
      <div className="flex-space-around">
        <label htmlFor="subscribe">Subsdribe to Newsetter</label>
        <input
          type="email"
          name="subscribe"
          id="subscribe"
          className="footer-input"
          placeholder="Enter your Email Address"
        />
        <button className="btn btn-subscribe">Subscribe </button>
      </div>
      <div>
        <p>Copyright 2024 Amani Atiah . All right reserved </p>
      </div>
    </footer>
  )
}

export default Footer
