import AdminSidebar from "@/components/layout/sidebars/AdminSidebar"
import React from "react"

export const AdminOrders = () => {
  return (
    <div className="container flex-space-around">
      <AdminSidebar />
      <div className="main-container">orders content goes here</div>
    </div>
  )
}
