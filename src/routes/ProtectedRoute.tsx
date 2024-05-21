import useUsersState from "@/hooks/useUsersState"
import { Login } from "@/pages"
import React from "react"
import { Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  //   const { isLoggedIn } = useSelector((state: RootState) => state.userR)
  const { isLoggedIn } = useUsersState()

  return isLoggedIn ? <Outlet /> : <Login />
}

export default ProtectedRoute
