import React from "react"

const Footer = () => {
  return (
    <footer className="text-white py-4 fixed bottom-0 left-0 w-full footer">
      <div className="container mx-auto">
        <form className="flex items-center justify-center">
          <label className="mr-2 subscribe__label">Subscribe for updates:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email address"
            required
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
          />
          <button
            type="submit"
            className="text-white px-4 py-1 ml-2 rounded focus:outline-none button__subscribe"
          >
            Subscribe
          </button>
        </form>
      </div>
    </footer>
  )
}

export default Footer
