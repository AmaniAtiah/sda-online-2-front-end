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

  const getStatusLabel = (status: number | string) => {
    switch (status) {
      case 0:
        return "Pending"
      case 1:
        return "Delivered"
      case 2:
        return "Processing"
      // Add more cases for other status values if needed
      default:
        return "Unknown"
    }
  }

  return (
    <div className="container mx-auto px-4">
      <AdminSidebar />
      <div className="main-container">
        <h2 className="text-2xl font-bold mb-4">List of Orders</h2>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.length > 0 &&
              orders.map((order) => (
                <tr key={order.orderId} className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">{order.user.firstName}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {getStatusLabel(order.status)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{order.totalPrice}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
