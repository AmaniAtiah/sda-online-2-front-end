import { RootState } from "@/toolkit/store"
import React from "react"
import { useSelector } from "react-redux"

const useOrdersState = () => {
  const { orders, isLoading, error, totalPages, order } = useSelector(
    (state: RootState) => state.orderR
  )

  return {
    orders,
    isLoading,
    error,
    totalPages,
    order
  }
}

export default useOrdersState
