import UserSidebar from "@/components/layout/sidebars/UserSidebar"
import React from "react"

export const UserOrder = () => {
  return (
    <div className="container flex-space-around">
      <UserSidebar />
      <div className="main-container">all the order content goes here</div>
    </div>
  )
}
