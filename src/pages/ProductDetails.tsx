import { fetchProductById } from "@/toolkit/slices/productSlice"
import { AppDispatch, RootState } from "@/toolkit/store"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

export const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>()
  const { product, isLoading, error } = useSelector((state: RootState) => state.productR)

  const dispatch: AppDispatch = useDispatch()

  console.log(product)
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProductById(productId))
    }
    fetchData()
  }, [])

  return (
    <article className="details">
      <h2>Product Details</h2>
      {isLoading && <h2>Loading...</h2>}
      {error && <p>Error{error}</p>}

      {product && (
        <div className="product-details flex-center">
          <div className="product-details__left">
            {/* <img src={product.image} alt={product.name} className="product-details__img" /> */}
          </div>
          <div className="product-details__body product-details__right">
            <h3 className="product-details__name">{product.name}</h3>
            <p className="product-details__description">Description: {product.description}</p>
            <p className="product-details__quantity">Quantity: {product.quantity}</p>
            <p className="product-details__price">Price: {product.price}</p>
            <p>Prroduct Added: {new Date(product.createAt).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </article>
  )
}
