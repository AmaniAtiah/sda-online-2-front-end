import { Product } from "@/types"
import React from "react"
import { Link } from "react-router-dom"
import { Button, Card, CardContent, Typography } from "@mui/material"

const SingleProduct = (props: { product: Product }) => {
  const { product } = props

  return (
    <Card className="mb-4 card-wrapper">
      <CardContent>
        <img src={product.image} alt={product.name} className=" w-full rounded" />
        <Typography
          variant="h5"
          component="h2"
          className="mt-4"
          style={{ fontSize: "1rem", marginTop: "1rem" }}
        >
          {product.name}
        </Typography>
        <Typography variant="body1" className="text-gray-600 mt-2">
          {product.description}
        </Typography>
        <Typography variant="body1" className="text-gray-800 mt-2">
          Price: {product.price.toLocaleString("en-us", { style: "currency", currency: "USD" })}
        </Typography>
        <Typography variant="body1" className="text-gray-800">
          Quantity: {product.quantity}
        </Typography>
        {/* <div className="mt-4 flex gap-4">
          <Link to={`/products/${product.productId}`}>
            <Button variant="outlined">Show Details</Button>
          </Link>
          <Button variant="contained">Add to Cart</Button>
        </div> */}
      </CardContent>
    </Card>
  )
}

export default SingleProduct
