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

  //   console.log(products)
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
      // toastSuccess(payload.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container flex-space-around">
      <AdminSidebar />
      <div className="main-container">
        {isLoading && <h2>Loading...</h2>}
        {error && <p>Error{error}</p>}

        <h2>List of Users</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Is Admin</th>
              <th>Is Banned</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((user) => (
                // <SingleCategory key={category.categoryId} category={category} />
                <tr key={user.userId}>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                  <td>{user.isBanned ? "Yes" : "No"}</td>
                  <td>
                    <button
                      className="btn delete-btn "
                      onClick={() => {
                        handleBanUnban(user.userId)
                      }}
                    >
                      {user.isBanned ? "Ban" : "Unban"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={handlePrevPage} disabled={pageNumber === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => setPageNumber(index + 1)}>
              {index + 1}
            </button>
          ))}
          <button onClick={handleNextPage} disabled={pageNumber === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
