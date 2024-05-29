import useProductsState from "@/hooks/useProductsState"
import { addToCart } from "@/toolkit/slices/cartSlice"
import { fetchProductById } from "@/toolkit/slices/productSlice"
import { AppDispatch, RootState } from "@/toolkit/store"
import { Product } from "@/types"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

export const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>()
  const { product, isLoading, error } = useProductsState()
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProductById(productId))
    }
    fetchData()
  }, [dispatch, productId])

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }

  return (
    <div className="main-container">
      <div className="  flex justify-center items-center h-full">
        {isLoading && <h2>Loading...</h2>}
        {error && <p>Error: {error}</p>}

        {product && (
          <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row mt-7">
            <div className="md:w-1/3">
              <img src={product.image} alt={product.name} className="w-full h-auto mb-4" />
            </div>
            <div className="md:w-2/3 ml-0 md:ml-4 mt-4 md:mt-0">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700 mb-2">Description: {product.description}</p>
              <p className="text-gray-700 mb-2">Quantity: {product.quantity}</p>
              <p className="text-gray-700 mb-2">Price: {product.price}</p>
              <p className="text-gray-700 mb-2">
                Product Added: {new Date(product.createAt).toLocaleDateString()}
              </p>
              <button
                type="button"
                className="  px-4 py-2 rounded  transition-colors add__to_cart_btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
