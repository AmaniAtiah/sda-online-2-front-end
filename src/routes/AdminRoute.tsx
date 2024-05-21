import useUsersState from "@/hooks/useUsersState"
import { Login } from "@/pages"
import { RootState } from "@/toolkit/store"
import { Outdent } from "lucide-react"
import React from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

const AdminRoute = () => {
  //   const { isLoggedIn, userData } = useSelector((state: RootState) => state.userR)
  const { isLoggedIn, userData } = useUsersState()

  return isLoggedIn && userData?.isAdmin ? <Outlet /> : <Login />
}

export default AdminRoute
