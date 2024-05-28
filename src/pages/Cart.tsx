import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Button, Typography, IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { Product } from "@/types"
import { AppDispatch } from "@/toolkit/store"
import {
  removeFromCart,
  removeAllFromCart,
  incrementQuantity,
  decrementQuantity
} from "@/toolkit/slices/cartSlice"
import { useNavigate } from "react-router-dom"
import useUsersState from "@/hooks/useUsersState"
import { createOrder } from "@/toolkit/slices/orderSlice"
import useCartState from "@/hooks/useCartState"

export const Cart = () => {
  const { cartItems } = useCartState()
  const { userData, isLoggedIn } = useUsersState()

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleRemoveAllProductFromCart = () => {
    dispatch(removeAllFromCart())
  }

  const handleRemoveFromCart = (productId?: string) => {
    if (productId) {
      dispatch(removeFromCart(productId))
    }
  }

  const formatPrice = (amount: number) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    })
  }

  const handleIncrementQuantity = (productId: string) => {
    if (productId) {
      dispatch(incrementQuantity(productId))
    }
  }

  const handleDecrementQuantity = (productId: string) => {
    if (productId) {
      dispatch(decrementQuantity(productId))
    }
  }

  const cartTotal = (): number => {
    return cartItems
      .map((cartItem) => cartItem.price * cartItem.orderQuantity)
      .reduce((total, price) => total + price, 0)
  }

  const handleCheckout = async () => {
    if (cartItems.length > 0) {
      const userId = userData?.userId || ""
      const totalPrice = cartTotal()

      dispatch(
        createOrder({
          userId: userId,
          productIds: cartItems.map((item) => item.productId),
          totalPrice: totalPrice
        })
      )
      dispatch(removeAllFromCart())
    }
  }

  return (
    <div className="cart p-4">
      {cartItems && cartItems.length > 0 ? (
        <>
          <div className="cart-heading flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Shopping Cart ({cartItems.length} items)</h2>
            <div>
              <Button
                variant="outlined"
                onClick={handleRemoveAllProductFromCart}
                className="mr-2 button__cart"
              >
                Remove All
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/")}
                className="mr-2 button__cart"
              >
                Shop More
              </Button>
            </div>
          </div>
          <div className="cart-body grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {cartItems.map((cartItem) => (
                <div
                  key={cartItem.productId}
                  className="cart-item flex justify-between items-center p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center">
                    <img
                      className="cart-img w-20 h-20 mr-4"
                      src={cartItem.image}
                      alt={cartItem.name}
                    />
                    <div>
                      <Typography variant="h6">{cartItem.name}</Typography>
                      <Typography variant="body1">Price: {formatPrice(cartItem.price)}</Typography>
                      <Typography variant="body1">In stock: {cartItem.quantity}</Typography>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="quantity-controls mr-4">
                      <Button
                        className="button__cart"
                        variant="outlined"
                        onClick={() => handleIncrementQuantity(cartItem.productId)}
                        disabled={cartItem.quantity === cartItem.orderQuantity}
                      >
                        +
                      </Button>
                      <Typography className="mx-2">{cartItem.orderQuantity}</Typography>
                      <Button
                        className="button__cart"
                        variant="outlined"
                        onClick={() => handleDecrementQuantity(cartItem.productId)}
                      >
                        -
                      </Button>
                    </div>
                    <IconButton
                      onClick={() => handleRemoveFromCart(cartItem.productId)}
                      className="delete__icon"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <Typography variant="h5">Cart Summary</Typography>
              <Typography variant="h6">Total: {formatPrice(cartTotal())}</Typography>
              {isLoggedIn ? (
                <div>
                  <Typography variant="body1">Address: {userData && userData.address}</Typography>
                  <Button variant="outlined" className="my-2">
                    Update Delivery Address
                  </Button>
                  <Button variant="contained" onClick={handleCheckout}>
                    Checkout
                  </Button>
                </div>
              ) : (
                <Typography variant="body1" className="warning">
                  Please login first to place your order and update delivery address.
                </Typography>
              )}
            </div>
          </div>
        </>
      ) : (
        <Typography variant="body1">No items in the cart</Typography>
      )}
    </div>
  )
}
