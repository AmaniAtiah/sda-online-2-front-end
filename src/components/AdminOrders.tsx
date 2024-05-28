import AdminSidebar from "@/components/layout/sidebars/AdminSidebar"
import useOrdersState from "@/hooks/useOrdersState"
import { fetchOrders } from "@/toolkit/slices/orderSlice"
import { AppDispatch } from "@/toolkit/store"
import { Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

export const AdminOrders = () => {
  const { orders, isLoading, error, totalPages } = useOrdersState()

  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(3)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchOrders({ pageNumber, pageSize }))
    }
    fetchData()
  }, [pageNumber])
  return (
    <div className="container flex-space-around">
      <AdminSidebar />
      <div className="main-container">
        <h2>List of Orders</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.length > 0 &&
              orders.map((order) => (
                // <SingleCategory key={category.categoryId} category={category} />
                <tr key={order.orderId}>
                  <td>{order.user.firstName}</td>

                  <td>
                    {/* show details order click */}

                    <Link to={`/dashboard/admin/orders/${order.orderId}`}>
                      <button>Show Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
