import AdminSidebar from "@/components/layout/sidebars/AdminSidebar"
import React from "react"

export const Users = () => {
  return (
    <div className="container flex-space-around">
      <AdminSidebar />
      <div className="main-container">users content goes here</div>
    </div>
  )
}
