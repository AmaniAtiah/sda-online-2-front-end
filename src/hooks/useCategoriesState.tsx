import { RootState } from "@/toolkit/store"
import React from "react"
import { useSelector } from "react-redux"

const useCategoriesState = () => {
  const { categories, isLoading, error, totalPages, category } = useSelector(
    (state: RootState) => state.categoryR
  )

  return {
    categories,
    isLoading,
    error,
    totalPages,
    category
  }
}

export default useCategoriesState
