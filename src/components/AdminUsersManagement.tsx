import AdminSidebar from "@/components/layout/sidebars/AdminSidebar"
import { AppDispatch } from "@/toolkit/store"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import useUsersState from "@/hooks/useUsersState"
import { banUnbanUser, fetchUsers } from "@/toolkit/slices/userSlice"
import { toast } from "react-toastify"
import { toastSuccess } from "@/utils/helper"

export const AdminUsersManagement = () => {
  const { users, isLoading, error, totalPages } = useUsersState()
  const dispatch: AppDispatch = useDispatch()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(3)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUsers({ pageNumber, pageSize }))
    }
    fetchData()
  }, [pageNumber])

  const handlePrevPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }

  const handleBanUnban = async (userId: string | undefined) => {
    try {
      userId && (await dispatch(banUnbanUser(userId)))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container flex justify-between">
      <AdminSidebar />
      <div className="main-container">
        {isLoading && <h2>Loading...</h2>}
        {error && <p>Error{error}</p>}

        <h2 className="text-2xl font-semibold mb-4">List of Users</h2>

        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">Is Admin</th>
              <th className="border border-gray-300 px-4 py-2">Is Banned</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.userId} className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.address}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.isAdmin ? "Yes" : "No"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.isBanned ? "Yes" : "No"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="btn bg-red-500 text-white py-1 px-2 rounded"
                      onClick={() => handleBanUnban(user.userId)}
                    >
                      {user.isBanned ? "Unban" : "Ban"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="pagination mt-4">
          <button
            onClick={handlePrevPage}
            disabled={pageNumber === 1}
            className="btn bg-gray-300 text-gray-600 px-4 py-2 mr-2"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setPageNumber(index + 1)}
              className="btn bg-gray-300 text-gray-600 px-4 py-2 mr-2"
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={pageNumber === totalPages}
            className="btn bg-gray-300 text-gray-600 px-4 py-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
