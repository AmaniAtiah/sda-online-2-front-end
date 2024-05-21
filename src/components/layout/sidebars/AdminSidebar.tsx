import { RootState } from "@/toolkit/store"
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const AdminSidebar = () => {
  const { userData } = useSelector((state: RootState) => state.userR)

  return (
    <aside className="sidebar-container">
      <div>
        <h2>Admin Profile</h2>
        <p>{userData?.firstName}</p>
        <p>{userData?.email}</p>
      </div>
      <ul>
        <li>
          <Link to="/dashboard/admin/categories">Categories</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/products">Products</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/users">Users</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/orders">Orders</Link>
        </li>
      </ul>
    </aside>
  )
}

export default AdminSidebar
