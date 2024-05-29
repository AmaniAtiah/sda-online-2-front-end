import { RootState } from "@/toolkit/store"
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const AdminSidebar = () => {
  const { userData } = useSelector((state: RootState) => state.userR)

  return (
    <aside className="p-4">
      <div className="mb-4">
        <h2 className="text-lg font-bold">Admin Profile</h2>
        <p>{userData?.firstName}</p>
        <p>{userData?.email}</p>
      </div>
      <ul>
        <li>
          <Link to="/dashboard/admin/categories" className="block py-2 px-4  ">
            Categories
          </Link>
        </li>
        <li>
          <Link to="/dashboard/admin/products" className="block py-2 px-4 ">
            Products
          </Link>
        </li>
        <li>
          <Link to="/dashboard/admin/users" className="block py-2 px-4 ">
            Users
          </Link>
        </li>
        <li>
          <Link to="/dashboard/admin/orders" className="block py-2 px-4 ">
            Orders
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default AdminSidebar
