import { RootState } from "@/toolkit/store"
import React from "react"
import { useSelector } from "react-redux"

const useUsersState = () => {
  const { userData, isLoading, error, token, isLoggedIn } = useSelector(
    (state: RootState) => state.userR
  )

  return {
    userData,
    isLoading,
    error,
    token,
    isLoggedIn
  }
}

export default useUsersState
