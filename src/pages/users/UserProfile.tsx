import UserSidebar from "@/components/layout/sidebars/UserSidebar"
import React from "react"

export const UserProfile = () => {
  return (
    <div className="container flex-space-around">
      <UserSidebar />
      <div className="main-container">user information goes here</div>
    </div>
  )
}
