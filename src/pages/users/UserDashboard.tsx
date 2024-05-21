import UserSidebar from "@/components/layout/sidebars/UserSidebar"
import { RootState } from "@/toolkit/store"
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const UserDashboard = () => {
  return (
    <div className="container flex-space-around">
      <UserSidebar />
      <div className="main-container">main content goes here</div>
    </div>
  )
}
