import useOrdersState from "@/hooks/useOrdersState"
import useProductsState from "@/hooks/useProductsState"
import { addToCart } from "@/toolkit/slices/cartSlice"
import { fetchOrderDetails } from "@/toolkit/slices/orderSlice"
import { fetchProductById } from "@/toolkit/slices/productSlice"
import { AppDispatch, RootState } from "@/toolkit/store"
import { Product } from "@/types"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

export const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>()
  // const { product, isLoading, error } = useSelector((state: RootState) => state.productR)

  const { order, isLoading, error } = useOrdersState()

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchOrderDetails(orderId))
    }
    fetchData()
  }, [])

  return (
    <article className="details">
      <h2>Product Details</h2>
      {isLoading && <h2>Loading...</h2>}
      {error && <p>Error{error}</p>}
      <p>hshshs</p>
      {/* <p>{order?.user.firstName}</p>
      <p className="product-details__description">Description: {order.orderId}</p> */}
      <p>{order?.user.firstName}</p>

      <p>{}</p>
    </article>
  )
}
