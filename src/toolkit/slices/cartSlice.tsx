// import { CartState, Product } from "@/types"
import { Product } from "@/types"
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const data = getLocalStorage("cart", { cartItems: [] })

export type CartItem = Product & { orderQuantity: number }

export type CartState = {
  cartItems: CartItem[]
}

const initialState: CartState = {
  cartItems: data.cartItems
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem.productId === action.payload.productId
      )

      if (item) {
        item.orderQuantity += 1
      } else {
        // add new product to cart and minus quantity
        state.cartItems.push({ ...action.payload, orderQuantity: 1 })
      }

      setLocalStorage("cart", { cartItems: state.cartItems })
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((cartItem) => cartItem.productId === action.payload)
      if (item) {
        item.orderQuantity += 1
      }
      setLocalStorage("cart", { cartItems: state.cartItems })
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((cartItem) => cartItem.productId === action.payload)
      if (item && item.orderQuantity > 1) {
        item.orderQuantity -= 1
      }
      setLocalStorage("cart", { cartItems: state.cartItems })
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.productId !== action.payload)
      setLocalStorage("cart", { cartItems: state.cartItems })
    },
    removeAllFromCart: (state) => {
      state.cartItems = []
      setLocalStorage("cart", { cartItems: state.cartItems })
    }
  }
})

export const {
  addToCart,
  removeAllFromCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity
} = cartSlice.actions
export default cartSlice.reducer
