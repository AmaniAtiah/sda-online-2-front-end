import React from "react"

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <form className="subscribe-form" action="#" method="post">
          <label htmlFor="email">Subscribe for updates:</label>
          <input type="email" id="email" name="email" placeholder="Your email address" required />
          <input type="submit" value="Subscribe" />
        </form>
      </footer>
    </div>
  )
}

export default Footer
