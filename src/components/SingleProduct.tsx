import { Product } from "@/types"
import React from "react"
import { Link } from "react-router-dom"
const SingleProduct = (props: { product: Product }) => {
  const { product } = props
  return (
    <div className="product card">
      <img src={product.image} alt={product.name} className="product__img" />
      <div className="product__body">
        <h3 className="product__name">{product.name}</h3>
        <p className="product__description">{product.description}</p>
        <p>
          {" "}
          Price:{" "}
          {product.price.toLocaleString("en-us", {
            style: "currency",
            currency: "USD"
          })}
        </p>
        <p>Quantity: {product.quantity}</p>
        <div>
          <Link to={`/products/${product.productId}`}>
            <button className="btn product__btn show-details-btn">
              Show Details <i className="fa fa-eye" aria-hidden="true"></i>
            </button>
          </Link>
          <button className="btn product__btn">
            Add to Cart <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
